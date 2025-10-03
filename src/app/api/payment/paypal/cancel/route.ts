import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    console.log('PayPal payment cancelled:', {
      orderId: token,
      timestamp: new Date().toISOString()
    });

    // Redirect to cancel page with order ID if available
    const cancelUrl = new URL('/payment/paypal/cancel', request.url);
    if (token) {
      cancelUrl.searchParams.set('orderId', token);
    }

    return NextResponse.redirect(cancelUrl);

  } catch (error) {
    console.error('PayPal payment cancel handling error:', error);
    return NextResponse.redirect(new URL('/payment/paypal/cancel?error=processing_failed', request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, reason } = body;

    console.log('PayPal payment cancelled via POST:', {
      orderId,
      reason,
      timestamp: new Date().toISOString()
    });

    // Here you would typically:
    // 1. Update order status in database to cancelled
    // 2. Release reserved inventory
    // 3. Send cancellation notification

    return NextResponse.json({
      success: true,
      message: 'Payment cancellation processed',
      data: {
        orderId,
        cancelled: true,
        reason: reason || 'User cancelled payment'
      }
    });

  } catch (error) {
    console.error('PayPal payment cancel POST handling error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process cancellation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}