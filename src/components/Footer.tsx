import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Get the Latest Deals!</h3>
              <p className="text-primary-100">Subscribe for exclusive discounts and new product alerts</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 md:w-80 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">TechNova</span>
              </div>
              <p className="text-gray-300 mb-4">
                Discover cutting-edge gadgets and tech accessories that transform your lifestyle. Premium quality, unbeatable prices, lightning-fast delivery.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/track-order" className="text-gray-300 hover:text-white transition-colors">Track Your Order</Link></li>
                <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors">Customer Support</Link></li>
                <li><Link href="/wholesale" className="text-gray-300 hover:text-white transition-colors">Wholesale Inquiries</Link></li>
                <li><Link href="/affiliate" className="text-gray-300 hover:text-white transition-colors">Affiliate Program</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Categories</h4>
              <ul className="space-y-2">
                <li><Link href="/category/phone-accessories" className="text-gray-300 hover:text-white transition-colors">Phone Accessories</Link></li>
                <li><Link href="/category/smartwatches" className="text-gray-300 hover:text-white transition-colors">Smartwatches</Link></li>
                <li><Link href="/category/audio-gadgets" className="text-gray-300 hover:text-white transition-colors">Audio Gadgets</Link></li>
                <li><Link href="/category/smart-home" className="text-gray-300 hover:text-white transition-colors">Smart Home</Link></li>
                <li><Link href="/category/car-gadgets" className="text-gray-300 hover:text-white transition-colors">Car Gadgets</Link></li>
                <li><Link href="/category/computer-accessories" className="text-gray-300 hover:text-white transition-colors">Computer Accessories</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span className="text-gray-300">+1-800-GADGETS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-gray-300">support@gadgetstore.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-gray-300">24/7 Worldwide Support</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h5 className="font-semibold mb-2">We Accept</h5>
                <div className="flex gap-2">
                  <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">
                    PP
                  </div>
                  <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-xs font-bold">
                    RP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold">Free Worldwide Shipping</h5>
                <p className="text-sm text-gray-400">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold">30-Day Returns</h5>
                <p className="text-sm text-gray-400">Easy return policy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold">Secure Payment</h5>
                <p className="text-sm text-gray-400">SSL encrypted checkout</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold">24/7 Support</h5>
                <p className="text-sm text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} TechNova. All rights reserved. Crafted with ❤️ for tech enthusiasts.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Refund Policy
              </Link>
              <Link href="/shipping-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;