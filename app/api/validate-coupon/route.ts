import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon, getProductPrice, ProductType } from '@/lib/coupon-validator';

// Rate limiting for coupon validation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 }); // 1 minute
    return { allowed: true };
  }

  if (limit.count >= 20) {
    // 20 requests per minute
    const retryAfter = Math.ceil((limit.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  limit.count += 1;
  return { allowed: true };
}

// POST /api/validate-coupon - Validate a coupon code
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter || 60) } }
      );
    }

    const body = await request.json();
    const { code, product = 'course' } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    // Validate product type
    const validProducts: ProductType[] = ['book', 'course'];
    const productType: ProductType = validProducts.includes(product) ? product : 'course';

    const result = await validateCoupon(code.trim(), productType);

    return NextResponse.json({
      valid: result.valid,
      discount: result.discount,
      error: result.error,
      originalPrice: getProductPrice(productType),
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
