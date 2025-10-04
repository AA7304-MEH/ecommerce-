'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ShoppingCart, Star } from 'lucide-react';

const AmazonDemoPage = () => {
  // Demo product using your affiliate link
  const amazonProduct = {
    id: 'amazon-demo',
    title: 'Demo Amazon Product',
    price: 0, // Will be determined by Amazon
    originalPrice: 0,
    image: '/api/placeholder/400/400', // Placeholder image
    images: ['/api/placeholder/400/400'],
    rating: 4.5,
    reviewCount: 0,
    category: 'amazon',
    features: [
      'High-quality product from Amazon',
      'Fast and reliable shipping',
      'Customer reviews and ratings available',
      'Secure payment processing'
    ],
    description: 'This is a demonstration of how Amazon products with your affiliate links will appear on your website.',
    affiliateLink: 'https://amzn.to/46PLp1r', // Your affiliate link
    affiliateText: 'Buy on Amazon',
    commission: '8%',
    vendor: 'Amazon',
    source: 'amazon'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Amazon Affiliate Demo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Amazon Associates Integration Demo
          </h1>
          <p className="text-gray-600">
            This page demonstrates how your Amazon affiliate link ({amazonProduct.affiliateLink}) is integrated into your website.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Display */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden border">
              <div className="relative h-96">
                <Image
                  src={amazonProduct.image}
                  alt={amazonProduct.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {amazonProduct.title}
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(amazonProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {amazonProduct.rating} stars
                </span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-600">Source: </span>
                <span className="text-sm font-semibold text-orange-600">{amazonProduct.vendor}</span>
                <span className="text-sm text-gray-600 ml-2">(Affiliate Partner)</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {amazonProduct.description}
              </p>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul className="space-y-1">
                  {amazonProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Affiliate Link Button */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Commission Rate:</span>
                  <span className="text-green-600 font-semibold">{amazonProduct.commission}</span>
                </div>

                <a
                  href={amazonProduct.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  {amazonProduct.affiliateText}
                </a>

                <p className="text-sm text-gray-600 text-center">
                  Your affiliate link: <code className="bg-gray-100 px-2 py-1 rounded">{amazonProduct.affiliateLink}</code>
                </p>
              </div>
            </div>

            {/* Integration Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Integration Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-blue-800">Affiliate link active and working</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-blue-800">Waiting for PA API approval to fetch live products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-800">Associate tag: techgen001-21 configured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Complete PA API Setup</h4>
              <p className="text-gray-600 text-sm mb-3">
                Once Amazon approves your PA API access, you'll get AWS credentials to fetch live Amazon products automatically.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Full Integration</h4>
              <p className="text-gray-600 text-sm mb-3">
                Amazon products will appear alongside your AliExpress products with automatic affiliate link generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonDemoPage;