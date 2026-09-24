import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopCatalog } from '@/components/shop/ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop Agricultural Inputs | Modern Fertilisers',
  description:
    'Explore our catalog of high-purity crystalline fertilizers, chelated micronutrients, and bio-stimulants calibrated for Indian crop cycles.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Loading Catalog Formulations...
          </p>
        </div>
      }
    >
      <ShopCatalog />
    </Suspense>
  );
}
