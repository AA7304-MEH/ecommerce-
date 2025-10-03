import { razorpayService } from './razorpay-service';
import { paypalService } from './paypal-service';

export type PaymentProvider = 'razorpay' | 'paypal';

export interface UnifiedOrderData {
  amount: number; // in smallest currency unit (paise for INR, cents for USD)
  currency: string;
  description: string;
  receipt?: string;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  provider?: PaymentProvider;
}

export interface PaymentMethod {
  id: PaymentProvider;
  name: string;
  logo: string;
  countries: string[];
  isConfigured: boolean;
  isAvailable: boolean;
}

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  approvalLink?: string; // For PayPal
  razorpayOrderId?: string; // For Razorpay
  amount?: number;
  currency?: string;
  error?: string;
}

class PaymentService {
  private providers: Record<PaymentProvider, any> = {
    razorpay: razorpayService,
    paypal: paypalService,
  };

  // Get available payment methods
  getAvailablePaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 'razorpay',
        name: 'Razorpay',
        logo: '💳',
        countries: ['India'],
        isConfigured: razorpayService.isConfigured(),
        isAvailable: razorpayService.isConfigured(),
      },
      {
        id: 'paypal',
        name: 'PayPal',
        logo: '🅿️',
        countries: ['Global'],
        isConfigured: paypalService.isConfigured(),
        isAvailable: paypalService.isConfigured(),
      },
    ];
  }

  // Create payment order with auto provider selection
  async createPaymentOrder(orderData: UnifiedOrderData): Promise<PaymentResult> {
    try {
      // Auto-select provider based on currency or user preference
      const provider = orderData.provider || this.selectProvider(orderData.currency);

      if (!this.providers[provider].isConfigured()) {
        return {
          success: false,
          error: `${provider} is not configured properly`,
        };
      }

      if (provider === 'razorpay') {
        return await this.createRazorpayOrder(orderData);
      } else if (provider === 'paypal') {
        return await this.createPayPalOrder(orderData);
      } else {
        return {
          success: false,
          error: 'Unsupported payment provider',
        };
      }
    } catch (error) {
      console.error('Payment order creation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Create Razorpay order
  private async createRazorpayOrder(orderData: UnifiedOrderData): Promise<PaymentResult> {
    try {
      const razorpayOrder = await razorpayService.createOrder({
        amount: orderData.amount,
        currency: orderData.currency,
        receipt: orderData.receipt || `order_${Date.now()}`,
        notes: {
          customer_name: orderData.customerInfo?.name || 'Guest',
          customer_email: orderData.customerInfo?.email || '',
          order_type: 'ecommerce',
          store: 'TechNova Global',
        },
      });

      if (!razorpayOrder) {
        return {
          success: false,
          error: 'Failed to create Razorpay order',
        };
      }

      return {
        success: true,
        orderId: razorpayOrder.id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Razorpay order creation failed',
      };
    }
  }

  // Create PayPal order
  private async createPayPalOrder(orderData: UnifiedOrderData): Promise<PaymentResult> {
    try {
      const paypalOrder = await paypalService.createOrder({
        amount: orderData.amount,
        currency: orderData.currency,
        description: orderData.description,
        customerInfo: orderData.customerInfo,
      });

      if (!paypalOrder) {
        return {
          success: false,
          error: 'Failed to create PayPal order',
        };
      }

      const approvalLink = paypalService.getApprovalLink(paypalOrder);

      if (!approvalLink) {
        return {
          success: false,
          error: 'Failed to get PayPal approval link',
        };
      }

      return {
        success: true,
        orderId: paypalOrder.id,
        approvalLink,
        amount: orderData.amount,
        currency: orderData.currency,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PayPal order creation failed',
      };
    }
  }

  // Auto-select payment provider based on currency
  private selectProvider(currency: string): PaymentProvider {
    // Use Razorpay for INR payments
    if (currency.toUpperCase() === 'INR') {
      return 'razorpay';
    }
    // Use PayPal for international currencies
    return 'paypal';
  }

  // Verify payment (for Razorpay)
  async verifyPayment(provider: PaymentProvider, paymentData: any): Promise<boolean> {
    if (provider === 'razorpay') {
      return await razorpayService.verifyPayment(
        paymentData.razorpay_order_id,
        paymentData.razorpay_payment_id,
        paymentData.razorpay_signature
      );
    }
    // PayPal verification is handled differently (via webhooks or success callback)
    return true;
  }

  // Get payment details
  async getPaymentDetails(provider: PaymentProvider, paymentId: string) {
    if (provider === 'razorpay') {
      return await razorpayService.getPaymentDetails(paymentId);
    } else if (provider === 'paypal') {
      // For PayPal, we would need the order ID, not payment ID
      throw new Error('Use getPayPalOrderDetails for PayPal orders');
    }
  }

  // Get PayPal order details
  async getPayPalOrderDetails(orderId: string) {
    return await paypalService.getOrderDetails(orderId);
  }

  // Capture PayPal payment
  async capturePayPalPayment(orderId: string) {
    return await paypalService.captureOrder(orderId);
  }

  // Get public keys/IDs for frontend
  getProviderCredentials(provider: PaymentProvider) {
    if (provider === 'razorpay') {
      return {
        key: razorpayService.getPublicKey(),
      };
    } else if (provider === 'paypal') {
      return {
        clientId: paypalService.getClientId(),
      };
    }
    return {};
  }
}

export const paymentService = new PaymentService();
export default PaymentService;