'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User,
  Heart,
  Phone,
  MapPin
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, toggleCart, getTotalItems } = useCartStore();
  
  const categories = [
    'Phone Accessories',
    'Smartwatches & Wearables',
    'Audio & Music Gadgets',
    'Smart Home Devices',
    'Car Gadgets',
    'LED & Lighting',
    'Computer Accessories'
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+1-800-GADGETS</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Free Worldwide Shipping</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/track-order" className="hover:text-primary-200">Track Order</Link>
            <Link href="/support" className="hover:text-primary-200">Support</Link>
            <Link href="/account" className="hover:text-primary-200">My Account</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TechNova Global</h1>
              <p className="text-xs text-gray-500 font-medium">🌍 World's First Global Tech Store</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search thousands of gadgets..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-6 h-6" />
            </button>

            {/* Account */}
            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-6 h-6" />
            </button>

            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search thousands of gadgets..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center gap-8 py-3">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-primary-600 font-medium">
              🌍 Global Shop
            </Link>
            <Link href="/featured" className="text-gray-700 hover:text-primary-600 font-medium">
              Featured
            </Link>
            <Link href="/deals" className="text-red-600 hover:text-red-700 font-medium">
              🔥 Deals
            </Link>
            <Link href="/payments" className="text-green-600 hover:text-green-700 font-medium">
              💳 Payments
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-primary-600 font-medium">
              ⭐ Reviews
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium">
              Blog
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-primary-600 font-medium">
              🎧 Support
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
            <Link href="/amazon-demo" className="text-orange-600 hover:text-orange-700 font-medium">
              🚀 Amazon Demo
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-3">
                <Link href="/" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </Link>
                <Link href="/explore" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Explore
                </Link>
                <Link href="/featured" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Featured
                </Link>
                <Link href="/deals" className="block text-red-600 hover:text-red-700 font-medium">
                  🔥 Deals
                </Link>
                <Link href="/payments" className="block text-green-600 hover:text-green-700 font-medium">
                  💳 Payments
                </Link>
                <Link href="/reviews" className="block text-gray-700 hover:text-primary-600 font-medium">
                  ⭐ Reviews
                </Link>
                <Link href="/blog" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Blog
                </Link>
                <Link href="/support" className="block text-gray-700 hover:text-primary-600 font-medium">
                  🎧 Support
                </Link>
                <Link href="/contact" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Contact
                </Link>
                <Link href="/amazon-demo" className="block text-orange-600 hover:text-orange-700 font-medium">
                  🚀 Amazon Demo
                </Link>
                <hr className="my-3" />
                <Link href="/account" className="block text-gray-700 hover:text-primary-600">
                  My Account
                </Link>
                <Link href="/wishlist" className="block text-gray-700 hover:text-primary-600">
                  Wishlist
                </Link>
                <Link href="/track-order" className="block text-gray-700 hover:text-primary-600">
                  Track Order
                </Link>
                <Link href="/support" className="block text-gray-700 hover:text-primary-600">
                  Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;