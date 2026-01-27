export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  street: string;
  apartmentFloor: string;
  city: string;
  postalCode: string;
}

export interface OrderData {
  id: string;
  product: 'course' | 'book';
  customerInfo: CustomerInfo;
  shippingAddress?: ShippingAddress; // For book orders only
  couponCode?: string;
  quantity?: number; // For book orders (default: 1)
  originalPrice: number;
  discountAmount: number;
  shippingCost?: number; // For book orders only
  finalPrice: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  createdAt: string;
  paidAt?: string;
}

export interface CreateOrderInput {
  product: 'course' | 'book';
  customerInfo: CustomerInfo;
  shippingAddress?: ShippingAddress; // For book orders only
  couponCode?: string;
  quantity?: number; // For book orders (default: 1)
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  error?: string;
}
