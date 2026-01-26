import { Coupon, CouponValidationResult, CouponCreateInput, CouponUpdateInput, ProductType } from '@/types/coupon';
import * as storage from './coupon-storage';
import { calculateBookPrice, SINGLE_BOOK_PRICE } from './book-pricing';

const COURSE_PRICE = 1600; // Base price in NIS
const BOOK_PRICE = SINGLE_BOOK_PRICE; // Single book price in NIS

// Re-export ProductType for backward compatibility
export type { ProductType };

// Re-export storage functions for admin use
export const readCoupons = storage.getAllCoupons;
export const createCoupon = storage.createCoupon;
export const updateCoupon = storage.updateCoupon;
export const deleteCoupon = storage.deleteCoupon;
export const getCouponById = storage.getCouponById;

// Validate a coupon code
export async function validateCoupon(
  code: string,
  product: ProductType = 'course',
  quantity: number = 1
): Promise<CouponValidationResult> {
  if (!code || typeof code !== 'string') {
    return { valid: false, error: 'Invalid coupon code', errorCode: 'INVALID_CODE' };
  }

  const coupon = await storage.getCouponByCode(code);

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

  // Check product applicability
  if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
    if (!coupon.applicableProducts.includes(product)) {
      return { valid: false, error: 'Coupon is not valid for this product', errorCode: 'PRODUCT_NOT_APPLICABLE' };
    }
  }

  // Calculate discount based on product type and quantity
  const basePrice = getProductPrice(product, quantity);
  const discountAmount = calculateDiscount(basePrice, coupon);
  const finalPrice = basePrice - discountAmount;

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
export async function applyCoupon(
  code: string,
  product: ProductType = 'course',
  quantity: number = 1
): Promise<CouponValidationResult> {
  // Validate first
  const validation = await validateCoupon(code, product, quantity);
  if (!validation.valid) {
    return validation;
  }

  // Get the coupon to increment usage
  const coupon = await storage.getCouponByCode(code);
  if (!coupon) {
    return { valid: false, error: 'Coupon not found', errorCode: 'INVALID_CODE' };
  }

  // Increment usage
  await storage.incrementCouponUsage(coupon.id);

  return validation;
}

// Get course price (for external use)
export function getCoursePrice(): number {
  return COURSE_PRICE;
}

// Get book price (for external use)
export function getBookPrice(): number {
  return BOOK_PRICE;
}

// Get price by product type (with optional quantity for books)
export function getProductPrice(product: ProductType, quantity: number = 1): number {
  if (product === 'book') {
    return calculateBookPrice(quantity).totalPrice;
  }
  return COURSE_PRICE;
}
