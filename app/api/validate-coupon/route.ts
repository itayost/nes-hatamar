import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon, getProductPrice, ProductType } from '@/lib/coupon-validator';
import { isValidBookQuantity } from '@/lib/book-pricing';

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
    const { code, product = 'course', quantity = 1 } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    // Validate product type
    const validProducts: ProductType[] = ['book', 'course'];
    const productType: ProductType = validProducts.includes(product) ? product : 'course';

    // Validate quantity (for books - fixed packages: 1, 2, 5, 10)
    let qty = 1;
    if (productType === 'book' && quantity) {
      qty = Math.round(quantity);
      if (!isValidBookQuantity(qty)) {
        qty = 1; // Default to 1 if invalid
      }
    }

    const result = await validateCoupon(code.trim(), productType, qty);

    return NextResponse.json({
      valid: result.valid,
      discount: result.discount,
      error: result.error,
      originalPrice: getProductPrice(productType, qty),
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
