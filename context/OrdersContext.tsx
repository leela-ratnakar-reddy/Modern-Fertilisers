'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DemoOrder, DeliveryAddress, PaymentMethod, OrderStatus, OrderTimelineStep } from '@/types/order';
import { CartItem, Coupon } from '@/types/cart';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { generateOrderId, getEstimatedDeliveryDate } from '@/lib/utils';

interface CreateOrderParams {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  appliedCoupon: Coupon | null;
  total: number;
  address: DeliveryAddress;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: PaymentMethod;
}

interface OrdersContextType {
  orders: DemoOrder[];
  isMounted: boolean;
  getOrderById: (orderId: string) => DemoOrder | undefined;
  createOrder: (params: CreateOrderParams) => DemoOrder;
  advanceOrderStatus: (orderId: string) => DemoOrder | null;
  clearAllOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

function buildInitialTimeline(nowIso: string): OrderTimelineStep[] {
  const now = new Date(nowIso);
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return [
    {
      title: 'Order Placed',
      description: 'Demo purchase initiated and registered in frontend session.',
      timestamp: timeStr,
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Confirmed',
      description: 'Order formulation verified and batch reserved.',
      timestamp: timeStr,
      isCompleted: true,
      isCurrent: true,
    },
    {
      title: 'Preparing & Quality Check',
      description: 'Moisture-sealed packaging and laboratory assay batch labeling.',
      timestamp: 'Pending',
      isCompleted: false,
      isCurrent: false,
    },
    {
      title: 'Dispatched from Hub',
      description: 'Assigned to regional agricultural logistics partner.',
      timestamp: 'Pending',
      isCompleted: false,
      isCurrent: false,
    },
    {
      title: 'Delivered',
      description: 'Safe handover at farm / recipient address.',
      timestamp: 'Pending',
      isCompleted: false,
      isCurrent: false,
    },
  ];
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const saved = getLocalStorage<DemoOrder[]>(STORAGE_KEYS.ORDERS, []);
    setOrders(saved);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    setLocalStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders, isMounted]);

  const getOrderById = (orderId: string): DemoOrder | undefined => {
    return orders.find((o) => o.id === orderId);
  };

  const createOrder = (params: CreateOrderParams): DemoOrder => {
    const nowIso = new Date().toISOString();
    const orderId = generateOrderId();
    const days = params.deliveryMethod === 'express' ? 2 : 4;
    const estimatedDate = getEstimatedDeliveryDate(days);

    const paymentStatus =
      params.paymentMethod === 'cod'
        ? 'Pay on Delivery'
        : params.paymentMethod === 'upi'
        ? 'Paid (Demo Verified)'
        : 'Paid (Demo Verified)';

    const newOrder: DemoOrder = {
      id: orderId,
      createdAt: nowIso,
      items: params.items,
      itemCount: params.items.reduce((acc, curr) => acc + curr.quantity, 0),
      subtotal: params.subtotal,
      deliveryFee: params.deliveryFee,
      discountAmount: params.discountAmount,
      couponCode: params.appliedCoupon ? params.appliedCoupon.code : undefined,
      total: params.total,
      deliveryAddress: params.address,
      deliveryMethod: params.deliveryMethod,
      estimatedDeliveryDate: estimatedDate,
      paymentMethod: params.paymentMethod,
      paymentStatus,
      orderStatus: 'Confirmed',
      timeline: buildInitialTimeline(nowIso),
      isDemo: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Demo tool: advance stage to simulate logistics progress
  const advanceOrderStatus = (orderId: string): DemoOrder | null => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    const stages: OrderStatus[] = ['Confirmed', 'Preparing', 'Dispatched', 'Delivered'];
    const currentIndex = stages.indexOf(order.orderStatus);

    if (currentIndex >= stages.length - 1) {
      return order; // Already delivered
    }

    const nextStatus = stages[currentIndex + 1];
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const updatedTimeline = order.timeline.map((step, idx) => {
      // Step 0 is Order Placed, Step 1 is Confirmed, Step 2 is Preparing, Step 3 is Dispatched, Step 4 is Delivered
      const targetStepIdx = currentIndex + 2;
      if (idx < targetStepIdx) {
        return { ...step, isCompleted: true, isCurrent: false };
      }
      if (idx === targetStepIdx) {
        return { ...step, isCompleted: true, isCurrent: true, timestamp: nowTime };
      }
      return { ...step, isCompleted: false, isCurrent: false };
    });

    const updatedOrder: DemoOrder = {
      ...order,
      orderStatus: nextStatus,
      timeline: updatedTimeline,
    };

    setOrders((prev) => prev.map((o) => (o.id === orderId ? updatedOrder : o)));
    return updatedOrder;
  };

  const clearAllOrders = () => {
    setOrders([]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isMounted,
        getOrderById,
        createOrder,
        advanceOrderStatus,
        clearAllOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
