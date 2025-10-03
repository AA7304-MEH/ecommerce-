import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { 
  Smartphone, 
  Watch, 
  Headphones, 
  Home, 
  Car, 
  Lightbulb, 
  Monitor,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const iconMap = {
  'phone-accessories': Smartphone,
  'smartwatches': Watch,
  'audio-gadgets': Headphones,
  'smart-home': Home,
  'car-gadgets': Car,
  'led-lighting': Lightbulb,
  'computer-accessories': Monitor
};

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Shop by Category
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Discover thousands of innovative gadgets and tech accessories across all our categories. 
            From phone accessories to smart home devices, we have everything you need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Categories</h2>
          <p className="text-gray-600 mb-8">Our most popular product categories with the latest gadgets</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.filter(cat => cat.featured).map((category) => {
              const IconComponent = iconMap[category.id as keyof typeof iconMap] || Smartphone;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-red-500" />
                        <span className="text-xs font-semibold">Hot</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.productCount.toLocaleString()} products available
                    </p>
                    <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                      <span className="text-sm font-medium">Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h2>
          <p className="text-gray-600 mb-8">Browse our complete collection of tech categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = iconMap[category.id as keyof typeof iconMap] || Smartphone;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {category.productCount.toLocaleString()} items
                      </p>
                      <div className="flex items-center text-primary-600 text-sm">
                        <span>Browse products</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular Searches */}
        <section className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Wireless Chargers',
              'Bluetooth Speakers',
              'Smart Watches',
              'Phone Cases',
              'LED Lights',
              'Car Accessories',
              'Gaming Accessories',
              'Smart Home',
              'Fitness Trackers',
              'Laptop Stands',
              'Cable Organizers',
              'Wireless Earbuds'
            ].map((search, index) => (
              <Link
                key={index}
                href={`/products?search=${encodeURIComponent(search)}`}
                className="px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors"
              >
                {search}
              </Link>
            ))}
          </div>
        </section>

        {/* Category Benefits */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Shop Our Categories?</h2>
              <p className="text-primary-100">
                Each category is carefully curated with the latest and most innovative products
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Latest Technology</h3>
                <p className="text-primary-100 text-sm">
                  Always up-to-date with the newest tech innovations and trending gadgets
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Watch className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-primary-100 text-sm">
                  Every product is sourced from verified suppliers with quality guarantees
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-primary-100 text-sm">
                  Competitive pricing with regular deals and discounts across all categories
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesPage;