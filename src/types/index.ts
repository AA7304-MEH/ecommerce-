export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string; // Main product image
  images: string[];
  category: string;
  rating: number;
  reviews?: number; // Review count
  reviewCount?: number; // Alternative field name for compatibility
  features?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
  tags?: string[];
  shipping?: {
    freeShipping?: boolean;
    estimatedDays?: string;
  };
  // Additional fields for affiliate products
  vendor?: string;
  url?: string;
  affiliateLink?: string;
  commission?: string;
  currency?: string;
  availability?: string;
  source?: 'aliexpress' | 'amazon' | 'internal';
  brand?: string;
  color?: string;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: 'razorpay' | 'paypal';
  createdAt: string;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}