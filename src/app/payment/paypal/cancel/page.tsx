'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function PayPalCancelContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'missing_token':
        return 'Payment session expired or invalid.';
      case 'order_not_approved':
        return 'Payment was not approved.';
      case 'capture_failed':
        return 'Payment processing failed.';
      case 'processing_failed':
        return 'Payment processing encountered an error.';
      default:
        return 'You cancelled the payment process.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-orange-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-4">
          {getErrorMessage(error)}
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Payment Again</span>
          </Link>

          <Link
            href="/payment/paypal/error"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            View Payment Options
          </Link>

          <Link
            href="/support"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            Need Help?
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>PayPal Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PayPalCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    }>
      <PayPalCancelContent />
    </Suspense>
  );
}