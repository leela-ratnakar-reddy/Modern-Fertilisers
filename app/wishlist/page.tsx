import React from 'react';
import { Metadata } from 'next';
import { WishlistPageView } from '@/components/wishlist/WishlistPageView';

export const metadata: Metadata = {
  title: 'Wishlist | Modern Fertilisers',
  description: 'View and manage your saved agricultural inputs and crop nutrition formulations.',
};

export default function WishlistPage() {
  return <WishlistPageView />;
}
