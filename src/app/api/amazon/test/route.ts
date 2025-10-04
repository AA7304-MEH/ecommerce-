import { NextResponse } from 'next/server';
import { amazonAssociatesApi } from '@/lib/amazon-associates-api';

export async function GET() {
  try {
    // Test the Amazon Associates API connection
    const testProducts = await amazonAssociatesApi.searchProducts({
      keywords: 'laptop',
      pageSize: 5,
      category: 'Electronics'
    });

    if (testProducts.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No products returned from Amazon API',
        message: 'This might indicate an issue with your Amazon Associates API credentials or configuration'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Amazon Associates API is working correctly',
      testResults: {
        productsFound: testProducts.length,
        sampleProduct: {
          asin: testProducts[0].ASIN,
          title: testProducts[0].ItemInfo?.Title?.DisplayValue?.substring(0, 100) + '...',
          hasImage: !!testProducts[0].Images?.Primary?.Large?.URL,
          hasPrice: !!testProducts[0].Offers?.Summaries?.[0]?.LowestPrice?.Amount
        }
      }
    });

  } catch (error) {
    console.error('Amazon Associates API test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Amazon Associates API test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Check that your Amazon Associates API credentials are correct in .env.local',
        'Ensure your Amazon Associates account is approved and active',
        'Verify that your Associate Tag is correctly configured',
        'Make sure you have signed up for Amazon Product Advertising API access',
        'Check that your AWS credentials have the correct permissions'
      ]
    }, { status: 500 });
  }
}