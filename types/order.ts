export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface OrderData {
  id: string;
  product: 'course' | 'book';
  customerInfo: CustomerInfo;
  couponCode?: string;
  quantity?: number; // For book orders (default: 1)
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  createdAt: string;
  paidAt?: string;
}

export interface CreateOrderInput {
  product: 'course' | 'book';
  customerInfo: CustomerInfo;
  couponCode?: string;
  quantity?: number; // For book orders (default: 1)
}

export interface CreateOrderResult {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  error?: string;
}
