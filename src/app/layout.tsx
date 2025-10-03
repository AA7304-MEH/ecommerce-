import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Analytics from '@/components/Analytics';
import ZendeskWidget from '@/components/ZendeskWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TechNova - World\'s First Global Tech Store | Premium Gadgets Worldwide',
  description: 'The world\'s most advanced tech marketplace serving 195 countries. Premium gadgets, worldwide shipping, local payments. Shop cutting-edge technology from anywhere in the world!',
  keywords: 'global tech store, international gadgets, worldwide shipping, tech accessories, smartphones, smartwatches, audio devices, smart home, TechNova, premium tech, international payments',
  authors: [{ name: 'TechNova Global' }],
  openGraph: {
    title: 'TechNova - World\'s First Global Tech Store',
    description: 'The world\'s most advanced tech marketplace serving 195 countries. Premium gadgets, worldwide shipping, local payments for every country.',
    url: 'https://technova.global',
    siteName: 'TechNova Global',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'TechNova - World\'s First Global Tech Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechNova - World\'s First Global Tech Store',
    description: 'Premium gadgets with worldwide shipping and local payments for 195 countries.',
    images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <ZendeskWidget department="support" />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ShoppingCart />
        </div>
      </body>
    </html>
  );
}