'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paymentService } from '@/lib/payment-service';

interface PayPalPaymentProps {
  amount: number;
  currency: string;
  description: string;
  customerInfo?: {
    name?: string;
    email?: string;
  };
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
}

export default function PayPalPayment({
  amount,
  currency,
  description,
  customerInfo,
  onSuccess,
  onError,
  onCancel
}: PayPalPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const paypalOptions = {
    clientId: paymentService.getProviderCredentials('paypal').clientId,
    currency: currency,
    intent: 'capture' as const,
  };

  const createOrder = async () => {
    setIsLoading(true);
    try {
      const result = await paymentService.createPaymentOrder({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        description,
        customerInfo,
        provider: 'paypal',
      });

      if (result.success && result.orderId) {
        setOrderId(result.orderId);
        return result.orderId;
      } else {
        throw new Error(result.error || 'Failed to create PayPal order');
      }
    } catch (error) {
      console.error('PayPal order creation failed:', error);
      onError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onApprove = async (data: any) => {
    setIsLoading(true);
    try {
      // Capture the PayPal order
      const captureResult = await paymentService.capturePayPalPayment(data.orderID);

      if (captureResult.status === 'COMPLETED') {
        // Verify the payment
        const verifyResult = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'paypal',
            paypal_order_id: data.orderID,
            paypal_capture_id: captureResult.id,
          }),
        });

        const verifyData = await verifyResult.json();

        if (verifyData.success) {
          onSuccess({
            orderId: data.orderID,
            captureId: captureResult.id,
            amount: captureResult.amount,
            payerInfo: data.payer,
          });
        } else {
          throw new Error(verifyData.error || 'Payment verification failed');
        }
      } else {
        throw new Error('Payment capture was not completed');
      }
    } catch (error) {
      console.error('PayPal approval failed:', error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!paypalOptions.clientId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">PayPal is not configured properly</p>
        <p className="text-sm text-red-500 mt-1">Please contact support for assistance</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={paypalOptions}>
        <div className="paypal-buttons-container">
          <PayPalButtons
            style={{
              layout: 'horizontal',
              color: 'blue',
              shape: 'rect',
              label: 'paypal',
              height: 40,
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={onCancel}
            disabled={isLoading}
          />
        </div>
      </PayPalScriptProvider>

      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Processing PayPal payment...</span>
          </div>
        </div>
      )}
    </div>
  );
}