import { NextRequest, NextResponse } from 'next/server';
import { parsePaymeWebhook } from '@/lib/payme-payment';
import { Resend } from 'resend';
import { getOrder, isOrderStoreConfigured } from '@/lib/orders/store';
import { dispatchOrderToHfd, renderDispatchEmailFragment, type DispatchResult } from '@/lib/hfd/dispatch';
import { escapeHtml } from '@/lib/email-templates';

export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * PayMe Webhook Handler
 *
 * Receives payment status callbacks from PayMe.
 * PayMe sends callbacks as x-www-form-urlencoded POST requests.
 *
 * On successful payment of a book order we also dispatch the shipment
 * to HFD. HFD failures never cause a non-2xx response — PayMe would
 * retry and we'd double-ship.
 */

// POST /api/payme-webhook - Handle PayMe callback
export async function POST(request: NextRequest) {
  try {
    // PayMe sends callbacks as form-urlencoded
    const contentType = request.headers.get('content-type') || '';
    let body: Record<string, unknown>;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      // Try to parse as form data by default
      const text = await request.text();
      const params = new URLSearchParams(text);
      body = Object.fromEntries(params.entries());
    }

    console.log('PayMe webhook received:', JSON.stringify(body, null, 2));

    const payload = parsePaymeWebhook(body);

    if (!payload) {
      console.error('Invalid PayMe webhook payload');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { sale_status, transaction_id, payme_sale_id, sale_price, buyer_name, buyer_email } = payload;

    // Log the payment status
    console.log(`Payment ${transaction_id}: status=${sale_status}, payme_id=${payme_sale_id}`);

    // Handle different payment statuses
    if (sale_status === 'success' || sale_status === 'completed') {
      // Payment successful
      console.log(`Payment successful for order ${transaction_id}`);

      // Look up the persisted order so we can create the HFD shipment.
      let dispatchResult: DispatchResult | null = null;
      if (isOrderStoreConfigured()) {
        try {
          const order = await getOrder(transaction_id);
          if (order) {
            dispatchResult = await dispatchOrderToHfd(order);
            console.log(
              `HFD dispatch for order ${transaction_id}: status=${dispatchResult.status}` +
                (dispatchResult.shipmentNumber ? ` shipment=${dispatchResult.shipmentNumber}` : '') +
                (dispatchResult.errorMessage ? ` error=${dispatchResult.errorMessage}` : ''),
            );
          } else {
            console.warn(`Order ${transaction_id} not found in store — skipping HFD dispatch`);
            dispatchResult = { status: 'skipped', reason: 'order not found in store' };
          }
        } catch (storeError) {
          console.error('Failed to read order from Redis:', storeError);
          dispatchResult = {
            status: 'error',
            errorMessage: storeError instanceof Error ? storeError.message : String(storeError),
          };
        }
      } else {
        console.warn('Order store not configured — skipping HFD dispatch');
      }

      // Send confirmation email to admin
      const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || 'Nissimkrispiltamar@gmail.com';
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Nes HaTamar Website <onboarding@resend.dev>';
      const dispatchFragment = dispatchResult ? renderDispatchEmailFragment(dispatchResult) : '';

      try {
        await resend.emails.send({
          from: fromEmail,
          to: [recipientEmail],
          subject: `תשלום התקבל - הזמנה ${transaction_id}`,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #C9A961;">תשלום התקבל בהצלחה!</h2>
              <p><strong>מספר הזמנה:</strong> ${escapeHtml(transaction_id)}</p>
              <p><strong>מזהה PayMe:</strong> ${escapeHtml(payme_sale_id)}</p>
              <p><strong>סכום:</strong> ₪${(sale_price / 100).toLocaleString()}</p>
              ${buyer_name ? `<p><strong>שם הלקוח:</strong> ${escapeHtml(buyer_name)}</p>` : ''}
              ${buyer_email ? `<p><strong>אימייל:</strong> ${escapeHtml(buyer_email)}</p>` : ''}
              ${dispatchFragment}
              <hr style="border: 1px solid #E5D3A6; margin: 20px 0;" />
              <p style="color: #666; font-size: 12px;">הודעה זו נשלחה אוטומטית מאתר נס התמר</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send payment confirmation email:', emailError);
      }

      return NextResponse.json({ status: 'success', message: 'Payment confirmed' });
    } else if (sale_status === 'failed' || sale_status === 'error') {
      // Payment failed
      console.log(`Payment failed for order ${transaction_id}:`, payload.status_error_details);

      return NextResponse.json({ status: 'failed', message: 'Payment failed noted' });
    } else {
      // Other status (pending, etc.)
      console.log(`Payment status ${sale_status} for order ${transaction_id}`);

      return NextResponse.json({ status: 'noted', message: `Status ${sale_status} recorded` });
    }
  } catch (error) {
    console.error('PayMe webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/payme-webhook - Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'PayMe webhook endpoint' });
}
