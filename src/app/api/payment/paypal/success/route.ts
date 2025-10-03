import { NextRequest, NextResponse } from 'next/server';
import { paypalService } from '@/lib/paypal-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, payerId } = body;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing payment token'
        },
        { status: 400 }
      );
    }

    // Get order details first
    const orderDetails = await paypalService.getOrderDetails(token);

    if (orderDetails.status !== 'APPROVED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not approved'
        },
        { status: 400 }
      );
    }

    // Capture the payment
    const capture = await paypalService.captureOrder(token);

    if (capture.status !== 'COMPLETED') {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment capture failed'
        },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Update order status in database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Generate invoice

    console.log('PayPal payment completed successfully:', {
      orderId: token,
      captureId: capture.id,
      amount: capture.amount,
      status: capture.status
    });

    return NextResponse.json({
      success: true,
      message: 'Payment completed successfully',
      data: {
        orderId: token,
        captureId: capture.id,
        amount: capture.amount,
        status: capture.status,
        payerInfo: {
          payerId: payerId || 'N/A'
        }
      }
    });

  } catch (error) {
    console.error('PayPal payment success handling error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Payment processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET handler for PayPal redirect
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const payerId = url.searchParams.get('PayerID');

    if (!token) {
      return NextResponse.redirect(new URL('/payment/paypal/error?error=missing_token', request.url));
    }

    // Get order details
    const orderDetails = await paypalService.getOrderDetails(token);

    if (orderDetails.status !== 'APPROVED') {
      return NextResponse.redirect(new URL('/payment/paypal/error?error=order_not_approved', request.url));
    }

    // Capture the payment
    const capture = await paypalService.captureOrder(token);

    if (capture.status !== 'COMPLETED') {
      return NextResponse.redirect(new URL('/payment/paypal/error?error=capture_failed', request.url));
    }

    // Redirect to success page with order details
    const successUrl = new URL('/payment/paypal/success', request.url);
    successUrl.searchParams.set('orderId', token);
    successUrl.searchParams.set('captureId', capture.id);

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('PayPal payment success GET handling error:', error);
    return NextResponse.redirect(new URL('/payment/paypal/error?error=processing_failed', request.url));
  }
}