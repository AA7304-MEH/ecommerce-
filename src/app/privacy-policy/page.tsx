import { Shield, Lock, Eye, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-primary-200" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-primary-100">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-primary-200 mt-4">
            Last updated: December 20, 2024
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="prose max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-primary-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                GadgetStore ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Create an account on our website</li>
                <li>Make a purchase or attempt to make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us with questions or comments</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-4">
                This personal information may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Name and contact information (email, phone, address)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Shipping information</li>
                <li>Account credentials (username, password)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device and usage patterns:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on site</li>
                <li>Referral sources</li>
                <li>Device information</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary-600" />
                How We Use Your Information
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Processing</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Handle returns and customer service requests</li>
                    <li>Process payments securely</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Send promotional emails and newsletters (with your consent)</li>
                    <li>Respond to your comments and questions</li>
                    <li>Provide customer support</li>
                    <li>Send important updates about our services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Improvement</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Analyze website usage and performance</li>
                    <li>Improve our products and services</li>
                    <li>Personalize your shopping experience</li>
                    <li>Prevent fraud and enhance security</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you (such as payment processors, shipping companies, and email service providers).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may disclose your information when required by law or to protect our rights, property, or safety, or that of our users or others.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Transfers</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery procedures</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Important Note</h4>
                    <p className="text-yellow-700 text-sm">
                      While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us at <a href="mailto:privacy@gadgetstore.com" className="text-primary-600 hover:text-primary-700">privacy@gadgetstore.com</a>.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. Cookies are small data files stored on your device.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
              
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Significant changes will be communicated via email or prominent notice on our website.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> <a href="mailto:privacy@gadgetstore.com" className="text-primary-600 hover:text-primary-700">privacy@gadgetstore.com</a></li>
                  <li><strong>Phone:</strong> +1-800-GADGETS</li>
                  <li><strong>Address:</strong> GadgetStore Privacy Team, 123 Tech Street, San Francisco, CA 94105, USA</li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;