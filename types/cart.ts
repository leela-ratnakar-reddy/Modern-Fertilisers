import { Product, ProductPackOption } from './product';

export interface CartItem {
  id: string; // unique item id: `${productId}-${packSize}`
  product: Product;
  selectedPack: ProductPackOption;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 for 10%) or fixed amount (e.g. 150)
  minSpend: number;
  description: string;
}
