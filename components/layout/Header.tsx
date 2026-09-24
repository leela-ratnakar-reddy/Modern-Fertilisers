'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Sprout,
  Package,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { CROPS_DATA } from '@/data/crops';
import { CATEGORIES_DATA } from '@/data/categories';
import { QuickSearchModal } from '@/components/search/QuickSearchModal';
import { MobileNav } from '@/components/layout/MobileNav';
import { formatPrice } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCropsDropdownOpen, setIsCropsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const pathname = usePathname();
  const { itemCount, subtotal, setIsCartOpen, isMounted } = useCart();
  const { wishlistCount } = useWishlist();

  // Scroll listener for compact sticky transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-neutral-200/80 py-2.5'
            : 'bg-white border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-6">
              <Logo size={isScrolled ? 'sm' : 'md'} />

              {/* Desktop Nav Links */}
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 font-sans text-sm font-medium">
                <Link
                  href="/shop"
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    pathname === '/shop'
                      ? 'text-emerald-900 bg-emerald-50/80 font-semibold'
                      : 'text-neutral-700 hover:text-emerald-800 hover:bg-neutral-50'
                  }`}
                >
                  Shop Catalog
                </Link>

                {/* Crop Solutions Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCropsDropdownOpen(true)}
                  onMouseLeave={() => setIsCropsDropdownOpen(false)}
                >
                  <button
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      pathname.startsWith('/crops')
                        ? 'text-emerald-900 bg-emerald-50/80 font-semibold'
                        : 'text-neutral-700 hover:text-emerald-800 hover:bg-neutral-50'
                    }`}
                  >
                    <span>Crop Solutions</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  {isCropsDropdownOpen && (
                    <div className="absolute top-full left-0 w-72 pt-2 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/90 p-3 space-y-1">
                        <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold flex items-center gap-1.5">
                          <Sprout className="w-3 h-3" />
                          <span>Shop by Crop Focus</span>
                        </div>
                        {CROPS_DATA.map((crop) => (
                          <Link
                            key={crop.id}
                            href={`/crops/${crop.slug}`}
                            onClick={() => setIsCropsDropdownOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl">{crop.icon}</span>
                              <div>
                                <p className="font-semibold text-xs text-neutral-900 group-hover:text-emerald-800">
                                  {crop.name}
                                </p>
                                <p className="text-[11px] text-neutral-500 font-normal">
                                  {crop.stages.length} growth stages
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {crop.productCount} inputs
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                >
                  <button
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      pathname.startsWith('/categories')
                        ? 'text-emerald-900 bg-emerald-50/80 font-semibold'
                        : 'text-neutral-700 hover:text-emerald-800 hover:bg-neutral-50'
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  {isCategoriesDropdownOpen && (
                    <div className="absolute top-full left-0 w-80 pt-2 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/90 p-3 space-y-1">
                        <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                          Nutrition Disciplines
                        </div>
                        {CATEGORIES_DATA.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            onClick={() => setIsCategoriesDropdownOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100/80 transition-colors group"
                          >
                            <div>
                              <p className="font-semibold text-xs text-neutral-900 group-hover:text-emerald-800">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-neutral-500 line-clamp-1">
                                {cat.shortDescription}
                              </p>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0 ml-2">
                              {cat.productCount}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    pathname === '/about'
                      ? 'text-emerald-900 bg-emerald-50/80 font-semibold'
                      : 'text-neutral-700 hover:text-emerald-800 hover:bg-neutral-50'
                  }`}
                >
                  About
                </Link>

                <Link
                  href="/orders"
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    pathname === '/orders'
                      ? 'text-emerald-900 bg-emerald-50/80 font-semibold'
                      : 'text-neutral-700 hover:text-emerald-800 hover:bg-neutral-50'
                  }`}
                >
                  My Orders
                </Link>
              </nav>
            </div>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200/80 hover:border-emerald-600 bg-neutral-50/70 hover:bg-white text-neutral-500 hover:text-neutral-800 text-xs transition-all cursor-pointer"
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 text-emerald-800 shrink-0" />
                <span className="hidden sm:inline">Search inputs...</span>
                <kbd className="hidden md:inline-block text-[10px] font-mono text-neutral-400 bg-neutral-200/60 px-1.5 py-0.5 rounded">
                  /
                </kbd>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-xl text-neutral-600 hover:text-emerald-800 hover:bg-neutral-100 transition-colors"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5" />
                {isMounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-mono text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Orders Link (Quick Icon on Tablet/Desktop) */}
              <Link
                href="/orders"
                className="hidden sm:flex relative p-2 rounded-xl text-neutral-600 hover:text-emerald-800 hover:bg-neutral-100 transition-colors"
                aria-label="Track orders"
                title="Simulated Orders"
              >
                <Package className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-95"
                aria-label={`Open shopping cart with ${itemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  {isMounted && itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-neutral-950 font-mono text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline font-mono">
                  {isMounted && itemCount > 0 ? formatPrice(subtotal) : 'Cart'}
                </span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="p-2 rounded-xl text-neutral-700 hover:text-emerald-900 hover:bg-neutral-100 lg:hidden transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
