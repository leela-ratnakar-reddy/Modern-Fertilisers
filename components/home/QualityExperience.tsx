'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Award } from 'lucide-react';

const BENCHMARKS = [
  {
    id: 'solubility',
    title: '100% Crystalline Cold Solubility',
    subtitle: 'Dissolves in water in under 45 seconds without clumping or insoluble grit.',
    metric: '< 45s',
    metricLabel: 'Full dissolution',
    description:
      'Engineered with micro-milled salt lattices that dissolve instantly in farm borewell water temperatures (18°C - 34°C). Zero sediment guarantees no blocked drip drippers or sprayer nozzles.',
    specs: ['Zero insoluble matter (<0.02%)', 'Cold water active', 'Venturi & dosing pump safe'],
  },
  {
    id: 'chelation',
    title: 'EDTA Molecular Chelate Integrity',
    subtitle: 'Protects trace minerals from alkaline soil fixation and phosphate locking.',
    metric: 'pH 4 - 9',
    metricLabel: 'Active chelate range',
    description:
      'Standard unchelated zinc and iron sulfate precipitate into insoluble rocks in high pH or alkaline soils. Our EDTA chelated cage maintains ions in solution for immediate root and foliar absorption.',
    specs: ['5x higher plant bioavailability', 'Compatible with NPK tank mixes', 'Resists photo-oxidation'],
  },
  {
    id: 'salt-index',
    title: 'Low Salt Index & Biuret Suppression',
    subtitle: 'Prevents osmotic leaf burn and root root-tip plasmolysis.',
    metric: '< 0.1%',
    metricLabel: 'Biuret threshold',
    description:
      'High biuret and chloride contaminants stunt sensitive crops like chilli, tomato, and cotton. Our raw formulations undergo strict recrystallization to guarantee minimal biuret and zero chlorides.',
    specs: ['Chloride-free formulations', 'Safe for tender nursery leaves', 'No tip scorch at label dosages'],
  },
];

export function QualityExperience() {
  const [activeTab, setActiveTab] = useState(0);
  const current = BENCHMARKS[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>AGRONOMIC SPECIFICATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Engineered for Precision & Purity
          </h2>

          <p className="text-sm sm:text-base text-neutral-500">
            Compare our input performance benchmarks against conventional agricultural grades.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BENCHMARKS.map((item, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                }`}
              >
                {item.title.split(' ')[0]} {item.title.split(' ')[1]}
              </button>
            );
          })}
        </div>

        {/* Active Benchmark Card */}
        <div className="max-w-4xl mx-auto bg-neutral-50 rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Metric Callout */}
            <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200/80 text-center shadow-xs">
              <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-800 block">
                {current.metric}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold block mt-1">
                {current.metricLabel}
              </span>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Benchmark</span>
              </div>
            </div>

            {/* Description & Specs */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-0.5">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-800">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
