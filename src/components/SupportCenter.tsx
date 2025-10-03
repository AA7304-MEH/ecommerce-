'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail, HeadphonesIcon, Clock, CheckCircle } from 'lucide-react';
import { zendeskService } from '@/lib/zendesk';

// TechNova Support Center component
const SupportCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportOptions = [
    {
      id: 'live_chat',
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our TechNova experts instantly',
      available: '24/7',
      responseTime: 'Immediate',
      action: () => zendeskService.openChat(),
      color: 'bg-blue-500'
    },
    {
      id: 'phone_support',
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our tech specialists',
      available: '24/7',
      responseTime: 'Immediate',
      action: () => window.open('tel:+1-800-TECHNOVA'),
      color: 'bg-green-500'
    },
    {
      id: 'email_support',
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions',
      available: 'Always',
      responseTime: 'Within 2 hours',
      action: () => zendeskService.openTicketForm(),
      color: 'bg-purple-500'
    },
    {
      id: 'help_center',
      icon: HeadphonesIcon,
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      available: 'Always',
      responseTime: 'Instant',
      action: () => zendeskService.openHelpCenter(),
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      title: 'Track Your Order',
      description: 'Get real-time updates on your TechNova order',
      action: () => zendeskService.createTicket({
        subject: 'Order Tracking Request',
        description: 'I need help tracking my TechNova order.',
        type: 'question',
        tags: ['order_tracking']
      })
    },
    {
      title: 'Return & Refund',
      description: 'Start a return or refund process',
      action: () => zendeskService.createTicket({
        subject: 'Return/Refund Request',
        description: 'I would like to return or refund my TechNova purchase.',
        type: 'incident',
        tags: ['returns', 'refunds']
      })
    },
    {
      title: 'Product Support',
      description: 'Get help with your TechNova products',
      action: () => {
        zendeskService.setDepartment('technical');
        zendeskService.openChat();
      }
    },
    {
      title: 'Payment Issues',
      description: 'Resolve payment or billing concerns',
      action: () => {
        zendeskService.setDepartment('billing');
        zendeskService.openTicketForm();
      }
    }
  ];

  const faqCategories = [
    { id: 'all', name: 'All Topics', count: 45 },
    { id: 'orders', name: 'Orders & Shipping', count: 12 },
    { id: 'products', name: 'Products', count: 15 },
    { id: 'payments', name: 'Payments', count: 8 },
    { id: 'returns', name: 'Returns', count: 6 },
    { id: 'technical', name: 'Technical', count: 4 }
  ];

  const popularQuestions = [
    {
      question: 'How long does international shipping take?',
      answer: 'TechNova offers express international shipping to 195+ countries. Standard delivery takes 3-15 business days depending on your location.',
      category: 'orders'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept 200+ payment methods including all major credit cards, PayPal, UPI, digital wallets, and cryptocurrency.',
      category: 'payments'
    },
    {
      question: 'Do TechNova products come with warranty?',
      answer: 'Yes! All TechNova products come with manufacturer warranty plus our additional TechNova quality guarantee.',
      category: 'products'
    },
    {
      question: 'How can I track my order?',
      answer: 'You\'ll receive a tracking number via email once your order ships. You can also track orders in your TechNova account.',
      category: 'orders'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all TechNova products. Items must be in original condition with packaging.',
      category: 'returns'
    }
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? popularQuestions 
    : popularQuestions.filter(q => q.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            TechNova <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Support Center</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert help with your TechNova products and services. Our global support team is available 24/7.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                onClick={option.action}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className={`w-14 h-14 ${option.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{option.available}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{option.responseTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredQuestions.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button
              onClick={() => zendeskService.openChat()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors duration-200"
            >
              Chat with TechNova Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;