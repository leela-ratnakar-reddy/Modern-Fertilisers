'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/products';
import { CROPS_DATA } from '@/data/crops';
import { ProductCard } from '@/components/product/ProductCard';

export function SearchPageView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mf_recent_searches_v1') || '[]');
      setRecentSearches(saved);
    } catch {
      setRecentSearches([]);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const updated = [query.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== query.trim().toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('mf_recent_searches_v1', JSON.stringify(updated));
    } catch {}

    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('mf_recent_searches_v1');
  };

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!trimmed) return [];
    return PRODUCTS_DATA.filter((p) => {
      const matchName = p.name.toLowerCase().includes(trimmed);
      const matchCat = p.categoryName.toLowerCase().includes(trimmed);
      const matchDesc = p.description.toLowerCase().includes(trimmed);
      const matchNutr = p.nutrients.some((n) => n.label.toLowerCase().includes(trimmed) || n.role.toLowerCase().includes(trimmed));
      const matchCrop = p.suitableCrops.some((c) => c.toLowerCase().includes(trimmed));
      return matchName || matchCat || matchDesc || matchNutr || matchCrop;
    });
  }, [trimmed]);

  const matchingCrops = useMemo(() => {
    if (!trimmed) return [];
    return CROPS_DATA.filter((c) => c.name.toLowerCase().includes(trimmed));
  }, [trimmed]);

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header Bar */}
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold">
            <Search className="w-3.5 h-3.5 text-emerald-600" />
            <span>INSTANT INPUT SEARCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Search Agricultural Inputs
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by fertilizer name, nutrient (Zinc, Boron, NPK), crop (Chilli, Rice)..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-neutral-300 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-neutral-400 font-mono text-[11px] uppercase">Recent:</span>
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectRecent(term)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer text-xs"
                >
                  {term}
                </button>
              ))}
              <button
                onClick={clearRecent}
                className="text-neutral-400 hover:text-neutral-700 text-xs ml-1"
              >
                Clear
              </button>
            </div>
          )}

          {/* Suggestions */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-neutral-400 font-mono text-[11px] uppercase">Popular:</span>
            {['19:19:19', '00:52:34', 'Zinc EDTA', 'Boron 20%', 'Seaweed Extract', 'Chilli', 'Rice'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => handleSelectRecent(term)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-colors cursor-pointer text-xs"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Overview */}
        {trimmed && (
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                  SEARCH RESULTS
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Found {matchingProducts.length} {matchingProducts.length === 1 ? 'formulation' : 'formulations'} for &ldquo;{query}&rdquo;
                </h2>
              </div>

              <Link
                href="/shop"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>Browse all catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Crop Advisory Match Highlight */}
            {matchingCrops.length > 0 && (
              <div className="mb-8 p-5 rounded-3xl bg-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{matchingCrops[0].icon}</span>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      Looking for {matchingCrops[0].name} Specific Advisory?
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Explore our full 5-stage {matchingCrops[0].name} nutrition schedule and phenology guide.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/crops/${matchingCrops[0].slug}`}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <span>View {matchingCrops[0].name} Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Products grid */}
            {matchingProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {matchingProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  No products matched &ldquo;{query}&rdquo;
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Try searching by generic chemical symbol (e.g. NPK, Zn, Boron, Urea) or explore our curated crop schedules.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => setQuery('')}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                  >
                    Clear Search
                  </button>
                  <Link
                    href="/shop"
                    className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-emerald-950"
                  >
                    View All 24 Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
