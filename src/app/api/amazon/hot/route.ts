import { NextRequest, NextResponse } from 'next/server';
import { amazonAssociatesApi } from '@/lib/amazon-associates-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category') || 'Electronics';
    const limit = Number(searchParams.get('limit')) || 20;

    const products = await amazonAssociatesApi.getTopProducts(category, limit);

    // Transform to our internal format
    const transformedProducts = products.map(product =>
      amazonAssociatesApi.transformToInternalProduct(product)
    );

    return NextResponse.json({
      success: true,
      data: transformedProducts,
      category,
      count: transformedProducts.length
    });

  } catch (error) {
    console.error('Amazon hot products API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get hot products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}