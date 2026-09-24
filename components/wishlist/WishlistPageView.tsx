'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export function WishlistPageView() {
  const { wishlistProducts, wishlistCount, isMounted, clearWishlist } = useWishlist();

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Loading Wishlist...</p>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1">
              <Heart className="w-4 h-4 fill-emerald-800" />
              <span>Saved Formulations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              My Wishlist ({wishlistCount})
            </h1>
          </div>

          {wishlistCount > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-neutral-400 hover:text-rose-600 transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {wishlistCount === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-neutral-200/90 p-12 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Your saved products will appear here</h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Bookmark crystalline fertilizers, chelated micronutrients, or bio-stimulants while browsing to track them across seasonal stages.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs tracking-wide transition-all shadow-sm"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Grid of saved products */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
