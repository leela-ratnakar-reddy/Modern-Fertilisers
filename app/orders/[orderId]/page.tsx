import React from 'react';
import { Metadata } from 'next';
import { OrderDetailView } from '@/components/order/OrderDetailView';

interface OrderDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Order Status & Progress Timeline | Modern Fertilisers',
  description: 'Track the simulated status and timeline of your agricultural input order.',
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  return <OrderDetailView orderId={orderId} />;
}
