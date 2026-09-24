import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sprout,
  ShieldCheck,
  Microscope,
  Cpu,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Concept & Technology | Modern Fertilisers',
  description:
    'Modern Fertilisers is designed around a simple idea: agricultural product discovery should be clearer, more accessible, and built for modern farmers.',
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#fbfbf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>PORTFOLIO CONCEPT BRAND • ARCHITECTURAL MANIFESTO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Agricultural product discovery, reimagined for modern farming.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Modern Fertilisers is designed around a simple idea: agricultural product discovery should be clearer, more accessible, and built for modern farmers.
          </p>
        </div>

        {/* Cinematic Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden aspect-16/9 bg-neutral-950 border border-neutral-800 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=1600&q=80"
            alt="Futuristic Agriculture Research"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-1">
              THE VISION
            </span>
            <p className="text-base sm:text-xl font-bold leading-snug">
              Transforming complex soil chemistry into an effortless, transparent digital discovery platform.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Our Mission</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              To dismantle the obscurity in modern agri-chemical retail. Traditional farming relies on generic N-P-K bags without verified solubility or chelation guarantees. Modern Fertilisers models a digital ecosystem where every formulation includes exact nutrient breakdowns, cold-dissolution timelines, and phenology matching.
            </p>
          </div>

          {/* Product Philosophy */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Product Philosophy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Zero filler clay, zero sodium contaminants, and 100% molecular bioavailability. Whether delivering 19:19:19 crystals through micro-drippers or spraying chelated Zinc EDTA across juvenile paddy leaves, our product standards prioritize cellular intake over gross bag weight.
            </p>
          </div>

          {/* Technology */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Modern Technology Stack</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Engineered with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Features high-performance client state persistence for cart, wishlist, and simulated order lifecycles, ensuring a snappy 60fps experience on mobile farming screens even in remote rural network conditions.
            </p>
          </div>

          {/* Farmer-First Experience */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Farmer-First Experience</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Designed specifically for the realities of regional agriculture: bilingual-friendly naming, clear pack size switching (from 500g trial pouches to 25kg bulk farm sacks), instant coupon incentives, and seamless simulated multi-step checkout.
            </p>
          </div>
        </div>

        {/* Portfolio & Student Context Card */}
        <div className="bg-emerald-950 rounded-3xl p-8 sm:p-10 text-white border border-emerald-900 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>PORTFOLIO SPECIFICATION & CONSTRAINTS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold">
            Architectural Portfolio Project for B.Tech CSE AI/ML
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            This project is built as a serious frontend portfolio piece showcased on GitHub and deployed on Vercel. It strictly avoids backend server databases and fake commercial claims. All cart state, wishlists, and orders operate cleanly in the frontend through browser localStorage with zero external API dependencies.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-white hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>Explore Input Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#crop-wizard"
              className="px-6 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 font-semibold text-xs transition-colors"
            >
              <span>Test Crop Stage Finder</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
