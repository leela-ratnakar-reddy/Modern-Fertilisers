import React from 'react';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ShopByCrop } from '@/components/home/ShopByCrop';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { SmartCropWizard } from '@/components/home/SmartCropWizard';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { BrandStory } from '@/components/home/BrandStory';
import { QualityExperience } from '@/components/home/QualityExperience';
import { PromotionalSection } from '@/components/home/PromotionalSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 3. Hero Section */}
      <Hero />

      {/* 4. Trust/Benefit Strip */}
      <TrustStrip />

      {/* 5. Shop By Crop */}
      <ShopByCrop />

      {/* 6. Featured Products */}
      <FeaturedProducts />

      {/* 7. Smart Crop Solutions (Find products for your crop) */}
      <SmartCropWizard />

      {/* 8. Product Categories */}
      <CategoriesGrid />

      {/* 9. Brand Story */}
      <BrandStory />

      {/* 10. Quality/Experience Benchmarks */}
      <QualityExperience />

      {/* 11. Promotional Section */}
      <PromotionalSection />

      {/* 12. Final CTA */}
      <FinalCTA />
    </div>
  );
}
