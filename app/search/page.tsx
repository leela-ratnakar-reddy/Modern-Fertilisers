import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { SearchPageView } from '@/components/search/SearchPageView';

export const metadata: Metadata = {
  title: 'Search Catalog | Modern Fertilisers',
  description: 'Search agricultural inputs by brand, formulation, nutrient chemistry, and crop suitability.',
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-neutral-500">Searching Catalog...</p>
        </div>
      }
    >
      <SearchPageView />
    </Suspense>
  );
}
