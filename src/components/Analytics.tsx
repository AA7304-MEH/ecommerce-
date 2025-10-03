'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/analytics';

// Google Analytics component for TechNova
const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics on component mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      const title = getPageTitle(pathname);
      trackPageView(window.location.href, title);
    }
  }, [pathname]);

  return null;
};

// Get TechNova-specific page titles for analytics
const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    '/': 'TechNova - World\'s First Global Tech Store',
    '/featured': 'TechNova Featured Products - Premium Tech Collection',
    '/deals': 'TechNova Deals - Best Tech Offers Worldwide',
    '/explore': 'TechNova Explore - Global Tech Marketplace',
    '/payments': 'TechNova Payments - 200+ International Payment Methods',
    '/reviews': 'TechNova Reviews - Customer Testimonials Worldwide',
    '/about': 'About TechNova - Global Tech Innovation Leader',
    '/contact': 'Contact TechNova - 24/7 Global Customer Support',
    '/blog': 'TechNova Blog - Latest Tech News & Reviews',
    '/checkout': 'TechNova Checkout - Secure Global Payment Processing',
    '/privacy-policy': 'TechNova Privacy Policy - Your Data Protection',
    '/shipping-policy': 'TechNova Shipping - Worldwide Delivery Options',
    '/refund-policy': 'TechNova Refund Policy - Customer Satisfaction Guarantee'
  };

  // Handle dynamic routes
  if (pathname.startsWith('/product/')) {
    return 'TechNova Product - Premium Tech Product Details';
  }
  if (pathname.startsWith('/category/')) {
    return 'TechNova Category - Tech Products by Category';
  }

  return titles[pathname] || `TechNova - ${pathname.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
};

export default Analytics;