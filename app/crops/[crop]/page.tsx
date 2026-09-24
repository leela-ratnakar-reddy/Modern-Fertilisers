import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CROPS_DATA } from '@/data/crops';
import { CropSolutionView } from '@/components/crop/CropSolutionView';

interface CropPageProps {
  params: Promise<{
    crop: string;
  }>;
}

export async function generateStaticParams() {
  return CROPS_DATA.map((c) => ({
    crop: c.slug,
  }));
}

export async function generateMetadata({ params }: CropPageProps): Promise<Metadata> {
  const { crop: cropSlug } = await params;
  const crop = CROPS_DATA.find((c) => c.slug === cropSlug.toLowerCase());

  if (!crop) {
    return {
      title: 'Crop Solution Not Found | Modern Fertilisers',
    };
  }

  return {
    title: `${crop.name} Nutrition Solutions & Schedule | Modern Fertilisers`,
    description: crop.tagline,
  };
}

export default async function CropDetailPage({ params }: CropPageProps) {
  const { crop: cropSlug } = await params;
  const crop = CROPS_DATA.find((c) => c.slug === cropSlug.toLowerCase());

  if (!crop) {
    notFound();
  }

  return <CropSolutionView crop={crop} />;
}
