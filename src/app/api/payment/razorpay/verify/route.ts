import { NextRequest, NextResponse } from 'next/server';
import { razorpayService } from '@/lib/razorpay-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails 
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing payment verification parameters' 
        },
        { status: 400 }
      );
    }

    // Verify payment signature
    const isValidPayment = await razorpayService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidPayment) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment verification failed' 
        },
        { status: 400 }
      );
    }

    // Get payment details
    const paymentDetails = await razorpayService.getPaymentDetails(razorpay_payment_id);

    // Here you would typically:
    // 1. Update order status in database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Generate invoice

    console.log('Payment verified successfully:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: paymentDetails.amount,
      status: paymentDetails.status
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: paymentDetails.amount,
        status: paymentDetails.status,
        method: paymentDetails.method,
        created_at: paymentDetails.created_at
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