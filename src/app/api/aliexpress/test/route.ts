import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test API configuration
    const appKey = process.env.ALIEXPRESS_APP_KEY;
    const appSecret = process.env.ALIEXPRESS_APP_SECRET;
    const apiUrl = process.env.ALIEXPRESS_API_URL;
    
    const testResponse = {
      success: true,
      message: 'AliExpress API configuration test',
      config: {
        appKey: appKey ? `${appKey.substring(0, 3)}***` : 'Not configured',
        appSecret: appSecret && appSecret !== 'your_app_secret_here' ? 'Configured ✅' : 'Not configured ❌',
        apiUrl: apiUrl || 'Default URL',
        status: appKey === '519544' ? 'App Key Active ✅' : 'App Key Issue ❌'
      },
      nextSteps: appSecret === 'your_app_secret_here' ? [
        'Please add your App Secret to complete the integration',
        'Update ALIEXPRESS_APP_SECRET in your .env.local file',
        'You can find your App Secret in the AliExpress Developer Console'
      ] : [
        'Configuration looks good!',
        'You can now test product searches',
        'Visit /featured to start browsing TechNova products'
      ]
    };

    return NextResponse.json(testResponse);

  } catch (error) {
    console.error('AliExpress API test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Configuration test failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}