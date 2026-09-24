import React from 'react';
import { Metadata } from 'next';
import { CartPageView } from '@/components/cart/CartPageView';

export const metadata: Metadata = {
  title: 'Shopping Cart | Modern Fertilisers',
  description: 'Review your selected crop inputs, adjust quantities, apply demo coupon codes, and proceed to checkout.',
};

export default function CartPage() {
  return <CartPageView />;
}
