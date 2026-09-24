import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Sprout, Droplets, Atom, Leaf, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';

const ICON_MAP: Record<string, React.ElementType> = {
  Sprout,
  Droplets,
  Atom,
  Leaf,
  Sparkles,
};

export function CategoriesGrid() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Input Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Product Categories
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1 max-w-xl">
              Engineered input lines spanning core soil nutrition, drip-grade crystalline compounds, and microbial bio-inoculants.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>View all disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, index) => {
            const Icon = ICON_MAP[cat.iconName] || Layers;
            const isFeatured = index === 0 || index === 1;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/80 hover:border-emerald-400 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isFeatured ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-950 group-hover:text-emerald-300 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                      {cat.productCount} Formulations
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>Explore Catalog</span>
                  <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
