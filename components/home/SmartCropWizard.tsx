'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { CROPS_DATA } from '@/data/crops';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SuitableCrop, CropStage } from '@/types/product';

const CROP_OPTIONS: { id: SuitableCrop; name: string; icon: string; desc: string }[] = [
  { id: 'Chilli', name: 'Chilli', icon: '🌶️', desc: 'Capsaicin development & blossom retention' },
  { id: 'Rice', name: 'Rice (Paddy)', icon: '🌾', desc: 'Tillering, panicle initiation & grain weight' },
  { id: 'Cotton', name: 'Cotton', icon: '🌿', desc: 'Square retention & boll bursting' },
  { id: 'Vegetables', name: 'Vegetables', icon: '🥬', desc: 'Continuous flushing, luster & shelf life' },
];

const STAGE_OPTIONS: { id: CropStage; label: string; period: string; focus: string }[] = [
  {
    id: 'Nursery / Early Growth',
    label: 'Early Growth & Nursery',
    period: 'Stage 1 (Days 1 - 25)',
    focus: 'Root hair branching & transplant recovery',
  },
  {
    id: 'Vegetative Stage',
    label: 'Active Vegetative',
    period: 'Stage 2 (Days 25 - 55)',
    focus: 'Canopy spread, leaf index & tillering',
  },
  {
    id: 'Flowering & Blooming',
    label: 'Flowering & Bloom',
    period: 'Stage 3 (Days 55 - 85)',
    focus: 'Flower cluster emergence & abortion stop',
  },
  {
    id: 'Fruit & Grain Setting',
    label: 'Fruit & Grain Setting',
    period: 'Stage 4 (Days 85 - 120)',
    focus: 'Pod bulking, starch filling & brix degree',
  },
];

export function SmartCropWizard() {
  const [selectedCrop, setSelectedCrop] = useState<SuitableCrop>('Chilli');
  const [selectedStage, setSelectedStage] = useState<CropStage>('Flowering & Blooming');

  // Filter products matching both crop and stage
  const matchedProducts = PRODUCTS_DATA.filter((p) => {
    const hasCrop = p.suitableCrops.includes(selectedCrop);
    const hasStage = p.cropStages.includes(selectedStage);
    return hasCrop && hasStage;
  });

  // Fallback to crop-only if stage filter returns fewer than 2 items
  const displayProducts = matchedProducts.length >= 2
    ? matchedProducts.slice(0, 4)
    : PRODUCTS_DATA.filter((p) => p.suitableCrops.includes(selectedCrop)).slice(0, 4);

  const activeCropInfo = CROPS_DATA.find((c) => c.name.toLowerCase().includes(selectedCrop.toLowerCase())) || CROPS_DATA[0];

  return (
    <section id="crop-wizard" className="py-16 sm:py-24 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>INTELLIGENT INPUT DISCOVERY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Find products for your crop
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto">
            Select what you are growing and your current field phenology. Our frontend discovery engine matches laboratory-grade crystal and chelate solutions instantly.
          </p>
        </div>

        {/* Wizard Controls Container */}
        <div className="bg-neutral-50 rounded-3xl border border-neutral-200/90 p-6 sm:p-8 mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Step 1: Crop Selection */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  What are you growing?
                </span>
                <span className="text-[11px] font-mono text-neutral-400">Select one crop</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CROP_OPTIONS.map((crop) => {
                  const isSelected = selectedCrop === crop.id;
                  return (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-800 shadow-md'
                          : 'bg-white text-neutral-800 border-neutral-200/80 hover:border-emerald-300 hover:bg-neutral-100/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{crop.icon}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                        {crop.name}
                      </p>
                      <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-emerald-300' : 'text-neutral-500'}`}>
                        {crop.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Growth Stage Selection */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Select Crop Stage
                </span>
                <span className="text-[11px] font-mono text-neutral-400">Current phenology</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STAGE_OPTIONS.map((stg) => {
                  const isSelected = selectedStage === stg.id;
                  return (
                    <button
                      key={stg.id}
                      onClick={() => setSelectedStage(stg.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950 text-white border-emerald-800 shadow-md'
                          : 'bg-white text-neutral-800 border-neutral-200/80 hover:border-emerald-300 hover:bg-neutral-100/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-emerald-300' : 'text-neutral-400'}`}>
                          {stg.period}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                        {stg.label}
                      </p>
                      <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {stg.focus}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Context Banner */}
          <div className="mt-6 pt-5 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Current Filter:
              </span>
              <span className="font-semibold text-emerald-900 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                {selectedCrop}
              </span>
              <span className="text-neutral-300">•</span>
              <span className="font-semibold text-emerald-900 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                {selectedStage}
              </span>
            </div>

            <Link
              href={`/crops/${activeCropInfo.slug}`}
              className="text-emerald-800 hover:text-emerald-950 font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View full {selectedCrop} schedule & calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Step 3: Recommended Products Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                Step 3: Recommendations
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                Recommended for {selectedCrop} ({displayProducts.length} formulations)
              </h3>
            </div>

            <Link
              href={`/shop?crop=${encodeURIComponent(selectedCrop)}`}
              className="text-xs sm:text-sm font-semibold text-neutral-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Explore all {selectedCrop} inputs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Transparent Agronomic Disclaimer */}
          <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Agronomic Guidance Notice:</strong> Product discovery is for informational and educational purposes. Always follow statutory product labels and certified agronomist instructions for local soil conditions, temperature flushes, and tank-mixing safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
