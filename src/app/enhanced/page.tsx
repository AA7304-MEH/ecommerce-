'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  Zap, 
  Shield, 
  Truck, 
  RotateCcw,
  ArrowRight,
  Play,
  Award,
  Users,
  Globe,
  Sparkles,
  Gift,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import NewsletterPopup from '@/components/NewsletterPopup';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: "Smart Gadgets Revolution",
      subtitle: "Discover Tomorrow's Technology Today",
      description: "Shop thousands of innovative gadgets with free worldwide shipping",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      cta: "Shop Now",
      badge: "New Arrivals"
    },
    {
      id: 2,
      title: "Premium Tech Accessories",
      subtitle: "Enhance Your Digital Life",
      description: "Quality gadgets from trusted suppliers worldwide",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
      cta: "Explore",
      badge: "Best Sellers"
    },
    {
      id: 3,
      title: "Smart Home Revolution",
      subtitle: "Make Your Home Intelligent",
      description: "Transform your living space with cutting-edge technology",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      cta: "Discover",
      badge: "Trending"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  {slide.badge}
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                
                <h2 className="text-2xl lg:text-3xl text-yellow-300 font-semibold mb-6">
                  {slide.subtitle}
                </h2>
                
                <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/products"
                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors transform hover:scale-105"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {slide.cta}
                  </Link>
                  
                  <button className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Worldwide Shipping",
      description: "Free shipping on orders over $50 to 180+ countries",
      color: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "SSL encrypted checkout with multiple payment options",
      color: "bg-green-500"
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Easy returns and exchanges with full refund guarantee",
      color: "bg-purple-500"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Products from verified suppliers with quality guarantees",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose GadgetStore?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best shopping experience with quality products and exceptional service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+", color: "text-blue-600" },
    { icon: Globe, label: "Countries Served", value: "180+", color: "text-green-600" },
    { icon: Award, label: "Products Available", value: "10K+", color: "text-purple-600" },
    { icon: Star, label: "Average Rating", value: "4.8", color: "text-yellow-600" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Thousands Worldwide</h2>
          <p className="text-xl text-primary-100">Join our global community of tech enthusiasts</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-10 h-10" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Amazing products and super fast shipping! The gadgets I ordered exceeded my expectations. Highly recommend GadgetStore!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Best place to find the latest tech accessories. Great customer service and the quality is exactly as described. Will shop again!",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Love the variety of products and the mobile app works perfectly. The checkout process is smooth and secure. Fantastic experience!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Real feedback from our amazing community</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Gift className="w-20 h-20 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Upgrade Your Tech Game?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join thousands of satisfied customers and discover the latest gadgets with exclusive deals and free worldwide shipping!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            <ShoppingCart className="w-6 h-6" />
            Start Shopping Now
          </Link>
          
          <Link 
            href="/categories"
            className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Zap className="w-5 h-5" />
            Browse Categories
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const EnhancedHomePage = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const trendingProducts = [
    {
      id: '1',
      title: 'Wireless Charging Pad with LED Display',
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300&h=300&fit=crop',
      rating: 4.8,
      reviewCount: 1247,
      badge: 'Bestseller'
    },
    {
      id: '2',
      title: 'Smart Bluetooth Fitness Tracker',
      price: 59.99,
      originalPrice: 89.99,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 892,
      badge: 'New'
    },
    {
      id: '3',
      title: 'USB-C Multi-Port Hub with 4K HDMI',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 567,
      badge: 'Hot'
    },
    {
      id: '4',
      title: 'Smart RGB LED Strip Lights',
      price: 24.99,
      originalPrice: 39.99,
      discount: 38,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      rating: 4.6,
      reviewCount: 1583,
      badge: 'Trending'
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      
      {/* Trending Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              Trending Now
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🔥 Hot Selling Gadgets</h2>
            <p className="text-xl text-gray-600">Discover what everyone's talking about</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                  
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => addItem(product as any)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 group"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <StatsSection />
      <TestimonialsSection />
      <CTASection />

      {/* Newsletter Popup */}
      {showNewsletter && (
        <NewsletterPopup onClose={() => setShowNewsletter(false)} />
      )}
    </div>
  );
};

export default EnhancedHomePage;