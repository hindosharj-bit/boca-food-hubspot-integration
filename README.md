# Boca Food - HubSpot Integration

Complete HubSpot integration for Boca Food e-commerce site with product sync, checkout flow, and order management.

## Features

- **Product Synchronization** - Products pulled from HubSpot CRM
- **Automatic Contact Creation** - Customers saved as contacts in HubSpot
- **Order Management** - Orders created as deals linked to contacts
- **Checkout Flow** - Complete checkout with form validation
- **Order Confirmation** - Email confirmation with deal ID
- **Caching** - 5-minute product cache for performance

## Installation

### Step 1: Get HubSpot API Token

1. Go to https://app.hubspot.com
2. Click Settings (gear icon)
3. Navigate to Accounts & Autorizations
4. Select Private Access Tokens
5. Click Create token
6. Grant permissions:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`
   - `crm.objects.products.read`
   - `crm.objects.products.write`
7. Copy the token

### Step 2: Create .env.local

At project root (same level as package.json):

```
HUBSPOT_ACCESS_TOKEN=YOUR_TOKEN_HERE
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=YOUR_PORTAL_ID
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create Project Files

See INSTALLATION.md for complete file structures

### Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
.
├── .env.local                    # Environment variables
├── lib/
│   └── hubspot.ts              # HubSpot API service
├── app/
│   ├── api/
│   │   ├── checkout/route.ts   # Checkout endpoint
│   │   └── products/sync/route.ts # Product sync endpoint
│   └── confirmation/page.tsx    # Confirmation page
├── components/
│   └── Checkout.tsx            # Checkout form
└── README.md                    # This file
```

## Complete Workflow

1. **Customer visits site** - Browses products from HubSpot
2. **Add to cart** - Customer adds items
3. **Checkout** - Fills in shipping info
4. **Submit order** - Data sent to `/api/checkout`
5. **HubSpot creates**:
   - Contact for customer
   - Deal for order
   - Associates them
6. **Confirmation** - Customer sees order ID
7. **Email sent** - Confirmation to customer

## API Endpoints

### POST /api/checkout

Creates customer contact and order deal

**Request:**
```json
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "Casablanca",
    "country": "Morocco"
  },
  "items": [
    {"id": "1", "name": "Burger", "price": 50, "quantity": 2}
  ],
  "total": 100
}
```

**Response:**
```json
{
  "success": true,
  "contactId": "123",
  "dealId": "456",
  "message": "Commande creee avec succes"
}
```

### GET /api/products/sync

Fetches products from HubSpot with caching

**Response:**
```json
{
  "success": true,
  "products": [
    {"id": "1", "name": "Burger", "price": 50}
  ],
  "cached": false
}
```

## Example Products to Add

Add these products in HubSpot for testing:

1. **Burger Classic** - 50 MAD
2. **Pizza Margherita** - 80 MAD
3. **Chicken Shawarma** - 45 MAD
4. **Vegetable Salad** - 35 MAD
5. **Coca Cola** - 15 MAD

## Testing

1. Visit http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill in form
5. Submit order
6. Verify contact and deal in HubSpot CRM

## Troubleshooting

**Products not showing?**
- Check HUBSPOT_ACCESS_TOKEN in .env.local
- Verify products exist in HubSpot
- Check browser console for API errors

**Checkout not working?**
- Verify all form fields are filled
- Check network tab for API errors
- Ensure token has proper permissions

**HubSpot not creating contacts?**
- Verify token has contacts permissions
- Check API rate limits (100/sec)
- Review error logs

## Additional Resources

- [Google Docs - Full Guide](https://docs.google.com/document/d/1m0FyP5axa5MwDtiYzbeflXoGgp_uJnWJORusDgYMRdw/edit)
- [GitHub Repository](https://github.com/hindosharj-bit/boca-food-hubspot-integration)
- [HubSpot API Docs](https://developers.hubspot.com/docs/api/overview)

## Support

For issues or questions, refer to INSTALLATION.md or contact the development team.
