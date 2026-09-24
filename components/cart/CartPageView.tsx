'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  Check,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { DEMO_COUPONS } from '@/data/products';

export function CartPageView() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    appliedCoupon,
    discountAmount,
    total,
    isMounted,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Loading Shopping Cart...</p>
      </div>
    );
  }

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleUsePresetCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponFeedback(res);
  };

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Shopping Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Order Review ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-neutral-400 hover:text-rose-600 transition-colors font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="max-w-lg mx-auto bg-white rounded-3xl border border-neutral-200/90 p-12 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Your cart is currently empty</h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Explore 100% drip-grade soluble fertilizers, chelated trace elements, and living bio-inoculants engineered for high agricultural yields.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
              >
                <span>Explore Formulations Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-900/60 text-xs">
                <div className="flex items-center justify-between mb-1.5 font-medium">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    {amountNeededForFreeDelivery > 0 ? (
                      <span>
                        Add <strong className="text-white font-semibold">{formatPrice(amountNeededForFreeDelivery)}</strong> more for FREE Delivery
                      </span>
                    ) : (
                      <span className="text-emerald-300 font-semibold">
                        ✓ Congratulations! You qualify for Free Regional Delivery!
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-emerald-300 font-semibold">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-emerald-900/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 divide-y divide-neutral-100 overflow-hidden shadow-xs">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <Link href={`/products/${item.product.slug}`} className="shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-200 shrink-0 hover:opacity-90 transition-opacity"
                        />
                      </Link>

                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.product.categoryName}
                        </span>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-bold text-sm text-neutral-900 hover:text-emerald-800 transition-colors mt-1 line-clamp-1">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">
                          Pack Size: {item.selectedPack.size} • {formatPrice(item.selectedPack.price)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono font-bold text-xs text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right min-w-[80px]">
                        <span className="font-black text-sm sm:text-base font-mono text-neutral-900 block">
                          {formatPrice(item.selectedPack.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] text-neutral-400 hover:text-rose-600 transition-colors mt-0.5 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5"
                >
                  <span>← Continue browsing other crop formulations</span>
                </Link>
              </div>
            </div>

            {/* Right: Summary & Promo Code (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Order Summary Box */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-6">
                <h2 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100">
                  Summary & Checkout
                </h2>

                {/* Costs breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-neutral-900 font-mono">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Discount ({appliedCoupon?.code})
                      </span>
                      <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery Fee</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase text-xs">Free</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-neutral-200">
                    <span className="text-base font-bold text-neutral-900">Total Payable</span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-neutral-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block">
                    Have a Demo Promo Code?
                  </span>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div>
                        <p className="font-bold text-emerald-900 font-mono">{appliedCoupon.code}</p>
                        <p className="text-[11px] text-emerald-700 mt-0.5">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-neutral-400 hover:text-rose-600 font-medium ml-2 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="e.g. MODERN10"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-200 bg-neutral-50 uppercase text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p
                      className={`text-xs flex items-center gap-1.5 ${
                        couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {couponFeedback.success ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{couponFeedback.message}</span>
                    </p>
                  )}

                  {/* Preset Quick Coupon Suggestions */}
                  {!appliedCoupon && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        Available Demo Codes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {DEMO_COUPONS.map((cp) => (
                          <button
                            key={cp.code}
                            type="button"
                            onClick={() => handleUsePresetCoupon(cp.code)}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 hover:bg-emerald-100 text-neutral-700 hover:text-emerald-900 border border-neutral-200 transition-colors"
                          >
                            {cp.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Multi-Step Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Safe demo note */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-medium pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Interactive frontend checkout simulation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
