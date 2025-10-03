'use client';

import { useState } from 'react';
import { Mail, Gift, X } from 'lucide-react';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup = ({ onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter_popup',
          interests: ['tech_deals', 'new_products']
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        console.error('Newsletter subscription failed:', data.error);
        // You could show an error message here
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to the Club!</h3>
          <p className="text-gray-600 mb-6">
            Check your email for your exclusive 10% discount code. It should arrive within the next few minutes.
          </p>
          
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Get 10% Off Your First Order!</h2>
          <p className="text-primary-100">
            Join thousands of gadget enthusiasts and get exclusive deals, new product alerts, and tech tips.
          </p>
        </div>
        
        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  Get My 10% Discount
                </>
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600">
              By subscribing, you agree to our{' '}
              <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
              . Unsubscribe at any time.
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Exclusive Deals</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>New Products</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Tech Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;