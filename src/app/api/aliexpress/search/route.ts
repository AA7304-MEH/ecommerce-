import { NextRequest, NextResponse } from 'next/server';
import { aliExpressApi } from '@/lib/aliexpress-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const keywords = searchParams.get('keywords') || '';
    const category = searchParams.get('category') || '';
    const minPrice = Number(searchParams.get('minPrice')) || undefined;
    const maxPrice = Number(searchParams.get('maxPrice')) || undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    const sort = searchParams.get('sort') || 'SALE_PRICE_ASC';
    const currency = searchParams.get('currency') || 'USD';
    const language = searchParams.get('language') || 'EN';
    const country = searchParams.get('country') || 'US';

    const searchOptions = {
      keywords,
      category_ids: category,
      min_sale_price: minPrice,
      max_sale_price: maxPrice,
      page_no: page,
      page_size: limit,
      sort,
      target_currency: currency,
      target_language: language,
      ship_to_country: country,
    };

    const products = await aliExpressApi.searchProducts(searchOptions);
    
    // Transform to our internal format
    const transformedProducts = products.map(product => 
      aliExpressApi.transformToInternalProduct(product)
    );

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      pagination: {
        page,
        limit,
        total: products.length,
      }
    });

  } catch (error) {
    console.error('AliExpress search API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}