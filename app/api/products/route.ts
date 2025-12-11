import { NextRequest, NextResponse } from 'next/server'

// Mock products - In production, these would come from HubSpot
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Burger Classic',
    price: 50,
    description: 'Delicious classic burger with fresh ingredients',
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    price: 80,
    description: 'Traditional Italian pizza with mozzarella and basil',
  },
  {
    id: '3',
    name: 'Chicken Shawarma',
    price: 45,
    description: 'Tender chicken shawarma with spices',
  },
  {
    id: '4',
    name: 'Vegetable Salad',
    price: 35,
    description: 'Fresh mixed vegetables salad',
  },
  {
    id: '5',
    name: 'Coca Cola',
    price: 15,
    description: 'Ice-cold Coca Cola',
  },
]

export async function GET(request: NextRequest) {
  try {
    // In production: Fetch from HubSpot API
    // const apiKey = process.env.HUBSPOT_API_KEY
    // const portalId = process.env.HUBSPOT_PORTAL_ID
    // const response = await fetch(`https://api.hubapi.com/crm/v3/objects/products`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //   },
    // })

    // For now, return mock products
    return NextResponse.json(MOCK_PRODUCTS)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
