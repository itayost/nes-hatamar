import { OrderData } from '@/types/order';

/**
 * PayMe Payment Gateway Integration
 *
 * Uses PayMe's Hosted Payment Page for secure credit card processing.
 * Documentation: API/Hosted Payment Page.json
 */

// Product names for PayMe
const PRODUCT_NAMES: Record<string, string> = {
  course: 'קורס מבוא להומאופטיה - נס התמר',
  book: 'נס התמר - ספר',
};

interface PaymePaymentResult {
  success: boolean;
  paymentUrl?: string;
  paymeSaleId?: string;
  error?: string;
}

interface PaymeGenerateSaleResponse {
  status_code: number;
  sale_url?: string;
  payme_sale_id?: string;
  payme_sale_code?: number;
  price?: number;
  transaction_id?: string;
  currency?: string;
  status_error_details?: string;
  status_error_code?: number;
}

// Check if PayMe credentials are configured
export function isPaymeConfigured(): boolean {
  return Boolean(process.env.PAYME_SELLER_ID);
}

// Get PayMe API URL
function getPaymeApiUrl(): string {
  // Use sandbox if PAYME_USE_SANDBOX is set to 'true'
  if (process.env.PAYME_USE_SANDBOX === 'true') {
    return 'https://sandbox.payme.io/api';
  }
  return 'https://live.payme.io/api';
}

// Create a payment request with PayMe
export async function createPaymePayment(order: OrderData): Promise<PaymePaymentResult> {
  const sellerId = process.env.PAYME_SELLER_ID;

  if (!sellerId) {
    console.log('PayMe not configured - using placeholder mode');

    // Return placeholder for development/testing without credentials
    return {
      success: true,
      paymentUrl: `/he/purchase/pending?orderId=${order.id}`,
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neshatamar.com';

  // PayMe expects price in agorot (cents) - multiply by 100
  const priceInAgorot = Math.round(order.finalPrice * 100);

  const productName = PRODUCT_NAMES[order.product] || PRODUCT_NAMES.book;

  const requestBody = {
    seller_payme_id: sellerId,
    sale_price: priceInAgorot,
    currency: 'ILS',
    product_name: productName,
    transaction_id: order.id,
    sale_return_url: `${siteUrl}/he/purchase/success`,
    sale_callback_url: `${siteUrl}/api/payme-webhook`,
    language: 'he',
    sale_type: 'sale',
    // Include customer info for better tracking
    sale_name: order.customerInfo.name,
    sale_email: order.customerInfo.email,
    sale_mobile: order.customerInfo.phone,
  };

  try {
    const apiUrl = getPaymeApiUrl();

    const response = await fetch(`${apiUrl}/generate-sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data: PaymeGenerateSaleResponse = await response.json();

    if (data.status_code === 0 && data.sale_url) {
      console.log(`PayMe payment created: ${data.payme_sale_id} for order ${order.id}`);

      return {
        success: true,
        paymentUrl: data.sale_url,
        paymeSaleId: data.payme_sale_id,
      };
    } else {
      console.error('PayMe error:', data.status_error_details || 'Unknown error');

      return {
        success: false,
        error: data.status_error_details || 'Failed to create payment',
      };
    }
  } catch (error) {
    console.error('PayMe API error:', error);

    return {
      success: false,
      error: 'Failed to connect to payment service',
    };
  }
}

// Verify PayMe webhook callback
export interface PaymeWebhookPayload {
  sale_status: string;
  payme_sale_id: string;
  transaction_id: string;
  sale_price: number;
  payme_sale_code: number;
  buyer_name?: string;
  buyer_email?: string;
  buyer_phone?: string;
  status_error_code?: number;
  status_error_details?: string;
}

export function parsePaymeWebhook(body: Record<string, unknown>): PaymeWebhookPayload | null {
  try {
    return {
      sale_status: String(body.sale_status || ''),
      payme_sale_id: String(body.payme_sale_id || ''),
      transaction_id: String(body.transaction_id || ''),
      sale_price: Number(body.sale_price || 0),
      payme_sale_code: Number(body.payme_sale_code || 0),
      buyer_name: body.buyer_name ? String(body.buyer_name) : undefined,
      buyer_email: body.buyer_email ? String(body.buyer_email) : undefined,
      buyer_phone: body.buyer_phone ? String(body.buyer_phone) : undefined,
      status_error_code: body.status_error_code ? Number(body.status_error_code) : undefined,
      status_error_details: body.status_error_details ? String(body.status_error_details) : undefined,
    };
  } catch {
    return null;
  }
}
