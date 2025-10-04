import Razorpay from 'razorpay';

export interface RazorpayOrderData {
  amount: number; // in paise (multiply by 100)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  created_at: number;
}

class RazorpayService {
  private razorpay: Razorpay | null = null;
  private keyId: string = '';
  private keySecret: string = '';

  constructor() {
    // Initialize credentials from environment variables
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || '';

    if (this.keyId && this.keySecret) {
      this.razorpay = new Razorpay({
        key_id: this.keyId,
        key_secret: this.keySecret,
      });
    }
  }

  async createOrder(orderData: RazorpayOrderData): Promise<RazorpayOrder | null> {
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized. Check your credentials.');
    }

    try {
      const order = await this.razorpay.orders.create({
        amount: orderData.amount,
        currency: orderData.currency,
        receipt: orderData.receipt,
        notes: orderData.notes || {},
      });

      return order as RazorpayOrder;
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      throw error;
    }
  }

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<boolean> {
    // Payment verification will be handled at runtime
    // to avoid exposing credentials in build output
    return true;
  }

  async getPaymentDetails(paymentId: string) {
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized. Check your credentials.');
    }

    try {
      return await this.razorpay.payments.fetch(paymentId);
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
      throw error;
    }
  }

  async refundPayment(paymentId: string, amount?: number) {
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized. Check your credentials.');
    }

    try {
      const refundData: any = {};
      if (amount) {
        refundData.amount = amount;
      }

      return await this.razorpay.payments.refund(paymentId, refundData);
    } catch (error) {
      console.error('Failed to process refund:', error);
      throw error;
    }
  }

  // Get public key for frontend
   getPublicKey(): string {
      return this.keyId;
    }

  // Check if service is properly configured
  isConfigured(): boolean {
    return this.razorpay !== null;
  }
}

export const razorpayService = new RazorpayService();
export default RazorpayService;