'use client';

import { useEffect } from 'react';
import { zendeskService } from '@/lib/zendesk';

interface ZendeskWidgetProps {
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  department?: 'sales' | 'support' | 'technical' | 'billing';
  autoOpen?: boolean;
}

// Zendesk Widget component for TechNova
const ZendeskWidget = ({ 
  userEmail, 
  userName, 
  userPhone, 
  department,
  autoOpen = false 
}: ZendeskWidgetProps) => {
  useEffect(() => {
    // Initialize Zendesk widget on component mount
    zendeskService.initializeWidget();

    // Set user context if provided
    if (userEmail || userName) {
      const userContext = {
        email: userEmail,
        name: userName,
        phone: userPhone,
        organization: 'TechNova Customer',
        customFields: {
          customer_type: 'technova_website_visitor',
          support_tier: 'standard'
        }
      };

      // Wait for widget to load before setting context
      const setContextTimer = setTimeout(() => {
        zendeskService.setUserContext(userContext);
      }, 1000);

      return () => clearTimeout(setContextTimer);
    }

    // Set department if specified
    if (department) {
      const setDepartmentTimer = setTimeout(() => {
        zendeskService.setDepartment(department);
      }, 1500);

      return () => clearTimeout(setDepartmentTimer);
    }

    // Auto-open widget if requested
    if (autoOpen) {
      const autoOpenTimer = setTimeout(() => {
        zendeskService.openChat();
      }, 2000);

      return () => clearTimeout(autoOpenTimer);
    }
  }, [userEmail, userName, userPhone, department, autoOpen]);

  // Component doesn't render anything visible - it just manages the Zendesk widget
  return null;
};

export default ZendeskWidget;