import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { CATEGORIES_DATA } from '@/data/categories';
import { CROPS_DATA } from '@/data/crops';
import { ShieldCheck, Sprout } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#05160e] text-neutral-300 font-sans border-t border-emerald-950 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-emerald-900/40">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Modern Fertilisers is an architectural concept for next-generation agricultural input discovery.
              Engineered with precision agronomy datasets, cold-solubility matrices, and responsive crop-stage feeding schedules.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next-Gen Agricultural Commerce Architecture</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                B.Tech CSE AI/ML Capstone Portfolio Project • Live Vercel Deployment
              </p>
            </div>
          </div>

          {/* Column 2: Shop Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Input Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-neutral-400 hover:text-emerald-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="text-emerald-400 hover:text-white font-medium transition-colors inline-flex items-center gap-1"
                >
                  All 24 Products Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Crop Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Crop Advisory
            </h4>
            <ul className="space-y-2 text-xs">
              {CROPS_DATA.map((crop) => (
                <li key={crop.id}>
                  <Link
                    href={`/crops/${crop.slug}`}
                    className="text-neutral-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{crop.icon}</span>
                    <span>{crop.name} Nutrition Schedule</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#crop-wizard"
                  className="text-emerald-400 hover:text-white font-medium transition-colors"
                >
                  Interactive Crop Stage Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Platform & Tech
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  Brand Philosophy & Mission
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-emerald-300 transition-colors">
                  Track Simulated Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-emerald-300 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <span className="text-neutral-500">Next.js 15 App Router</span>
              </li>
              <li>
                <span className="text-neutral-500">React 19 & Tailwind CSS v4</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Agricultural & Agronomic Disclaimer Strip */}
        <div className="py-6 border-b border-emerald-900/40 text-[11px] text-neutral-400 leading-relaxed space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>PORTFOLIO DEMO & AGRONOMIC NOTICE</span>
          </div>
          <p>
            Modern Fertilisers is an engineered frontend portfolio project designed to demonstrate high-performance e-commerce architecture, responsive UX design, and modern Indian agri-tech interfaces. Product discovery and dosage guidelines are displayed for demonstration and educational purposes. No commercial transactions are processed. In field practice, always adhere strictly to official statutory product labels and certified agronomist instructions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MODERN FERTILISERS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Sprout className="w-3.5 h-3.5" />
              Better Nutrition. Better Growth.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
