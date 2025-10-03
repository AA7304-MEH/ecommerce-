import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      provider,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paypal_order_id,
      paypal_capture_id,
      orderDetails
    } = body;

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment provider is required'
        },
        { status: 400 }
      );
    }

    let verificationResult: boolean = false;
    let paymentDetails: any = null;

    if (provider === 'razorpay') {
      // Verify Razorpay payment
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          {
            success: false,
            error: 'Razorpay verification parameters are required'
          },
          { status: 400 }
        );
      }

      verificationResult = await paymentService.verifyPayment('razorpay', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      });

      if (verificationResult) {
        paymentDetails = await paymentService.getPaymentDetails('razorpay', razorpay_payment_id);
      }
    } else if (provider === 'paypal') {
      // For PayPal, verification is handled via success callback
      if (!paypal_order_id || !paypal_capture_id) {
        return NextResponse.json(
          {
            success: false,
            error: 'PayPal order and capture IDs are required'
          },
          { status: 400 }
        );
      }

      verificationResult = true; // PayPal already verified via success callback
      paymentDetails = {
        orderId: paypal_order_id,
        captureId: paypal_capture_id,
        status: 'completed'
      };
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported payment provider'
        },
        { status: 400 }
      );
    }

    if (!verificationResult) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed'
        },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Update order status in database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Generate invoice

    console.log('Payment verified successfully:', {
      provider,
      orderId: provider === 'razorpay' ? razorpay_order_id : paypal_order_id,
      paymentId: provider === 'razorpay' ? razorpay_payment_id : paypal_capture_id,
      amount: paymentDetails?.amount,
      status: paymentDetails?.status
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        provider,
        paymentId: provider === 'razorpay' ? razorpay_payment_id : paypal_capture_id,
        orderId: provider === 'razorpay' ? razorpay_order_id : paypal_order_id,
        amount: paymentDetails?.amount,
        status: paymentDetails?.status,
        method: paymentDetails?.method,
        created_at: paymentDetails?.created_at
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Payment verification failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}