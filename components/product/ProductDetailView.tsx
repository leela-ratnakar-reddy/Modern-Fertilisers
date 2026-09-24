'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
  Clock,
} from 'lucide-react';
import { Product, ProductPackOption } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentProducts, addRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // State
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedPack, setSelectedPack] = useState<ProductPackOption>(
    product.packSizes[0] || {
      size: product.packSize,
      price: product.price,
      originalPrice: product.originalPrice,
      sku: product.sku,
    }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'composition' | 'crops' | 'application' | 'science'>('overview');
  const [btnState, setBtnState] = useState<'idle' | 'adding' | 'added'>('idle');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Track recently viewed
  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  const inWishlist = isInWishlist(product.id);

  // Add to cart action
  const handleAddToCart = () => {
    if (btnState !== 'idle') return;
    setBtnState('adding');
    addItem(product, selectedPack, quantity);

    setTimeout(() => {
      setBtnState('added');
      setTimeout(() => {
        setBtnState('idle');
      }, 1500);
    }, 300);
  };

  // Buy Now action
  const handleBuyNow = () => {
    addItem(product, selectedPack, quantity);
    router.push('/checkout');
  };

  // Cross-sell products: same category or sharing suitable crops
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.suitableCrops.some((c) => product.suitableCrops.includes(c)))
  ).slice(0, 4);

  return (
    <div className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href="/shop" className="hover:text-emerald-800 transition-colors">
            Shop Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-emerald-800 transition-colors capitalize"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-sm group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Lightbox trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-md text-neutral-700 hover:text-emerald-800 hover:bg-white shadow-xs transition-colors"
                aria-label="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Stock status indicator pill */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-800/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Lab Stock Verified</span>
                </span>
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {product.gallery.map((imgUrl, idx) => {
                  const isActive = selectedImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                          : 'border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Lab & Transport Quality assurance tags */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-neutral-600 font-mono">
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Zero Filler Clays / 100% Active</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Moisture-Barricade Sealed Bag</span>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase & Attributes Panel (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-emerald-800 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                  {product.categoryName}
                </span>
                <span className="text-neutral-400">SKU: {selectedPack.sku}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-neutral-500 text-sm mt-1.5 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-200/80 text-xs">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="font-bold text-neutral-900 text-sm">{product.rating}</span>
                </div>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-500 font-medium">
                  {product.reviewCount} Regional Field Trials
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-emerald-700 font-semibold font-mono">
                  {product.brand}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 flex items-baseline justify-between shadow-xs">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black font-mono text-neutral-900">
                    {formatPrice(selectedPack.price)}
                  </span>
                  {selectedPack.originalPrice > selectedPack.price && (
                    <span className="text-sm font-mono text-neutral-400 line-through">
                      {formatPrice(selectedPack.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Inclusive of all statutory taxes • Free shipping on orders &gt; ₹999
                </p>
              </div>

              {product.discount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                  SAVE {product.discount}%
                </span>
              )}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold font-mono uppercase tracking-wider text-neutral-900">
                  Select Pack Size
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  Chosen: {selectedPack.size}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {product.packSizes.map((pack) => {
                  const isSelected = selectedPack.size === pack.size;
                  return (
                    <button
                      key={pack.size}
                      onClick={() => setSelectedPack(pack)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800'
                      }`}
                    >
                      <p className="text-xs font-mono font-semibold">{pack.size}</p>
                      <p className="text-xs font-mono font-bold mt-1 text-neutral-900">
                        {formatPrice(pack.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity adjust */}
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden p-1 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors font-bold text-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors font-bold text-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={btnState === 'adding'}
                  className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95 ${
                    btnState === 'added'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-emerald-950 text-white'
                  }`}
                >
                  {btnState === 'idle' && (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart ({formatPrice(selectedPack.price * quantity)})</span>
                    </>
                  )}
                  {btnState === 'adding' && (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Adding to Cart...</span>
                    </>
                  )}
                  {btnState === 'added' && (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Cart ✓</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    inWishlist
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-600 hover:text-rose-600'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`}
                  />
                </button>
              </div>

              {/* Buy Now instant CTA */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Buy Now (Instant Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Suitable crops quick pills */}
            <div className="pt-2 border-t border-neutral-200/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Engineered for Crops:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.suitableCrops.map((crop) => (
                  <Link
                    key={crop}
                    href={`/crops/${crop.toLowerCase()}`}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-emerald-100 text-neutral-700 hover:text-emerald-900 transition-colors"
                  >
                    <span>{crop}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Agronomic Details */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs mb-16">
          {/* Tab Navigation Headers */}
          <div className="flex border-b border-neutral-200 overflow-x-auto scrollbar-none bg-neutral-50/70">
            {[
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'composition', label: 'Chemical Breakdown' },
              { id: 'crops', label: 'Crop Phenology' },
              { id: 'application', label: 'Dosage & Tank Mix' },
              { id: 'science', label: 'Biochemical Rationale' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-6 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-emerald-700 text-emerald-950 bg-white'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-10">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
                  {product.longDescription}
                </p>

                <div className="pt-2">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                    Key Performance Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'composition' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1">
                    Certified Technical Composition
                  </h4>
                  <p className="text-xs text-neutral-500 font-mono">
                    {product.composition}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border border-neutral-200 rounded-xl overflow-hidden">
                    <thead className="bg-neutral-100 text-neutral-700 font-mono uppercase text-[11px]">
                      <tr>
                        <th className="p-3">Nutrient / Molecule</th>
                        <th className="p-3">Analysis (%)</th>
                        <th className="p-3">Agronomic Role in Plant Cell</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {product.nutrients.map((n, i) => (
                        <tr key={i} className="hover:bg-neutral-50/50">
                          <td className="p-3 font-semibold text-neutral-900">{n.label}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">{n.percentage}</td>
                          <td className="p-3 text-neutral-600">{n.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'crops' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1">
                    Target Crop Phenology Stages
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Formulated to target the critical metabolic shifts during these specific growth periods:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.cropStages.map((stage, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1"
                    >
                      <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">
                        Optimal Window {i + 1}
                      </span>
                      <p className="font-bold text-sm text-neutral-900">{stage}</p>
                      <p className="text-xs text-neutral-500">
                        Ensures immediate supply to newly emerged sink organs and meristematic zones.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Method
                  </span>
                  <p className="font-bold text-sm text-emerald-900">{product.application.method}</p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Dosage / Acre
                  </span>
                  <p className="font-bold text-sm text-neutral-900">{product.application.dosage}</p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Water Volume
                  </span>
                  <p className="font-bold text-sm text-neutral-900">{product.application.waterVolume}</p>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Spray Timing
                  </span>
                  <p className="font-bold text-sm text-neutral-900">{product.application.timing}</p>
                </div>
              </div>
            )}

            {activeTab === 'science' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Biochemical Mechanism of Action</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                  {product.scientificRationale}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-100/60 border border-neutral-200 text-xs text-neutral-500 font-mono">
                  Laboratory Test Standard: ISO/IEC 17025 compliant analytical protocol verification.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cross-Sell: Related Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                SYNERGISTIC AGRONOMY
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Pairs well with this formulation
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Explore catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>

        {/* Recently Viewed Products */}
        {recentProducts.length > 1 && (
          <div className="pt-8 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" />
                <h4 className="text-base font-bold text-neutral-900">Recently Viewed</h4>
              </div>
              <button
                onClick={clearRecentlyViewed}
                className="text-xs text-neutral-400 hover:text-neutral-700 font-medium"
              >
                Clear history
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group block p-3 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-400 transition-all shadow-xs"
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full aspect-square object-cover rounded-xl mb-2"
                  />
                  <p className="font-semibold text-xs text-neutral-900 group-hover:text-emerald-800 line-clamp-1">
                    {rp.name}
                  </p>
                  <p className="font-mono font-bold text-xs text-neutral-900 mt-0.5">
                    {formatPrice(rp.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt={product.name}
            className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
