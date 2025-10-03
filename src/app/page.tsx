'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { sampleProducts } from '@/lib/data';
import { 
  ArrowRight, 
  Star, 
  Smartphone, 
  Watch, 
  Headphones, 
  Home, 
  Car, 
  Lightbulb, 
  Monitor,
  Zap,
  Shield,
  Truck,
  Award,
  Users,
  TrendingUp,
  Heart,
  ShoppingCart,
  Quote
} from 'lucide-react';

const featuredCategories = [
  {
    id: 'phone-accessories',
    name: 'Phone Accessories',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    productCount: '3,500+',
    bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 'smartwatches',
    name: 'Smart Wearables',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=300&fit=crop',
    productCount: '1,200+',
    bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    id: 'audio-gadgets',
    name: 'Audio Gadgets',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    productCount: '1,800+',
    bgColor: 'bg-gradient-to-br from-red-500 to-orange-500'
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    productCount: '1,500+',
    bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500'
  }
];

const customerTestimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Mumbai, Maharashtra, India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b25c1c77?w=100",
    rating: 5,
    text: "TechNova completely changed how I shop for gadgets! The quality is amazing and delivery is super fast. My wireless earbuds are perfect!",
    product: "Premium Wireless Earbuds",
    verified: true
  },
  {
    id: 2,
    name: "James Mitchell",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    text: "Incredible international service! Ordered from the UK and received my smartwatch in just 3 days. Quality is outstanding, highly recommend TechNova!",
    product: "Smart Fitness Watch Ultra",
    verified: true
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 5,
    text: "Amazing global shipping to the US! The security camera I bought works flawlessly. TechNova's customer service is world-class. Will definitely order again!",
    product: "Smart Security Camera",
    verified: true
  },
  {
    id: 4,
    name: "Rahul Gupta",
    location: "Bangalore, Karnataka, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    text: "Best smartwatch I've ever owned! Health tracking is accurate and battery lasts for days. TechNova's customer service is outstanding.",
    product: "Smart Fitness Watch Ultra",
    verified: true
  },
  {
    id: 5,
    name: "Emma Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    text: "Shipped to Singapore without any issues! The gaming headset quality is exceptional. Perfect sound and comfort. TechNova exceeded my expectations!",
    product: "Gaming Headset Pro",
    verified: true
  },
  {
    id: 6,
    name: "Mohammed Al-Ahmad",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    text: "Fantastic experience ordering from Dubai! The power bank I received is perfect for business travels. Fast charging and premium build quality. Highly recommended!",
    product: "Portable Power Bank",
    verified: true
  }
];

const trendingProducts = [
  {
    id: '1',
    title: 'Wireless Charging Pad Pro',
    price: 2499,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300',
    rating: 4.9,
    reviews: 1547
  },
  {
    id: '2',
    title: 'Smart Fitness Tracker Ultra',
    price: 5999,
    originalPrice: 8999,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300',
    rating: 4.8,
    reviews: 1203
  },
  {
    id: '3',
    title: 'USB-C Hub 8-in-1',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300',
    rating: 4.9,
    reviews: 892
  },
  {
    id: '4',
    title: 'RGB Gaming Mouse Pro',
    price: 2999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
    rating: 4.7,
    reviews: 734
  }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % customerTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-spin opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium text-lg">🌍 World's First Global Tech Store</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Future Tech
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Delivered</span>
              <span className="text-yellow-400 animate-bounce">.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              The world's most advanced tech marketplace serving customers in 195+ countries. 
              <span className="text-cyan-300 font-semibold"> Premium quality</span>, 
              <span className="text-pink-300 font-semibold"> worldwide shipping</span>, 
              <span className="text-yellow-300 font-semibold"> 200+ payment methods</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/featured" className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10">🛍️ Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link href="/deals" className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                🎯 Explore Deals
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-400 mb-2">1M+</div>
                <div className="text-purple-200">Global Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-pink-400 mb-2">4.9⭐</div>
                <div className="text-purple-200">Perfect Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400 mb-2">195+</div>
                <div className="text-purple-200">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-400 mb-2">200+</div>
                <div className="text-purple-200">Payment Methods</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Customer Love Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-6 py-2 mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Love</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Amazing</span> Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join over 1 million satisfied customers across 195+ countries who trust TechNova for their tech needs
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center">
                <Quote className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8 italic">
                  "{customerTestimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <img
                    src={customerTestimonials[currentTestimonial].avatar}
                    alt={customerTestimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-purple-200"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <span>{customerTestimonials[currentTestimonial].name}</span>
                      {customerTestimonials[currentTestimonial].verified && (
                        <Shield className="w-5 h-5 text-green-500" />
                      )}
                    </h4>
                    <p className="text-gray-600">{customerTestimonials[currentTestimonial].location}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(customerTestimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  Purchased: {customerTestimonials[currentTestimonial].product}
                </div>
              </div>
            </div>
            
            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {customerTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-purple-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mini Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTestimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text.substring(0, 100)}..."</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover premium tech accessories across our most popular categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/explore?category=${category.id}`}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <div className={`absolute top-6 left-6 w-14 h-14 ${category.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {category.productCount} products
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                🔥 <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Trending</span> Now
              </h2>
              <p className="text-xl text-gray-600">
                Discover what's hot in tech right now
              </p>
            </div>
            <Link
              href="/featured"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105">
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                      likedProducts.has(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {product.title}
                  </h3>

                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-6 py-2 mb-6">
              <span className="text-2xl">🛒</span>
              <span className="font-medium">Shop Our Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Premium</span> Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our hand-picked collection of premium tech products, ready to ship worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sampleProducts.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 border border-gray-100"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(product.id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                      likedProducts.has(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description.substring(0, 100)}...
                  </p>

                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {product.shipping.freeShipping && (
                        <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                          Free Shipping
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    View Product
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              Shop All Products
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Payment & Global Reach Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium text-lg">💳 Global Payment Hub</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Pay</span> Your Way
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Shop with confidence using your preferred payment method. We support every major payment system across all continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Payment Methods */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <span className="text-3xl">🇮🇳</span>
                  <span>Indian Customers</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">RP</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Razorpay</h4>
                        <p className="text-purple-200">UPI, Cards, Wallets, Net Banking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                  <span className="text-3xl">🌍</span>
                  <span>International Customers</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">🅿️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">PayPal</h4>
                        <p className="text-purple-200">Credit Cards, PayPal Wallet, Global Coverage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-8 text-center">Global Reach</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400 mb-2">195+</div>
                  <div className="text-purple-200">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-400 mb-2">200+</div>
                  <div className="text-purple-200">Payment Methods</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400 mb-2">50+</div>
                  <div className="text-purple-200">Currencies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400 mb-2">24/7</div>
                  <div className="text-purple-200">Support</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/payments"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  View All Payment Methods
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose <span className="text-yellow-300">TechNova</span>?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience the difference with our premium service and quality guarantee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Every product is carefully curated and tested to meet our highest standards
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-10 h-10 text-cyan-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Express Delivery</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Express delivery to 195+ countries with local payment methods and currency support
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Dedicated customer support team ready to help you anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TechNova Product Excellence Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 mb-6">
              <span className="text-2xl">🚀</span>
              <span className="font-medium">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TechNova</span> Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our curated collection of premium tech products, carefully selected for quality and innovation
            </p>
            <Link
              href="/featured"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">🎆</span>
              Explore Collection
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🔍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Curated Selection</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every product is hand-picked by our tech experts for quality and innovation
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                All products meet our strict quality standards and come with warranty protection
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🌍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Global Delivery</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fast and secure delivery to your doorstep with full tracking and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            <span className="font-medium text-lg">🎯 Ready to Shop?</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start Your Journey
            </span>
            <br />
            <span className="text-white">Today</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join over 1 million happy customers worldwide. Shop premium tech products with global delivery and secure payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              href="/products"
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                Shop Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/featured"
              className="group border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                Featured Products
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-cyan-400 mb-2">1M+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-400 mb-2">4.9⭐</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-black text-purple-400 mb-2">195+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}