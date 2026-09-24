import React from 'react';
import Link from 'next/link';
import { Sprout, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 bg-[#fbfbf9] text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
          <Sprout className="w-10 h-10 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-100/70 px-2.5 py-1 rounded-full">
            404 • Page Not Found
          </span>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
            Field Coordinate Unreachable
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            The agricultural input formulation, crop advisory route, or order document you requested does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Browse All Products</span>
          </Link>
        </div>

        {/* Quick Discipline Shortcuts */}
        <div className="pt-8 border-t border-neutral-200 text-xs text-neutral-400 space-y-2">
          <p className="font-mono uppercase text-[10px]">Popular Destinations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/crops/chilli"
              className="text-emerald-800 hover:underline font-semibold"
            >
              Chilli Nutrition
            </Link>
            <span>•</span>
            <Link
              href="/crops/rice"
              className="text-emerald-800 hover:underline font-semibold"
            >
              Rice Schedule
            </Link>
            <span>•</span>
            <Link
              href="/categories/water-soluble"
              className="text-emerald-800 hover:underline font-semibold"
            >
              Water Soluble
            </Link>
            <span>•</span>
            <Link
              href="/orders"
              className="text-emerald-800 hover:underline font-semibold"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
