'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcements" className="relative z-50 bg-[#071c13] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Kharif & Rabi Season</span>
        </div>

        {/* Center Promotion */}
        <div className="flex-1 text-center flex items-center justify-center gap-2 font-normal text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/60 font-medium">
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
            FREE REGIONAL DELIVERY
          </span>
          <span className="text-neutral-300 hidden md:inline">
            Complimentary shipping on all crop input orders above ₹999.
          </span>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-emerald-300 font-semibold underline underline-offset-4 hover:text-white transition-colors ml-1"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Close Button */}
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline-block text-[10px] uppercase font-mono tracking-widest text-emerald-400/80 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
            Portfolio Demo
          </span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-emerald-400/70 hover:text-emerald-200 transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
