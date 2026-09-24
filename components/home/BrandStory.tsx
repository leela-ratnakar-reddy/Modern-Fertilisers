import React from 'react';
import Link from 'next/link';
import { ArrowRight, Microscope, Target, Leaf } from 'lucide-react';

export function BrandStory() {
  const pillars = [
    {
      icon: Microscope,
      title: 'Precision Bio-Chemistry',
      description: 'Zero heavy filler clays, 100% chelated trace elements, and strict pharmaceutical-level dissolution standards.',
    },
    {
      icon: Target,
      title: 'Phenology-Targeted Timing',
      description: 'Moving beyond arbitrary broadcasting. Delivering the exact nitrogen, phosphorus, and micro-traces required for specific crop growth flushes.',
    },
    {
      icon: Leaf,
      title: 'Ecological Soil Stewardship',
      description: 'Balancing fast-acting drip nutrition with mycorrhizae and carbon matrices to preserve native soil microbiology.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#04140d] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 tech-grid-dark opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/5 border border-emerald-900/60 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Agricultural Bio-Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04140d] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-emerald-800/60 text-xs">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                  CONCEPT VISION
                </span>
                <p className="text-neutral-200 leading-relaxed font-sans text-xs">
                  &ldquo;Agricultural inputs should be as transparent, precise, and accessible as modern biotechnology.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono font-semibold">
              <span>BRAND ARCHITECTURE & MANIFESTO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Agricultural discovery, built for modern farming.
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Modern Fertilisers is designed around a simple idea: agricultural product discovery should be clearer, more accessible, and built for modern farmers.
              Traditional fertilizer retail is fraught with opaque formulations, generic bag recommendations, and hidden sediment impurities that choke drip lines.
            </p>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              We bridge academic soil science and real-world farm economics through an intuitive digital experience.
              Whether managing five acres of Guntur chilli or large-scale paddy basins, farmers gain transparent access to pure crystalline salts, verified chelation chemistries, and stage-specific crop schedules.
            </p>

            {/* 3 Value Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-900/60 space-y-2 hover:border-emerald-700/80 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-xs text-white">{pillar.title}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-white transition-colors"
              >
                <span>Read our full product philosophy & technology manifesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
