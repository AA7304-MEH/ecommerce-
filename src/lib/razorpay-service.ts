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

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn('Razorpay credentials not found. Payment processing will not work.');
      return;
    }

    try {
      this.razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    } catch (error) {
      console.error('Failed to initialize Razorpay:', error);
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
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized. Check your credentials.');
    }

    try {
      const crypto = require('crypto');
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      
      const hmac = crypto.createHmac('sha256', keySecret);
      hmac.update(razorpayOrderId + '|' + razorpayPaymentId);
      const generatedSignature = hmac.digest('hex');

      return generatedSignature === razorpaySignature;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
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
    return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  }

  // Check if service is properly configured
  isConfigured(): boolean {
    return this.razorpay !== null;
  }
}

export const razorpayService = new RazorpayService();
export default RazorpayService;