/**
 * Book Quantity Pricing Logic
 *
 * Fixed pricing packages for book purchases.
 */

// Fixed pricing packages (only these quantities are available)
export const BOOK_PACKAGES = [
  { quantity: 1, totalPrice: 550 },
  { quantity: 2, totalPrice: 990 },
  { quantity: 5, totalPrice: 2250 },
  { quantity: 10, totalPrice: 3600 },
] as const;

// Single book price for reference
export const SINGLE_BOOK_PRICE = 550;

// List price (price charged in physical stores). Display-only reference for
// the "in stores vs online" channel comparison. Never used in charge logic.
export const BOOK_LIST_PRICE = 770;

// Maximum allowed quantity (highest package)
export const MAX_BOOK_QUANTITY = 10;

export interface BookPriceResult {
  totalPrice: number;
  unitPrice: number;
  savings: number; // Compared to buying individually
  quantity: number;
  listPrice: number; // BOOK_LIST_PRICE * quantity (display-only)
}

/**
 * Get price for a specific quantity package.
 * Only valid for quantities: 1, 2, 5, 10
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
      listPrice: BOOK_LIST_PRICE,
    };
  }

  return {
    totalPrice: pkg.totalPrice,
    unitPrice: Math.round(pkg.totalPrice / pkg.quantity),
    savings: (SINGLE_BOOK_PRICE * pkg.quantity) - pkg.totalPrice,
    quantity: pkg.quantity,
    listPrice: BOOK_LIST_PRICE * pkg.quantity,
  };
}

/**
 * Check if a quantity is a valid package option
 */
export function isValidBookQuantity(quantity: number): boolean {
  return BOOK_PACKAGES.some(p => p.quantity === quantity);
}
