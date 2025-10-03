// Google Analytics 4 integration for TechNova
// Tracking e-commerce events, user behavior, and conversion analytics

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: 'TechNova Global Tech Store',
    page_location: window.location.href,
    custom_map: {
      custom_parameter_1: 'brand',
      custom_parameter_2: 'store_type'
    }
  });

  // Set custom dimensions for TechNova
  window.gtag('config', GA_TRACKING_ID, {
    brand: 'TechNova',
    store_type: 'Global Tech Marketplace',
    currency: 'USD'
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title || 'TechNova - Global Tech Store'
  });
};

// E-commerce tracking for TechNova
export const trackPurchase = (transactionData: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
    item_brand?: string;
    item_variant?: string;
  }>;
  coupon?: string;
  shipping?: number;
  tax?: number;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'purchase', {
    transaction_id: transactionData.transaction_id,
    value: transactionData.value,
    currency: transactionData.currency,
    items: transactionData.items.map(item => ({
      ...item,
      item_brand: item.item_brand || 'TechNova'
    })),
    coupon: transactionData.coupon,
    shipping: transactionData.shipping,
    tax: transactionData.tax
  });
};

// Track add to cart events
export const trackAddToCart = (item: {
  currency: string;
  value: number;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
    item_brand?: string;
  }>;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'add_to_cart', {
    currency: item.currency,
    value: item.value,
    items: item.items.map(product => ({
      ...product,
      item_brand: product.item_brand || 'TechNova'
    }))
  });
};

// Track product views
export const trackViewItem = (item: {
  currency: string;
  value: number;
  item_id: string;
  item_name: string;
  category: string;
  item_brand?: string;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'view_item', {
    currency: item.currency,
    value: item.value,
    items: [{
      item_id: item.item_id,
      item_name: item.item_name,
      category: item.category,
      item_brand: item.item_brand || 'TechNova',
      price: item.value
    }]
  });
};

// Track search events
export const trackSearch = (searchTerm: string, results?: number) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: results,
    store_name: 'TechNova'
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (method: string = 'email') => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'sign_up', {
    method: method,
    brand: 'TechNova',
    campaign: 'newsletter_subscription'
  });
};

// Track custom TechNova events
export const trackCustomEvent = (eventName: string, parameters: any = {}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', eventName, {
    ...parameters,
    brand: 'TechNova',
    store_type: 'global_tech_marketplace'
  });
};

// Track user engagement
export const trackEngagement = (engagementType: 'contact' | 'support' | 'review' | 'wishlist' | 'share') => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'engagement', {
    engagement_type: engagementType,
    brand: 'TechNova',
    timestamp: new Date().toISOString()
  });
};

// Track payment method selection
export const trackPaymentMethod = (method: string, currency: string, value?: number) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'payment_method_selected', {
    payment_method: method,
    currency: currency,
    value: value,
    store: 'TechNova'
  });
};

// Enhanced e-commerce tracking for TechNova
export const trackBeginCheckout = (checkoutData: {
  currency: string;
  value: number;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  coupon?: string;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'begin_checkout', {
    currency: checkoutData.currency,
    value: checkoutData.value,
    items: checkoutData.items.map(item => ({
      ...item,
      item_brand: 'TechNova'
    })),
    coupon: checkoutData.coupon
  });
};

export const trackRemoveFromCart = (item: {
  currency: string;
  value: number;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  window.gtag('event', 'remove_from_cart', {
    currency: item.currency,
    value: item.value,
    items: item.items.map(product => ({
      ...product,
      item_brand: 'TechNova'
    }))
  });
};