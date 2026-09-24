'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { CropCategory } from '@/types/product';

const TABS: { id: 'all' | CropCategory; label: string }[] = [
  { id: 'all', label: 'All Featured' },
  { id: 'water-soluble', label: 'Water Soluble' },
  { id: 'micronutrients', label: 'Micronutrients' },
  { id: 'plant-nutrition', label: 'Bio-Stimulants' },
  { id: 'fertilisers', label: 'Core Fertilisers' },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'all' | CropCategory>('all');

  const filtered = activeTab === 'all'
    ? PRODUCTS_DATA.filter((p) => p.featured || p.popular).slice(0, 8)
    : PRODUCTS_DATA.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Laboratory Tested</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Featured Formulations
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1 max-w-xl">
              High-purity soluble salts, bio-available chelated minerals, and mycorrhizal bio-inoculants engineered for maximum cellular uptake.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {TABS.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Catalog Link */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Explore Entire 24+ Formulation Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
