'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <RecentlyViewedProvider>
            {children}
            <CartDrawer />
          </RecentlyViewedProvider>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
