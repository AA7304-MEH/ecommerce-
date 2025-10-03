import { NextRequest, NextResponse } from 'next/server';
import { razorpayService } from '@/lib/razorpay-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', receipt, customerInfo } = body;

    // Validate required fields
    if (!amount || !receipt) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Amount and receipt are required' 
        },
        { status: 400 }
      );
    }

    // Ensure amount is in paise (multiply by 100 if in rupees)
    const amountInPaise = Math.round(amount * 100);

    // Create order data
    const orderData = {
      amount: amountInPaise,
      currency,
      receipt,
      notes: {
        customer_name: customerInfo?.name || 'Guest',
        customer_email: customerInfo?.email || '',
        order_type: 'ecommerce',
        store: 'TechNova Global'
      }
    };

    // Create Razorpay order
    const order = await razorpayService.createOrder(orderData);

    if (!order) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create payment order' 
        },
        { status: 500 }
      );
    }

    // Return order details for frontend
    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayService.getPublicKey(),
        name: 'TechNova Global',
        description: 'Premium Tech Products',
        image: '/logo.png', // Add your logo
        prefill: {
          name: customerInfo?.name || '',
          email: customerInfo?.email || '',
          contact: customerInfo?.phone || ''
        },
        theme: {
          color: '#8b5cf6' // Purple theme
        }
      }
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
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