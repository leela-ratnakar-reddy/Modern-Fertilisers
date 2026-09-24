import React from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, CheckCircle2 } from 'lucide-react';

export function PromotionalSection() {
  return (
    <section className="py-14 bg-neutral-100/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-[#072418] to-emerald-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-emerald-800/60">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-emerald-300 text-xs font-mono">
                <Tag className="w-3.5 h-3.5" />
                <span>SEASONAL INPUT SAVINGS • PROMO CODE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Unlock 10% Off Your First Input Order
              </h3>

              <p className="text-neutral-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Use code <span className="font-mono font-bold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/60">MODERN10</span> during checkout to test our coupon validation system. Instant discount calculation on any order value over ₹500.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free delivery above ₹999
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Simulated UPI & Card options
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Shop Formulations Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                className="px-6 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 font-semibold text-xs sm:text-sm text-center transition-all"
              >
                <span>View Cart & Apply Coupon</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
