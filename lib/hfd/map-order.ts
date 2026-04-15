import type { OrderData } from '@/types/order';
import type { HfdConfig } from '@/lib/hfd/config';
import type { HfdCreateShipmentRequest } from '@/lib/hfd/types';

/**
 * Per-book weight estimate (grams). Used as a coarse default when shipping
 * weight is not tracked on the order.
 */
const BOOK_WEIGHT_GRAMS = 500;

/** Field-length caps per the HFD PDF (Hebrew docs). */
const FLOOR_MAX = 2;
const APARTMENT_MAX = 4;
const NAME_MAX = 20;
const CITY_MAX = 30;
const STREET_MAX = 30;
const HOUSE_MAX = 5;
const PHONE_MAX = 20;
const EMAIL_MAX = 100;
const REF1_MAX = 12;
const REF2_MAX = 50;

interface FloorApartment {
  floor?: string;
  apartment?: string;
}

/**
 * Best-effort split of the single free-text "apartmentFloor" field into
 * separate floor + apartment values.
 *
 * Strategy: leading digits → floor (cap 2 chars); remainder → apartment
 * (cap 4 chars). If no digits, treat the entire string as apartment.
 *
 * Examples:
 *   "5"        → { floor: "5" }
 *   "5/12"     → { floor: "5", apartment: "12" }
 *   "3, דירה 7" → { floor: "3", apartment: "ה 7" } (loose, owner can refine)
 *   "דירה 4"   → { apartment: "ירה" }
 *   ""         → {}
 */
export function parseApartmentFloor(raw: string | undefined): FloorApartment {
  if (!raw) return {};

  const trimmed = raw.trim();
  if (!trimmed) return {};

  const leadingDigits = trimmed.match(/^\d+/);
  if (!leadingDigits) {
    return { apartment: trimmed.slice(0, APARTMENT_MAX) };
  }

  const floor = leadingDigits[0].slice(0, FLOOR_MAX);
  const rest = trimmed
    .slice(leadingDigits[0].length)
    .replace(/^[\s,/.\-־]+/, '')
    .trim();

  if (!rest) {
    return { floor };
  }

  return { floor, apartment: rest.slice(0, APARTMENT_MAX) };
}

/**
 * Strip whitespace from a phone number; keep all other characters
 * (HFD accepts up to 20 chars and we don't want to lose "+" or "-").
 */
function stripPhone(phone: string): string {
  return phone.replace(/\s+/g, '').slice(0, PHONE_MAX);
}

function clamp(value: string | undefined, max: number): string {
  return (value || '').slice(0, max);
}

/**
 * Convert a paid book OrderData into the HFD create-shipment payload.
 *
 * Returns null when the order should NOT be sent to HFD:
 *   - non-book product (no shipping)
 *   - missing shippingAddress
 *   - non-IL address (HFD is Israel-only)
 *
 * The caller logs the skip reason (e.g. for the admin email).
 */
export function orderToHfdPayload(
  order: OrderData,
  config: HfdConfig,
): HfdCreateShipmentRequest | null {
  if (order.product !== 'book') return null;
  if (!order.shippingAddress) return null;
  if (order.shippingAddress.country !== 'IL') return null;

  const { customerInfo, shippingAddress } = order;
  const quantity = order.quantity || 1;
  const { floor, apartment } = parseApartmentFloor(shippingAddress.apartmentFloor);

  const payload: HfdCreateShipmentRequest = {
    clientNumber: config.clientNumber,
    mesiraIsuf: 'מסירה',
    shipmentTypeCode: config.shipmentTypeCode,
    ordererName: clamp(config.ordererName, 10),
    cargoTypeHaloch: config.cargoTypeHaloch,
    packsHaloch: String(quantity),

    nameTo: clamp(customerInfo.name, NAME_MAX),
    cityName: clamp(shippingAddress.city, CITY_MAX),
    // Street name field can include the building number per the HFD docs;
    // we still send houseNum separately so HFD has both signals.
    streetName: clamp(shippingAddress.street, STREET_MAX),
    houseNum: clamp(extractHouseNumber(shippingAddress.street), HOUSE_MAX),

    telFirst: stripPhone(customerInfo.phone),
    email: clamp(customerInfo.email, EMAIL_MAX),

    // The full order ID can exceed referenceNum1's 12-char cap, so we put a
    // truncated version there for human-readable display on the label and
    // the full ID in referenceNum2 (50 chars) for round-trip lookup.
    referenceNum1: clamp(order.id, REF1_MAX),
    referenceNum2: clamp(order.id, REF2_MAX),

    productsPrice: order.finalPrice,
    productPriceCurrency: 'ILS',
    shipmentWeight: BOOK_WEIGHT_GRAMS * quantity,
  };

  if (floor) payload.floor = floor;
  if (apartment) payload.apartment = apartment;
  if (shippingAddress.postalCode) {
    payload.addressRemarks = `מיקוד: ${shippingAddress.postalCode}`;
  }

  return payload;
}

/**
 * Extract a building-number-looking token from a street string.
 * If nothing obvious, returns empty string and HFD will rely on streetName.
 */
function extractHouseNumber(street: string): string {
  if (!street) return '';
  // Take the last numeric token (handles "דיזנגוף 114" and "Main St 12B")
  const matches = street.match(/\d+[A-Za-z]?/g);
  if (!matches || matches.length === 0) return '';
  return matches[matches.length - 1];
}
