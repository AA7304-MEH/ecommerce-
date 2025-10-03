'use client';

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HeadphonesIcon,
  Globe
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      detail: 'support@gadgetstore.com',
      action: 'mailto:support@gadgetstore.com',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '24/7 phone assistance',
      detail: '+1-800-GADGETS',
      action: 'tel:+18004233387',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us instantly',
      detail: '+1 (555) 123-4567',
      action: 'https://wa.me/15551234567',
      color: 'bg-emerald-500'
    },
    {
      icon: HeadphonesIcon,
      title: 'Live Chat',
      description: 'Real-time support',
      detail: 'Available 24/7',
      action: '#',
      color: 'bg-purple-500'
    }
  ];

  const supportCategories = [
    'Order Tracking & Shipping',
    'Product Information',
    'Returns & Refunds',
    'Payment Issues',
    'Technical Support',
    'Wholesale Inquiries',
    'Partnership Opportunities',
    'General Questions'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Have questions? Need help? Our dedicated support team is here to assist you 24/7. 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Methods</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                          <p className="text-primary-600 font-medium">{method.detail}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Support</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Response</span>
                  <span className="font-medium">Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Support</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Live Chat</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-600" />
                Global Support
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900">Headquarters</h4>
                  <p className="text-gray-600">San Francisco, CA, USA</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Support Centers</h4>
                  <p className="text-gray-600">USA, India, Singapore, UK</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Languages</h4>
                  <p className="text-gray-600">English, Spanish, French, German, Chinese, Japanese, Hindi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 2 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select a topic...</option>
                      {supportCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="input-field resize-none"
                      placeholder="Please describe your question or concern in detail..."
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      By submitting this form, you agree to our{' '}
                      <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="/terms-of-service" className="text-primary-600 hover:text-primary-700">
                        Terms of Service
                      </a>
                      . We'll only use your information to respond to your inquiry.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How long does shipping take?</h3>
                <p className="text-gray-600 text-sm">
                  Standard shipping takes 3-15 business days depending on your location. 
                  All orders include free tracking.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What is your return policy?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day return policy for all products. Items must be in 
                  original condition with packaging.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you ship worldwide?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! We ship to over 180 countries worldwide with free shipping 
                  on orders over $50.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are your products authentic?</h3>
                <p className="text-gray-600 text-sm">
                  All our products are sourced from verified suppliers and come with 
                  quality guarantees.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">
                  We accept major credit cards, PayPal, and for Indian customers: 
                  UPI, wallets, and net banking via Razorpay.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I track my order?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you'll receive a tracking number via email once your order ships. 
                  You can track it on our website or the courier's site.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer wholesale prices?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we offer wholesale pricing for bulk orders. Contact us with 
                  your requirements for a custom quote.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How can I become an affiliate?</h3>
                <p className="text-gray-600 text-sm">
                  We have an affiliate program! Contact us for details on how to 
                  earn commissions by promoting our products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;