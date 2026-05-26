/**
 * Shipping Cost Calculator
 * Calculates shipping costs for book orders based on quantity and destination.
 */

export const SHIPPING_COST = 40; // NIS — Israel
export const INTERNATIONAL_SHIPPING_COST = 250; // NIS — outside Israel, flat
export const FREE_SHIPPING_THRESHOLD = 5; // books — Israel only
const ISRAEL_CODE = 'IL';

export interface ShippingResult {
  shippingCost: number;
  isFreeShipping: boolean;
  threshold: number;
  isInternational: boolean;
}

/**
 * Calculate shipping cost based on book quantity and destination country.
 * - Israel: ₪40, free for 5+ books.
 * - International (any other country): ₪250 flat, no free threshold.
 * countryCode defaults to Israel for backwards compatibility.
 */
export function calculateShipping(
  quantity: number,
  countryCode: string = ISRAEL_CODE,
): ShippingResult {
  const isInternational = countryCode !== ISRAEL_CODE;

  if (isInternational) {
    return {
      shippingCost: INTERNATIONAL_SHIPPING_COST,
      isFreeShipping: false,
      threshold: FREE_SHIPPING_THRESHOLD,
      isInternational: true,
    };
  }

  const isFreeShipping = quantity >= FREE_SHIPPING_THRESHOLD;

  return {
    shippingCost: isFreeShipping ? 0 : SHIPPING_COST,
    isFreeShipping,
    threshold: FREE_SHIPPING_THRESHOLD,
    isInternational: false,
  };
}

/**
 * Check if a product requires shipping.
 * Only physical products (books) require shipping.
 */
export function requiresShipping(product: 'course' | 'book'): boolean {
  return product === 'book';
}
