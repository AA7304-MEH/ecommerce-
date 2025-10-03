'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight, Tag, Heart, Share2, BookOpen, TrendingUp } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Wireless Audio: What to Expect in 2024",
    excerpt: "Discover the latest innovations in wireless audio technology, from advanced noise cancellation to spatial audio experiences.",
    content: "Wireless audio technology continues to evolve at a rapid pace...",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
    author: "Tech Editor",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Audio Technology",
    tags: ["Wireless", "Audio", "Innovation", "2024"],
    featured: true,
    likes: 245,
    shares: 89
  },
  {
    id: 2,
    title: "Smart Home Security: Complete Guide to Protecting Your Home",
    excerpt: "Learn how to set up a comprehensive smart home security system with the latest cameras, sensors, and monitoring solutions.",
    content: "Smart home security has become more accessible and affordable...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    author: "Security Expert",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Smart Home",
    tags: ["Security", "Smart Home", "IoT", "Safety"],
    featured: false,
    likes: 189,
    shares: 67
  },
  {
    id: 3,
    title: "Gaming Headsets 2024: Performance Meets Comfort",
    excerpt: "Our comprehensive review of the best gaming headsets available, focusing on audio quality, comfort, and features.",
    content: "Gaming headsets have evolved significantly in recent years...",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600",
    author: "Gaming Reviewer",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Gaming",
    tags: ["Gaming", "Headsets", "Review", "Audio"],
    featured: true,
    likes: 312,
    shares: 145
  },
  {
    id: 4,
    title: "Fitness Trackers vs Smart Watches: Which Should You Choose?",
    excerpt: "A detailed comparison between fitness trackers and smartwatches to help you make the right choice for your lifestyle.",
    content: "The wearable technology market offers numerous options...",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    author: "Fitness Tech",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Wearables",
    tags: ["Fitness", "Smartwatch", "Health", "Comparison"],
    featured: false,
    likes: 178,
    shares: 92
  },
  {
    id: 5,
    title: "Car Tech Accessories Every Driver Needs in 2024",
    excerpt: "Essential car tech accessories that enhance safety, convenience, and entertainment for modern drivers.",
    content: "Modern vehicles are becoming increasingly connected...",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600",
    author: "Auto Tech",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Car Tech",
    tags: ["Car", "Accessories", "Safety", "Technology"],
    featured: false,
    likes: 156,
    shares: 78
  },
  {
    id: 6,
    title: "Power Banks: How to Choose the Perfect Portable Charger",
    excerpt: "Everything you need to know about selecting the right power bank for your devices and usage patterns.",
    content: "With our increasing reliance on mobile devices...",
    image: "https://images.unsplash.com/photo-1609592439979-65b6b7e7ac1e?w=600",
    author: "Mobile Expert",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Mobile",
    tags: ["Power Bank", "Mobile", "Charging", "Portable"],
    featured: false,
    likes: 134,
    shares: 56
  }
];

const categories = ["All", "Audio Technology", "Smart Home", "Gaming", "Wearables", "Car Tech", "Mobile"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'All' || post.category === selectedCategory
  );

  const featuredPosts = blogPosts.filter(post => post.featured);

  const toggleLike = (postId: number) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 mb-6">
              <BookOpen className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Tech Insights & Reviews</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Tech Blog
              <span className="block text-yellow-300">& News</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest tech trends, product reviews, and buying guides from our expert team
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <article
                key={post.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`relative ${index === 0 ? 'h-80' : 'h-64'} overflow-hidden`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Article Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className={`font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-200 ${
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-gray-200 mb-4 ${index === 0 ? 'text-lg' : 'text-base'}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      likedPosts.has(post.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author and Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium text-sm group/link"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get the latest tech news and reviews delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 border-0 focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}