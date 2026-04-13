import { getHfdConfig } from '@/lib/hfd/config';
import type {
  HfdCancelShipmentResponse,
  HfdCreateShipmentRequest,
  HfdCreateShipmentResponse,
  HfdShipmentStatusResponse,
} from '@/lib/hfd/types';

/**
 * HFD ERP client.
 *
 * All methods:
 *   - read config lazily via getHfdConfig() (throws if env vars missing)
 *   - use Bearer auth on every request
 *   - surface HTTP + payload errors; callers must wrap in try/catch
 *
 * Follows the external-API pattern used in lib/payme-payment.ts.
 */

function buildHeaders(token: string, extra?: Record<string, string>): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    ...extra,
  };
}

/**
 * Create a shipment.
 *
 * HFD returns HTTP 200 even for validation errors — the error is in the JSON
 * body as errorCode !== "0". We return the response verbatim; callers decide
 * whether errorCode 500/600 (duplicate) is a success signal.
 */
export async function createShipment(
  payload: HfdCreateShipmentRequest,
): Promise<HfdCreateShipmentResponse> {
  const config = getHfdConfig();
  const url = `${config.apiUrl}/shipments/create`;

  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(config.token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error('HFD unauthorized (401) — check HFD_API_TOKEN');
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HFD createShipment HTTP ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as HfdCreateShipmentResponse;
  return data;
}

/**
 * Get shipment tracking info by shipment number OR "<prefix><referenceNum>".
 */
export async function getShipment(idOrRef: string | number): Promise<HfdShipmentStatusResponse> {
  const config = getHfdConfig();
  const url = `${config.apiUrl}/shipments/${encodeURIComponent(String(idOrRef))}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(config.token),
  });

  if (!response.ok) {
    throw new Error(`HFD getShipment HTTP ${response.status}`);
  }

  return (await response.json()) as HfdShipmentStatusResponse;
}

/**
 * Fetch the printable 10x10 cm label as a PDF.
 * Returns the raw PDF bytes so callers can stream/save/email it.
 */
export async function getLabelPdf(idOrRef: string | number): Promise<ArrayBuffer> {
  const config = getHfdConfig();
  const url = `${config.apiUrl}/shipments/${encodeURIComponent(String(idOrRef))}/label`;

  const response = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(config.token, { Accept: 'application/pdf' }),
  });

  if (!response.ok) {
    throw new Error(`HFD getLabelPdf HTTP ${response.status}`);
  }

  return await response.arrayBuffer();
}

/**
 * Cancel a shipment by its randomId (NOT the shipmentNumber).
 * Only allowed before the driver picks up the package, and requires
 * explicit permission enabled by HFD support.
 */
export async function cancelShipment(randomId: string): Promise<HfdCancelShipmentResponse> {
  const config = getHfdConfig();
  const url = `${config.apiUrl}/shipments/${encodeURIComponent(randomId)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: buildHeaders(config.token),
  });

  if (!response.ok) {
    throw new Error(`HFD cancelShipment HTTP ${response.status}`);
  }

  return (await response.json()) as HfdCancelShipmentResponse;
}
