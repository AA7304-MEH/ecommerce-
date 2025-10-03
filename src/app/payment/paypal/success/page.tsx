'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PayPalSuccessPage() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'verifying'>('verifying');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const orderId = searchParams.get('orderId');
  const captureId = searchParams.get('captureId');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId || !captureId) {
        setPaymentStatus('failed');
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'paypal',
            paypal_order_id: orderId,
            paypal_capture_id: captureId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setPaymentStatus('success');
          setPaymentDetails(data.data);
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        setPaymentStatus('failed');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [orderId, captureId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment</h2>
          <p className="text-gray-600">Please wait while we confirm your PayPal payment...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your PayPal payment. This might be due to a network issue or the payment wasn't completed.
          </p>
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>Try Again</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/support"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your PayPal payment has been processed successfully.
        </p>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono">{paymentDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono">{paymentDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>${(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-medium">{paymentDetails.status}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/orders"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
          >
            <span>View Order</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 block"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          A confirmation email has been sent to your email address with the order details.
        </p>
      </div>
    </div>
  );
}