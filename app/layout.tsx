import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Modern Fertilisers | Better Nutrition. Better Growth.',
  description:
    'Explore modern agricultural inputs, crop-focused solutions and a premium online shopping experience from Modern Fertilisers.',
  keywords: [
    'fertilizers',
    'water soluble fertilizers',
    'micronutrients',
    'bio-fertilisers',
    'crop nutrition',
    'chilli farming',
    'rice cultivation',
    'cotton nutrition',
    'agriculture e-commerce',
  ],
  authors: [{ name: 'Modern Fertilisers Team' }],
  openGraph: {
    title: 'Modern Fertilisers | Better Nutrition. Better Growth.',
    description:
      'Precision crop nutrition, high-solubility crystalline inputs, and stage-specific schedules for modern agriculture.',
    siteName: 'Modern Fertilisers',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fbfbf9] text-neutral-900">
        <AppProviders>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
