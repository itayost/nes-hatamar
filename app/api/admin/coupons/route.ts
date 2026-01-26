import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session-auth';
import {
  readCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '@/lib/coupon-validator';
import { CouponCreateInput, CouponUpdateInput } from '@/types/coupon';

// Check authentication middleware
async function requireAuth(): Promise<NextResponse | null> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

// Validate coupon input
function validateCouponInput(input: CouponCreateInput): string | null {
  if (!input.code || input.code.trim().length < 3 || input.code.trim().length > 20) {
    return 'Code must be 3-20 characters';
  }
  if (!/^[A-Za-z0-9]+$/.test(input.code.trim())) {
    return 'Code must contain only letters and numbers';
  }
  if (!['percentage', 'fixed'].includes(input.discountType)) {
    return 'Invalid discount type';
  }
  if (typeof input.discountValue !== 'number' || input.discountValue <= 0) {
    return 'Discount value must be a positive number';
  }
  if (input.discountType === 'percentage' && input.discountValue > 100) {
    return 'Percentage discount cannot exceed 100%';
  }
  if (!input.expirationDate || isNaN(Date.parse(input.expirationDate))) {
    return 'Invalid expiration date';
  }
  if (typeof input.maxUses !== 'number' || (input.maxUses !== -1 && input.maxUses < 1)) {
    return 'Max uses must be -1 (unlimited) or a positive number';
  }
  return null;
}

// GET /api/admin/coupons - List all coupons
export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const coupons = await readCoupons();
    return NextResponse.json({ coupons });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

// POST /api/admin/coupons - Create new coupon
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const input: CouponCreateInput = {
      code: body.code,
      discountType: body.discountType,
      discountValue: Number(body.discountValue),
      expirationDate: body.expirationDate,
      maxUses: Number(body.maxUses),
    };

    const validationError = validateCouponInput(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const coupon = await createCoupon(input);
    return NextResponse.json({ coupon }, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    const message = error instanceof Error ? error.message : 'Failed to create coupon';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/admin/coupons - Update coupon
export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 });
    }

    const input: CouponUpdateInput = {};

    if (updateData.code !== undefined) input.code = updateData.code;
    if (updateData.discountType !== undefined) input.discountType = updateData.discountType;
    if (updateData.discountValue !== undefined) input.discountValue = Number(updateData.discountValue);
    if (updateData.expirationDate !== undefined) input.expirationDate = updateData.expirationDate;
    if (updateData.maxUses !== undefined) input.maxUses = Number(updateData.maxUses);
    if (updateData.active !== undefined) input.active = Boolean(updateData.active);

    // Validate if full input is provided
    if (input.code && input.discountType && input.discountValue && input.expirationDate && input.maxUses) {
      const validationError = validateCouponInput(input as CouponCreateInput);
      if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
      }
    }

    const coupon = await updateCoupon(id, input);
    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error updating coupon:', error);
    const message = error instanceof Error ? error.message : 'Failed to update coupon';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/admin/coupons - Delete coupon
export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Coupon ID is required' }, { status: 400 });
    }

    await deleteCoupon(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete coupon';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
