import { NextRequest, NextResponse } from 'next/server';
import { amazonAssociatesApi } from '@/lib/amazon-associates-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const keywords = searchParams.get('keywords') || '';
    const category = searchParams.get('category') || 'All';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'relevance';
    const condition = searchParams.get('condition') as 'New' | 'Used' | 'Collectible' | 'Refurbished' || 'New';
    const availability = searchParams.get('availability') as 'Available' | 'IncludeOutOfStock' || 'Available';

    const searchOptions = {
      keywords,
      category,
      minPrice,
      maxPrice,
      page,
      pageSize: limit,
      sort,
      condition,
      availability,
    };

    const products = await amazonAssociatesApi.searchProducts(searchOptions);

    // Transform to our internal format
    const transformedProducts = products.map(product =>
      amazonAssociatesApi.transformToInternalProduct(product)
    );

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      pagination: {
        page,
        limit,
        total: transformedProducts.length,
      }
    });

  } catch (error) {
    console.error('Amazon search API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search Amazon products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}