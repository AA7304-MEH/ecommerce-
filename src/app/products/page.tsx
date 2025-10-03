'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Filter, 
  Search, 
  Star, 
  ShoppingCart, 
  Heart, 
  Grid, 
  List,
  SlidersHorizontal,
  X 
} from 'lucide-react';
import { sampleProducts } from '@/lib/data';
import { useCartStore } from '@/store/cart';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
type ViewMode = 'grid' | 'list';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem } = useCartStore();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'phone-accessories', label: 'Phone Accessories' },
    { value: 'smartwatches', label: 'Smartwatches & Wearables' },
    { value: 'audio-gadgets', label: 'Audio & Music Gadgets' },
    { value: 'smart-home', label: 'Smart Home Devices' },
    { value: 'car-gadgets', label: 'Car Gadgets' },
    { value: 'led-lighting', label: 'LED & Lighting' },
    { value: 'computer-accessories', label: 'Computer Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        // Keep featured order
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  const ProductCard = ({ product }: { product: typeof sampleProducts[0] }) => (
    <div className={`card group hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-64'} overflow-hidden`}>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        {viewMode === 'list' && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xl font-bold text-primary-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        <div className={`${viewMode === 'list' ? 'flex gap-2' : 'space-y-2'}`}>
          <button 
            onClick={() => addItem(product)}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          
          {viewMode === 'list' && (
            <Link 
              href={`/product/${product.id}`}
              className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search thousands of gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-64 space-y-6`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center justify-between">
                Filters
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(parseInt(e.target.value))}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-1 text-sm">{rating === 0 ? 'All' : `${rating}+ stars`}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {sampleProducts.length} products
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;