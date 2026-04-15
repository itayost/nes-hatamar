import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateCoupon, applyCoupon, getProductPrice, ProductType } from '@/lib/coupon-validator';
import { generateOrderEmailHTML, generateOrderSubject } from '@/lib/email-templates';
import { createPaymePayment } from '@/lib/payme-payment';
import { CreateOrderInput, OrderData } from '@/types/order';
import { isValidBookQuantity } from '@/lib/book-pricing';
import { calculateShipping } from '@/lib/shipping-calculator';
import { isValidPhone } from '@/lib/phone-validation';
import { getCountryByCode } from '@/lib/countries';
import { saveOrder, isOrderStoreConfigured } from '@/lib/orders/store';

export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting for order creation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return { allowed: true };
  }

  if (limit.count >= 10) {
    // 10 orders per hour per IP
    const retryAfter = Math.ceil((limit.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  limit.count += 1;
  return { allowed: true };
}

// Validate email format
function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Generate unique order ID
function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

// POST /api/create-order - Create a new order
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter || 3600) } }
      );
    }

    const body = await request.json();

    // Validate input
    const input: CreateOrderInput = body;

    if (input.product !== 'course' && input.product !== 'book') {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const product = input.product as ProductType;

    // Validate customer info
    if (!input.customerInfo) {
      return NextResponse.json({ error: 'Customer info is required' }, { status: 400 });
    }

    const { name, email, phone } = input.customerInfo;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (minimum 2 characters)' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    }

    // Validate shipping address (books only)
    if (input.product === 'book') {
      if (!input.shippingAddress) {
        return NextResponse.json({ error: 'Shipping address is required for book orders' }, { status: 400 });
      }

      const { street, city, postalCode, country } = input.shippingAddress;

      if (!street || street.trim().length < 2) {
        return NextResponse.json({ error: 'Valid street address is required (minimum 2 characters)' }, { status: 400 });
      }

      if (!city || city.trim().length < 2) {
        return NextResponse.json({ error: 'Valid city is required (minimum 2 characters)' }, { status: 400 });
      }

      if (!postalCode || postalCode.trim().length < 3 || !/^[a-zA-Z0-9\s\-]{3,10}$/.test(postalCode.trim())) {
        return NextResponse.json({ error: 'Valid postal code is required' }, { status: 400 });
      }

      if (country && !getCountryByCode(country)) {
        return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
      }
    }

    // Validate and extract quantity (for books only - fixed packages: 1, 2, 5, 10)
    let quantity = 1;
    if (product === 'book' && input.quantity) {
      quantity = Math.round(input.quantity);
      if (!isValidBookQuantity(quantity)) {
        return NextResponse.json({ error: 'Invalid quantity. Available packages: 1, 2, 5, or 10 books' }, { status: 400 });
      }
    }

    // Calculate price with coupon (quantity is passed to getProductPrice for books)
    let originalPrice = getProductPrice(product, quantity);
    let discountAmount = 0;
    let finalPrice = originalPrice;
    let shippingCost = 0;

    if (input.couponCode) {
      const couponValidation = await validateCoupon(input.couponCode, product, quantity);

      if (!couponValidation.valid) {
        return NextResponse.json({ error: couponValidation.error || 'Invalid coupon' }, { status: 400 });
      }

      if (couponValidation.discount) {
        finalPrice = couponValidation.discount.finalPrice;
        discountAmount = originalPrice - finalPrice;

        // Apply coupon (increment usage)
        await applyCoupon(input.couponCode, product, quantity);
      }
    }

    // Add shipping cost (books only, after discount)
    if (product === 'book') {
      const shipping = calculateShipping(quantity);
      shippingCost = shipping.shippingCost;
      finalPrice += shippingCost;
    }

    // Create order
    const order: OrderData = {
      id: generateOrderId(),
      product: input.product,
      customerInfo: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      },
      shippingAddress: product === 'book' && input.shippingAddress ? {
        street: input.shippingAddress.street.trim(),
        apartmentFloor: input.shippingAddress.apartmentFloor?.trim() || '',
        city: input.shippingAddress.city.trim(),
        postalCode: input.shippingAddress.postalCode.trim(),
        country: input.shippingAddress.country?.trim() || 'IL',
      } : undefined,
      couponCode: input.couponCode?.trim().toUpperCase(),
      quantity: product === 'book' ? quantity : undefined,
      originalPrice,
      discountAmount,
      shippingCost: product === 'book' ? shippingCost : undefined,
      finalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || 'Nissimkrispiltamar@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Nes HaTamar Website <onboarding@resend.dev>';

    const savePromise: Promise<void> = isOrderStoreConfigured()
      ? saveOrder(order).catch((err) => {
          console.error('Failed to persist order to Redis:', err);
        })
      : (console.warn('Order store not configured — HFD dispatch will be skipped'), Promise.resolve());

    void resend.emails
      .send({
        from: fromEmail,
        to: [recipientEmail],
        subject: generateOrderSubject(order),
        html: generateOrderEmailHTML(order),
      })
      .catch((err) => console.error('Failed to send order email:', err));

    const [, paymentResult] = await Promise.all([savePromise, createPaymePayment(order)]);

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error || 'Failed to create payment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentUrl: paymentResult.paymentUrl,
      order: {
        id: order.id,
        finalPrice: order.finalPrice,
        discountAmount: order.discountAmount,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
