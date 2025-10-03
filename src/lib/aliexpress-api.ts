import crypto from 'crypto';

export interface AliExpressProduct {
  product_id: string;
  product_title: string;
  product_main_image_url: string;
  product_video_url?: string;
  product_detail_url: string;
  platform_product_type: string;
  target_sale_price: string;
  target_sale_price_currency: string;
  target_original_price: string;
  target_original_price_currency: string;
  discount: string;
  evaluate_rate: string;
  commission_rate: string;
  '30_days_commission': string;
  volume: number;
  product_small_image_urls: string[];
  shop_id: string;
  shop_url: string;
  promotion_link: string;
  sale_price: string;
  original_price: string;
}

export interface AliExpressSearchParams {
  keywords?: string;
  category_ids?: string;
  min_sale_price?: number;
  max_sale_price?: number;
  platform_product_type?: string;
  page_no?: number;
  page_size?: number;
  sort?: string;
  target_currency?: string;
  target_language?: string;
  ship_to_country?: string;
}

export interface AliExpressApiResponse {
  aliexpress_affiliate_product_query_response?: {
    resp_result?: {
      result?: {
        products?: AliExpressProduct[];
        total_record_count?: number;
        current_page_no?: number;
        current_record_count?: number;
      };
      success?: boolean;
    };
  };
}

class AliExpressApi {
  private readonly appKey: string;
  private readonly appSecret: string;
  private readonly apiUrl: string;
  private readonly apiVersion: string;
  private readonly trackingId: string;

  constructor() {
    this.appKey = process.env.ALIEXPRESS_APP_KEY || '';
    this.appSecret = process.env.ALIEXPRESS_APP_SECRET || '';
    this.apiUrl = process.env.ALIEXPRESS_API_URL || 'http://gw.api.taobao.com/router/rest';
    this.apiVersion = process.env.ALIEXPRESS_API_VERSION || '2.0';
    this.trackingId = process.env.ALIEXPRESS_TRACKING_ID || '';

    if (!this.appKey || !this.appSecret) {
      console.warn('AliExpress API credentials not found. Please set ALIEXPRESS_APP_KEY and ALIEXPRESS_APP_SECRET in your environment variables.');
    }
  }

  private signRequest(parameters: Record<string, any>): string {
    const sortedParams = Object.keys(parameters)
      .sort()
      .reduce((acc, key) => {
        acc[key] = parameters[key];
        return acc;
      }, {} as Record<string, any>);

    const sortedString = Object.keys(sortedParams).reduce((acc, key) => {
      return `${acc}${key}${sortedParams[key]}`;
    }, '');

    const bookstandString = `${this.appSecret}${sortedString}${this.appSecret}`;
    const signedString = crypto
      .createHash('md5')
      .update(bookstandString, 'utf8')
      .digest('hex')
      .toUpperCase();
    
    return signedString;
  }

  private async makeRequest(method: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const timestamp = new Date()
        .toISOString()
        .replace(/T|Z/g, ' ')
        .replace(/\..+/g, '');

      const payload = {
        method,
        app_key: this.appKey,
        sign_method: 'md5',
        timestamp,
        format: 'json',
        v: this.apiVersion,
        ...params,
      };

      const sign = this.signRequest(payload);
      const allParams = { ...payload, sign };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams(allParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AliExpress API request failed:', error);
      throw error;
    }
  }

  async searchProducts(searchParams: AliExpressSearchParams): Promise<AliExpressProduct[]> {
    try {
      const params = {
        keywords: searchParams.keywords || '',
        category_ids: searchParams.category_ids || '',
        min_sale_price: searchParams.min_sale_price || 0,
        max_sale_price: searchParams.max_sale_price || 999999,
        platform_product_type: searchParams.platform_product_type || 'ALL',
        page_no: searchParams.page_no || 1,
        page_size: searchParams.page_size || 20,
        sort: searchParams.sort || 'SALE_PRICE_ASC',
        target_currency: searchParams.target_currency || 'USD',
        target_language: searchParams.target_language || 'EN',
        ship_to_country: searchParams.ship_to_country || 'US',
        tracking_id: this.trackingId,
      };

      const response: AliExpressApiResponse = await this.makeRequest(
        'aliexpress.affiliate.product.query',
        params
      );

      const products = response.aliexpress_affiliate_product_query_response?.resp_result?.result?.products || [];
      return products;
    } catch (error) {
      console.error('Failed to search products:', error);
      return [];
    }
  }

  async getProductDetails(productIds: string[], targetCurrency = 'USD', targetLanguage = 'EN'): Promise<AliExpressProduct[]> {
    try {
      const params = {
        product_ids: productIds.join(','),
        target_currency: targetCurrency,
        target_language: targetLanguage,
        tracking_id: this.trackingId,
      };

      const response = await this.makeRequest(
        'aliexpress.affiliate.productdetail.get',
        params
      );

      const products = response.aliexpress_affiliate_productdetail_get_response?.resp_result?.result?.products || [];
      return products;
    } catch (error) {
      console.error('Failed to get product details:', error);
      return [];
    }
  }

  async getHotProducts(targetCurrency = 'USD', targetLanguage = 'EN', shipToCountry = 'US'): Promise<AliExpressProduct[]> {
    try {
      const params = {
        target_currency: targetCurrency,
        target_language: targetLanguage,
        ship_to_country: shipToCountry,
        tracking_id: this.trackingId,
        page_size: 50,
      };

      const response = await this.makeRequest(
        'aliexpress.affiliate.hotproduct.query',
        params
      );

      const products = response.aliexpress_affiliate_hotproduct_query_response?.resp_result?.result?.products || [];
      return products;
    } catch (error) {
      console.error('Failed to get hot products:', error);
      return [];
    }
  }

  async getFeaturedProducts(categoryId?: string): Promise<AliExpressProduct[]> {
    try {
      const params = {
        category_ids: categoryId || '',
        target_currency: 'USD',
        target_language: 'EN',
        ship_to_country: 'US',
        tracking_id: this.trackingId,
        page_size: 20,
        sort: 'COMMISSION_RATE_DESC',
      };

      const response = await this.makeRequest(
        'aliexpress.affiliate.featuredpromo.products.get',
        params
      );

      const products = response.aliexpress_affiliate_featuredpromo_products_get_response?.resp_result?.result?.products || [];
      return products;
    } catch (error) {
      console.error('Failed to get featured products:', error);
      return [];
    }
  }

  // Transform AliExpress product to our internal product format
  transformToInternalProduct(aliProduct: AliExpressProduct): any {
    return {
      id: aliProduct.product_id,
      title: aliProduct.product_title,
      price: parseFloat(aliProduct.target_sale_price || aliProduct.sale_price),
      originalPrice: parseFloat(aliProduct.target_original_price || aliProduct.original_price),
      image: aliProduct.product_main_image_url,
      images: aliProduct.product_small_image_urls || [],
      rating: parseFloat(aliProduct.evaluate_rate) || 4.5,
      reviews: aliProduct.volume || 0,
      category: 'aliexpress',
      vendor: 'TechNova',
      url: aliProduct.product_detail_url,
      affiliateLink: aliProduct.promotion_link,
      commission: aliProduct.commission_rate,
      discount: aliProduct.discount,
      currency: aliProduct.target_sale_price_currency || 'USD',
      shipping: 'Free Worldwide Shipping',
      availability: 'In Stock',
      source: 'aliexpress'
    };
  }
}

export const aliExpressApi = new AliExpressApi();
export default AliExpressApi;