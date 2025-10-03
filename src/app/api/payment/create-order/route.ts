import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      currency = 'USD',
      description,
      receipt,
      customerInfo,
      provider // Optional: 'razorpay' or 'paypal'
    } = body;

    // Validate required fields
    if (!amount || !description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Amount and description are required'
        },
        { status: 400 }
      );
    }

    // Ensure amount is in smallest currency unit
    const amountInSmallestUnit = currency.toUpperCase() === 'INR'
      ? Math.round(amount * 100) // Convert to paise for INR
      : Math.round(amount * 100); // Convert to cents for other currencies

    // Create unified order data
    const orderData = {
      amount: amountInSmallestUnit,
      currency: currency.toUpperCase(),
      description,
      receipt,
      customerInfo,
      provider: provider as 'razorpay' | 'paypal' | undefined,
    };

    // Create payment order using unified service
    const result = await paymentService.createPaymentOrder(orderData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 400 }
      );
    }

    // Return provider-specific response format
    const responseData: any = {
      success: true,
      provider: provider || paymentService['selectProvider'](currency),
      amount: result.amount,
      currency: result.currency,
    };

    if (result.razorpayOrderId) {
      // Razorpay response format
      responseData.data = {
        orderId: result.razorpayOrderId,
        amount: result.amount,
        currency: result.currency,
        key: paymentService.getProviderCredentials('razorpay').key,
        name: 'TechNova Global',
        description: description,
        image: '/logo.png',
        prefill: {
          name: customerInfo?.name || '',
          email: customerInfo?.email || '',
          contact: customerInfo?.phone || ''
        },
        theme: {
          color: '#8b5cf6'
        }
      };
    } else if (result.approvalLink) {
      // PayPal response format
      responseData.data = {
        orderId: result.orderId,
        approvalLink: result.approvalLink,
        clientId: paymentService.getProviderCredentials('paypal').clientId,
      };
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Payment order creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}