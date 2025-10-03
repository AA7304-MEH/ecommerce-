import { RotateCcw, Clock, AlertTriangle, CheckCircle, XCircle, DollarSign } from 'lucide-react';

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <RotateCcw className="w-16 h-16 mx-auto mb-6 text-green-200" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Refund Policy</h1>
          <p className="text-xl text-green-100">
            Your satisfaction is our priority. Learn about our hassle-free return and refund process.
          </p>
          <p className="text-sm text-green-200 mt-4">
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
                <CheckCircle className="w-6 h-6 text-green-600" />
                30-Day Return Guarantee
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At GadgetStore, we want you to be completely satisfied with your purchase. We offer a comprehensive 30-day return policy for most items purchased from our website.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Quick Summary:</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• 30 days to return most items</li>
                  <li>• Full refund for unopened items</li>
                  <li>• Free return shipping for defective items</li>
                  <li>• Fast processing: 3-5 business days</li>
                </ul>
              </div>
            </section>

            {/* Return Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Eligible for Return
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Items in original condition</li>
                    <li>• Unopened packaging</li>
                    <li>• All accessories included</li>
                    <li>• Items purchased within 30 days</li>
                    <li>• Defective or damaged items</li>
                    <li>• Wrong item received</li>
                    <li>• Items not as described</li>
                  </ul>
                </div>

                <div className="border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Not Eligible for Return
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Items damaged by misuse</li>
                    <li>• Software with opened seals</li>
                    <li>• Personalized or custom items</li>
                    <li>• Items returned after 30 days</li>
                    <li>• Gift cards or digital products</li>
                    <li>• Items missing original packaging</li>
                    <li>• Final sale items</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                    <p className="text-gray-700 text-sm">
                      Email us at <a href="mailto:returns@gadgetstore.com" className="text-primary-600 hover:text-primary-700">returns@gadgetstore.com</a> or 
                      use our online return form. Include your order number and reason for return.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Get Return Authorization</h3>
                    <p className="text-gray-700 text-sm">
                      We'll review your request and provide a Return Merchandise Authorization (RMA) number 
                      along with return instructions within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Package and Ship</h3>
                    <p className="text-gray-700 text-sm">
                      Securely package the item in its original packaging. Include the RMA number 
                      and use the prepaid return label (for defective items) or ship at your expense.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Receive Refund</h3>
                    <p className="text-gray-700 text-sm">
                      Once we receive and inspect your return, we'll process your refund within 
                      3-5 business days to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Types */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                Types of Refunds
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Full Refund</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    You'll receive a 100% refund (excluding original shipping costs) if:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Item is defective or damaged upon arrival</li>
                    <li>• Wrong item was sent</li>
                    <li>• Item is significantly not as described</li>
                    <li>• Item is returned unopened within 30 days</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Partial Refund</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    You may receive a partial refund (50-90% of item price) if:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Item shows signs of use but is still functional</li>
                    <li>• Original packaging is damaged but item is intact</li>
                    <li>• Minor accessories are missing</li>
                    <li>• Item is returned after 15 days but within 30 days</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Exchange Only</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Some items may only be eligible for exchange:
                  </p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Items with manufacturer defects under warranty</li>
                    <li>• Size or color variations (when available)</li>
                    <li>• Items damaged during shipping (if replacement available)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Return Shipping */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Shipping</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">We Pay Return Shipping</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Defective or damaged items</li>
                    <li>• Wrong item sent</li>
                    <li>• Item not as described</li>
                    <li>• Our shipping error</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3">Customer Pays Return Shipping</h3>
                  <ul className="text-yellow-700 space-y-2 text-sm">
                    <li>• Change of mind returns</li>
                    <li>• Ordered wrong size/color</li>
                    <li>• No longer needed</li>
                    <li>• Buyer's remorse</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-sm">
                  <strong>Tip:</strong> We recommend using a trackable shipping service for returns. 
                  We are not responsible for return packages that are lost in transit.
                </p>
              </div>
            </section>

            {/* Processing Times */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Processing Times
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Return Authorization</span>
                  <span className="text-blue-600 font-semibold">Within 24 hours</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Return Inspection</span>
                  <span className="text-blue-600 font-semibold">1-2 business days</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Refund Processing</span>
                  <span className="text-blue-600 font-semibold">3-5 business days</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Bank/Card Processing</span>
                  <span className="text-blue-600 font-semibold">5-10 business days</span>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Refund processing times may vary depending on your payment method and financial institution. 
                  PayPal refunds are typically faster than credit card refunds.
                </p>
              </div>
            </section>

            {/* International Returns */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Returns</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We accept returns from international customers with the following considerations:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Customer is responsible for return shipping costs (unless item is defective)</li>
                <li>Items must be declared as "returned merchandise" on customs forms</li>
                <li>Customer is responsible for any customs duties or fees</li>
                <li>Allow additional time for international shipping and customs processing</li>
                <li>Refunds will be issued in USD and converted by your bank</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important for International Customers</h4>
                    <p className="text-amber-700 text-sm">
                      We recommend contacting us before returning international orders to discuss 
                      the most cost-effective solution, which may include partial refunds or exchanges.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Circumstances */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Damaged in Transit</h3>
                  <p className="text-gray-700 text-sm">
                    If your item arrives damaged, take photos immediately and contact us within 48 hours. 
                    We'll provide a prepaid return label and full refund or replacement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lost Returns</h3>
                  <p className="text-gray-700 text-sm">
                    If your return package is lost in transit, we'll work with you to resolve the issue. 
                    This is why we recommend using tracked shipping for all returns.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Late Returns</h3>
                  <p className="text-gray-700 text-sm">
                    Returns received after 30 days may still be considered on a case-by-case basis, 
                    but may be subject to restocking fees or partial refunds.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Returns?</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Our customer service team is here to help make your return process as smooth as possible:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Returns Email:</strong> <a href="mailto:returns@gadgetstore.com" className="text-primary-600 hover:text-primary-700">returns@gadgetstore.com</a></li>
                  <li><strong>Customer Service:</strong> <a href="mailto:support@gadgetstore.com" className="text-primary-600 hover:text-primary-700">support@gadgetstore.com</a></li>
                  <li><strong>Phone:</strong> +1-800-GADGETS</li>
                  <li><strong>Live Chat:</strong> Available 24/7 on our website</li>
                  <li><strong>WhatsApp:</strong> +1 (555) 123-4567</li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;