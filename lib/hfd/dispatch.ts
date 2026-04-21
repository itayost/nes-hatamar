import { createShipment } from '@/lib/hfd/client';
import { getHfdConfig, isHfdConfigured } from '@/lib/hfd/config';
import { orderToHfdPayload } from '@/lib/hfd/map-order';
import { setShipmentMeta, type StoredOrder } from '@/lib/orders/store';
import { escapeHtml } from '@/lib/email-templates';
import { getCountryByCode } from '@/lib/countries';

/**
 * Outcome of attempting to dispatch a paid book order to HFD.
 * Used by the webhook to build the admin email.
 */
export interface DispatchResult {
  status: 'created' | 'duplicate' | 'skipped' | 'error';
  shipmentNumber?: number;
  randomId?: string;
  reason?: string;
  errorMessage?: string;
}

/**
 * HFD error codes that indicate "this reference already has a shipment" —
 * per the PDF, errorCode 500 (referenceNum1 duplicate) and 600 (referenceNum2
 * duplicate) return the existing shipment number and should be treated as success.
 */
const DUPLICATE_ERROR_CODES = new Set(['500', '600']);

/**
 * Dispatch a paid book order to HFD.
 *
 * Never throws — failure modes are returned as DispatchResult so the webhook
 * can always respond 200 to PayMe.
 *
 * Handles:
 *   - non-book / non-IL / missing-address → skip
 *   - duplicate webhooks (shipmentMeta already persisted) → skip
 *   - HFD duplicate-reference errors → treat as success
 *   - any other HFD failure → return error (admin email includes details)
 */
export async function dispatchOrderToHfd(order: StoredOrder): Promise<DispatchResult> {
  if (order.product !== 'book') {
    return { status: 'skipped', reason: 'course order — no shipping' };
  }

  if (order.deliveryMethod === 'pickup') {
    return { status: 'skipped', reason: 'איסוף עצמי מכרם מהר״ל — אין משלוח' };
  }

  if (!order.shippingAddress) {
    return { status: 'skipped', reason: 'missing shipping address' };
  }

  if (order.shippingAddress.country !== 'IL') {
    const countryName =
      getCountryByCode(order.shippingAddress.country)?.nameHe ?? order.shippingAddress.country;
    return {
      status: 'skipped',
      reason: `משלוח בינלאומי (${countryName}) — HFD ישראל בלבד`,
    };
  }

  if (order.shipmentMeta?.shipmentNumber) {
    return {
      status: 'skipped',
      reason: `already dispatched (shipment ${order.shipmentMeta.shipmentNumber})`,
      shipmentNumber: order.shipmentMeta.shipmentNumber,
    };
  }

  if (!isHfdConfigured()) {
    return {
      status: 'skipped',
      reason: 'HFD env vars not configured',
    };
  }

  try {
    const config = getHfdConfig();
    const payload = orderToHfdPayload(order, config);
    if (!payload) {
      return { status: 'skipped', reason: 'order could not be mapped to HFD payload' };
    }

    const response = await createShipment(payload);
    const nowIso = new Date().toISOString();

    const persist = async (meta: Parameters<typeof setShipmentMeta>[1]) => {
      const ok = await setShipmentMeta(order.id, meta, order);
      if (!ok) {
        console.warn(
          `HFD shipment created for ${order.id} but order no longer in store — shipmentMeta not persisted`,
        );
      }
    };

    if (response.errorCode === '0') {
      await persist({
        shipmentNumber: response.shipmentNumber,
        randomId: response.randNumber,
        createdAt: nowIso,
      });
      return {
        status: 'created',
        shipmentNumber: response.shipmentNumber,
        randomId: response.randNumber,
      };
    }

    if (DUPLICATE_ERROR_CODES.has(response.errorCode) && response.existingShipmentNumber) {
      await persist({
        shipmentNumber: response.existingShipmentNumber,
        randomId: response.randNumber,
        errorCode: response.errorCode,
        errorMessage: response.errorMessage,
        createdAt: nowIso,
      });
      return {
        status: 'duplicate',
        shipmentNumber: response.existingShipmentNumber,
        randomId: response.randNumber,
        errorMessage: response.errorMessage,
      };
    }

    await persist({
      errorCode: response.errorCode,
      errorMessage: response.errorMessage,
      createdAt: nowIso,
    });
    return {
      status: 'error',
      errorMessage: response.errorMessage || `HFD errorCode ${response.errorCode}`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('HFD dispatch failed:', message);
    try {
      await setShipmentMeta(
        order.id,
        { errorCode: 'EXCEPTION', errorMessage: message, createdAt: new Date().toISOString() },
        order,
      );
    } catch {
      // Never let HFD problems bubble up into the webhook response.
    }
    return { status: 'error', errorMessage: message };
  }
}

/**
 * Render a short Hebrew HTML fragment describing the dispatch outcome,
 * for inclusion in the admin payment-confirmation email.
 */
export function renderDispatchEmailFragment(result: DispatchResult): string {
  const base =
    'background: #FFFEF7; border-right: 4px solid #C9A961; padding: 12px 16px; margin-top: 16px; border-radius: 4px;';
  switch (result.status) {
    case 'created':
      return `
        <div style="${base}">
          <strong>משלוח HFD נוצר</strong><br/>
          מספר משלוח: ${result.shipmentNumber ?? '—'}
        </div>
      `;
    case 'duplicate':
      return `
        <div style="${base}">
          <strong>משלוח HFD (קיים)</strong><br/>
          מספר משלוח: ${result.shipmentNumber ?? '—'}<br/>
          <span style="color: #666; font-size: 12px;">הפנייה כבר נרשמה ב-HFD (${escapeHtml(result.errorMessage || '')})</span>
        </div>
      `;
    case 'skipped':
      return `
        <div style="${base}">
          <strong>משלוח HFD לא נשלח</strong><br/>
          <span style="color: #666; font-size: 12px;">${escapeHtml(result.reason || '')}</span>
        </div>
      `;
    case 'error':
      return `
        <div style="${base.replace('#C9A961', '#c0392b')}">
          <strong>שגיאה ביצירת משלוח HFD — יש לטפל ידנית</strong><br/>
          <span style="color: #666; font-size: 12px;">${escapeHtml(result.errorMessage || 'Unknown error')}</span>
        </div>
      `;
    default: {
      const _exhaustive: never = result.status;
      return _exhaustive;
    }
  }
}
