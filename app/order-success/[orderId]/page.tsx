import React from 'react';
import { Metadata } from 'next';
import { OrderSuccessView } from '@/components/order/OrderSuccessView';

interface OrderSuccessPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Order Confirmed | Modern Fertilisers',
  description: 'Your simulated order has been registered in the portfolio demo platform.',
};

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderId } = await params;
  return <OrderSuccessView orderId={orderId} />;
}
