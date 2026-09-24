'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { useOrders } from '@/context/OrdersContext';
import { formatPrice, formatDate } from '@/lib/utils';
import { OrderStatus } from '@/types/order';

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    Preparing: 'bg-amber-50 text-amber-700 border-amber-200',
    Dispatched: 'bg-purple-50 text-purple-700 border-purple-200',
    Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
        styles[status] || 'bg-neutral-100 text-neutral-700'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{status}</span>
    </span>
  );
}

export function OrdersListView() {
  const { orders, isMounted } = useOrders();

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Loading Order Archive...</p>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <Package className="w-4 h-4" />
              <span>Simulated Orders History</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              My Orders ({orders.length})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>Shop more inputs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">You haven&apos;t placed any demo orders yet.</h2>
            <p className="text-neutral-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Experience the full interactive commerce flow: browse products, add formulations to cart, test coupons, and simulate checkout.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-neutral-900">{order.id}</span>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                {/* Items summary */}
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {order.items.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-xs shrink-0 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span className="font-medium text-neutral-800 line-clamp-1 max-w-[140px]">
                        {item.product.name}
                      </span>
                      <span className="text-neutral-400 font-mono">×{item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <span className="text-xs font-mono text-neutral-400 shrink-0">
                      +{order.items.length - 4} more
                    </span>
                  )}
                </div>

                {/* Footer total and link */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">Total</span>
                    <span className="font-mono font-bold text-sm text-neutral-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs transition-colors"
                  >
                    <span>View Order Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
