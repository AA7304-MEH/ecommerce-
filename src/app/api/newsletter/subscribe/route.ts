import { NextRequest, NextResponse } from 'next/server';
import { mailchimpService } from '@/lib/mailchimp';
import { trackNewsletterSignup } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, country, interests, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Subscribe to TechNova newsletter via Mailchimp
    const result = await mailchimpService.subscribeToNewsletter({
      email,
      firstName,
      lastName,
      country,
      interests: interests || [],
      tags: ['Website Signup'],
      source: source || 'technova_website'
    });

    if (result.success) {
      // Track successful newsletter signup in Google Analytics
      if (typeof window !== 'undefined') {
        trackNewsletterSignup('email');
      }

      // Send welcome email
      if (firstName) {
        await mailchimpService.sendWelcomeEmail(email, firstName);
      }

      return NextResponse.json({
        success: true,
        message: result.message || 'Successfully subscribed to TechNova newsletter!'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to subscribe' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error occurred while subscribing'
      },
      { status: 500 }
    );
  }
}