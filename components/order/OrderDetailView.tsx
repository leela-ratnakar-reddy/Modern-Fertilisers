'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  ChevronRight,
  Play,
  RotateCw,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useOrders } from '@/context/OrdersContext';
import { formatPrice, formatDate } from '@/lib/utils';

interface OrderDetailViewProps {
  orderId: string;
}

export function OrderDetailView({ orderId }: OrderDetailViewProps) {
  const { getOrderById, advanceOrderStatus, isMounted } = useOrders();
  const [isAdvancing, setIsAdvancing] = useState(false);

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Retrieving Order Details...</p>
      </div>
    );
  }

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="py-20 max-w-md mx-auto text-center px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Order Not Found</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          The simulated order reference &ldquo;{orderId}&rdquo; was not found in your browser&apos;s local storage.
        </p>
        <div className="pt-2">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold text-xs tracking-wide"
          >
            <span>Back to All Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleSimulateNextStage = () => {
    setIsAdvancing(true);
    setTimeout(() => {
      advanceOrderStatus(orderId);
      setIsAdvancing(false);
    }, 300);
  };

  const isDelivered = order.orderStatus === 'Delivered';

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/orders" className="hover:text-emerald-800 transition-colors">
            My Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-semibold">{order.id}</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <span className="text-emerald-800 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                Simulated Order
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500">{formatDate(order.createdAt)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
              {order.id}
            </h1>
          </div>

          {/* Interactive Simulation Controls for Recruiters & Reviewers */}
          <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 text-right space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
              Portfolio Test Tool
            </span>
            <button
              onClick={handleSimulateNextStage}
              disabled={isDelivered || isAdvancing}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isDelivered
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
              }`}
            >
              {isAdvancing ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>{isDelivered ? 'All Stages Complete' : 'Advance Logistics Stage'}</span>
            </button>
          </div>
        </div>

        {/* Simulated Explanation Callout */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Simulated Fulfillment Lifecycle:</strong> This order tracking interface mimics an enterprise regional agricultural ERP pipeline. You can click &quot;Advance Logistics Stage&quot; to test the real-time progression from <em>Confirmed</em> to <em>Preparing</em>, <em>Dispatched</em>, and <em>Delivered</em>.
          </p>
        </div>

        {/* Visual Animated Order Timeline */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              Order Progress Timeline
            </h2>
            <span className="font-mono text-xs font-semibold text-emerald-800">
              Current Status: {order.orderStatus}
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
            {order.timeline.map((step, idx) => {
              return (
                <div key={idx} className="relative group">
                  {/* Status Indicator Icon */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white transition-all ${
                      step.isCompleted
                        ? 'bg-emerald-600 ring-4 ring-emerald-100'
                        : step.isCurrent
                        ? 'bg-amber-500 ring-4 ring-amber-100 animate-pulse'
                        : 'bg-neutral-300 ring-4 ring-neutral-100'
                    }`}
                  >
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="space-y-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          step.isCompleted || step.isCurrent
                            ? 'text-neutral-900'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products List & Shipping Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Products List (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-100">
              Formulation Items ({order.itemCount})
            </h3>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
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

            {/* Price calculations */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount ({order.couponCode})</span>
                  <span className="font-mono font-bold">-{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Fee</span>
                <span className="font-mono">
                  {order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200 font-bold text-sm text-neutral-900">
                <span>Total Amount</span>
                <span className="text-base font-black font-mono text-neutral-900">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment details (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            {/* Delivery address */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5 pb-2 border-b border-neutral-100">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                Delivery Address
              </h3>
              <div className="text-xs space-y-1 text-neutral-600">
                <p className="font-bold text-neutral-900 text-sm">{order.deliveryAddress.fullName}</p>
                <p>{order.deliveryAddress.addressLine1}</p>
                {order.deliveryAddress.addressLine2 && <p>{order.deliveryAddress.addressLine2}</p>}
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} -{' '}
                  <span className="font-mono font-semibold">{order.deliveryAddress.pincode}</span>
                </p>
                <p className="pt-1 font-mono text-[11px] text-neutral-500">
                  Phone: +91 {order.deliveryAddress.phone}
                </p>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5 pb-2 border-b border-neutral-100">
                <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                Payment Method
              </h3>
              <div className="text-xs space-y-1 text-neutral-600">
                <p className="font-bold text-neutral-900 uppercase">
                  {order.paymentMethod === 'upi'
                    ? 'Demo UPI Transfer'
                    : order.paymentMethod === 'card'
                    ? 'Demo Card'
                    : 'Cash on Delivery'}
                </p>
                <p className="text-emerald-700 font-medium">{order.paymentStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
