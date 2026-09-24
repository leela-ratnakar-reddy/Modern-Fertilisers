'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#04140d] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Ambient gradient mesh & subtle tech grid */}
      <div className="absolute inset-0 tech-grid-dark opacity-25 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 45% Desktop (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Precision Agricultural Nutrition Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRECISION AGRICULTURAL NUTRITION</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Better nutrition.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300">
                Better growth.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              Modern crop nutrition, thoughtfully selected for the way agriculture is evolving.
              High-purity soluble formulations, chelated trace elements, and living bio-stimulants calibrated for Indian crop cycles.
            </p>

            {/* CTA Buttons */}
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

            {/* Desktop Supporting Metrics (Hidden on Mobile, rendered below image on mobile) */}
            <div className="hidden lg:grid pt-6 border-t border-emerald-900/60 grid-cols-3 gap-4 text-neutral-300 text-xs font-mono">
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

          {/* Right Column: 55% Desktop (lg:col-span-7) - Uploaded Hero Visual */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden border border-emerald-800/40 bg-neutral-950 shadow-2xl shadow-emerald-950/60 hover:border-emerald-600/50 hover:shadow-emerald-900/30 transition-all duration-700"
            >
              <div className="relative w-full aspect-4/5 max-h-[540px] sm:max-h-[580px] lg:max-h-[620px] overflow-hidden">
                <Image
                  src="/images/modern-fertilisers-hero.jpg"
                  alt="Modern Fertilisers - Futuristic agricultural crop nutrition showing root absorption, soil biology, and telemetry"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile Supporting Metrics (Shown under image on mobile/tablet) */}
          <div className="lg:hidden col-span-1 pt-4 border-t border-emerald-900/60 grid grid-cols-3 gap-3 text-neutral-300 text-xs font-mono">
            <div className="space-y-0.5">
              <span className="text-emerald-400 font-bold text-base block">100%</span>
              <span className="text-neutral-400 text-[11px] leading-tight block">Drip Solubility</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-400 font-bold text-base block">0%</span>
              <span className="text-neutral-400 text-[11px] leading-tight block">Nozzle Residue</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-400 font-bold text-base block">24+</span>
              <span className="text-neutral-400 text-[11px] leading-tight block">Formulations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
