# AliExpress API Integration Setup Guide

This guide will help you set up the AliExpress API integration for your TechNova Global store.

## Prerequisites

1. **AliExpress Seller Account**: You need to create an AliExpress seller account
2. **Developer Account**: Register as a developer on the AliExpress Open Platform
3. **API Application**: Create and get approval for your API application

## Step 1: Create AliExpress Seller Account

1. Go to [AliExpress Seller Center](https://sell.aliexpress.com/)
2. Click "Start Selling" and select your country
3. Fill out the registration form with your business information
4. Verify your email and complete the account setup

## Step 2: Register as Developer

1. Visit [AliExpress Open Platform](https://openservice.aliexpress.com/)
2. Sign in with your seller account credentials
3. Click "Get Started" and agree to the Open Platform Agreement
4. Fill out the developer information form:
   - Contact details
   - Company information
   - Development experience

## Step 3: Create API Application

1. Go to "App Management" in the developer console
2. Click "Create App"
3. Select "Self Developer" as the app type
4. Fill out the application form:
   - App name: "TechNova Global Store"
   - App type: **"Dropshipping"** (Select this option)
   - App description: "Global dropshipping store for tech products with international shipping"
   - Business model: "Dropshipping marketplace connecting global customers with tech products"
   - Website URL: Your domain (or localhost for development)
   - App category: "Dropshipping/E-commerce"
   - Target markets: "Global (195+ countries)"
   - Expected daily API calls: 1000-10000 (based on your expected traffic)
   - Monthly GMV estimate: Provide realistic estimate based on your business plan

## Step 4: API Approval Process

1. Submit your application for review
2. Wait 1-2 business days for approval
3. Once approved, you'll receive:
   - App Key (API Key)
   - App Secret (API Secret)
   - Tracking ID (for affiliate commissions)

## Step 5: Configure Environment Variables

1. Copy the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
# AliExpress API Configuration
ALIEXPRESS_APP_KEY=your_actual_app_key_here
ALIEXPRESS_APP_SECRET=your_actual_app_secret_here
ALIEXPRESS_TRACKING_ID=your_actual_tracking_id_here

# Keep these as they are
ALIEXPRESS_API_URL=http://gw.api.taobao.com/router/rest
ALIEXPRESS_API_VERSION=2.0
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002/api
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/aliexpress` page
3. Try searching for products
4. Check the browser console for any API errors

## Available API Methods

The integration supports the following AliExpress API methods specifically optimized for dropshipping:

### Product Search & Discovery
- `aliexpress.affiliate.product.query` - Search products by keywords for dropshipping
- `aliexpress.affiliate.hotproduct.query` - Get trending/hot products for your store
- `aliexpress.affiliate.featuredpromo.products.get` - Get featured products with high margins

### Product Management
- `aliexpress.affiliate.productdetail.get` - Get detailed product information for listings
- `aliexpress.ds.product.get` - Dropshipping specific product details

### Order Management (Future Enhancement)
- `aliexpress.postproduct.redefining.findaeproductbyidfordropshipper` - Product details for dropshippers
- `aliexpress.ds.order.create` - Create dropshipping orders
- `aliexpress.ds.trackinginfo.query` - Track order shipments

## API Rate Limits

- **Daily Quota**: Varies based on your application approval level
- **Requests per minute**: Usually limited to 1000 per minute
- **Concurrent requests**: Maximum 10 concurrent requests

## Testing Without API Credentials

If you don't have API credentials yet, the system will:
1. Show a warning message in the console
2. Return empty results for searches
3. Display placeholder content
4. Continue to work for other parts of the site

## Troubleshooting

### Common Issues:

1. **"Invalid App Key"**: Double-check your API credentials
2. **"Request signature error"**: Verify your app secret is correct
3. **"API quota exceeded"**: You've hit your daily limit
4. **"Product not found"**: The product ID might be invalid

### Getting Help:

1. Check [AliExpress API Documentation](https://openservice.aliexpress.com/doc/doc.htm)
2. Contact AliExpress API Support
3. Review the console logs for detailed error messages

## Features Included

✅ Product search with filters  
✅ Category-based browsing  
✅ Product details display  
✅ Price and discount information  
✅ Affiliate link generation  
✅ Mobile-responsive design  
✅ Global shipping information  
✅ Multi-currency support  

## Next Steps

1. **Affiliate Program**: Join the AliExpress Affiliate Program for commission tracking
2. **Product Import**: Consider implementing bulk product import
3. **Inventory Sync**: Set up real-time inventory synchronization
4. **Review Integration**: Import product reviews from AliExpress
5. **Analytics**: Add tracking for clicks and conversions

## Legal Considerations

- Ensure compliance with AliExpress Terms of Service
- Respect API rate limits and usage policies
- Properly display required disclaimers and attributions
- Handle customer data according to privacy regulations

---

**Note**: This integration is for educational and development purposes. Make sure to comply with all AliExpress policies and your local regulations when using this in production.