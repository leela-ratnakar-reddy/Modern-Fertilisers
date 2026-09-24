'use client';

import React from 'react';
import Link from 'next/link';
import { X, Sprout, ShoppingBag, Heart, Package, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CROPS_DATA } from '@/data/crops';
import { CATEGORIES_DATA } from '@/data/categories';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const { wishlistCount } = useWishlist();
  const { itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <nav aria-label="Mobile Navigation" className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-neutral-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
            <Logo size="sm" showTagline={false} />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/80 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="p-3 bg-emerald-950 text-white grid grid-cols-3 gap-1.5 text-xs">
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cart ({itemCount})</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved ({wishlistCount})</span>
            </Link>
            <Link
              href="/orders"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>Orders</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6">
            {/* Primary links */}
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-sm transition-colors text-left"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-emerald-700">🔍</span>
                  <span>Search Catalog</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500 uppercase">Quick Find</span>
              </button>

              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-100 text-neutral-900 font-semibold text-sm transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>All Products Catalog</span>
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* Crop Solutions */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold mb-2">
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>Shop By Crop</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CROPS_DATA.map((crop) => (
                  <Link
                    key={crop.id}
                    href={`/crops/${crop.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs font-medium text-neutral-800"
                  >
                    <span>{crop.icon}</span>
                    <span className="truncate">{crop.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2">
                <Layers className="w-3.5 h-3.5 text-neutral-400" />
                <span>Product Categories</span>
              </div>
              <div className="space-y-1">
                {CATEGORIES_DATA.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-neutral-100 text-xs text-neutral-700 font-medium transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] font-mono text-neutral-400">({cat.productCount})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial / About */}
            <div className="pt-2 border-t border-neutral-100 space-y-1 text-sm font-medium text-neutral-700">
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-neutral-100"
              >
                <span>About Modern Fertilisers</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 text-[11px] text-neutral-500 space-y-1">
          <p className="font-semibold text-neutral-700">Modern Fertilisers Portfolio Demo</p>
          <p className="text-[10px] leading-relaxed">
            Precision Agricultural Commerce. Concept engineering project for portfolio showcase.
          </p>
        </div>
      </nav>
    </div>
  );
}
