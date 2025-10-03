import { NextRequest, NextResponse } from 'next/server';
import { aliExpressApi } from '@/lib/aliexpress-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const { searchParams } = new URL(request.url);
    
    const currency = searchParams.get('currency') || 'USD';
    const language = searchParams.get('language') || 'EN';

    const products = await aliExpressApi.getProductDetails([productId], currency, language);
    
    if (products.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found' 
        },
        { status: 404 }
      );
    }

    const transformedProduct = aliExpressApi.transformToInternalProduct(products[0]);

    return NextResponse.json({
      success: true,
      data: transformedProduct
    });

  } catch (error) {
    console.error('AliExpress product details API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch product details',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}