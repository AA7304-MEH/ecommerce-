export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  tags: string[];
  shipping: {
    freeShipping: boolean;
    estimatedDays: string;
  };
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