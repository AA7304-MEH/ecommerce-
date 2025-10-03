import { NextRequest, NextResponse } from 'next/server';
import { mailchimpService } from '@/lib/mailchimp';

export async function POST(request: NextRequest) {
  try {
    const { email, segment } = await request.json();

    if (!email || !segment) {
      return NextResponse.json(
        { success: false, error: 'Email and segment are required' },
        { status: 400 }
      );
    }

    // Add customer to specific TechNova segment
    const result = await mailchimpService.addToSegment(email, segment);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || 'Successfully added to segment'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to add to segment' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Segment addition error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error occurred while adding to segment'
      },
      { status: 500 }
    );
  }
}