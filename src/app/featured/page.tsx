'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Filter, Grid, List, TrendingUp, Award, Shield, Zap } from 'lucide-react';

const featuredProducts = [
  {
    id: 'tn001',
    title: 'TechNova Wireless Charging Station Pro',
    price: 2999,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 1247,
    category: 'Charging Solutions',
    badge: 'Best Seller',
    features: ['15W Fast Charging', '3-Device Support', 'LED Indicators']
  },
  {
    id: 'tn002',
    title: 'TechNova Smart Fitness Tracker Ultra',
    price: 5999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2103,
    category: 'Wearables',
    badge: 'Editor\'s Choice',
    features: ['Heart Rate Monitor', '7-Day Battery', 'Water Resistant']
  },
  {
    id: 'tn003',
    title: 'TechNova USB-C Hub 8-in-1 Premium',
    price: 3499,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 892,
    category: 'Computer Accessories',
    badge: 'New Arrival',
    features: ['8 Ports', '4K HDMI', 'Fast Data Transfer']
  },
  {
    id: 'tn004',
    title: 'TechNova Gaming Mouse RGB Pro',
    price: 2999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1534,
    category: 'Gaming',
    badge: 'Gaming',
    features: ['12000 DPI', 'RGB Lighting', 'Programmable Buttons']
  },
  {
    id: 'tn005',
    title: 'TechNova Bluetooth Earbuds Elite',
    price: 4999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1876,
    category: 'Audio',
    badge: 'Premium',
    features: ['Active Noise Cancelling', '30H Battery', 'Wireless Charging']
  },
  {
    id: 'tn006',
    title: 'TechNova Smart Home Security Camera',
    price: 6999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 743,
    category: 'Smart Home',
    badge: 'Smart Choice',
    features: ['1080p HD', 'Night Vision', 'Motion Detection']
  }
];

const categories = [
  { name: 'All Products', count: 2500, active: true },
  { name: 'Audio', count: 450, active: false },
  { name: 'Wearables', count: 320, active: false },
  { name: 'Charging Solutions', count: 280, active: false },
  { name: 'Computer Accessories', count: 380, active: false },
  { name: 'Gaming', count: 290, active: false },
  { name: 'Smart Home', count: 180, active: false }
];

export default function FeaturedPage() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Best Seller': 'bg-red-500',
      'Editor\'s Choice': 'bg-purple-500',
      'New Arrival': 'bg-green-500',
      'Gaming': 'bg-blue-500',
      'Premium': 'bg-yellow-500',
      'Smart Choice': 'bg-teal-500'
    };
    return colors[badge] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="font-medium">Premium Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="text-white">Products</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Discover our handpicked collection of premium tech products. 
            <span className="text-yellow-300 font-semibold"> Quality guaranteed</span>, 
            <span className="text-green-300 font-semibold"> fast delivery</span>, 
            <span className="text-orange-300 font-semibold"> expert support</span>
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">2500+</div>
              <div className="text-blue-200">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">4.8★</div>
              <div className="text-blue-200">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-2">24H</div>
              <div className="text-blue-200">Fast Shipping</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-300 mb-2">100%</div>
              <div className="text-blue-200">Authentic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-square'}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {product.badge}
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                      likedProducts.has(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Discount Badge */}
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-2">
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TechNova Promise */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-yellow-300">TechNova</span> Promise
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              When you shop with TechNova, you're not just buying products - you're investing in quality, innovation, and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
              <p className="text-blue-100">Every product is tested and verified to meet our premium standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-blue-100">Express shipping worldwide with tracking and insurance included</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-blue-100">24/7 customer support from our team of tech specialists</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}