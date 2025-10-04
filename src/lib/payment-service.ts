import { razorpayService } from './razorpay-service';
import { paypalService } from './paypal-service';

export type PaymentProvider = 'razorpay' | 'paypal' | 'crypto' | 'bank_transfer';

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
    crypto: null, // Free payment method, no external service needed
    bank_transfer: null, // Free payment method, no external service needed
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
      {
        id: 'crypto',
        name: 'Cryptocurrency',
        logo: '₿',
        countries: ['Global'],
        isConfigured: true, // Crypto payments are always available (FREE)
        isAvailable: true,
      },
      {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        logo: '🏦',
        countries: ['Global'],
        isConfigured: true, // Bank transfers are always available (FREE)
        isAvailable: true,
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
      } else if (provider === 'crypto') {
        return await this.createCryptoPayment(orderData);
      } else if (provider === 'bank_transfer') {
        return await this.createBankTransferPayment(orderData);
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

  // Create Crypto payment (FREE payment method)
  private async createCryptoPayment(orderData: UnifiedOrderData): Promise<PaymentResult> {
    try {
      // Generate a unique payment ID for crypto payment
      const paymentId = `crypto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        orderId: paymentId,
        amount: orderData.amount,
        currency: orderData.currency,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Crypto payment creation failed',
      };
    }
  }

  // Create Bank Transfer payment (FREE payment method)
  private async createBankTransferPayment(orderData: UnifiedOrderData): Promise<PaymentResult> {
    try {
      // Generate a unique reference number for bank transfer
      const referenceNumber = `BT${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      return {
        success: true,
        orderId: referenceNumber,
        amount: orderData.amount,
        currency: orderData.currency,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bank transfer payment creation failed',
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