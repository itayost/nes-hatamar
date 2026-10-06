/**
 * Node test runner for lib/book-pricing.ts.
 *
 * Usage:
 *   node --test --experimental-strip-types scripts/test-book-pricing.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';

const {
  BOOK_PACKAGES,
  SINGLE_BOOK_PRICE,
  MAX_BOOK_QUANTITY,
  calculateBookPrice,
  isValidBookQuantity,
} = await import(new URL('../lib/book-pricing.ts', import.meta.url).href);

test('offers exactly the 1, 2 and 3 book packages', () => {
  assert.deepEqual(BOOK_PACKAGES.map((p) => p.quantity), [1, 2, 3]);
  assert.equal(MAX_BOOK_QUANTITY, 3);
});

test('single book costs 770', () => {
  assert.equal(SINGLE_BOOK_PRICE, 770);
  assert.deepEqual(calculateBookPrice(1), {
    totalPrice: 770,
    unitPrice: 770,
    savings: 0,
    quantity: 1,
  });
});

test('two books cost 1300 and save 240 against single price', () => {
  assert.deepEqual(calculateBookPrice(2), {
    totalPrice: 1300,
    unitPrice: 650,
    savings: 240,
    quantity: 2,
  });
});

test('three books cost 1800 and save 510 against single price', () => {
  assert.deepEqual(calculateBookPrice(3), {
    totalPrice: 1800,
    unitPrice: 600,
    savings: 510,
    quantity: 3,
  });
});

test('5 books is no longer a valid package', () => {
  assert.equal(isValidBookQuantity(5), false);
  assert.equal(isValidBookQuantity(3), true);
});

test('invalid quantity falls back to a single book', () => {
  assert.equal(calculateBookPrice(5).totalPrice, 770);
  assert.equal(calculateBookPrice(5).quantity, 1);
});
