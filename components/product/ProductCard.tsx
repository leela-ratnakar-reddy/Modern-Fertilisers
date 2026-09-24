'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, Star, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [btnState, setBtnState] = useState<'idle' | 'adding' | 'added'>('idle');

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (btnState !== 'idle') return;

    setBtnState('adding');
    addItem(product);

    setTimeout(() => {
      setBtnState('added');
      setTimeout(() => {
        setBtnState('idle');
      }, 1400);
    }, 350);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-neutral-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div>
        {/* Top Media Container */}
        <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-2.5 left-2.5 bg-neutral-900/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              {product.discount}% OFF
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-emerald-900 border border-neutral-200/80 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
            {product.categoryName}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer shadow-xs ${
              inWishlist
                ? 'bg-rose-50 text-rose-600 scale-110'
                : 'bg-white/90 backdrop-blur-xs text-neutral-500 hover:text-rose-600 hover:bg-white'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${inWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5">
          {/* Rating & Pack */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
            <div className="flex items-center gap-1 text-amber-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-semibold text-neutral-800">{product.rating}</span>
              <span className="text-[11px] text-neutral-400">({product.reviewCount})</span>
            </div>
            <span className="font-mono text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
              {product.packSize}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-emerald-800 transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-neutral-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Tagline / Crop suitability */}
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Crop Compatibility Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.suitableCrops.slice(0, 3).map((crop) => (
              <span
                key={crop}
                className="text-[10px] text-neutral-600 bg-neutral-50 border border-neutral-200/70 px-1.5 py-0.5 rounded font-medium"
              >
                {crop}
              </span>
            ))}
            {product.suitableCrops.length > 3 && (
              <span className="text-[10px] text-neutral-400 bg-neutral-50 px-1 py-0.5 rounded font-mono">
                +{product.suitableCrops.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add To Cart Button */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base sm:text-lg font-black font-mono text-neutral-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through font-mono">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Quick Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={btnState === 'adding'}
            className={`col-span-4 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 ${
              btnState === 'added'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-emerald-950 text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {btnState === 'idle' && (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
            {btnState === 'adding' && (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            )}
            {btnState === 'added' && (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added ✓</span>
              </>
            )}
          </button>

          {/* Quick detail arrow button */}
          <Link
            href={`/products/${product.slug}`}
            className="col-span-1 flex items-center justify-center py-2.5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-100 text-neutral-700 transition-colors"
            aria-label={`View details of ${product.name}`}
            title="View Specifications"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
