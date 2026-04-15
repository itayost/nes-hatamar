/**
 * HFD ERP API types.
 *
 * Based on "API documentation for HFD ERP system" (see API/ folder).
 * Swagger: https://api.hfd.co.il/docs
 */

/**
 * Payment-on-delivery (COD) collection block.
 * Only relevant when the courier must collect payment from the consignee.
 */
export interface HfdGovina {
  code: number;
  sum: number;
  date?: string;
  remarks?: string;
}

/**
 * Create-shipment request payload.
 *
 * Mandatory fields (per the HFD PDF):
 *   clientNumber, mesiraIsuf, shipmentTypeCode, ordererName, cargoTypeHaloch,
 *   nameTo, cityName, streetName, houseNum, telFirst, email
 */
export interface HfdCreateShipmentRequest {
  clientNumber: number;
  /** "מסירה" for deliveries, "איסוף" for returns. Use the Hebrew word exactly. */
  mesiraIsuf: 'מסירה' | 'איסוף';
  shipmentTypeCode: number;
  stageCode?: number;
  ordererName: string;
  cargoTypeHaloch: number;
  cargoTypeHazor?: number;
  /** String per the PDF ("Numeric 3"). Mandatory if more than one package. */
  packsHaloch?: string;
  packsHazor?: number;

  nameTo: string;
  cityCode?: string;
  cityName: string;
  streetCode?: string;
  streetName: string;
  houseNum: string;
  entrance?: string;
  floor?: string;
  apartment?: string;

  telFirst: string;
  telSecond?: string;
  addressRemarks?: string;
  shipmentRemarks?: string;

  referenceNum1?: string;
  referenceNum2?: string;

  /** DD/MM/YYYY */
  futureDate?: string;
  /** HH:MM */
  futureTime?: string;
  pudoCodeOrigin?: number;
  pudoCodeDestination?: number;
  /** "Y" or "N" */
  autoBindPudo?: 'Y' | 'N';

  email: string;
  productsPrice?: number;
  productPriceCurrency?: string;
  shipmentWeight?: number;

  govina?: HfdGovina;
}

/**
 * Create-shipment response.
 *
 * errorCode === "0" → success.
 * errorCode "500" / "600" with existingShipmentNumber → duplicate reference
 *   (treat as success — a shipment for this reference already exists).
 */
export interface HfdCreateShipmentResponse {
  shipmentNumber: number;
  randNumber: string;
  referenceNumber1?: string;
  referenceNumber2?: string;
  deliveryLine?: number;
  deliveryArea?: number;
  errorCode: string;
  errorMessage?: string;
  existingShipmentNumber?: number;
  sortingCode?: number;
  pickUpCode?: number;
}

/**
 * Tracking status entry (from GET /shipments/{id}).
 */
export interface HfdStatusEntry {
  status_code: string;
  status_desc?: string;
  status_date?: string;
  status_time?: string;
  status_customer_code?: string;
  status_foreign_code?: string;
  status_dt?: string;
  status_timezone?: string;
  status_location?: string;
  status_country?: string;
  status_province?: string;
  status_city?: string;
  status_post_code?: string;
}

/**
 * GET /shipments/{id} response (partial — we only model fields we consume).
 */
export interface HfdShipmentStatusResponse {
  ship_no?: string;
  master_customer_id?: string;
  customer_id?: string;
  external_customer_no?: string;
  ref2_with_prefix?: string;
  shgiya_yn?: string;
  message?: string;
  shipment_direction?: string;
  ref1?: string;
  ref2?: string;
  random_id?: string;
  ship_delivered_yn?: string;
  ship_canceled_yn?: string;
  consignee_phone?: string;
  shipmnet_type?: string;
  shipment_type_name?: string;
  status?: HfdStatusEntry[];
}

/**
 * DELETE /shipments/{randomId} response.
 */
export interface HfdCancelShipmentResponse {
  status: 'OK' | 'ERROR';
  status_kod?: string;
  status_desc?: string;
  mishloah?: string;
  random?: string;
}
