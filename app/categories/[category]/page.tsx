import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES_DATA } from '@/data/categories';
import { CategoryView } from '@/components/category/CategoryView';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES_DATA.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = CATEGORIES_DATA.find((c) => c.slug === catSlug.toLowerCase());

  if (!category) {
    return {
      title: 'Category Not Found | Modern Fertilisers',
    };
  }

  return {
    title: `${category.name} | Modern Fertilisers`,
    description: category.shortDescription,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = CATEGORIES_DATA.find((c) => c.slug === catSlug.toLowerCase());

  if (!category) {
    notFound();
  }

  return <CategoryView category={category} />;
}
