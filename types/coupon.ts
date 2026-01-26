export type ProductType = 'book' | 'course';

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expirationDate: string; // ISO 8601 date string
  maxUses: number; // -1 for unlimited
  currentUses: number;
  active: boolean;
  createdAt: string; // ISO 8601 timestamp
  applicableProducts?: ProductType[]; // Empty/undefined = all products
}

export interface CouponValidationResult {
  valid: boolean;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    finalPrice: number;
  };
  error?: string;
  errorCode?: 'INVALID_CODE' | 'EXPIRED' | 'MAX_USES_REACHED' | 'INACTIVE' | 'PRODUCT_NOT_APPLICABLE';
}

export interface CouponCreateInput {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expirationDate: string;
  maxUses: number;
  applicableProducts?: ProductType[];
}

export interface CouponUpdateInput extends Partial<CouponCreateInput> {
  active?: boolean;
}
