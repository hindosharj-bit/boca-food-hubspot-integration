# IMPORTANT: Integration with Your Existing Boca Food Site

**⚠️ CRITICAL NOTICE**: This repository contains HubSpot integration utilities. To use this with your existing Boca Food Next.js site:

1. **Keep your existing site structure** - Do not replace your site
2. **Copy integration files to YOUR project** - Follow the file structure below
3. **Add environment variables** - Use your HubSpot token
4. **Integrate API routes** - Add to your app/api/ directory
5. **Update your checkout flow** - Connect existing form to HubSpot

---

# Boca Food - HubSpot Integration

Complete HubSpot integration for Boca Food e-commerce site with product sync, checkout flow, and order management.

## Features

- **Product Synchronization** - Products pulled from HubSpot CRM
- **Automatic Contact Creation** - Customers saved as contacts in HubSpot
- **Order Management** - Orders created as deals linked to contacts
- **Checkout Flow** - Complete checkout with form validation
- **Order Confirmation** - Email confirmation with deal ID
- **Caching** - 5-minute product cache for performance

## Integration Steps for Your Existing Site

### Step 1: Copy Environment Variables

Add to your `.env.local` file:

```
HUBSPOT_ACCESS_TOKEN=YOUR_TOKEN_HERE
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=147417531
```

### Step 2: Copy HubSpot Integration Files

Copy these files from this repo to YOUR project:

```
YOUR_PROJECT/
├── lib/
│   └── hubspot.ts          # Copy from this repo
├── app/api/
│   ├── checkout/route.ts   # Copy from this repo
│   └── products/
│       └── sync/route.ts   # Copy from this repo
```

### Step 3: Update Your Checkout Form

In your existing checkout component, call the `/api/checkout` endpoint:

```typescript
const handleCheckout = async (formData) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country
      },
      items: cartItems,
      total: cartTotal
    })
  });
  
  const data = await response.json();
  if (data.success) {
    // Redirect to confirmation with deal ID
    window.location.href = `/confirmation?dealId=${data.dealId}`;
  }
};
```

### Step 4: Fetch Products from HubSpot

Replace your existing product fetch with HubSpot sync:

```typescript
const fetchProducts = async () => {
  const response = await fetch('/api/products/sync');
  const data = await response.json();
  if (data.success) {
    setProducts(data.products);
  }
};
```

### Step 5: Test the Integration

1. Run your existing development server (`npm run dev`)
2. Load products from HubSpot
3. Add items to cart
4. Complete checkout
5. Verify contact and deal created in HubSpot

## API Endpoints

### POST /api/checkout

Creates customer contact and order deal in HubSpot.

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
    {
      "id": "1",
      "name": "Burger",
      "price": 50,
      "quantity": 2
    }
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
  "message": "Order created successfully"
}
```

### GET /api/products/sync

Fetches products from HubSpot with 5-minute caching.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "1",
      "name": "Burger Classic",
      "price": 50
    }
  ],
  "cached": false
}
```

## Example Products in HubSpot

These products are already created in your HubSpot account:

1. **Burger Classic** - 50 MAD
2. **Pizza Margherita** - 80 MAD
3. **Chicken Shawarma** - 45 MAD
4. **Vegetable Salad** - 35 MAD
5. **Coca Cola** - 15 MAD

## HubSpot Account Details

- **Portal ID**: 147417531
- **Token Created**: Yes (in .env.local)
- **Products Created**: 5 example products
- **Permissions**: All required CRM permissions enabled

## File Structure Reference

### lib/hubspot.ts

Core service for HubSpot API interactions:
- Create/update contacts
- Create deals for orders
- Fetch products with caching
- Error handling and logging

### app/api/checkout/route.ts

Handles order submission:
- Validates customer data
- Creates contact in HubSpot
- Creates deal (order) linked to contact
- Returns confirmation with IDs

### app/api/products/sync/route.ts

Fetches products from HubSpot:
- Implements 5-minute caching
- Returns formatted product list
- Handles API errors gracefully

## Troubleshooting

**Products not loading?**
- Verify `HUBSPOT_ACCESS_TOKEN` in `.env.local`
- Check that 5 products exist in HubSpot
- Check browser console for API errors

**Checkout not working?**
- Verify all form fields are populated
- Check Network tab for /api/checkout errors
- Ensure token has proper permissions

**Contacts/Deals not created?**
- Check HubSpot CRM for recent contacts
- Verify API rate limits (100 requests/second)
- Review `.env.local` token validity

## References

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [Google Docs - Full Integration Guide](https://docs.google.com/document/d/1m0FyP5axa5MwDtiYzbeflXoGgp_uJnWJORusDgYMRdw/edit)
- [GitHub Repository](https://github.com/hindosharj-bit/boca-food-hubspot-integration)

## Support

For integration questions:
1. Check the Google Docs full guide
2. Review file structures in this repo
3. Verify HubSpot account and permissions
4. Check API tokens and environment variables
