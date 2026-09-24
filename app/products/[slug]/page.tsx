import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS_DATA.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Modern Fertilisers',
    };
  }

  return {
    title: `${product.name} | Modern Fertilisers`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Modern Fertilisers`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
