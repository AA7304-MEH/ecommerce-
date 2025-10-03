'use client';

import { useState } from 'react';
import { CreditCard, Globe, Loader2 } from 'lucide-react';
import { paymentService, PaymentProvider } from '@/lib/payment-service';
import PayPalPayment from './PayPalPayment';

interface UnifiedPaymentProps {
  amount: number;
  currency: string;
  description: string;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export default function UnifiedPayment({
  amount,
  currency,
  description,
  customerInfo,
  onSuccess,
  onError
}: UnifiedPaymentProps) {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableMethods = paymentService.getAvailablePaymentMethods();
  const configuredMethods = availableMethods.filter(method => method.isAvailable);

  // Auto-select provider based on currency if only one is available
  const getDefaultProvider = (): PaymentProvider | null => {
    if (configuredMethods.length === 1) {
      return configuredMethods[0].id;
    }

    // Auto-select based on currency
    if (currency.toUpperCase() === 'INR' && configuredMethods.some(m => m.id === 'razorpay')) {
      return 'razorpay';
    }

    if (configuredMethods.some(m => m.id === 'paypal')) {
      return 'paypal';
    }

    return null;
  };

  // Initialize with default provider
  useState(() => {
    const defaultProvider = getDefaultProvider();
    if (defaultProvider) {
      setSelectedProvider(defaultProvider);
    }
  });

  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    try {
      const result = await paymentService.createPaymentOrder({
        amount: currency.toUpperCase() === 'INR' ? Math.round(amount * 100) : Math.round(amount * 100),
        currency,
        description,
        customerInfo,
        provider: 'razorpay',
      });

      if (result.success && result.razorpayOrderId) {
        // Create order via API to get proper Razorpay configuration
        const orderResponse = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: currency.toUpperCase() === 'INR' ? Math.round(amount * 100) : Math.round(amount * 100),
            currency,
            description,
            customerInfo,
            provider: 'razorpay',
          }),
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.error || 'Failed to create order');
        }

        const options = {
          key: orderData.data?.key,
          amount: orderData.data?.amount,
          currency: orderData.data?.currency,
          order_id: result.razorpayOrderId,
          name: orderData.data?.name,
          description: orderData.data?.description,
          image: orderData.data?.image,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verifyResult = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  provider: 'razorpay',
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyResult.json();

              if (verifyData.success) {
                onSuccess({
                  provider: 'razorpay',
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                });
              } else {
                throw new Error(verifyData.error || 'Payment verification failed');
              }
            } catch (error) {
              onError(error);
            }
          },
          prefill: orderData.data?.prefill,
          theme: orderData.data?.theme,
          modal: {
            ondismiss: () => {
              setIsLoading(false);
            },
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
      } else {
        throw new Error(result.error || 'Failed to create Razorpay order');
      }
    } catch (error) {
      console.error('Razorpay payment failed:', error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    if (selectedProvider === 'razorpay') {
      handleRazorpayPayment();
    }
    // PayPal is handled by the PayPalPayment component
  };

  if (configuredMethods.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">No payment methods available</p>
        <p className="text-sm text-red-500 mt-1">Please configure payment methods or contact support</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Choose Payment Method</h3>

        <div className="grid gap-3">
          {configuredMethods.map((method) => (
            <label
              key={method.id}
              className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                selectedProvider === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedProvider === method.id}
                onChange={() => setSelectedProvider(method.id)}
                className="sr-only"
              />

              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedProvider === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedProvider === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{method.logo}</span>
                  <div>
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">
                      Available in {method.countries.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {method.id === 'razorpay' && (
                <CreditCard className="w-5 h-5 text-gray-400 ml-auto" />
              )}
              {method.id === 'paypal' && (
                <Globe className="w-5 h-5 text-gray-400 ml-auto" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Component */}
      {selectedProvider && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900">
              Complete Payment with {configuredMethods.find(m => m.id === selectedProvider)?.name}
            </h4>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">
                {currency.toUpperCase()} {amount.toFixed(2)}
              </p>
            </div>
          </div>

          {selectedProvider === 'paypal' && (
            <PayPalPayment
              amount={amount}
              currency={currency}
              description={description}
              customerInfo={customerInfo}
              onSuccess={onSuccess}
              onError={onError}
            />
          )}

          {selectedProvider === 'razorpay' && (
            <div className="space-y-4">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay with Razorpay</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                You will be redirected to Razorpay to complete your payment securely
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedProvider && configuredMethods.length > 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-600">Please select a payment method to continue</p>
        </div>
      )}
    </div>
  );
}