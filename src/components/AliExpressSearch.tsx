'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Globe, ExternalLink } from 'lucide-react';

interface AliExpressProduct {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  vendor: string;
  url: string;
  affiliateLink: string;
  commission: string;
  discount: string;
  currency: string;
  shipping: string;
  availability: string;
  source: string;
}

interface AliExpressSearchProps {
  initialKeywords?: string;
  category?: string;
  showFilters?: boolean;
}

export default function AliExpressSearch({ 
  initialKeywords = '', 
  category = '', 
  showFilters = true 
}: AliExpressSearchProps) {
  const [products, setProducts] = useState<AliExpressProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('SALE_PRICE_ASC');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const categories = [
    { id: '', name: 'All Categories' },
    { id: '509', name: 'Electronics' },
    { id: '1420', name: 'Mobile Phones' },
    { id: '200000343', name: 'Computer & Office' },
    { id: '66', name: 'Home & Garden' },
    { id: '7', name: 'Sports & Entertainment' },
    { id: '1503', name: 'Health & Beauty' },
    { id: '13', name: 'Jewelry & Accessories' },
    { id: '1501', name: 'Lights & Lighting' },
  ];

  const sortOptions = [
    { value: 'SALE_PRICE_ASC', label: 'Price: Low to High' },
    { value: 'SALE_PRICE_DESC', label: 'Price: High to Low' },
    { value: 'LAST_VOLUME_ASC', label: 'Best Selling' },
    { value: 'DISCOUNT_DESC', label: 'Highest Discount' },
    { value: 'COMMISSION_RATE_DESC', label: 'Highest Commission' },
  ];

  const searchProducts = async () => {
    if (!keywords.trim() && !selectedCategory) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        keywords: keywords.trim(),
        category: selectedCategory,
        page: currentPage.toString(),
        limit: '20',
        sort: sortBy,
        currency: 'USD',
        language: 'EN',
        country: 'US',
      });

      if (minPrice) params.append('minPrice', minPrice.toString());
      if (maxPrice) params.append('maxPrice', maxPrice.toString());

      const response = await fetch(`/api/aliexpress/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.error || 'Failed to search products');
      }
    } catch (err) {
      setError('Network error occurred while searching');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  useEffect(() => {
    if (initialKeywords || category) {
      searchProducts();
    }
  }, [sortBy, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    searchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            TechNova Global Marketplace
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover premium tech products with worldwide shipping and excellent customer service
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Search TechNova products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {showFilters && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Filters and Controls */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Price range:</label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice || ''}
                onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice || ''}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
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
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Searching TechNova products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                
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

                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.shipping}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && products.length === 0 && keywords && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}