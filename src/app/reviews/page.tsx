'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ThumbsUp, User, Calendar, CheckCircle, Award, TrendingUp, Heart } from 'lucide-react';

const customerReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra, India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b25c1c77?w=100",
    rating: 5,
    date: "2024-01-15",
    product: "Premium Wireless Earbuds Pro",
    title: "Amazing Sound Quality!",
    review: "These earbuds exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for my daily commute in Mumbai traffic!",
    verified: true,
    helpful: 34,
    images: ["https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200"]
  },
  {
    id: 2,
    name: "James Mitchell",
    location: "London, United Kingdom", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    date: "2024-01-14",
    product: "Smart Fitness Watch Ultra",
    title: "Brilliant Smartwatch!",
    review: "Ordered from the UK and delivery was surprisingly fast! This smartwatch is absolutely brilliant. The health monitoring features are spot-on and the build quality is premium. Worth every penny!",
    verified: true,
    helpful: 42,
    images: []
  },
  {
    id: 3,
    name: "Emma Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    date: "2024-01-13",
    product: "Wireless Gaming Headset",
    title: "Perfect for Gaming!",
    review: "Shipping to Singapore was super quick! These headsets are incredible for gaming. The 7.1 surround sound is immersive and the comfort during long gaming sessions is excellent. RGB lighting looks amazing!",
    verified: true,
    helpful: 38,
    images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=200"]
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    date: "2024-01-12",
    product: "Smart Fitness Watch Ultra",
    title: "Perfect Fitness Companion",
    review: "This smartwatch has completely transformed my fitness routine. The health monitoring features are accurate and the GPS tracking during runs is spot-on. Highly recommend!",
    verified: true,
    helpful: 28,
    images: []
  },
  {
    id: 5,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 5,
    date: "2024-01-11",
    product: "Smart Home Security Camera",
    title: "Outstanding Quality!",
    review: "International shipping to the US was flawless! The 4K video quality is crystal clear and the night vision mode works perfectly. Easy setup and the mobile app is intuitive. Great investment for home security!",
    verified: true,
    helpful: 46,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"]
  },
  {
    id: 6,
    name: "Sneha Patel",
    location: "Ahmedabad, Gujarat, India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 4,
    date: "2024-01-10",
    product: "Wireless Gaming Headset",
    title: "Great for Gaming Sessions",
    review: "Excellent audio quality for gaming. The RGB lighting is a nice touch and the comfort level is good even for long gaming sessions. Only minor issue is the charging cable could be longer.",
    verified: true,
    helpful: 22,
    images: ["https://images.unsplash.com/photo-1599669454699-248893623440?w=200"]
  },
  {
    id: 7,
    name: "Mohammed Al-Ahmad",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    date: "2024-01-09",
    product: "Portable Power Bank 20000mAh",
    title: "Essential Travel Companion",
    review: "Ordered from Dubai and received within 3 days! This power bank is a lifesaver during long business trips. Fast charging works excellently and the LED display shows exact percentage remaining. Quality is top-notch!",
    verified: true,
    helpful: 35,
    images: []
  },
  {
    id: 8,
    name: "Arjun Singh",
    location: "Delhi, NCR, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    date: "2024-01-08",
    product: "Smart Home Security Camera",
    title: "Peace of Mind",
    review: "Installation was straightforward and the 4K video quality is crystal clear. The night vision mode works perfectly. Great investment for home security.",
    verified: true,
    helpful: 31,
    images: []
  },
  {
    id: 9,
    name: "Lisa Martinez",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    rating: 5,
    date: "2024-01-07",
    product: "RGB Mechanical Keyboard",
    title: "Amazing Build Quality!",
    review: "Shipped to Canada without any issues! This mechanical keyboard is phenomenal. The switches feel incredible and the RGB customization options are endless. Perfect for both work and gaming. TechNova's packaging was excellent!",
    verified: true,
    helpful: 29,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200"]
  },
  {
    id: 10,
    name: "Meera Reddy",
    location: "Hyderabad, Telangana, India",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    rating: 5,
    date: "2024-01-05",
    product: "Portable Power Bank 20000mAh",
    title: "Reliable Power Backup",
    review: "This power bank has saved me multiple times during power outages and long travels. Fast charging works great and the LED display is very helpful to know remaining charge.",
    verified: true,
    helpful: 19,
    images: []
  },
  {
    id: 11,
    name: "Marcus Weber",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    date: "2024-01-04",
    product: "Bluetooth Speaker Pro",
    title: "Exceptional Sound Quality!",
    review: "Delivery to Germany was faster than expected! The sound quality is absolutely exceptional. Deep bass, crystal clear highs, and impressive battery life. Perfect for outdoor parties. The build quality feels premium and durable!",
    verified: true,
    helpful: 41,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200"]
  },
  {
    id: 12,
    name: "Vikram Joshi",
    location: "Pune, Maharashtra, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 4,
    date: "2024-01-03",
    product: "Bluetooth Car Adapter Pro",
    title: "Makes Old Car Smart",
    review: "Perfect solution for my older car. Music streaming quality is good and hands-free calling works without any issues. Good value for money.",
    verified: true,
    helpful: 15,
    images: []
  },
  {
    id: 13,
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    rating: 5,
    date: "2024-01-02",
    product: "Wireless Charging Station",
    title: "Innovative Design!",
    review: "International shipping to Japan was seamless! This charging station has a beautiful, minimalist design that fits perfectly with my workspace. Charges my iPhone, AirPods, and Apple Watch simultaneously. The convenience is unmatched!",
    verified: true,
    helpful: 33,
    images: []
  },
  {
    id: 14,
    name: "Kavya Nair",
    location: "Kochi, Kerala, India",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 5,
    date: "2024-01-01",
    product: "RGB Mechanical Keyboard",
    title: "Gaming Just Got Better!",
    review: "This keyboard is a game-changer! The mechanical switches feel amazing and the RGB lighting creates the perfect gaming atmosphere. TechNova's quality is unmatched!",
    verified: true,
    helpful: 42,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200"]
  },
  {
    id: 15,
    name: "David Thompson",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
    rating: 5,
    date: "2023-12-30",
    product: "Smart Car Dashboard Camera",
    title: "Top-Notch Quality!",
    review: "Ordered from Australia and the shipping was incredibly fast! This dashboard camera exceeded all my expectations. 4K recording is crystal clear, night vision is amazing, and the installation was straightforward. Highly recommend for road safety!",
    verified: true,
    helpful: 37,
    images: []
  },
  {
    id: 16,
    name: "Rohit Agarwal",
    location: "Jaipur, Rajasthan, India",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    rating: 5,
    date: "2023-12-28",
    product: "Wireless Charging Station",
    title: "Convenience Redefined",
    review: "No more cable mess on my desk! This charging station handles my phone, earbuds, and smartwatch simultaneously. Fast charging and sleek design. Love it!",
    verified: true,
    helpful: 27,
    images: []
  }
];

const testimonials = [
  {
    id: 1,
    name: "TechCrunch",
    role: "Technology Publication",
    content: "TechNova has revolutionized online tech retail with their curated selection and exceptional global shipping. A game-changer in the industry.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100"
  },
  {
    id: 2,
    name: "The Verge",
    role: "Tech Media Outlet",
    content: "Consistently delivers high-quality gadgets at competitive prices. Their international shipping and customer service set the gold standard.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100"
  },
  {
    id: 3,
    name: "Gadget Guru UK",
    role: "YouTube Channel",
    content: "One of the most reliable international e-commerce platforms for tech accessories. Authentic products and lightning-fast global delivery.",
    rating: 5,
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100"
  }
];

const stats = [
  { icon: Star, number: "4.9/5", label: "Average Rating", color: "text-yellow-500" },
  { icon: User, number: "100K+", label: "Happy Customers", color: "text-blue-500" },
  { icon: CheckCircle, number: "99.8%", label: "Satisfaction Rate", color: "text-green-500" },
  { icon: Award, number: "#1", label: "Customer Choice", color: "text-purple-500" }
];

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const filteredReviews = customerReviews
    .filter(review => selectedRating === 'all' || review.rating.toString() === selectedRating)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const toggleLike = (reviewId: number) => {
    const newLiked = new Set(likedReviews);
    if (newLiked.has(reviewId)) {
      newLiked.delete(reviewId);
    } else {
      newLiked.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 mb-6">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="font-medium">Customer Love</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Reviews &
              <span className="block text-yellow-300">Testimonials</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              See what our customers are saying about their TechMart experience
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter and Sort */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Customer Love</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real feedback from our 100,000+ satisfied customers worldwide - from India to USA, UK to Japan
              </p>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {review.verified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">Purchased:</p>
                <p className="font-medium text-gray-900">{review.product}</p>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-700 leading-relaxed">{review.review}</p>
              </div>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Customer photo"
                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                    />
                  ))}
                </div>
              )}

              {/* Review Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(review.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      likedReviews.has(review.id)
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Industry Experts Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from our 100,000+ satisfied customers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center">
                <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src={testimonial.logo}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Happy Customers</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the quality and service that thousands of customers love
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors duration-200">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}