/**
 * Validate an international phone number.
 * Accepts: optional + prefix, 7-15 digits, spaces/dashes/dots/parentheses allowed.
 * Examples: "+972-50-123-4567", "050-1234567", "+1 212 555 1234", "+39 06 1234 5678"
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip spaces, dashes, dots, and parentheses
  const stripped = phone.replace(/[\s\-.\(\)]/g, '');
  // Must be optional + followed by 7-15 digits
  return /^\+?\d{7,15}$/.test(stripped);
}
