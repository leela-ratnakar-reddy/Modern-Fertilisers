import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sprout, ShieldCheck } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#03110b] text-white relative overflow-hidden">
      <div className="absolute inset-0 tech-grid-dark opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-800 text-emerald-400 text-xs font-mono font-semibold">
          <Sprout className="w-3.5 h-3.5" />
          <span>MODERN PRECISION AGRONOMY</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Ready to elevate your crop nutrition strategy?
        </h2>

        <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Explore pure crystalline macro-nutrients, chelated micronutrient cocktails, and living bio-inoculants engineered to maximize harvest yield and post-harvest shelf life.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#crop-wizard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Find Products for Your Crop</span>
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-neutral-400 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Frontend Portfolio Prototype
          </span>
          <span>•</span>
          <span>Fast Static Delivery</span>
        </div>
      </div>
    </section>
  );
}
