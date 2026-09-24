'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { CategoryInfo } from '@/types/product';
import { PRODUCTS_DATA } from '@/data/products';
import { CATEGORIES_DATA } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';

interface CategoryViewProps {
  category: CategoryInfo;
}

export function CategoryView({ category }: CategoryViewProps) {
  const categoryProducts = PRODUCTS_DATA.filter((p) => p.category === category.id);
  const otherCategories = CATEGORIES_DATA.filter((c) => c.id !== category.id);

  return (
    <div className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8">
          <Link href="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href="/shop" className="hover:text-emerald-800 transition-colors">
            Shop Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-semibold">{category.name}</span>
        </nav>

        {/* Hero Category Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white mb-12 shadow-xl border border-neutral-800">
          <img
            src={category.heroImage}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>NUTRITION DISCIPLINE • {categoryProducts.length} FORMULATIONS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {category.name}
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {category.fullDescription}
            </p>

            {/* Key category benefits */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
              {category.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                ACTIVE FORMULATIONS
              </span>
              <h2 className="text-2xl font-bold text-neutral-900">
                All {category.name} Inputs ({categoryProducts.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Explore Other Disciplines */}
        <div className="pt-8 border-t border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Explore Other Input Disciplines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCategories.map((other) => (
              <Link
                key={other.id}
                href={`/categories/${other.slug}`}
                className="group p-5 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                    {other.productCount} Products
                  </span>
                  <h4 className="font-bold text-sm text-neutral-900 group-hover:text-emerald-800 transition-colors mt-1">
                    {other.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {other.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-emerald-800 gap-1">
                  <span>View discipline</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
