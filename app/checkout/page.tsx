import React from 'react';
import { Metadata } from 'next';
import { CheckoutPageView } from '@/components/checkout/CheckoutPageView';

export const metadata: Metadata = {
  title: 'Secure Demo Checkout | Modern Fertilisers',
  description: 'Complete your demo order with multi-step address collection, simulated UPI/Card payment, and instant order generation.',
};

export default function CheckoutPage() {
  return <CheckoutPageView />;
}
