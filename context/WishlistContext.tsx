'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { PRODUCTS_DATA } from '@/data/products';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  isMounted: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    const saved = getLocalStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
    setWishlistIds(saved);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    setLocalStorage(STORAGE_KEYS.WISHLIST, wishlistIds);
  }, [wishlistIds, isMounted]);

  const isInWishlist = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const moveToCart = (product: Product) => {
    addItem(product);
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const wishlistProducts = PRODUCTS_DATA.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        isMounted,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
