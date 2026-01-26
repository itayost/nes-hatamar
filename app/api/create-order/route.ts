import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateCoupon, applyCoupon, getProductPrice, ProductType } from '@/lib/coupon-validator';
import { generateOrderEmailHTML, generateOrderSubject } from '@/lib/email-templates';
import { createPaymePayment } from '@/lib/payme-payment';
import { CreateOrderInput, OrderData } from '@/types/order';

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

// Validate Israeli phone number
function isValidIsraeliPhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^05[0-9](\d{7}|\d{3}-\d{4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
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

    if (!phone || !isValidIsraeliPhone(phone)) {
      return NextResponse.json({ error: 'Valid Israeli phone number is required' }, { status: 400 });
    }

    // Calculate price with coupon
    let originalPrice = getProductPrice(product);
    let discountAmount = 0;
    let finalPrice = originalPrice;

    if (input.couponCode) {
      const couponValidation = await validateCoupon(input.couponCode, product);

      if (!couponValidation.valid) {
        return NextResponse.json({ error: couponValidation.error || 'Invalid coupon' }, { status: 400 });
      }

      if (couponValidation.discount) {
        finalPrice = couponValidation.discount.finalPrice;
        discountAmount = originalPrice - finalPrice;

        // Apply coupon (increment usage)
        await applyCoupon(input.couponCode, product);
      }
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
      couponCode: input.couponCode?.trim().toUpperCase(),
      originalPrice,
      discountAmount,
      finalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Send order notification email
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || 'Nissimkrispiltamar@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Nes HaTamar Website <onboarding@resend.dev>';

    try {
      await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        subject: generateOrderSubject(order),
        html: generateOrderEmailHTML(order),
      });
    } catch (emailError) {
      console.error('Failed to send order email:', emailError);
      // Continue with order creation even if email fails
    }

    // Create PayMe payment
    const paymentResult = await createPaymePayment(order);

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
