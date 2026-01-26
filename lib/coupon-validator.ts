import { promises as fs } from 'fs';
import path from 'path';
import { Coupon, CouponValidationResult, CouponCreateInput, CouponUpdateInput } from '@/types/coupon';

const COUPONS_FILE = path.join(process.cwd(), 'data', 'coupons.json');
const COURSE_PRICE = 1600; // Base price in NIS

// Simple file-based locking mechanism
let fileLock = false;
const lockTimeout = 5000; // 5 seconds max wait

async function acquireLock(): Promise<boolean> {
  const startTime = Date.now();
  while (fileLock) {
    if (Date.now() - startTime > lockTimeout) {
      return false; // Timeout
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  fileLock = true;
  return true;
}

function releaseLock(): void {
  fileLock = false;
}

// Read coupons from file
export async function readCoupons(): Promise<Coupon[]> {
  try {
    const data = await fs.readFile(COUPONS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.coupons || [];
  } catch (error) {
    console.error('Error reading coupons file:', error);
    return [];
  }
}

// Write coupons to file (atomic)
async function writeCoupons(coupons: Coupon[]): Promise<void> {
  const data = JSON.stringify({ coupons }, null, 2);
  const tempFile = `${COUPONS_FILE}.tmp`;
  await fs.writeFile(tempFile, data, 'utf-8');
  await fs.rename(tempFile, COUPONS_FILE);
}

// Validate a coupon code
export async function validateCoupon(code: string): Promise<CouponValidationResult> {
  if (!code || typeof code !== 'string') {
    return { valid: false, error: 'Invalid coupon code', errorCode: 'INVALID_CODE' };
  }

  const normalizedCode = code.trim().toUpperCase();
  const coupons = await readCoupons();
  const coupon = coupons.find(c => c.code.toUpperCase() === normalizedCode);

  if (!coupon) {
    return { valid: false, error: 'Coupon not found', errorCode: 'INVALID_CODE' };
  }

  if (!coupon.active) {
    return { valid: false, error: 'Coupon is inactive', errorCode: 'INACTIVE' };
  }

  const now = new Date();
  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) {
    return { valid: false, error: 'Coupon has expired', errorCode: 'EXPIRED' };
  }

  if (coupon.maxUses !== -1 && coupon.currentUses >= coupon.maxUses) {
    return { valid: false, error: 'Coupon has reached maximum uses', errorCode: 'MAX_USES_REACHED' };
  }

  // Calculate discount
  const discountAmount = calculateDiscount(COURSE_PRICE, coupon);
  const finalPrice = COURSE_PRICE - discountAmount;

  return {
    valid: true,
    discount: {
      type: coupon.discountType,
      value: coupon.discountValue,
      finalPrice: Math.max(0, finalPrice),
    },
  };
}

// Calculate discount amount
export function calculateDiscount(price: number, coupon: Coupon): number {
  if (coupon.discountType === 'percentage') {
    return Math.round((price * coupon.discountValue) / 100);
  } else {
    return Math.min(coupon.discountValue, price);
  }
}

// Apply coupon (increment usage)
export async function applyCoupon(code: string): Promise<CouponValidationResult> {
  const locked = await acquireLock();
  if (!locked) {
    return { valid: false, error: 'System busy, please try again', errorCode: 'INVALID_CODE' };
  }

  try {
    // Validate first
    const validation = await validateCoupon(code);
    if (!validation.valid) {
      return validation;
    }

    // Increment usage
    const normalizedCode = code.trim().toUpperCase();
    const coupons = await readCoupons();
    const couponIndex = coupons.findIndex(c => c.code.toUpperCase() === normalizedCode);

    if (couponIndex === -1) {
      return { valid: false, error: 'Coupon not found', errorCode: 'INVALID_CODE' };
    }

    coupons[couponIndex].currentUses += 1;
    await writeCoupons(coupons);

    return validation;
  } finally {
    releaseLock();
  }
}

// CRUD operations for admin

export async function createCoupon(input: CouponCreateInput): Promise<Coupon> {
  const locked = await acquireLock();
  if (!locked) {
    throw new Error('System busy, please try again');
  }

  try {
    const coupons = await readCoupons();

    // Check for duplicate code
    const normalizedCode = input.code.trim().toUpperCase();
    if (coupons.some(c => c.code.toUpperCase() === normalizedCode)) {
      throw new Error('Coupon code already exists');
    }

    const newCoupon: Coupon = {
      id: generateId(),
      code: normalizedCode,
      discountType: input.discountType,
      discountValue: input.discountValue,
      expirationDate: input.expirationDate,
      maxUses: input.maxUses,
      currentUses: 0,
      active: true,
      createdAt: new Date().toISOString(),
    };

    coupons.push(newCoupon);
    await writeCoupons(coupons);

    return newCoupon;
  } finally {
    releaseLock();
  }
}

export async function updateCoupon(id: string, input: CouponUpdateInput): Promise<Coupon> {
  const locked = await acquireLock();
  if (!locked) {
    throw new Error('System busy, please try again');
  }

  try {
    const coupons = await readCoupons();
    const couponIndex = coupons.findIndex(c => c.id === id);

    if (couponIndex === -1) {
      throw new Error('Coupon not found');
    }

    // Check for duplicate code if code is being changed
    if (input.code) {
      const normalizedCode = input.code.trim().toUpperCase();
      const duplicate = coupons.find(c => c.code.toUpperCase() === normalizedCode && c.id !== id);
      if (duplicate) {
        throw new Error('Coupon code already exists');
      }
      input.code = normalizedCode;
    }

    const updatedCoupon = { ...coupons[couponIndex], ...input };
    coupons[couponIndex] = updatedCoupon;
    await writeCoupons(coupons);

    return updatedCoupon;
  } finally {
    releaseLock();
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  const locked = await acquireLock();
  if (!locked) {
    throw new Error('System busy, please try again');
  }

  try {
    const coupons = await readCoupons();
    const filteredCoupons = coupons.filter(c => c.id !== id);

    if (filteredCoupons.length === coupons.length) {
      throw new Error('Coupon not found');
    }

    await writeCoupons(filteredCoupons);
  } finally {
    releaseLock();
  }
}

export async function getCouponById(id: string): Promise<Coupon | null> {
  const coupons = await readCoupons();
  return coupons.find(c => c.id === id) || null;
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get course price (for external use)
export function getCoursePrice(): number {
  return COURSE_PRICE;
}
