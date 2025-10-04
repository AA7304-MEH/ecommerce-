import { NextRequest, NextResponse } from 'next/server';
import { amazonAssociatesApi } from '@/lib/amazon-associates-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const asin = params.id;

    if (!asin) {
      return NextResponse.json(
        { success: false, error: 'Product ID (ASIN) is required' },
        { status: 400 }
      );
    }

    const products = await amazonAssociatesApi.getProductDetails([asin]);

    if (products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform to our internal format
    const transformedProduct = amazonAssociatesApi.transformToInternalProduct(products[0]);

    return NextResponse.json({
      success: true,
      data: transformedProduct
    });

  } catch (error) {
    console.error('Amazon product details API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get product details',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}