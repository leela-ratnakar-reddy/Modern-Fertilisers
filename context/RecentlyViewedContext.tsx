'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { PRODUCTS_DATA } from '@/data/products';

interface RecentlyViewedContextType {
  recentProducts: Product[];
  addRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const saved = getLocalStorage<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
    setProductIds(saved);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    setLocalStorage(STORAGE_KEYS.RECENTLY_VIEWED, productIds);
  }, [productIds, isMounted]);

  const addRecentlyViewed = (id: string) => {
    setProductIds((prev) => {
      const filtered = prev.filter((pId) => pId !== id);
      return [id, ...filtered].slice(0, 6); // Max 6 products
    });
  };

  const clearRecentlyViewed = () => {
    setProductIds([]);
  };

  const recentProducts = productIds
    .map((id) => PRODUCTS_DATA.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentProducts,
        addRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
