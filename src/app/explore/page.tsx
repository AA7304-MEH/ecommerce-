'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown, Zap, Award, Truck, Shield } from 'lucide-react';

const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Earbuds Pro",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    category: "Audio",
    brand: "TechPro",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    features: ["ANC", "30H Battery", "Quick Charge"],
    tags: ["wireless", "premium", "audio"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch Ultra",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Wearables",
    brand: "FitTech",
    rating: 4.9,
    reviews: 892,
    inStock: true,
    features: ["Health Monitor", "GPS", "7-Day Battery"],
    tags: ["smartwatch", "fitness", "health"]
  },
  {
    id: 3,
    name: "Wireless Gaming Headset",
    price: 4499,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
    category: "Gaming",
    brand: "GameMax",
    rating: 4.7,
    reviews: 654,
    inStock: true,
    features: ["7.1 Surround", "RGB Lighting", "50H Battery"],
    tags: ["gaming", "wireless", "rgb"]
  },
  {
    id: 4,
    name: "Smart Home Security Camera",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Smart Home",
    brand: "SecureHome",
    rating: 4.6,
    reviews: 423,
    inStock: true,
    features: ["4K Video", "Night Vision", "Motion Detection"],
    tags: ["security", "smart", "4k"]
  },
  {
    id: 5,
    name: "Portable Power Bank 20000mAh",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1609592439979-65b6b7e7ac1e?w=400",
    category: "Mobile",
    brand: "PowerMax",
    rating: 4.5,
    reviews: 1089,
    inStock: true,
    features: ["Fast Charging", "Wireless", "LED Display"],
    tags: ["powerbank", "portable", "wireless"]
  },
  {
    id: 6,
    name: "Bluetooth Car Adapter Pro",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
    category: "Car Tech",
    brand: "AutoTech",
    rating: 4.4,
    reviews: 756,
    inStock: false,
    features: ["Hands-free", "Music Streaming", "Dual USB"],
    tags: ["car", "bluetooth", "adapter"]
  },
  {
    id: 7,
    name: "RGB Mechanical Keyboard",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    category: "Computer",
    brand: "KeyMaster",
    rating: 4.8,
    reviews: 523,
    inStock: true,
    features: ["Mechanical Switches", "RGB Backlight", "USB-C"],
    tags: ["keyboard", "rgb", "mechanical"]
  },
  {
    id: 8,
    name: "Wireless Phone Stand & Charger",
    price: 2299,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    category: "Mobile",
    brand: "ChargeTech",
    rating: 4.3,
    reviews: 341,
    inStock: true,
    features: ["Wireless Charging", "Adjustable Stand", "LED Indicator"],
    tags: ["wireless", "charger", "stand"]
  }
];

const categories = ["All", "Audio", "Wearables", "Gaming", "Smart Home", "Mobile", "Car Tech", "Computer"];
const brands = ["All", "TechPro", "FitTech", "GameMax", "SecureHome", "PowerMax", "AutoTech", "KeyMaster", "ChargeTech"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity }
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 6;

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleLike = (productId: number) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedPriceRange(priceRanges[0]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore Our
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Tech Collection
              </span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Discover thousands of premium gadgets and tech accessories with advanced filtering and search
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, brands, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => {
                    const range = priceRanges.find(r => r.label === e.target.value);
                    if (range) setSelectedPriceRange(range);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <span>Search: {searchTerm}</span>
                <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-800">
                  ×
                </button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="text-purple-600 hover:text-purple-800">
                  ×
                </button>
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <span>Brand: {selectedBrand}</span>
                <button onClick={() => setSelectedBrand('All')} className="text-green-600 hover:text-green-800">
                  ×
                </button>
              </span>
            )}
            {selectedPriceRange.label !== 'All Prices' && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <span>Price: {selectedPriceRange.label}</span>
                <button onClick={() => setSelectedPriceRange(priceRanges[0])} className="text-orange-600 hover:text-orange-800">
                  ×
                </button>
              </span>
            )}
            {(searchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedPriceRange.label !== 'All Prices') && (
              <button
                onClick={clearFilters}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm hover:bg-red-200 transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            <span className="font-medium">{filteredProducts.length}</span> products found
            {searchTerm && <span> for "{searchTerm}"</span>}
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'} bg-gradient-to-br from-gray-100 to-gray-200`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Stock Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Wishlist Button */}
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

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </span>
                    )}
                  </div>

                  {viewMode === 'list' && (
                    <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Shop With Us?</h2>
            <p className="text-xl text-blue-100">Premium quality and exceptional service guaranteed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-blue-100">Carefully curated products from trusted brands</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-blue-100">Quick shipping across India with tracking</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
              <p className="text-blue-100">Safe and secure payment processing</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Latest Tech</h3>
              <p className="text-blue-100">Cutting-edge gadgets and innovations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}