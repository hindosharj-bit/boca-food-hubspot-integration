// Example products for Boca Food
// These will be synced to HubSpot

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url?: string;
  sku: string;
}

export const EXAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Pita Bread - Traditional',
    price: 2.99,
    description: 'Authentic Mediterranean pita bread made fresh daily',
    category: 'breads',
    sku: 'PITA-001',
    image_url: '/images/pita-bread.jpg'
  },
  {
    id: 'prod_002',
    name: 'Hummus - Chickpea',
    price: 4.99,
    description: 'Creamy hummus made with premium chickpeas and tahini',
    category: 'dips',
    sku: 'HUMM-001',
    image_url: '/images/hummus.jpg'
  },
  {
    id: 'prod_003',
    name: 'Falafel Mix - Box of 12',
    price: 8.99,
    description: 'Traditional falafel mix, ready to cook',
    category: 'prepared-foods',
    sku: 'FALA-012',
    image_url: '/images/falafel.jpg'
  },
  {
    id: 'prod_004',
    name: 'Tahini Sauce - Premium',
    price: 6.99,
    description: 'Pure tahini sauce for Middle Eastern dishes',
    category: 'sauces',
    sku: 'TAHI-001',
    image_url: '/images/tahini.jpg'
  },
  {
    id: 'prod_005',
    name: 'Olives - Mixed Mediterranean',
    price: 7.99,
    description: 'Premium mixed olives from Greece',
    category: 'produce',
    sku: 'OLIV-MIX',
    image_url: '/images/olives.jpg'
  }
];

export async function syncProductsToHubSpot(hubspotService: any) {
  try {
    for (const product of EXAMPLE_PRODUCTS) {
      await hubspotService.createProduct({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        sku: product.sku,
        category: product.category
      });
      console.log(`✓ Product ${product.name} synced to HubSpot`);
    }
    console.log('✓ All products synced successfully');
  } catch (error) {
    console.error('Error syncing products:', error);
  }
}
