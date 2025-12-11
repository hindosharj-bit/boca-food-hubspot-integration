# Quick Start Guide - Boca Food HubSpot Integration

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git installed
- HubSpot account with API access

## Step 1: Clone the Repository

```bash
git clone https://github.com/hindosharj-bit/boca-food-hubspot-integration.git
cd boca-food-hubspot-integration
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your HubSpot credentials:
   ```
   HUBSPOT_ACCESS_TOKEN=your_token_here
   HUBSPOT_PORTAL_ID=your_portal_id_here
   ```

## Step 4: Get Your HubSpot Token

1. Go to https://app.hubspot.com/
2. Click on Settings (gear icon)
3. Go to Integrations > Private apps
4. Click "Create new app"
5. Give it a name: "Boca Food Integration"
6. Select these scopes:
   - crm.objects.contacts.read
   - crm.objects.contacts.write
   - crm.objects.products.read
   - crm.objects.deals.read
   - crm.objects.deals.write
7. Copy the access token and paste in `.env.local`

## Step 5: Start Development Server

```bash
npm run dev
```

The application will start at http://localhost:3000

## Step 6: Sync Example Products (Optional)

```bash
npm run sync-products
```

This will add 5 example products to your HubSpot account.

## Project Structure

- `/lib` - TypeScript utilities for HubSpot integration
  - `hubspot.ts` - HubSpot API client
  - `products.ts` - Product management
  - `checkout.ts` - Order and checkout handling
- `package.json` - Project dependencies
- `.env.example` - Environment template
- `tsconfig.json` - TypeScript configuration

## API Endpoints

### Products
- `GET /api/products` - Fetch all products from HubSpot
- `POST /api/products` - Create new product

### Orders
- `POST /api/checkout` - Process checkout and create deal
- `GET /api/orders/:id` - Get order details

## Troubleshooting

**Problem:** "Invalid token" error
- **Solution:** Check that your token is correct and hasn't expired in HubSpot

**Problem:** Products not syncing
- **Solution:** Ensure your token has the correct permissions (products.write)

**Problem:** Port 3000 already in use
- **Solution:** Change port in `.env.local` or kill process using port 3000

## Support

For issues or questions about the integration, check the documentation at https://developers.hubspot.com/
