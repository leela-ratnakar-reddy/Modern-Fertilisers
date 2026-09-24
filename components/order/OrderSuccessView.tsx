'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '@/context/OrdersContext';
import { formatPrice } from '@/lib/utils';

interface OrderSuccessViewProps {
  orderId: string;
}

export function OrderSuccessView({ orderId }: OrderSuccessViewProps) {
  const { getOrderById, isMounted } = useOrders();

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#84cc16', '#fbbf24'],
      });
    } catch {
      // Graceful fallback if window or canvas isn't available
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Loading Order Confirmation...</p>
      </div>
    );
  }

  const order = getOrderById(orderId);

  return (
    <div className="py-8 sm:py-16 bg-[#fbfbf9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Celebration Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEMO ORDER CONFIRMED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Thank You! Your Demo Order is Placed.
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto">
              We have registered your simulation order in local storage. You can track real-time delivery stage progression on the simulated order details page.
            </p>
          </div>

          {/* Order ID Callout */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-left">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                Reference Order ID
              </span>
              <span className="font-mono font-bold text-sm text-neutral-900">{orderId}</span>
            </div>
            {order && (
              <div className="text-right">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  Est. Delivery Date
                </span>
                <span className="font-semibold text-emerald-800">{order.estimatedDeliveryDate}</span>
              </div>
            )}
          </div>

          {/* Quick Summary of Items if found */}
          {order && (
            <div className="text-left pt-4 border-t border-neutral-100 space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                Purchased Formulations ({order.itemCount} items)
              </h3>
              <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-neutral-200"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900">{item.product.name}</p>
                        <p className="text-[11px] text-neutral-400 font-mono">
                          Pack: {item.selectedPack.size} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-neutral-900">
                      {formatPrice(item.selectedPack.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-neutral-100 flex justify-between items-baseline text-sm">
                <span className="font-bold text-neutral-900">Total Paid (Demo)</span>
                <span className="font-mono font-black text-emerald-950 text-base">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/orders/${orderId}`}
              className="py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Track Simulated Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="py-3.5 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
