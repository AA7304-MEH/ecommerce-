import { NextRequest, NextResponse } from 'next/server';
import { aliExpressApi } from '@/lib/aliexpress-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const currency = searchParams.get('currency') || 'USD';
    const language = searchParams.get('language') || 'EN';
    const country = searchParams.get('country') || 'US';
    const limit = Number(searchParams.get('limit')) || 20;

    const products = await aliExpressApi.getHotProducts(currency, language, country);
    
    // Transform to our internal format and limit results
    const transformedProducts = products
      .slice(0, limit)
      .map(product => aliExpressApi.transformToInternalProduct(product));

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      total: transformedProducts.length
    });

  } catch (error) {
    console.error('AliExpress hot products API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch hot products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}