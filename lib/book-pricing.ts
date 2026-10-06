/**
 * Book Quantity Pricing Logic
 *
 * Fixed pricing packages for book purchases.
 */

// Fixed pricing packages (only these quantities are available)
export const BOOK_PACKAGES = [
  { quantity: 1, totalPrice: 770 },
  { quantity: 2, totalPrice: 1300 },
  { quantity: 3, totalPrice: 1800 },
] as const;

// Single book price for reference
export const SINGLE_BOOK_PRICE = 770;

// Maximum allowed quantity (highest package)
export const MAX_BOOK_QUANTITY = 3;

export interface BookPriceResult {
  totalPrice: number;
  unitPrice: number;
  savings: number; // Compared to buying individually
  quantity: number;
}

/**
 * Get price for a specific quantity package.
 * Only valid for quantities: 1, 2, 3
 */
export function calculateBookPrice(quantity: number): BookPriceResult {
  const pkg = BOOK_PACKAGES.find(p => p.quantity === quantity);

  if (!pkg) {
    // Default to single book if invalid quantity
    return {
      totalPrice: SINGLE_BOOK_PRICE,
      unitPrice: SINGLE_BOOK_PRICE,
      savings: 0,
      quantity: 1,
    };
  }

  return {
    totalPrice: pkg.totalPrice,
    unitPrice: Math.round(pkg.totalPrice / pkg.quantity),
    savings: (SINGLE_BOOK_PRICE * pkg.quantity) - pkg.totalPrice,
    quantity: pkg.quantity,
  };
}

/**
 * Check if a quantity is a valid package option
 */
export function isValidBookQuantity(quantity: number): boolean {
  return BOOK_PACKAGES.some(p => p.quantity === quantity);
}
