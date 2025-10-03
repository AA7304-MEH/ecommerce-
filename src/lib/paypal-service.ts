import axios from 'axios';

export interface PayPalOrderData {
  amount: number; // in USD (will be converted to cents)
  currency: string;
  description: string;
  customerInfo?: {
    name?: string;
    email?: string;
  };
}

export interface PayPalOrder {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalCapture {
  id: string;
  status: string;
  amount: {
    currency_code: string;
    value: string;
  };
}

class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private baseURL: string;

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
    this.baseURL = process.env.NODE_ENV === 'production'
      ? 'https://api-m.paypal.com' // Production
      : 'https://api-m.sandbox.paypal.com'; // Sandbox
  }

  private async getAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

      const response = await axios.post(
        `${this.baseURL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Failed to get PayPal access token:', error);
      throw new Error('PayPal authentication failed');
    }
  }

  async createOrder(orderData: PayPalOrderData): Promise<PayPalOrder | null> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    try {
      const accessToken = await this.getAccessToken();

      const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: orderData.currency || 'USD',
              value: (orderData.amount / 100).toFixed(2), // Convert from cents to dollars
            },
            description: orderData.description,
          },
        ],
        application_context: {
          brand_name: 'TechNova Global',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/paypal/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/paypal/cancel`,
        },
      };

      const response = await axios.post(
        `${this.baseURL}/v2/checkout/orders`,
        orderPayload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data as PayPalOrder;
    } catch (error) {
      console.error('Failed to create PayPal order:', error);
      throw error;
    }
  }

  async captureOrder(orderId: string): Promise<PayPalCapture> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseURL}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data as PayPalCapture;
    } catch (error) {
      console.error('Failed to capture PayPal order:', error);
      throw error;
    }
  }

  async getOrderDetails(orderId: string): Promise<PayPalOrder> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseURL}/v2/checkout/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data as PayPalOrder;
    } catch (error) {
      console.error('Failed to get PayPal order details:', error);
      throw error;
    }
  }

  // Get PayPal client ID for frontend
  getClientId(): string {
    return this.clientId;
  }

  // Check if service is properly configured
  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }

  // Get approval link from order
  getApprovalLink(order: PayPalOrder): string | null {
    const approveLink = order.links?.find(link => link.rel === 'approve');
    return approveLink?.href || null;
  }
}

export const paypalService = new PayPalService();
export default PayPalService;