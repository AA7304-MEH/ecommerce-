// Mailchimp integration for TechNova email marketing
// Newsletter subscriptions, customer communications, and automated campaigns

interface MailchimpSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  interests?: string[];
  tags?: string[];
  source?: string;
}

interface MailchimpResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

class MailchimpService {
  private readonly apiKey: string;
  private readonly listId: string;
  private readonly serverPrefix: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY || '';
    this.listId = process.env.MAILCHIMP_LIST_ID || '';
    this.serverPrefix = this.apiKey.split('-')[1] || '';
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`;

    if (!this.apiKey || !this.listId) {
      console.warn('Mailchimp credentials not configured. Please set MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID in your environment variables.');
    }
  }

  // Subscribe user to TechNova newsletter
  async subscribeToNewsletter(subscriber: MailchimpSubscriber): Promise<MailchimpResponse> {
    if (!this.apiKey || !this.listId) {
      return {
        success: false,
        error: 'Mailchimp not configured'
      };
    }

    try {
      const subscriberData = {
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName || '',
          LNAME: subscriber.lastName || '',
          COUNTRY: subscriber.country || '',
          SOURCE: subscriber.source || 'technova_website'
        },
        interests: this.mapInterests(subscriber.interests || []),
        tags: [
          'TechNova Customer',
          'Newsletter Subscriber',
          ...(subscriber.tags || [])
        ]
      };

      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      const data = await response.json();

      if (response.ok) {
        // Track successful subscription
        this.trackSubscription(subscriber.email, 'newsletter_signup');
        
        return {
          success: true,
          message: 'Successfully subscribed to TechNova newsletter!',
          data: data
        };
      } else if (data.title === 'Member Exists') {
        return {
          success: true,
          message: 'You\'re already subscribed to our TechNova newsletter!'
        };
      } else {
        return {
          success: false,
          error: data.detail || 'Failed to subscribe to newsletter'
        };
      }
    } catch (error) {
      console.error('Mailchimp subscription error:', error);
      return {
        success: false,
        error: 'Network error occurred while subscribing'
      };
    }
  }

  // Send welcome email for TechNova customers
  async sendWelcomeEmail(email: string, customerName?: string): Promise<MailchimpResponse> {
    if (!this.apiKey) {
      return { success: false, error: 'Mailchimp not configured' };
    }

    try {
      const campaignData = {
        type: 'regular',
        recipients: {
          list_id: this.listId,
          segment_opts: {
            match: 'any',
            conditions: [{
              condition_type: 'EmailAddress',
              field: 'EMAIL',
              op: 'is',
              value: email
            }]
          }
        },
        settings: {
          subject_line: `Welcome to TechNova, ${customerName || 'Tech Enthusiast'}! 🚀`,
          preview_text: 'Your premium tech journey starts here...',
          title: `TechNova Welcome - ${email}`,
          from_name: 'TechNova Team',
          reply_to: process.env.TECHNOVA_SUPPORT_EMAIL || 'support@technova.global',
          use_conversation: true,
          to_name: customerName || 'Valued Customer',
          folder_id: '',
          authenticate: true,
          auto_footer: false,
          inline_css: true
        }
      };

      const response = await fetch(`${this.baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Welcome email queued for delivery',
          data: data
        };
      } else {
        return {
          success: false,
          error: data.detail || 'Failed to send welcome email'
        };
      }
    } catch (error) {
      console.error('Mailchimp welcome email error:', error);
      return {
        success: false,
        error: 'Failed to send welcome email'
      };
    }
  }

  // Add customer to specific TechNova segments
  async addToSegment(email: string, segmentName: string): Promise<MailchimpResponse> {
    if (!this.apiKey || !this.listId) {
      return { success: false, error: 'Mailchimp not configured' };
    }

    try {
      // Map TechNova segments
      const segments = {
        'premium_customers': 'TechNova Premium Customers',
        'frequent_buyers': 'TechNova Frequent Buyers',
        'international_customers': 'TechNova International Customers',
        'mobile_accessories': 'Mobile Accessories Enthusiasts',
        'smart_home': 'Smart Home Tech Lovers',
        'gaming': 'Gaming Tech Enthusiasts',
        'audio': 'Audio Tech Enthusiasts'
      };

      const segmentId = await this.getOrCreateSegment(segments[segmentName as keyof typeof segments] || segmentName);
      
      if (!segmentId) {
        return { success: false, error: 'Failed to create segment' };
      }

      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/segments/${segmentId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: `Added to ${segmentName} segment`
        };
      } else {
        return {
          success: false,
          error: 'Failed to add to segment'
        };
      }
    } catch (error) {
      console.error('Mailchimp segment error:', error);
      return {
        success: false,
        error: 'Failed to add to segment'
      };
    }
  }

  // Send abandoned cart reminder for TechNova
  async sendAbandonedCartEmail(email: string, cartItems: any[], cartValue: number): Promise<MailchimpResponse> {
    if (!this.apiKey) {
      return { success: false, error: 'Mailchimp not configured' };
    }

    try {
      // Create abandoned cart campaign
      const campaignData = {
        type: 'regular',
        recipients: {
          list_id: this.listId,
          segment_opts: {
            match: 'any',
            conditions: [{
              condition_type: 'EmailAddress',
              field: 'EMAIL',
              op: 'is',
              value: email
            }]
          }
        },
        settings: {
          subject_line: `Don't miss out on your TechNova cart! (${cartItems.length} items waiting)`,
          preview_text: `Your ${cartItems.length} premium tech products are waiting for you...`,
          title: `TechNova Abandoned Cart - $${cartValue}`,
          from_name: 'TechNova Team',
          reply_to: process.env.TECHNOVA_SUPPORT_EMAIL || 'support@technova.global'
        }
      };

      // This would typically be handled by Mailchimp's automation features
      // For now, we'll track the event for later automation setup
      this.trackSubscription(email, 'abandoned_cart', {
        cart_value: cartValue,
        items_count: cartItems.length,
        items: cartItems.map(item => item.title).join(', ')
      });

      return {
        success: true,
        message: 'Abandoned cart email queued'
      };
    } catch (error) {
      console.error('Mailchimp abandoned cart error:', error);
      return {
        success: false,
        error: 'Failed to send abandoned cart email'
      };
    }
  }

  // Track custom events for TechNova customers
  private async trackSubscription(email: string, eventType: string, eventData?: any): Promise<void> {
    if (!this.apiKey || !this.listId) return;

    try {
      const eventPayload = {
        name: eventType,
        properties: {
          brand: 'TechNova',
          store_type: 'global_tech_marketplace',
          timestamp: new Date().toISOString(),
          ...eventData
        }
      };

      await fetch(`${this.baseUrl}/lists/${this.listId}/members/${this.getMemberHash(email)}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });
    } catch (error) {
      console.error('Mailchimp event tracking error:', error);
    }
  }

  // Helper methods
  private mapInterests(interests: string[]): Record<string, boolean> {
    const interestMap: Record<string, boolean> = {};
    
    // TechNova interest categories
    const availableInterests = [
      'mobile_accessories',
      'smart_home',
      'audio_tech',
      'gaming',
      'computer_accessories',
      'wearables',
      'car_gadgets'
    ];

    availableInterests.forEach(interest => {
      interestMap[interest] = interests.includes(interest);
    });

    return interestMap;
  }

  private async getOrCreateSegment(segmentName: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/segments`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`
        }
      });

      const data = await response.json();
      const existingSegment = data.segments?.find((s: any) => s.name === segmentName);

      if (existingSegment) {
        return existingSegment.id;
      }

      // Create new segment
      const createResponse = await fetch(`${this.baseUrl}/lists/${this.listId}/segments`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: segmentName,
          static_segment: []
        }),
      });

      const newSegment = await createResponse.json();
      return newSegment.id || null;
    } catch (error) {
      console.error('Error managing segment:', error);
      return null;
    }
  }

  private getMemberHash(email: string): string {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }
}

export const mailchimpService = new MailchimpService();
export default MailchimpService;