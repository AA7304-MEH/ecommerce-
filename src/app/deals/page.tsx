'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, 
  Star, 
  ShoppingCart, 
  Heart, 
  Zap, 
  Flame, 
  Trophy,
  Gift,
  TrendingUp,
  ArrowRight,
  Timer,
  Percent
} from 'lucide-react';

const DealsPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashDeals = [
    {
      id: '1',
      title: 'Wireless Earbuds Pro Max',
      originalPrice: 149.99,
      dealPrice: 59.99,
      discount: 60,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 2847,
      sold: 1234,
      stock: 89,
      badge: 'Flash Deal'
    },
    {
      id: '2',
      title: 'Smart Fitness Watch Ultra',
      originalPrice: 299.99,
      dealPrice: 129.99,
      discount: 57,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 1923,
      sold: 987,
      stock: 45,
      badge: 'Limited Time'
    },
    {
      id: '3',
      title: 'RGB Gaming Keyboard Mechanical',
      originalPrice: 199.99,
      dealPrice: 89.99,
      discount: 55,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 1564,
      sold: 756,
      stock: 67,
      badge: 'Hot Deal'
    },
    {
      id: '4',
      title: 'Portable Wireless Charger Stand',
      originalPrice: 79.99,
      dealPrice: 29.99,
      discount: 63,
      image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 3021,
      sold: 2145,
      stock: 23,
      badge: 'Almost Gone'
    }
  ];

  const dailyDeals = [
    {
      id: '5',
      title: 'Smart Home Security Camera 4K',
      originalPrice: 249.99,
      dealPrice: 119.99,
      discount: 52,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 892,
      endTime: '23:59:59'
    },
    {
      id: '6',
      title: 'Bluetooth Speaker Waterproof',
      originalPrice: 89.99,
      dealPrice: 39.99,
      discount: 56,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 1456,
      endTime: '23:59:59'
    },
    {
      id: '7',
      title: 'USB-C Hub 7-in-1 Multi-Port',
      originalPrice: 69.99,
      dealPrice: 34.99,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 567,
      endTime: '23:59:59'
    },
    {
      id: '8',
      title: 'LED Strip Lights Smart RGB',
      originalPrice: 49.99,
      dealPrice: 19.99,
      discount: 60,
      image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop',
      rating: 4.5,
      reviews: 2134,
      endTime: '23:59:59'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg mb-6 animate-pulse">
              <Flame className="w-6 h-6" />
              MEGA SALE EVENT
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Up to 70% OFF
            </h1>
            
            <p className="text-2xl mb-8 text-pink-100">
              Limited Time Flash Deals on Premium Gadgets
            </p>

            {/* Countdown Timer */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Timer className="w-6 h-6" />
                Sale Ends In:
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-2">
                      <div className="text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="text-sm uppercase tracking-wide text-pink-200">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors transform hover:scale-105">
                Shop Flash Deals
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                View All Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold mb-4">
              <Zap className="w-5 h-5" />
              Flash Deals
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">⚡ Lightning Deals</h2>
            <p className="text-xl text-gray-600">Grab these amazing deals before they're gone!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-red-200"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    -{deal.discount}%
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {deal.badge}
                  </div>

                  {deal.stock < 50 && (
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Only {deal.stock} left!
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">{deal.title}</h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({deal.reviews})</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-red-600">${deal.dealPrice}</span>
                      <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      Save ${(deal.originalPrice - deal.dealPrice).toFixed(2)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Sold: {deal.sold}</span>
                      <span>Stock: {deal.stock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Deals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold mb-4">
              <Clock className="w-5 h-5" />
              Daily Deals
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🎯 Today's Special Offers</h2>
            <p className="text-xl text-gray-600">New deals every day - Don't miss out!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dailyDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border group"
              >
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{deal.discount}%
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors cursor-pointer" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{deal.title}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({deal.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-blue-600">${deal.dealPrice}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                  
                  <div className="text-center mb-3 p-2 bg-yellow-50 rounded text-sm">
                    <div className="flex items-center justify-center gap-1 text-orange-600 font-semibold">
                      <Clock className="w-4 h-4" />
                      Ends at {deal.endTime}
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Deal Category</h2>
            <p className="text-xl text-gray-600">Find the best deals in your favorite categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Electronics & Gadgets',
                discount: 'Up to 60% OFF',
                image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Smart Home Devices',
                discount: 'Up to 55% OFF',
                image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Audio & Accessories',
                discount: 'Up to 70% OFF',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`} />
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-xl font-semibold mb-4">{category.discount}</p>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Gift className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold mb-4">Never Miss a Deal Again!</h2>
            <p className="text-xl leading-relaxed">
              Subscribe to get exclusive deals, flash sale alerts, and early access to our biggest discounts!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Get Deals
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              <span>Exclusive Discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Early Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>VIP Treatment</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealsPage;