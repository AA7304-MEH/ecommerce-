'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Globe, Shield, CheckCircle, Star, ArrowRight } from 'lucide-react';

const paymentMethods = [
  {
    region: "Global Credit & Debit Cards",
    icon: CreditCard,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    methods: [
      { name: "Visa", countries: "195+ countries", logo: "💳" },
      { name: "Mastercard", countries: "210+ countries", logo: "💳" },
      { name: "American Express", countries: "130+ countries", logo: "💳" },
      { name: "Discover", countries: "185+ countries", logo: "💳" },
      { name: "JCB", countries: "190+ countries", logo: "💳" },
      { name: "Diners Club", countries: "185+ countries", logo: "💳" },
      { name: "UnionPay", countries: "180+ countries", logo: "💳" },
      { name: "Maestro", countries: "100+ countries", logo: "💳" }
    ]
  },
  {
    region: "Digital Wallets & Global Services",
    icon: Wallet,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    methods: [
      { name: "PayPal", countries: "200+ countries", logo: "🅿️" },
      { name: "Apple Pay", countries: "70+ countries", logo: "🍎" },
      { name: "Google Pay", countries: "40+ countries", logo: "📱" },
      { name: "Samsung Pay", countries: "26+ countries", logo: "📱" },
      { name: "Amazon Pay", countries: "13+ countries", logo: "📦" },
      { name: "Skrill", countries: "200+ countries", logo: "💰" },
      { name: "Neteller", countries: "200+ countries", logo: "💰" },
      { name: "Payoneer", countries: "200+ countries", logo: "💰" },
      { name: "Revolut", countries: "35+ countries", logo: "💳" },
      { name: "Wise (TransferWise)", countries: "80+ countries", logo: "💸" }
    ]
  },
  {
    region: "Regional Payment Methods",
    icon: Globe,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    methods: [
      { name: "Alipay", countries: "China & International", logo: "🇨🇳" },
      { name: "WeChat Pay", countries: "China & International", logo: "🇨🇳" },
      { name: "GrabPay", countries: "Southeast Asia", logo: "🚗" },
      { name: "Dana", countries: "Indonesia", logo: "🇮🇩" },
      { name: "OVO", countries: "Indonesia", logo: "🇮🇩" },
      { name: "GoPay", countries: "Indonesia", logo: "🇮🇩" },
      { name: "TrueMoney", countries: "Thailand", logo: "🇹🇭" },
      { name: "TouchNGo", countries: "Malaysia", logo: "🇲🇾" },
      { name: "PayNow", countries: "Singapore", logo: "🇸🇬" },
      { name: "PromptPay", countries: "Thailand", logo: "🇹🇭" }
    ]
  },
  {
    region: "India Specific Methods",
    icon: CreditCard,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    methods: [
      { name: "UPI (Unified Payments)", countries: "India", logo: "🇮🇳" },
      { name: "Paytm", countries: "India", logo: "🇮🇳" },
      { name: "PhonePe", countries: "India", logo: "🇮🇳" },
      { name: "Google Pay India", countries: "India", logo: "🇮🇳" },
      { name: "BHIM", countries: "India", logo: "🇮🇳" },
      { name: "Mobikwik", countries: "India", logo: "🇮🇳" },
      { name: "Freecharge", countries: "India", logo: "🇮🇳" },
      { name: "Amazon Pay India", countries: "India", logo: "🇮🇳" },
      { name: "Airtel Money", countries: "India", logo: "🇮🇳" },
      { name: "JioMoney", countries: "India", logo: "🇮🇳" },
      { name: "RuPay", countries: "India", logo: "🇮🇳" },
      { name: "Net Banking (All Banks)", countries: "India", logo: "🇮🇳" },
      { name: "NEFT/RTGS", countries: "India", logo: "🇮🇳" },
      { name: "IMPS", countries: "India", logo: "🇮🇳" }
    ]
  },
  {
    region: "Europe Specific Methods",
    icon: CreditCard,
    color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    methods: [
      { name: "SEPA Direct Debit", countries: "36 European countries", logo: "🇪🇺" },
      { name: "iDEAL", countries: "Netherlands", logo: "🇳🇱" },
      { name: "Sofort", countries: "Germany, Austria, Belgium", logo: "🇩🇪" },
      { name: "Giropay", countries: "Germany", logo: "🇩🇪" },
      { name: "EPS", countries: "Austria", logo: "🇦🇹" },
      { name: "Bancontact", countries: "Belgium", logo: "🇧🇪" },
      { name: "Przelewy24", countries: "Poland", logo: "🇵🇱" },
      { name: "Multibanco", countries: "Portugal", logo: "🇵🇹" },
      { name: "MyBank", countries: "Italy, France", logo: "🇮🇹" },
      { name: "Trustly", countries: "29 European countries", logo: "🇪🇺" },
      { name: "Klarna", countries: "17+ countries", logo: "🛍️" },
      { name: "PayU", countries: "17 countries", logo: "💳" }
    ]
  },
  {
    region: "Americas Specific Methods",
    icon: CreditCard,
    color: "bg-gradient-to-br from-teal-500 to-cyan-500",
    methods: [
      { name: "Interac", countries: "Canada", logo: "🇨🇦" },
      { name: "PIX", countries: "Brazil", logo: "🇧🇷" },
      { name: "Boleto Bancário", countries: "Brazil", logo: "🇧🇷" },
      { name: "OXXO", countries: "Mexico", logo: "🇲🇽" },
      { name: "SPEI", countries: "Mexico", logo: "🇲🇽" },
      { name: "PSE", countries: "Colombia", logo: "🇨🇴" },
      { name: "Webpay", countries: "Chile", logo: "🇨🇱" },
      { name: "PagoEfectivo", countries: "Peru", logo: "🇵🇪" },
      { name: "Rapipago", countries: "Argentina", logo: "🇦🇷" },
      { name: "Pago Fácil", countries: "Argentina", logo: "🇦🇷" },
      { name: "Venmo", countries: "United States", logo: "🇺🇸" },
      { name: "Zelle", countries: "United States", logo: "🇺🇸" }
    ]
  },
  {
    region: "Cryptocurrency & Digital Assets",
    icon: Shield,
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    methods: [
      { name: "Bitcoin (BTC)", countries: "Global", logo: "₿" },
      { name: "Ethereum (ETH)", countries: "Global", logo: "Ξ" },
      { name: "Litecoin (LTC)", countries: "Global", logo: "Ł" },
      { name: "Bitcoin Cash (BCH)", countries: "Global", logo: "₿" },
      { name: "Ripple (XRP)", countries: "Global", logo: "◊" },
      { name: "Cardano (ADA)", countries: "Global", logo: "₳" },
      { name: "Dogecoin (DOGE)", countries: "Global", logo: "Ð" },
      { name: "Polkadot (DOT)", countries: "Global", logo: "●" },
      { name: "Chainlink (LINK)", countries: "Global", logo: "🔗" },
      { name: "Polygon (MATIC)", countries: "Global", logo: "🔷" },
      { name: "USDT (Tether)", countries: "Global", logo: "₮" },
      { name: "USDC", countries: "Global", logo: "💵" }
    ]
  }
];

const securityFeatures = [
  {
    title: "256-bit SSL Encryption",
    description: "Bank-level security for all transactions",
    icon: "🔒"
  },
  {
    title: "PCI DSS Compliant",
    description: "Highest payment security standards",
    icon: "✅"
  },
  {
    title: "Fraud Protection",
    description: "Advanced AI-powered fraud detection",
    icon: "🛡️"
  },
  {
    title: "Two-Factor Authentication",
    description: "Extra layer of account security",
    icon: "📱"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    country: "Singapore",
    text: "Payment was so smooth! Used PayNow and got my order in 2 days.",
    rating: 5
  },
  {
    name: "Ahmed Al-Rashid",
    country: "UAE",
    text: "Love that I can pay with my local card. No conversion fees!",
    rating: 5
  },
  {
    name: "Maria Santos",
    country: "Brazil",
    text: "PIX payment worked perfectly. Fast and secure shopping experience.",
    rating: 5
  }
];

export default function PaymentsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const totalMethods = paymentMethods.reduce((total, region) => total + region.methods.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
            <Globe className="w-5 h-5 text-green-400" />
            <span className="font-medium">Global Payment Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {totalMethods}+ Payment Methods
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Shop with confidence using your preferred payment method. We support every major payment system across all continents.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">195+</div>
              <div className="text-blue-200">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{totalMethods}+</div>
              <div className="text-blue-200">Payment Methods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-blue-200">Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Payment Method</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've integrated with every major payment provider worldwide to ensure you can shop with your preferred method
            </p>
          </div>

          <div className="grid gap-8">
            {paymentMethods.map((region, index) => {
              const IconComponent = region.icon;
              const isSelected = selectedRegion === region.region;
              
              return (
                <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                  <div 
                    className={`${region.color} p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
                    onClick={() => setSelectedRegion(isSelected ? null : region.region)}
                  >
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{region.region}</h3>
                          <p className="text-white/80">{region.methods.length} payment methods available</p>
                        </div>
                      </div>
                      <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {region.methods.map((method, methodIndex) => (
                          <div key={methodIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{method.logo}</span>
                              <div>
                                <h4 className="font-semibold text-gray-900">{method.name}</h4>
                                <p className="text-sm text-gray-600">{method.countries}</p>
                              </div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Bank-Level <span className="text-yellow-300">Security</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your payment information is protected by the highest security standards in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Global</span> Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}