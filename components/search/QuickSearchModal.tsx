'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, Sprout, Tag } from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/products';
import { CROPS_DATA } from '@/data/crops';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      try {
        const saved = JSON.parse(localStorage.getItem('mf_recent_searches_v1') || '[]');
        setRecentSearches(saved);
      } catch {
        setRecentSearches([]);
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts: Product[] = trimmed
    ? PRODUCTS_DATA.filter((p) => {
        const matchName = p.name.toLowerCase().includes(trimmed);
        const matchCat = p.categoryName.toLowerCase().includes(trimmed);
        const matchCrop = p.suitableCrops.some((c) => c.toLowerCase().includes(trimmed));
        const matchNutr = p.nutrients.some((n) => n.label.toLowerCase().includes(trimmed));
        const matchDesc = p.description.toLowerCase().includes(trimmed);
        return matchName || matchCat || matchCrop || matchNutr || matchDesc;
      }).slice(0, 5)
    : [];

  const matchingCrops = trimmed
    ? CROPS_DATA.filter((c) => c.name.toLowerCase().includes(trimmed))
    : [];

  const handleExecuteSearch = (searchVal: string) => {
    const val = searchVal.trim();
    if (!val) return;

    try {
      const updated = [val, ...recentSearches.filter((s) => s.toLowerCase() !== val.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('mf_recent_searches_v1', JSON.stringify(updated));
    } catch {}

    onClose();
    router.push(`/search?q=${encodeURIComponent(val)}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('mf_recent_searches_v1');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 transition-all">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-neutral-200 px-4 py-3.5 bg-neutral-50/50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleExecuteSearch(query);
              }
            }}
            placeholder="Search fertilisers, crops (Chilli, Rice...), nutrients (Zinc, NPK)..."
            className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-mono text-neutral-500 hover:text-neutral-900 bg-neutral-200/70 hover:bg-neutral-200 px-2 py-1 rounded transition-colors ml-1"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim().length > 0 ? (
            <div>
              {/* Crops matches */}
              {matchingCrops.length > 0 && (
                <div className="mb-4">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-semibold mb-2 flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5" />
                    Crop Advisory Solutions
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {matchingCrops.map((crop) => (
                      <Link
                        key={crop.id}
                        href={`/crops/${crop.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                      >
                        <span className="text-2xl">{crop.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-neutral-900 group-hover:text-emerald-800">
                            {crop.name} Nutrition
                          </p>
                          <p className="text-xs text-neutral-500">{crop.stages.length} growth stages</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Product matches */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-medium mb-2 flex items-center justify-between">
                  <span>Product Matches ({matchingProducts.length})</span>
                  {matchingProducts.length > 0 && (
                    <button
                      onClick={() => handleExecuteSearch(query)}
                      className="text-emerald-700 hover:text-emerald-800 text-xs font-semibold flex items-center gap-1"
                    >
                      View all in Shop <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100/80 transition-all group border border-transparent hover:border-neutral-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 rounded-lg object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="truncate">
                            <span className="text-[10px] uppercase font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {p.categoryName}
                            </span>
                            <p className="font-medium text-sm text-neutral-900 group-hover:text-emerald-900 truncate mt-0.5">
                              {p.name}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">{p.packSize} • {p.brand}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <span className="font-bold text-sm text-neutral-900">{formatPrice(p.price)}</span>
                          <p className="text-[10px] text-emerald-600 font-medium">{p.discount}% OFF</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-neutral-600 font-medium text-sm">
                      No direct product matches for &quot;{query}&quot;
                    </p>
                    <p className="text-neutral-400 text-xs mt-1">
                      Try searching by nutrient name (e.g., &quot;Zinc&quot;, &quot;NPK&quot;, &quot;Boron&quot;) or crop.
                    </p>
                    <button
                      onClick={() => handleExecuteSearch(query)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Search entire catalog for &quot;{query}&quot;
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    <span>Recent Searches</span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-neutral-400 hover:text-neutral-700 text-xs normal-case"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleExecuteSearch(term)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs transition-colors"
                      >
                        <Search className="w-3 h-3 text-neutral-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Discovery Queries */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['NPK 19:19:19', 'MKP 00:52:34', 'Zinc EDTA', 'Boron 20%', 'AscoKelp Seaweed', 'MycoGrow', 'Chilli', 'Rice'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => handleExecuteSearch(tag)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-neutral-200 hover:border-emerald-500 hover:text-emerald-800 text-neutral-700 text-xs bg-white transition-colors"
                      >
                        <Tag className="w-3 h-3 text-neutral-400" />
                        <span>{tag}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant client-side catalog search
                </span>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="font-medium text-emerald-700 hover:underline"
                >
                  Browse all 24 products →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
