'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Award, TrendingUp, Heart, CheckCircle, Quote, Play, ArrowRight, Zap } from 'lucide-react';

const heroTestimonials = [
  {
    id: 1,
    name: "James Mitchell",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    text: "TechNova's global shipping is incredible! Amazing quality from India to UK.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    text: "Outstanding international service and premium tech quality!",
    rating: 5
  },
  {
    id: 3,
    name: "Rahul Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    text: "Best tech store in India! Lightning-fast delivery and amazing products.",
    rating: 5
  }
];

const successStories = [
  {
    id: 1,
    customer: "Lisa Martinez",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    story: "I was hesitant about ordering tech from India to Canada, but TechNova completely exceeded my expectations! The premium wireless earbuds arrived within 4 days with perfect packaging. The sound quality rivals products costing twice as much. The noise cancellation is phenomenal for my daily subway commute. Customer service even followed up to ensure I was satisfied. This is how international e-commerce should work!",
    product: "Premium Wireless Earbuds Pro",
    rating: 5,
    timeAgo: "1 week ago",
    verified: true
  },
  {
    id: 2,
    customer: "Marcus Weber",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    story: "As a fitness enthusiast in Germany, I needed a reliable smartwatch for marathon training. TechNova's Smart Fitness Watch Ultra has been absolutely perfect! The GPS accuracy during my Berlin Marathon training runs was spot-on, health monitoring is incredibly detailed, and the battery easily lasts through my 6-day training weeks. The international shipping to Germany was surprisingly fast and hassle-free. Outstanding value for money!",
    product: "Smart Fitness Watch Ultra",
    rating: 5,
    timeAgo: "2 weeks ago",
    verified: true
  },
  {
    id: 3,
    customer: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    story: "Living in Tokyo, I have access to the latest tech, but TechNova impressed me with their unique product curation and international service. The RGB Gaming Headset Pro I ordered has exceptional build quality that matches Japanese standards. The 7.1 surround sound is perfect for my gaming setup, and the comfort during long sessions is remarkable. The customs clearance was smooth, and delivery to Japan was faster than many domestic orders. Highly recommended!",
    product: "RGB Gaming Headset Pro",
    rating: 5,
    timeAgo: "3 weeks ago", 
    verified: true
  }
];

const socialProof = [
  { platform: "Google Reviews (Global)", rating: 4.9, reviews: "50,000+", color: "bg-red-500" },
  { platform: "Trustpilot International", rating: 4.9, reviews: "25,000+", color: "bg-green-500" },
  { platform: "Facebook Worldwide", rating: 4.8, reviews: "35,000+", color: "bg-blue-600" },
  { platform: "Instagram Global", rating: 4.8, reviews: "75,000+", color: "bg-pink-500" }
];

export default function TechNova() {
  const [currentHeroTestimonial, setCurrentHeroTestimonial] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroTestimonial((prev) => (prev + 1) % heroTestimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Mega Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-medium text-lg">🚀 100,000+ Happy Customers</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Future Tech
                </span>
                <br />
                <span className="text-white drop-shadow-2xl">Today</span>
                <span className="text-yellow-400 animate-pulse">.</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-purple-100 mb-8 leading-relaxed">
                Join India's largest tech community and discover gadgets that 
                <span className="text-cyan-300 font-bold"> transform lives</span>
              </p>
              
              {/* Social Proof Numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400">100K+</div>
                  <div className="text-purple-200 text-sm">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400">4.9⭐</div>
                  <div className="text-purple-200 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-yellow-400">750+</div>
                  <div className="text-purple-200 text-sm">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-400">24/7</div>
                  <div className="text-purple-200 text-sm">Support</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <Link href="/featured" className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>🛍️ Shop Now</span>
                    <ArrowRight className="w-6 h-6" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/reviews" className="group border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-bold text-xl backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                  <Play className="w-6 h-6" />
                  <span>Watch Reviews</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Testimonial Cards */}
            <div className="relative">
              {/* Main Testimonial Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(heroTestimonials[currentHeroTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-white mb-6 italic">
                  "{heroTestimonials[currentHeroTestimonial].text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={heroTestimonials[currentHeroTestimonial].avatar}
                    alt={heroTestimonials[currentHeroTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <div>
                    <h4 className="font-bold text-white">{heroTestimonials[currentHeroTestimonial].name}</h4>
                    <p className="text-purple-200 text-sm">{heroTestimonials[currentHeroTestimonial].location}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Mini Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-cyan-400">⚡ Same Day</div>
                  <div className="text-white text-sm">Delivery</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-pink-400">🛡️ Lifetime</div>
                  <div className="text-white text-sm">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Millions Worldwide</h2>
            <p className="text-xl text-gray-600">See what customers are saying across all platforms</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialProof.map((platform) => (
              <div key={platform.platform} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{platform.platform}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">{platform.rating} ⭐</div>
                <div className="text-gray-600 text-sm">{platform.reviews} reviews</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-6 py-2 mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Customer Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Real Stories, Real <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Happiness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how TechNova has transformed the lives of thousands of tech enthusiasts worldwide - from India to USA, Canada to Japan
            </p>
          </div>

          {/* Story Showcase */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={successStories[currentStory].avatar}
                      alt={successStories[currentStory].customer}
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                    />
                    {successStories[currentStory].verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 w-8 h-8 text-green-500 bg-white rounded-full" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{successStories[currentStory].customer}</h3>
                  <p className="text-gray-600 mb-4">{successStories[currentStory].location}</p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(successStories[currentStory].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{successStories[currentStory].timeAgo}</p>
                </div>
                
                <div className="md:col-span-2">
                  <Quote className="w-12 h-12 text-purple-500 mb-6" />
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 italic">
                    "{successStories[currentStory].story}"
                  </p>
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4">
                    <p className="text-sm text-purple-700 font-medium">
                      Product: {successStories[currentStory].product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentStory ? 'bg-purple-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why 100,000+ Choose TechNova</h2>
            <p className="text-xl text-blue-100">The numbers speak for themselves</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold mb-2">99.8%</div>
              <h3 className="text-xl font-bold mb-2">Satisfaction Rate</h3>
              <p className="text-blue-100">Our customers love us</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-cyan-300" />
              </div>
              <div className="text-3xl font-bold mb-2">&lt; 24hrs</div>
              <h3 className="text-xl font-bold mb-2">Delivery Time</h3>
              <p className="text-blue-100">Lightning fast shipping</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-pink-300" />
              </div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-blue-100">Always here to help</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
              <div className="text-3xl font-bold mb-2">10M+</div>
              <h3 className="text-xl font-bold mb-2">Products Delivered</h3>
              <p className="text-blue-100">Trusted by millions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to Join the <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TechNova</span> Family?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience the future of tech shopping. Join 100,000+ satisfied customers who trust TechNova for their tech needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/featured" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Shopping Now 🚀
            </Link>
            <Link href="/reviews" className="border-2 border-gray-300 text-gray-700 px-12 py-6 rounded-2xl font-bold text-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}