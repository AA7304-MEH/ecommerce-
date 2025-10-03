import { Truck, Globe, Clock, Package, MapPin, AlertCircle } from 'lucide-react';

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Truck className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Shipping Policy</h1>
          <p className="text-xl text-blue-100">
            Fast, reliable, and free worldwide shipping. Learn about our delivery options and policies.
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated: December 20, 2024
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="prose max-w-none">
            
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                Worldwide Shipping Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                GadgetStore ships to over 180 countries worldwide using our network of trusted suppliers and logistics partners. 
                We offer free standard shipping on orders over $50 and provide tracking for all shipments.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Shipping Highlights:</h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Free shipping on orders over $50</li>
                  <li>• Shipping to 180+ countries</li>
                  <li>• All orders include tracking</li>
                  <li>• Multiple shipping speed options</li>
                  <li>• Secure packaging and handling</li>
                </ul>
              </div>
            </section>

            {/* Shipping Methods */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Methods & Delivery Times</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600" />
                    Standard Shipping (Free on $50+)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Delivery Times:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• United States: 7-15 business days</li>
                        <li>• Canada: 8-16 business days</li>
                        <li>• Europe: 10-20 business days</li>
                        <li>• Asia: 8-18 business days</li>
                        <li>• Australia/NZ: 10-22 business days</li>
                        <li>• Other countries: 12-25 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Tracking included</li>
                        <li>• Insurance up to $100</li>
                        <li>• Signature required for orders $200+</li>
                        <li>• No weekend/holiday delivery</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <strong>Cost:</strong> FREE on orders $50+, otherwise $9.99
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Express Shipping
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Delivery Times:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• United States: 3-7 business days</li>
                        <li>• Canada: 4-8 business days</li>
                        <li>• Europe: 5-10 business days</li>
                        <li>• Asia: 4-9 business days</li>
                        <li>• Australia/NZ: 5-12 business days</li>
                        <li>• Other countries: 6-15 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Priority handling</li>
                        <li>• Real-time tracking</li>
                        <li>• Insurance up to $500</li>
                        <li>• Signature required</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <strong>Cost:</strong> $19.99 - $39.99 depending on destination
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Premium Shipping
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Delivery Times:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• United States: 1-3 business days</li>
                        <li>• Canada: 2-4 business days</li>
                        <li>• Europe: 2-5 business days</li>
                        <li>• Asia: 2-6 business days</li>
                        <li>• Australia/NZ: 3-7 business days</li>
                        <li>• Other countries: 3-8 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Fastest delivery available</li>
                        <li>• Real-time GPS tracking</li>
                        <li>• Full insurance coverage</li>
                        <li>• White-glove service</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <strong>Cost:</strong> $49.99 - $99.99 depending on destination
                  </div>
                </div>
              </div>
            </section>

            {/* Processing Times */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                All orders are processed within 1-3 business days (Monday through Friday, excluding holidays). 
                Processing time is separate from shipping time and begins after your payment is confirmed.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Payment Verification</span>
                  <span className="text-blue-600 font-semibold">Instant - 2 hours</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Order Processing</span>
                  <span className="text-blue-600 font-semibold">1-3 business days</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Supplier Fulfillment</span>
                  <span className="text-blue-600 font-semibold">1-2 business days</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Shipping Transit</span>
                  <span className="text-blue-600 font-semibold">Varies by method</span>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Holiday Delays</h4>
                    <p className="text-yellow-700 text-sm">
                      During peak seasons (Black Friday, Christmas, Chinese New Year), processing and 
                      shipping times may be extended by 2-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Costs */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs by Region</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Region</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Standard</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Express</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">United States</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$19.99</td>
                      <td className="border border-gray-300 p-3">$49.99</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-medium">Canada</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$24.99</td>
                      <td className="border border-gray-300 p-3">$59.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">Europe</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$29.99</td>
                      <td className="border border-gray-300 p-3">$69.99</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-medium">Asia</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$24.99</td>
                      <td className="border border-gray-300 p-3">$59.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-medium">Australia/NZ</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$34.99</td>
                      <td className="border border-gray-300 p-3">$79.99</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-medium">Other Countries</td>
                      <td className="border border-gray-300 p-3">Free on $50+, else $9.99</td>
                      <td className="border border-gray-300 p-3">$39.99</td>
                      <td className="border border-gray-300 p-3">$99.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                All orders include tracking information. You'll receive tracking details via email once your order ships, 
                typically within 1-3 business days of placing your order.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Track Your Order:</h3>
                  <ol className="list-decimal pl-6 text-gray-700 space-y-2 text-sm">
                    <li>Check your email for the shipping confirmation</li>
                    <li>Click the tracking link or copy the tracking number</li>
                    <li>Visit our order tracking page or the carrier's website</li>
                    <li>Enter your tracking number to see real-time updates</li>
                  </ol>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Tracking Information Includes:</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Order processing status</li>
                    <li>• Shipment dispatch notification</li>
                    <li>• In-transit location updates</li>
                    <li>• Delivery confirmation</li>
                    <li>• Estimated delivery date</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Customs and Duties */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customs and Import Duties</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                For international orders, customers are responsible for any customs duties, taxes, or fees imposed by their country. 
                These charges are determined by local customs authorities and are not included in our shipping costs.
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What You Need to Know:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Customs duties vary by country and product type</li>
                    <li>• We declare the actual purchase price on customs forms</li>
                    <li>• Delivery may be delayed for customs inspection</li>
                    <li>• You may need to collect packages from a local depot</li>
                    <li>• Refused packages due to duties will incur return shipping costs</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Important Note</h4>
                      <p className="text-amber-700 text-sm">
                        We cannot mark packages as "gifts" or declare lower values to avoid duties. 
                        This is illegal and could result in package seizure or legal issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Issues */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Issues</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lost or Stolen Packages</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    If your package shows as delivered but you haven't received it:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm pl-6 list-disc">
                    <li>Check with neighbors and building management</li>
                    <li>Look for packages left in secure locations</li>
                    <li>Contact us within 7 days of delivery date</li>
                    <li>We'll investigate with the carrier and provide a resolution</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Damaged Packages</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    If your package arrives damaged:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm pl-6 list-disc">
                    <li>Take photos of the package and contents immediately</li>
                    <li>Contact us within 48 hours</li>
                    <li>Keep all packaging materials</li>
                    <li>We'll arrange for replacement or refund</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Address Changes</h3>
                  <p className="text-gray-700 text-sm">
                    Address changes are only possible before shipment. Once shipped, we cannot redirect packages. 
                    Contact us immediately if you need to change your shipping address.
                  </p>
                </div>
              </div>
            </section>

            {/* Restricted Items */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Restrictions</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Some items cannot be shipped to certain countries due to legal restrictions or carrier limitations:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Commonly Restricted Items:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Lithium batteries (standalone)</li>
                    <li>• Aerosols and liquids</li>
                    <li>• Magnetic items</li>
                    <li>• Items containing mercury</li>
                    <li>• Flammable materials</li>
                    <li>• Weapons and weapon accessories</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Country-Specific Restrictions:</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Electronics to certain Middle Eastern countries</li>
                    <li>• Wireless devices to some Asian countries</li>
                    <li>• Items with encryption to specific regions</li>
                    <li>• Certain frequencies banned in some countries</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> We'll notify you if any items in your order cannot be shipped to your location 
                  and offer alternatives or refunds for affected items.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Support</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Have questions about shipping or need help with your order? Our shipping support team is here to help:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Shipping Questions:</strong> <a href="mailto:shipping@gadgetstore.com" className="text-primary-600 hover:text-primary-700">shipping@gadgetstore.com</a></li>
                  <li><strong>Order Tracking:</strong> <a href="mailto:tracking@gadgetstore.com" className="text-primary-600 hover:text-primary-700">tracking@gadgetstore.com</a></li>
                  <li><strong>Customer Service:</strong> <a href="mailto:support@gadgetstore.com" className="text-primary-600 hover:text-primary-700">support@gadgetstore.com</a></li>
                  <li><strong>Phone:</strong> +1-800-GADGETS</li>
                  <li><strong>Live Chat:</strong> Available 24/7 on our website</li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;