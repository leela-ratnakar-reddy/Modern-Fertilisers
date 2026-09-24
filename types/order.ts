import { CartItem } from './cart';

export type PaymentMethod = 'cod' | 'upi' | 'card';

export type OrderStatus = 'Confirmed' | 'Preparing' | 'Dispatched' | 'Delivered';

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderTimelineStep {
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface DemoOrder {
  id: string; // e.g. MF-20260924-4821
  createdAt: string; // ISO string
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: 'standard' | 'express';
  estimatedDeliveryDate: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending Verification' | 'Paid (Demo Verified)' | 'Pay on Delivery';
  orderStatus: OrderStatus;
  timeline: OrderTimelineStep[];
  isDemo: true;
}
