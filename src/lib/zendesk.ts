// Zendesk integration for TechNova customer support
// Live chat, help desk tickets, and customer service management

declare global {
  interface Window {
    zE?: (...args: any[]) => void;
    zESettings?: any;
  }
}

interface ZendeskConfig {
  webWidget: {
    launcher: {
      label: {
        '*': string;
      };
      chatLabel: {
        '*': string;
      };
    };
    chat: {
      title: {
        '*': string;
      };
      connectOnPageLoad: boolean;
      prechatForm: {
        greeting: {
          '*': string;
        };
      };
    };
    helpCenter: {
      title: {
        '*': string;
      };
    };
    color: {
      theme: string;
      launcher: string;
      launcherText: string;
      button: string;
      resultLists: string;
      header: string;
      articleLinks: string;
    };
    offset: {
      horizontal: string;
      vertical: string;
    };
    position: {
      horizontal: string;
      vertical: string;
    };
  };
}

class ZendeskService {
  private readonly zendeskKey: string;
  private readonly subdomain: string;
  private isInitialized: boolean = false;

  constructor() {
    this.zendeskKey = process.env.NEXT_PUBLIC_ZENDESK_KEY || '';
    this.subdomain = process.env.NEXT_PUBLIC_ZENDESK_SUBDOMAIN || '';

    if (!this.zendeskKey || !this.subdomain) {
      console.warn('Zendesk credentials not configured. Please set NEXT_PUBLIC_ZENDESK_KEY and NEXT_PUBLIC_ZENDESK_SUBDOMAIN in your environment variables.');
    }
  }

  // Initialize Zendesk Widget with TechNova branding
  initializeWidget(): void {
    if (!this.zendeskKey || typeof window === 'undefined' || this.isInitialized) return;

    try {
      // Set Zendesk configuration for TechNova
      window.zESettings = this.getTechNovaConfig();

      // Load Zendesk Widget script
      const script = document.createElement('script');
      script.id = 'ze-snippet';
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${this.zendeskKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isInitialized = true;
        this.setupTechNovaCustomization();
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error('Failed to initialize Zendesk widget:', error);
    }
  }

  // Get TechNova-specific Zendesk configuration
  private getTechNovaConfig(): ZendeskConfig {
    return {
      webWidget: {
        launcher: {
          label: {
            '*': 'TechNova Support'
          },
          chatLabel: {
            '*': 'Chat with TechNova'
          }
        },
        chat: {
          title: {
            '*': 'TechNova Customer Support'
          },
          connectOnPageLoad: false,
          prechatForm: {
            greeting: {
              '*': 'Welcome to TechNova! How can our tech experts help you today?'
            }
          }
        },
        helpCenter: {
          title: {
            '*': 'TechNova Help Center'
          }
        },
        color: {
          theme: '#8b5cf6', // TechNova purple
          launcher: '#8b5cf6',
          launcherText: '#ffffff',
          button: '#8b5cf6',
          resultLists: '#8b5cf6',
          header: '#8b5cf6',
          articleLinks: '#8b5cf6'
        },
        offset: {
          horizontal: '20px',
          vertical: '20px'
        },
        position: {
          horizontal: 'right',
          vertical: 'bottom'
        }
      }
    };
  }

  // Setup TechNova-specific customizations
  private setupTechNovaCustomization(): void {
    if (!window.zE) return;

    try {
      // Set user information when available
      this.setUserContext();

      // Track chat events for analytics
      this.setupEventTracking();

      // Set custom operating hours message
      window.zE('webWidget', 'helpCenter:setSuggestions', {
        labels: ['technova', 'support', 'help'],
        url: window.location.href
      });

      // Show widget after customization
      window.zE('webWidget', 'show');
    } catch (error) {
      console.error('Failed to setup Zendesk customization:', error);
    }
  }

  // Set user context for personalized support
  setUserContext(user?: {
    name?: string;
    email?: string;
    phone?: string;
    organization?: string;
    customFields?: Record<string, any>;
  }): void {
    if (!window.zE) return;

    try {
      if (user) {
        window.zE('webWidget', 'identify', {
          name: user.name,
          email: user.email,
          phone: user.phone,
          organization: user.organization || 'TechNova Customer',
          ...user.customFields
        });

        // Set TechNova-specific tags
        window.zE('webWidget', 'prefill', {
          tags: ['technova_customer', 'website_visitor']
        });
      }
    } catch (error) {
      console.error('Failed to set user context:', error);
    }
  }

  // Open specific support functions
  openChat(): void {
    if (!window.zE) return;
    window.zE('webWidget', 'open');
    window.zE('webWidget', 'chat:send', 'Hello! I need help with TechNova products.');
  }

  openHelpCenter(): void {
    if (!window.zE) return;
    window.zE('webWidget', 'helpCenter:openHelpCenter');
  }

  openTicketForm(): void {
    if (!window.zE) return;
    window.zE('webWidget', 'open');
    window.zE('webWidget', 'contactForm:send', {
      subject: 'TechNova Support Request',
      description: 'Please describe your issue with TechNova products or services.'
    });
  }

  // Set custom status and availability
  setAvailability(available: boolean): void {
    if (!window.zE) return;

    try {
      if (available) {
        window.zE('webWidget', 'chat:reauthenticate');
      } else {
        window.zE('webWidget', 'chat:end');
        window.zE('webWidget', 'prefill', {
          message: 'Our TechNova support team is currently offline. Please leave a message and we\'ll get back to you within 2 hours!'
        });
      }
    } catch (error) {
      console.error('Failed to set availability:', error);
    }
  }

  // Track support events for analytics
  private setupEventTracking(): void {
    if (!window.zE) return;

    try {
      // Track chat started
      window.zE('webWidget:on', 'chat:start', () => {
        this.trackSupportEvent('chat_started');
      });

      // Track chat ended
      window.zE('webWidget:on', 'chat:end', () => {
        this.trackSupportEvent('chat_ended');
      });

      // Track ticket submitted
      window.zE('webWidget:on', 'ticket:submit', () => {
        this.trackSupportEvent('ticket_submitted');
      });

      // Track help center article viewed
      window.zE('webWidget:on', 'helpCenter:articleView', (article: any) => {
        this.trackSupportEvent('help_article_viewed', {
          article_id: article.id,
          article_title: article.title
        });
      });
    } catch (error) {
      console.error('Failed to setup event tracking:', error);
    }
  }

  // Track support events in Google Analytics
  private trackSupportEvent(eventType: string, eventData?: any): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'support_interaction', {
        interaction_type: eventType,
        brand: 'TechNova',
        timestamp: new Date().toISOString(),
        ...eventData
      });
    }
  }

  // Hide/Show widget programmatically
  hideWidget(): void {
    if (!window.zE) return;
    window.zE('webWidget', 'hide');
  }

  showWidget(): void {
    if (!window.zE) return;
    window.zE('webWidget', 'show');
  }

  // Set custom department or routing
  setDepartment(department: 'sales' | 'support' | 'technical' | 'billing'): void {
    if (!window.zE) return;

    const departmentMapping = {
      sales: 'TechNova Sales Team',
      support: 'TechNova Customer Support',
      technical: 'TechNova Technical Support',
      billing: 'TechNova Billing Support'
    };

    try {
      window.zE('webWidget', 'prefill', {
        department: departmentMapping[department],
        tags: [department, 'technova_routing']
      });
    } catch (error) {
      console.error('Failed to set department:', error);
    }
  }

  // Create ticket programmatically for specific issues
  createTicket(ticketData: {
    subject: string;
    description: string;
    priority?: 'low' | 'normal' | 'high' | 'urgent';
    type?: 'question' | 'incident' | 'problem' | 'task';
    tags?: string[];
  }): void {
    if (!window.zE) return;

    try {
      window.zE('webWidget', 'contactForm:send', {
        subject: `TechNova: ${ticketData.subject}`,
        description: ticketData.description,
        priority: ticketData.priority || 'normal',
        type: ticketData.type || 'question',
        tags: ['technova', ...(ticketData.tags || [])]
      });

      this.trackSupportEvent('programmatic_ticket_created', {
        subject: ticketData.subject,
        priority: ticketData.priority,
        type: ticketData.type
      });
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  }

  // Check if widget is loaded and ready
  isReady(): boolean {
    return this.isInitialized && typeof window !== 'undefined' && !!window.zE;
  }
}

export const zendeskService = new ZendeskService();
export default ZendeskService;