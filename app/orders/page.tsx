import React from 'react';
import { Metadata } from 'next';
import { OrdersListView } from '@/components/order/OrdersListView';

export const metadata: Metadata = {
  title: 'My Orders | Modern Fertilisers',
  description: 'View your locally recorded simulated orders and track simulated delivery status.',
};

export default function OrdersPage() {
  return <OrdersListView />;
}
