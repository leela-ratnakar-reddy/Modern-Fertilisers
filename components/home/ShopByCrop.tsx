import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sprout } from 'lucide-react';
import { CROPS_DATA } from '@/data/crops';

export function ShopByCrop() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Tailored Agronomy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Shop by Crop
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1 max-w-xl">
              Targeted nutrient combinations formulated around the unique physiological feeding stages of major regional staples.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors group"
          >
            <span>View all crop inputs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Crop Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CROPS_DATA.map((crop) => (
            <Link
              key={crop.id}
              href={`/crops/${crop.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 aspect-3/4 flex flex-col justify-end p-6 border border-neutral-200/60 hover:border-emerald-500 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Crop Image with Zoom */}
              <img
                src={crop.image}
                alt={crop.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Darkening Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent group-hover:from-neutral-950 transition-colors duration-300" />

              {/* Top Crop Icon Pill */}
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-neutral-900 shadow-xs flex items-center gap-1.5 z-10">
                <span className="text-base">{crop.icon}</span>
                <span>{crop.name} Focus</span>
              </div>

              {/* Top Right Action Arrow */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 z-10">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Content Panel */}
              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-1">
                  <span>{crop.stages.length} Growth Stages</span>
                  <span>•</span>
                  <span>{crop.productCount} Formulations</span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {crop.name}
                </h3>

                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
                  {crop.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span>Explore Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
