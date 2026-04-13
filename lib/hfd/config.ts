/**
 * HFD ERP configuration loaded from environment variables.
 *
 * The values come from HFD support (token, clientNumber, shipmentTypeCode,
 * cargoTypeHaloch) and are set in Vercel project env for Production + Preview.
 */

export interface HfdConfig {
  apiUrl: string;
  token: string;
  clientNumber: number;
  shipmentTypeCode: number;
  cargoTypeHaloch: number;
  ordererName: string;
}

const DEFAULT_API_URL = 'https://api.hfd.co.il/rest/v2';

/**
 * Returns the HFD config, throwing if any required variable is missing.
 *
 * Call sites must be inside try/catch so a missing env var cannot break
 * the payment/webhook flow.
 */
export function getHfdConfig(): HfdConfig {
  const apiUrl = process.env.HFD_API_URL || DEFAULT_API_URL;
  const token = process.env.HFD_API_TOKEN;
  const clientNumberRaw = process.env.HFD_CLIENT_NUMBER;
  const shipmentTypeCodeRaw = process.env.HFD_SHIPMENT_TYPE_CODE;
  const cargoTypeHalochRaw = process.env.HFD_CARGO_TYPE_HALOCH;
  const ordererName = process.env.HFD_ORDERER_NAME;

  const missing: string[] = [];
  if (!token) missing.push('HFD_API_TOKEN');
  if (!clientNumberRaw) missing.push('HFD_CLIENT_NUMBER');
  if (!shipmentTypeCodeRaw) missing.push('HFD_SHIPMENT_TYPE_CODE');
  if (!cargoTypeHalochRaw) missing.push('HFD_CARGO_TYPE_HALOCH');
  if (!ordererName) missing.push('HFD_ORDERER_NAME');

  if (missing.length > 0) {
    throw new Error(`HFD config missing required env vars: ${missing.join(', ')}`);
  }

  const clientNumber = Number(clientNumberRaw);
  const shipmentTypeCode = Number(shipmentTypeCodeRaw);
  const cargoTypeHaloch = Number(cargoTypeHalochRaw);

  if (!Number.isFinite(clientNumber) || !Number.isFinite(shipmentTypeCode) || !Number.isFinite(cargoTypeHaloch)) {
    throw new Error('HFD config numeric env vars are not valid numbers');
  }

  return {
    apiUrl,
    token: token as string,
    clientNumber,
    shipmentTypeCode,
    cargoTypeHaloch,
    ordererName: ordererName as string,
  };
}

/**
 * Returns true when all required HFD env vars are present.
 * Used in the webhook to decide whether to skip HFD with a warning
 * instead of throwing.
 */
export function isHfdConfigured(): boolean {
  return Boolean(
    process.env.HFD_API_TOKEN &&
      process.env.HFD_CLIENT_NUMBER &&
      process.env.HFD_SHIPMENT_TYPE_CODE &&
      process.env.HFD_CARGO_TYPE_HALOCH &&
      process.env.HFD_ORDERER_NAME,
  );
}
