/**
 * Shipping Cost Calculator
 * Calculates shipping costs for book orders based on quantity.
 */

export const SHIPPING_COST = 40; // NIS
export const FREE_SHIPPING_THRESHOLD = 5; // books

export interface ShippingResult {
  shippingCost: number;
  isFreeShipping: boolean;
  threshold: number;
}

/**
 * Calculate shipping cost based on book quantity.
 * Free shipping for 5+ books.
 */
export function calculateShipping(quantity: number): ShippingResult {
  const isFreeShipping = quantity >= FREE_SHIPPING_THRESHOLD;

  return {
    shippingCost: isFreeShipping ? 0 : SHIPPING_COST,
    isFreeShipping,
    threshold: FREE_SHIPPING_THRESHOLD,
  };
}

/**
 * Check if a product requires shipping.
 * Only physical products (books) require shipping.
 */
export function requiresShipping(product: 'course' | 'book'): boolean {
  return product === 'book';
}
