'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product, ProductPackOption } from '@/types/product';
import { CartItem, Coupon } from '@/types/cart';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { DEMO_COUPONS } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  total: number;
  isCartOpen: boolean;
  isMounted: boolean;
  addItem: (product: Product, packOption?: ProductPackOption, quantity?: number) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setIsCartOpen: (open: boolean) => void;
}

const FREE_DELIVERY_THRESHOLD = 999;
const FLAT_DELIVERY_FEE = 80;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialize from localStorage on client mount
  useEffect(() => {
    const savedItems = getLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []);
    const savedCoupon = getLocalStorage<Coupon | null>(STORAGE_KEYS.COUPON, null);
    setItems(savedItems);
    setAppliedCoupon(savedCoupon);
    setIsMounted(true);
  }, []);

  // Sync items to localStorage
  useEffect(() => {
    if (!isMounted) return;
    setLocalStorage(STORAGE_KEYS.CART, items);
  }, [items, isMounted]);

  // Sync coupon to localStorage
  useEffect(() => {
    if (!isMounted) return;
    setLocalStorage(STORAGE_KEYS.COUPON, appliedCoupon);
  }, [appliedCoupon, isMounted]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.selectedPack.price * item.quantity, 0);
  }, [items]);

  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : FLAT_DELIVERY_FEE;
  }, [items.length, subtotal]);

  const amountNeededForFreeDelivery = useMemo(() => {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    return FREE_DELIVERY_THRESHOLD - subtotal;
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minSpend) return 0;

    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    return Math.min(appliedCoupon.value, subtotal);
  }, [appliedCoupon, subtotal]);

  const total = useMemo(() => {
    const final = subtotal - discountAmount + deliveryFee;
    return Math.max(0, final);
  }, [subtotal, discountAmount, deliveryFee]);

  const addItem = (product: Product, packOption?: ProductPackOption, quantity: number = 1) => {
    const chosenPack = packOption || product.packSizes[0] || {
      size: product.packSize,
      price: product.price,
      originalPrice: product.originalPrice,
      sku: product.sku,
    };

    const itemId = `${product.id}-${chosenPack.size}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedPack: chosenPack,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    const matched = DEMO_COUPONS.find((c) => c.code === code);

    if (!matched) {
      return { success: false, message: `Coupon code "${code}" is invalid.` };
    }

    if (subtotal < matched.minSpend) {
      return {
        success: false,
        message: `Coupon "${code}" requires a minimum cart value of ₹${matched.minSpend}.`,
      };
    }

    setAppliedCoupon(matched);
    return {
      success: true,
      message: `Coupon "${matched.code}" applied! You saved ${matched.discountType === 'percentage' ? `${matched.value}%` : `₹${matched.value}`}.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        appliedCoupon,
        discountAmount,
        total,
        isCartOpen,
        isMounted,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
