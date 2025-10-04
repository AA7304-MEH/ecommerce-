import crypto from 'crypto';

export interface AmazonProduct {
  ASIN: string;
  DetailPageURL: string;
  ItemInfo: {
    Title?: {
      DisplayValue: string;
    };
    ByLineInfo?: {
      Brand?: {
        DisplayValue: string;
      };
    };
    Features?: {
      DisplayValues: string[];
    };
    ProductInfo?: {
      Color?: {
        DisplayValue: string;
      };
      Size?: {
        DisplayValue: string;
      };
    };
    TechnicalInfo?: {
      ItemDimensions?: {
        DisplayValue: string;
      };
    };
  };
  Images?: {
    Primary?: {
      Small?: {
        URL: string;
      };
      Medium?: {
        URL: string;
      };
      Large?: {
        URL: string;
      };
    };
    Variants?: Array<{
      Small?: {
        URL: string;
      };
      Medium?: {
        URL: string;
      };
      Large?: {
        URL: string;
      };
    }>;
  };
  Offers?: {
    Summaries?: Array<{
      HighestPrice?: {
        Amount: number;
        Currency: string;
      };
      LowestPrice?: {
        Amount: number;
        Currency: string;
      };
      BuyBoxPrices?: Array<{
        Price?: {
          Amount: number;
          Currency: string;
        };
      }>;
    }>;
  };
}

export interface AmazonSearchParams {
  keywords?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
  condition?: 'New' | 'Used' | 'Collectible' | 'Refurbished';
  availability?: 'Available' | 'IncludeOutOfStock';
}

export interface AmazonApiResponse {
  SearchResult?: {
    Items?: AmazonProduct[];
    TotalResultCount?: number;
    SearchURL?: string;
  };
}

class AmazonAssociatesApi {
  private readonly accessKeyId: string = '';
  private readonly secretAccessKey: string = '';
  private readonly associateTag: string = '';
  private readonly partnerTag: string = '';
  private readonly marketplace: string = 'www.amazon.com';
  private readonly host: string = 'webservices.amazon.com';
  private readonly region: string = 'us-east-1';

  constructor() {
    // Load credentials at runtime to avoid exposing in build output
    if (typeof window === 'undefined') {
      this.accessKeyId = process.env.AMAZON_ACCESS_KEY_ID || '';
      this.secretAccessKey = process.env.AMAZON_SECRET_ACCESS_KEY || '';
      this.associateTag = process.env.AMAZON_ASSOCIATE_TAG || '';
      this.partnerTag = process.env.AMAZON_PARTNER_TAG || process.env.AMAZON_ASSOCIATE_TAG || '';
    }
  }

  private generateSignature(
    method: string,
    uri: string,
    headers: Record<string, string>,
    payload: string = ''
  ): string {
    const algorithm = 'AWS4-HMAC-SHA256';
    const requestDate = headers['X-Amz-Date'];
    const date = requestDate.substring(0, 8);

    // Create canonical request
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map(key => `${key.toLowerCase()}:${headers[key].trim()}`)
      .join('\n');

    const signedHeaders = Object.keys(headers)
      .sort()
      .map(key => key.toLowerCase())
      .join(';');

    const canonicalRequest = [
      method,
      uri,
      '', // query string (empty for POST)
      canonicalHeaders + '\n',
      signedHeaders,
      crypto.createHash('sha256').update(payload || '').digest('hex')
    ].join('\n');

    // Create string to sign
    const credentialScope = `${date}/${this.region}/ProductAdvertisingAPI/aws4_request`;
    const stringToSign = [
      algorithm,
      requestDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');

    // Create signing key
    const signingKey = this.getSigningKey(date, this.secretAccessKey);

    // Calculate signature
    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(stringToSign)
      .digest('hex');

    return `${algorithm} Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  }

  private getSigningKey(date: string, secretKey: string): Buffer {
    const key1 = crypto.createHmac('sha256', `AWS4${secretKey}`).update(date).digest();
    const key2 = crypto.createHmac('sha256', key1).update(this.region).digest();
    const key3 = crypto.createHmac('sha256', key2).update('ProductAdvertisingAPI').digest();
    return crypto.createHmac('sha256', key3).update('aws4_request').digest();
  }

  private async makeRequest(operation: string, params: Record<string, any> = {}): Promise<any> {
    try {
      if (!this.accessKeyId || !this.secretAccessKey || !this.associateTag) {
        throw new Error('Amazon Associates API credentials not configured');
      }

      const requestDate = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
      const date = requestDate.substring(0, 8);

      // Prepare request parameters
      const requestParams = {
        'AssociateTag': this.associateTag,
        'Operation': operation,
        'PartnerTag': this.partnerTag,
        'PartnerType': 'Associates',
        'Marketplace': this.marketplace,
        'Timestamp': requestDate,
        ...params,
      };

      // Create query string
      const queryString = Object.keys(requestParams)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`)
        .join('&');

      const uri = `/paapi5/${operation.toLowerCase()}`;
      const payload = queryString;

      // Create headers
      const headers = {
        'host': this.host,
        'x-amz-date': requestDate,
        'x-amz-target': `ProductAdvertisingAPIv5.${operation}`,
        'content-type': 'application/x-amz-json-1.1',
      };

      // Generate signature
      const authorization = this.generateSignature('POST', uri, headers, payload);

      // Add authorization header
      headers['Authorization'] = authorization;

      const response = await fetch(`https://${this.host}${uri}`, {
        method: 'POST',
        headers,
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Amazon Associates API request failed:', error);
      throw error;
    }
  }

  async searchProducts(searchParams: AmazonSearchParams): Promise<AmazonProduct[]> {
    try {
      const params = {
        'Keywords': searchParams.keywords || '',
        'SearchIndex': searchParams.category || 'All',
        'ItemCount': searchParams.pageSize || 10,
        'Resources': [
          'Images.Primary.Small',
          'Images.Primary.Medium',
          'Images.Primary.Large',
          'Images.Variants.Small',
          'Images.Variants.Medium',
          'Images.Variants.Large',
          'ItemInfo.Title',
          'ItemInfo.Features',
          'ItemInfo.ProductInfo',
          'ItemInfo.ByLineInfo',
          'ItemInfo.TechnicalInfo',
          'Offers.Summaries.HighestPrice',
          'Offers.Summaries.LowestPrice',
          'Offers.BuyBoxPrices'
        ],
        'MinimumPrice': searchParams.minPrice ? Math.floor(searchParams.minPrice * 100) : undefined,
        'MaximumPrice': searchParams.maxPrice ? Math.floor(searchParams.maxPrice * 100) : undefined,
        'SortBy': this.mapSortOption(searchParams.sort),
        'Condition': searchParams.condition || 'New',
        'Availability': searchParams.availability || 'Available',
      };

      // Remove undefined values
      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

      const response = await this.makeRequest('SearchItems', params);

      return response.SearchResult?.Items || [];
    } catch (error) {
      console.error('Failed to search Amazon products:', error);
      return [];
    }
  }

  async getProductDetails(asins: string[]): Promise<AmazonProduct[]> {
    try {
      const params = {
        'ItemIds': asins,
        'ItemIdType': 'ASIN',
        'Resources': [
          'Images.Primary.Small',
          'Images.Primary.Medium',
          'Images.Primary.Large',
          'Images.Variants.Small',
          'Images.Variants.Medium',
          'Images.Variants.Large',
          'ItemInfo.Title',
          'ItemInfo.Features',
          'ItemInfo.ProductInfo',
          'ItemInfo.ByLineInfo',
          'ItemInfo.TechnicalInfo',
          'Offers.Summaries.HighestPrice',
          'Offers.Summaries.LowestPrice',
          'Offers.BuyBoxPrices'
        ],
      };

      const response = await this.makeRequest('GetItems', params);

      return response.ItemsResult?.Items || [];
    } catch (error) {
      console.error('Failed to get Amazon product details:', error);
      return [];
    }
  }

  private mapSortOption(sort?: string): string {
    const sortMap: Record<string, string> = {
      'price_asc': 'Price:LowToHigh',
      'price_desc': 'Price:HighToLow',
      'relevance': 'Relevance',
      'rating': 'AvgCustomerReviews',
      'newest': 'NewestArrivals',
      'bestseller': 'BestSellers',
    };
    return sortMap[sort || 'relevance'] || 'Relevance';
  }

  // Transform Amazon product to our internal product format
  transformToInternalProduct(amazonProduct: AmazonProduct): any {
    const offers = amazonProduct.Offers?.Summaries?.[0];
    const price = offers?.LowestPrice?.Amount || offers?.BuyBoxPrices?.[0]?.Price?.Amount;
    const currency = offers?.LowestPrice?.Currency || offers?.BuyBoxPrices?.[0]?.Price?.Currency || 'USD';

    return {
      id: amazonProduct.ASIN,
      title: amazonProduct.ItemInfo?.Title?.DisplayValue || 'Unknown Product',
      price: price ? price / 100 : 0, // Convert from cents
      originalPrice: offers?.HighestPrice?.Amount ? offers.HighestPrice.Amount / 100 : undefined,
      image: amazonProduct.Images?.Primary?.Large?.URL || amazonProduct.Images?.Primary?.Medium?.URL,
      images: [
        amazonProduct.Images?.Primary?.Small?.URL,
        amazonProduct.Images?.Primary?.Medium?.URL,
        amazonProduct.Images?.Primary?.Large?.URL,
        ...(amazonProduct.Images?.Variants?.map(v => v.Large?.URL) || [])
      ].filter(Boolean),
      rating: 4.5, // Amazon doesn't provide rating in basic API response
      reviews: 0, // Amazon doesn't provide review count in basic API response
      category: 'amazon',
      vendor: amazonProduct.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || 'Amazon',
      url: amazonProduct.DetailPageURL,
      affiliateLink: `${amazonProduct.DetailPageURL}?tag=${this.associateTag}`,
      commission: '8%', // Standard Amazon Associates commission rate
      discount: offers?.HighestPrice?.Amount && price ?
        Math.round(((offers.HighestPrice.Amount - price * 100) / offers.HighestPrice.Amount) * 100) : 0,
      currency,
      shipping: 'Free shipping on eligible orders',
      availability: 'In Stock',
      source: 'amazon',
      features: amazonProduct.ItemInfo?.Features?.DisplayValues || [],
      brand: amazonProduct.ItemInfo?.ByLineInfo?.Brand?.DisplayValue,
      color: amazonProduct.ItemInfo?.ProductInfo?.Color?.DisplayValue,
      size: amazonProduct.ItemInfo?.ProductInfo?.Size?.DisplayValue,
    };
  }

  async getBrowseNodes(browseNodeIds: string[]): Promise<any> {
    try {
      const params = {
        'BrowseNodeIds': browseNodeIds,
        'Resources': ['BrowseNodes.Ancestor', 'BrowseNodes.SalesRank'],
        'LanguagesOfPreference': ['en_US'],
      };

      const response = await this.makeRequest('GetBrowseNodes', params);

      return response.BrowseNodesResult?.BrowseNodes || [];
    } catch (error) {
      console.error('Failed to get browse nodes:', error);
      return [];
    }
  }

  async getTopProducts(category?: string, limit: number = 10): Promise<AmazonProduct[]> {
    try {
      const searchParams: AmazonSearchParams = {
        category: category || 'Electronics',
        pageSize: limit,
        sort: 'bestseller',
      };

      return await this.searchProducts(searchParams);
    } catch (error) {
      console.error('Failed to get top products:', error);
      return [];
    }
  }
}

export const amazonAssociatesApi = new AmazonAssociatesApi();
export default AmazonAssociatesApi;