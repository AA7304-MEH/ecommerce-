# Deploying GadgetStore to Netlify

## Quick Deployment Steps

### Method 1: Netlify Drop (Easiest)

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://www.netlify.com/)**
   - Sign up/Sign in to your account
   - Click "Sites" in the dashboard

3. **Deploy via drag & drop:**
   - Drag the `out` folder (generated after build) to the Netlify deploy area
   - Your site will be live instantly with a random URL

### Method 2: Git Repository (Recommended for continuous deployment)

1. **Initialize Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GadgetStore e-commerce website"
   ```

2. **Push to GitHub/GitLab:**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

3. **Connect to Netlify:**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the repository
   - Build settings should auto-configure from `netlify.toml`

### Method 3: Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=out
   ```

## Environment Variables (if needed)

If you add real payment gateway keys later, set them in Netlify:

1. Go to Site Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `RAZORPAY_KEY_SECRET`
   - `PAYPAL_CLIENT_SECRET`

## Custom Domain (Optional)

1. In Netlify dashboard, go to Domain Settings
2. Add your custom domain
3. Configure DNS as instructed
4. SSL certificate will be automatically provisioned

## Performance Optimizations Included

- ✅ Static site generation for faster loading
- ✅ Image optimization settings
- ✅ Caching headers configured
- ✅ Security headers included
- ✅ SEO optimizations (sitemap, meta tags)
- ✅ Mobile-first responsive design

Your GadgetStore will be lightning-fast on Netlify! 🚀