import React from 'react';
import { ShieldCheck, Sprout, ShoppingCart, FileText } from 'lucide-react';

export function TrustStrip() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'QUALITY-FIRST PRODUCTS',
      description: 'Zero-sediment soluble formulations and chelated minerals.',
    },
    {
      icon: Sprout,
      title: 'CROP-FOCUSED DISCOVERY',
      description: 'Nutrition targeted for Chilli, Rice, Cotton, and Vegetables.',
    },
    {
      icon: ShoppingCart,
      title: 'EASY ONLINE ORDERING',
      description: 'Streamlined checkout with demo UPI, cards, and COD simulation.',
    },
    {
      icon: FileText,
      title: 'CLEAR PRODUCT INFORMATION',
      description: 'Transparent nutrient breakdowns, dosages, and application timing.',
    },
  ];

  return (
    <section className="bg-white border-y border-neutral-200/90 py-6 sm:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div key={i} className="flex items-start gap-3.5 group">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-100/70 transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed font-normal">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
