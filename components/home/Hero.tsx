'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sprout, Sparkles, Activity, Layers } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#04140d] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Ambient gradient mesh & subtle tech grid */}
      <div className="absolute inset-0 tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Value */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRECISION AGRICULTURAL NUTRITION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Better nutrition.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300">
                Better growth.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              Modern crop nutrition, thoughtfully selected for the way agriculture is evolving.
              High-purity soluble formulations, chelated trace elements, and living bio-stimulants calibrated for Indian crop cycles.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-white text-neutral-950 hover:bg-emerald-400 hover:text-neutral-950 font-bold text-sm text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 active:scale-95"
              >
                <span>Shop Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#crop-wizard"
                className="px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 font-semibold text-sm text-center transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Find by Crop Stage</span>
              </Link>
            </div>

            {/* Micro Benefit Markers */}
            <div className="pt-6 border-t border-emerald-900/60 grid grid-cols-3 gap-4 text-neutral-300 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold text-base sm:text-lg block">100%</span>
                <span className="text-neutral-400 text-[11px] leading-tight block">Drip Solubility</span>
              </div>
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold text-base sm:text-lg block">0%</span>
                <span className="text-neutral-400 text-[11px] leading-tight block">Nozzle Residue</span>
              </div>
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold text-base sm:text-lg block">24+</span>
                <span className="text-neutral-400 text-[11px] leading-tight block">Targeted Formulations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Composition with Floating Data HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-emerald-800/60 shadow-2xl shadow-emerald-950/50 aspect-4/5 bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Agricultural Precision Field"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04140d] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-emerald-900/60 text-xs">
                  <div className="flex items-center justify-between text-emerald-400 font-mono text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      PHYTO-ABSORPTION ACTIVE
                    </span>
                    <span className="text-white font-semibold">Stage III Bloom</span>
                  </div>
                  <p className="text-neutral-300 text-xs font-normal">
                    Precision foliar spray delivers chelated ions directly through stomatal apertures.
                  </p>
                </div>
              </div>

              {/* Floating Data Badge 1: Top Right */}
              <div className="absolute -top-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md text-neutral-900 p-3.5 rounded-2xl shadow-xl border border-neutral-200/80 hidden sm:flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    Formula Purity
                  </p>
                  <p className="font-extrabold text-sm text-neutral-900">Pharmaceutical Grade</p>
                </div>
              </div>

              {/* Floating Data Badge 2: Mid-Left */}
              <div className="absolute top-1/2 -left-3 sm:-left-6 -translate-y-1/2 bg-neutral-950/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-emerald-800/80 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-900/80 flex items-center justify-center text-emerald-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    EDTA Chelate Cage
                  </p>
                  <p className="font-bold text-xs text-neutral-200">Zero Alkaline Fixation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
