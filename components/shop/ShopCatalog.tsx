'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Filter,
} from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/products';
import { CATEGORIES_DATA } from '@/data/categories';
import { CROPS_DATA } from '@/data/crops';
import { ProductCard } from '@/components/product/ProductCard';
import { CropCategory, SuitableCrop } from '@/types/product';
import { SortOption } from '@/types/filter';
import { formatPrice } from '@/lib/utils';

export function ShopCatalog() {
  const searchParams = useSearchParams();

  // URL state initialization
  const initialCategory = searchParams.get('category') as CropCategory | null;
  const initialCrop = searchParams.get('crop') as SuitableCrop | null;
  const initialSearch = searchParams.get('q') || '';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<CropCategory[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedCrops, setSelectedCrops] = useState<SuitableCrop[]>(
    initialCrop ? [initialCrop] : []
  );
  const [maxPrice, setMaxPrice] = useState<number>(12000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category') as CropCategory | null;
    const crp = searchParams.get('crop') as SuitableCrop | null;
    const q = searchParams.get('q') || '';
    if (cat) setSelectedCategories([cat]);
    if (crp) setSelectedCrops([crp]);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Toggle category
  const toggleCategory = (cat: CropCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle crop
  const toggleCrop = (crop: SuitableCrop) => {
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    );
  };

  // Clear all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedCrops([]);
    setMaxPrice(12000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Active filter count
  const activeFiltersCount =
    (selectedCategories.length > 0 ? selectedCategories.length : 0) +
    (selectedCrops.length > 0 ? selectedCrops.length : 0) +
    (maxPrice < 12000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCat = p.categoryName.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchNutr = p.nutrients.some((n) => n.label.toLowerCase().includes(query));
        const matchCrop = p.suitableCrops.some((c) => c.toLowerCase().includes(query));
        if (!matchName && !matchCat && !matchDesc && !matchNutr && !matchCrop) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(p.category)) {
          return false;
        }
      }

      // 3. Crop Filter
      if (selectedCrops.length > 0) {
        const matchesAnyCrop = selectedCrops.some((c) => p.suitableCrops.includes(c));
        if (!matchesAnyCrop) {
          return false;
        }
      }

      // 4. Max Price Filter
      if (p.price > maxPrice) {
        return false;
      }

      // 5. In-stock only
      if (inStockOnly && p.stockStatus !== 'in-stock') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviewCount - a.reviewCount;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      }
    });
  }, [searchQuery, selectedCategories, selectedCrops, maxPrice, inStockOnly, sortBy]);

  return (
    <div className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            <span>PORTFOLIO CATALOG</span>
            <span>•</span>
            <span>{filteredProducts.length} Formulations Available</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Agricultural Inputs & Nutrients
          </h1>
          <p className="text-neutral-500 text-sm max-w-2xl">
            Explore 100% drip-grade soluble fertilizers, EDTA chelated trace cocktails, and biological root inoculants calibrated for high yield.
          </p>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, nutrient (Zinc, Boron...), or crop..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <span className="hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">New Formulations</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-neutral-400 font-mono text-[11px] uppercase mr-1">Active:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 capitalize"
              >
                <span>{cat.replace('-', ' ')}</span>
                <button onClick={() => toggleCategory(cat)} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedCrops.map((crop) => (
              <span
                key={crop}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200"
              >
                <span>Crop: {crop}</span>
                <button onClick={() => toggleCrop(crop)} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <span>In Stock Only</span>
                <button onClick={() => setInStockOnly(false)} className="hover:text-rose-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                  Filter Catalog
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-neutral-400 hover:text-neutral-800"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Group */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider">
                  Category
                </h3>
                <div className="space-y-1.5">
                  {CATEGORIES_DATA.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.id);
                    return (
                      <label
                        key={cat.id}
                        className="flex items-center justify-between text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer py-0.5"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.id)}
                            className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600"
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">
                          ({cat.productCount})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Crop Filter Group */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider">
                  Suitable Crop
                </h3>
                <div className="space-y-1.5">
                  {CROPS_DATA.map((crop) => {
                    const cropName = crop.name as SuitableCrop;
                    const isChecked = selectedCrops.includes(cropName);
                    return (
                      <label
                        key={crop.id}
                        className="flex items-center justify-between text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer py-0.5"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCrop(cropName)}
                            className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600"
                          />
                          <span>
                            {crop.icon} {crop.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">
                          ({crop.productCount})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider">
                  <span>Max Price</span>
                  <span className="text-emerald-800 font-mono">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="12000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>₹300</span>
                  <span>₹12,000</span>
                </div>
              </div>

              {/* Stock status toggle */}
              <div className="pt-4 border-t border-neutral-100">
                <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-neutral-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Show In-Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  No formulations match your active filters
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
                  Try broadening your price limit, unchecking specific crop filters, or clearing your search term.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full w-[85vw] bg-white shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h3 className="font-bold text-base text-neutral-900">Filter Inputs</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase font-mono">Category</h4>
                <div className="space-y-1.5">
                  {CATEGORIES_DATA.map((cat) => (
                    <label key={cat.id} className="flex items-center justify-between text-xs text-neutral-700 py-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="rounded text-emerald-700"
                        />
                        <span>{cat.name}</span>
                      </div>
                      <span className="font-mono text-neutral-400">({cat.productCount})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Crops */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold text-neutral-900 uppercase font-mono">Crop</h4>
                <div className="space-y-1.5">
                  {CROPS_DATA.map((crop) => (
                    <label key={crop.id} className="flex items-center justify-between text-xs text-neutral-700 py-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCrops.includes(crop.name as SuitableCrop)}
                          onChange={() => toggleCrop(crop.name as SuitableCrop)}
                          className="rounded text-emerald-700"
                        />
                        <span>{crop.icon} {crop.name}</span>
                      </div>
                      <span className="font-mono text-neutral-400">({crop.productCount})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex justify-between text-xs font-bold text-neutral-900 uppercase font-mono">
                  <span>Max Price</span>
                  <span className="text-emerald-800">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="12000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 gap-2">
              <button
                onClick={resetFilters}
                className="py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 text-center"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-neutral-900 text-white text-xs font-semibold text-center"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
