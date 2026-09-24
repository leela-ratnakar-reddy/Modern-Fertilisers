'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    total,
    discountAmount,
    isCartOpen,
    isMounted,
    updateQuantity,
    removeItem,
    setIsCartOpen,
  } = useCart();

  const router = useRouter();

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isMounted || !isCartOpen) return null;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-heading"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-200"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 id="cart-heading" className="text-base font-bold text-neutral-900">
                Your Shopping Cart
              </h2>
              <span className="text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/80 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-emerald-950 text-emerald-100 border-b border-emerald-900/40 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {amountNeededForFreeDelivery > 0 ? (
                  <span>
                    Add <strong className="text-white font-semibold">{formatPrice(amountNeededForFreeDelivery)}</strong> for FREE Shipping
                  </span>
                ) : (
                  <span className="text-emerald-300 font-semibold">
                    ✓ You have unlocked FREE Regional Delivery!
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-emerald-300 font-semibold">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-emerald-900/70 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-emerald-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base mb-1">Your cart is currently empty</h3>
                <p className="text-neutral-500 text-xs max-w-xs mb-6 leading-relaxed">
                  Discover modern nutrient formulations, water-soluble crystals, and crop-specific feeding schedules.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  Explore Catalog
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-neutral-200/80 hover:border-neutral-300 bg-white transition-all shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-neutral-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] uppercase font-mono font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {item.product.categoryName}
                        </span>
                        <h4 className="font-semibold text-xs text-neutral-900 truncate mt-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          Pack: {item.selectedPack.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-100">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold font-mono text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-bold text-xs text-neutral-900">
                          {formatPrice(item.selectedPack.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-neutral-400">
                            {formatPrice(item.selectedPack.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Panel */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-3">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Estimated Total</span>
                  <span className="text-base text-emerald-950 font-mono">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold text-center transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Assurance note */}
              <p className="flex items-center justify-center gap-1 text-[10px] text-neutral-400 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Demo checkout simulation • No real payment required
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
