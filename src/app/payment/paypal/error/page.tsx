'use client';

import { AlertTriangle, ArrowRight, CreditCard, Globe } from 'lucide-react';
import Link from 'next/link';

export default function PayPalErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600">
            We're sorry, but there was an issue processing your payment. Don't worry, no charges were made.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Alternative Payment Methods</h3>
            <p className="text-blue-800 mb-4">
              You can try a different payment method or contact us for assistance.
            </p>

            <div className="grid gap-4">
              <Link
                href="/checkout"
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Credit/Debit Cards</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, Amex, and more</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link
                href="/checkout"
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Other Payment Methods</p>
                    <p className="text-sm text-gray-600">UPI, Net Banking, Wallets</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you continue to experience issues, our support team is here to help.
            </p>
            <div className="space-y-2">
              <Link
                href="/support"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
              </Link>
              <Link
                href="/faq"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 block"
              >
                View FAQ
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}