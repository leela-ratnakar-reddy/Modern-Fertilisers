'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { CropInfo } from '@/types/product';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

interface CropSolutionViewProps {
  crop: CropInfo;
}

export function CropSolutionView({ crop }: CropSolutionViewProps) {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const currentStage = crop.stages[selectedStageIndex];

  // Products matching this crop
  const cropProducts = PRODUCTS_DATA.filter((p) =>
    p.suitableCrops.some((c) => c.toLowerCase() === crop.name.toLowerCase())
  );

  // Products specifically matching the currently selected stage
  const stageProducts = cropProducts.filter((p) =>
    p.cropStages.includes(currentStage.stage)
  );

  const displayProducts = stageProducts.length > 0 ? stageProducts : cropProducts.slice(0, 4);

  return (
    <div className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8">
          <Link href="/" className="hover:text-emerald-800 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <Link href="/#crop-wizard" className="hover:text-emerald-800 transition-colors">
            Crop Solutions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-semibold">{crop.name} Advisory</span>
        </nav>

        {/* Hero Crop Overview Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white mb-12 shadow-xl border border-neutral-800">
          <img
            src={crop.heroImage}
            alt={crop.name}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono">
              <span className="text-base">{crop.icon}</span>
              <span>{crop.scientificName} • PRECISION SCHEDULE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {crop.name} Crop Nutrition Schedule
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {crop.description}
            </p>

            {/* Agronomic specs */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-neutral-800 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[11px]">Growing Season</span>
                <span className="text-emerald-400 font-bold">{crop.season}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Ideal Soil pH</span>
                <span className="text-emerald-400 font-bold">6.0 - 7.5</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-neutral-400 block text-[11px]">Formulation Suite</span>
                <span className="text-white font-bold">{cropProducts.length} Inputs Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage-by-Stage Nutrition Timeline */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                GROWTH PHENOLOGY TIMELINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                5-Stage Nutrient Application Schedule
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-mono">
              Click a stage to inspect target nutrients & risk factors
            </p>
          </div>

          {/* Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {crop.stages.map((stg, idx) => {
              const isSelected = selectedStageIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950 text-white border-emerald-800 shadow-md'
                      : 'bg-white text-neutral-800 border-neutral-200/80 hover:border-emerald-300 hover:bg-neutral-100/50'
                  }`}
                >
                  <span className={`text-[10px] font-mono block ${isSelected ? 'text-emerald-300' : 'text-neutral-400'}`}>
                    Stage {idx + 1}
                  </span>
                  <p className="font-bold text-xs sm:text-sm mt-0.5 truncate">
                    {stg.stage.split(' ')[0]} {stg.stage.split(' ')[1] || ''}
                  </p>
                  <p className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {stg.duration}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown Box */}
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
                    Stage {selectedStageIndex + 1} of 5
                  </span>
                  <span className="font-mono text-xs text-neutral-500">{currentStage.duration}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {currentStage.stage}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {currentStage.description}
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
                    Recommended Nutrient Composition
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                    {currentStage.recommendedNutrients}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {/* Agronomic Risk Alert */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs font-mono uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Primary Physiological Risk</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {currentStage.keyRisk}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                    Nutritional Priorities for {crop.name}
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {crop.keyNutrientNeeds.slice(0, 3).map((need, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulations for this Stage / Crop */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                STAGE-TARGETED FORMULATIONS
              </span>
              <h3 className="text-2xl font-bold text-neutral-900">
                Inputs for {currentStage.stage} ({displayProducts.length})
              </h3>
            </div>
            <Link
              href={`/shop?crop=${encodeURIComponent(crop.name)}`}
              className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View all {cropProducts.length} {crop.name} formulations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
