/**
 * Node test runner for lib/hfd/map-order.ts.
 *
 * Usage:
 *   node --test --experimental-strip-types scripts/test-map-order.mjs
 *
 * Node >= 22 supports --experimental-strip-types. On Node 24 the flag is
 * still experimental but works out of the box. All @/* imports in
 * map-order.ts are type-only, so stripping them removes the path-alias
 * concern entirely.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

// Dynamic import of the TS file via strip-types — Node handles the rest.
const { orderToHfdPayload, parseApartmentFloor } = await import(
  new URL('../lib/hfd/map-order.ts', import.meta.url).href
);

const config = {
  apiUrl: 'https://api.hfd.co.il/rest/v2',
  token: 'tok',
  clientNumber: 3399,
  shipmentTypeCode: 35,
  cargoTypeHaloch: 10,
  ordererName: 'NesHaTamar',
};

function baseOrder(overrides = {}) {
  return {
    id: 'ORD-ABC-123',
    product: 'book',
    customerInfo: {
      name: 'לקוח בדיקה',
      email: 't@t.il',
      phone: '050 000 0000',
    },
    shippingAddress: {
      street: 'דיזנגוף 114',
      apartmentFloor: '5',
      city: 'תל אביב',
      postalCode: '6433223',
      country: 'IL',
    },
    quantity: 1,
    originalPrice: 59000,
    discountAmount: 0,
    shippingCost: 0,
    finalPrice: 59000,
    status: 'paid',
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

test('IL book order produces a full HFD payload', () => {
  const payload = orderToHfdPayload(baseOrder(), config);

  assert.ok(payload, 'payload should not be null');
  assert.equal(payload.clientNumber, 3399);
  assert.equal(payload.mesiraIsuf, 'מסירה');
  assert.equal(payload.shipmentTypeCode, 35);
  assert.equal(payload.cargoTypeHaloch, 10);
  assert.equal(payload.nameTo, 'לקוח בדיקה');
  assert.equal(payload.cityName, 'תל אביב');
  assert.equal(payload.streetName, 'דיזנגוף 114');
  assert.equal(payload.houseNum, '114');
  assert.equal(payload.telFirst, '0500000000'); // spaces stripped
  assert.equal(payload.email, 't@t.il');
  assert.equal(payload.referenceNum1, 'ORD-ABC-123');
  assert.equal(payload.referenceNum2, 'ORD-ABC-123');
  assert.equal(payload.packsHaloch, '1');
  assert.equal(payload.shipmentWeight, 500);
  assert.equal(payload.productsPrice, 59000);
  assert.equal(payload.productPriceCurrency, 'ILS');
  assert.equal(payload.floor, '5');
});

test('non-IL order returns null (skip HFD)', () => {
  const payload = orderToHfdPayload(
    baseOrder({
      shippingAddress: {
        street: '123 Main St',
        apartmentFloor: '',
        city: 'London',
        postalCode: 'SW1A1AA',
        country: 'GB',
      },
    }),
    config,
  );
  assert.equal(payload, null);
});

test('course order returns null', () => {
  const payload = orderToHfdPayload(
    baseOrder({ product: 'course', shippingAddress: undefined }),
    config,
  );
  assert.equal(payload, null);
});

test('missing shippingAddress returns null', () => {
  const payload = orderToHfdPayload(baseOrder({ shippingAddress: undefined }), config);
  assert.equal(payload, null);
});

test('apartmentFloor "5" → floor only', () => {
  const result = parseApartmentFloor('5');
  assert.deepEqual(result, { floor: '5' });
});

test('apartmentFloor "5/12" → floor + apartment', () => {
  const result = parseApartmentFloor('5/12');
  assert.deepEqual(result, { floor: '5', apartment: '12' });
});

test('apartmentFloor "דירה 4" (no leading digits) → apartment only', () => {
  const result = parseApartmentFloor('דירה 4');
  assert.equal(result.floor, undefined);
  assert.ok(result.apartment && result.apartment.length <= 4);
});

test('apartmentFloor empty string → empty object', () => {
  assert.deepEqual(parseApartmentFloor(''), {});
  assert.deepEqual(parseApartmentFloor(undefined), {});
});

test('multiple books scales weight and packs', () => {
  const payload = orderToHfdPayload(baseOrder({ quantity: 5 }), config);
  assert.ok(payload);
  assert.equal(payload.packsHaloch, '5');
  assert.equal(payload.shipmentWeight, 2500);
});

test('phone with spaces is stripped, other chars preserved', () => {
  const payload = orderToHfdPayload(
    baseOrder({
      customerInfo: { name: 'A', email: 'a@a.il', phone: '+972 50 123 4567' },
    }),
    config,
  );
  assert.ok(payload);
  assert.equal(payload.telFirst, '+972501234567');
});
