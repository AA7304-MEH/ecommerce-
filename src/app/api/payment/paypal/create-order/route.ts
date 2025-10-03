import { NextRequest, NextResponse } from 'next/server';
import { paypalService } from '@/lib/paypal-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', description, customerInfo } = body;

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

    // Ensure amount is in cents (multiply by 100 if in dollars)
    const amountInCents = Math.round(amount * 100);

    // Create order data
    const orderData = {
      amount: amountInCents,
      currency,
      description,
      customerInfo: {
        name: customerInfo?.name || 'Guest',
        email: customerInfo?.email || '',
      }
    };

    // Create PayPal order
    const order = await paypalService.createOrder(orderData);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create PayPal order'
        },
        { status: 500 }
      );
    }

    // Get approval link
    const approvalLink = paypalService.getApprovalLink(order);

    if (!approvalLink) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to get PayPal approval link'
        },
        { status: 500 }
      );
    }

    // Return order details for frontend
    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        approvalLink,
        amount: amountInCents,
        currency: orderData.currency,
        clientId: paypalService.getClientId(),
      }
    });

  } catch (error) {
    console.error('PayPal order creation error:', error);
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