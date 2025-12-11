// Checkout and Order Management
import { HubSpotService } from './hubspot';

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  created_at: Date;
}

export class CheckoutService {
  private hubspotService: HubSpotService;

  constructor(hubspotService: HubSpotService) {
    this.hubspotService = hubspotService;
  }

  async processCheckout(
    email: string,
    firstName: string,
    lastName: string,
    items: CartItem[]
  ): Promise<Order> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      // Create or find contact in HubSpot
      const contactResponse = await this.hubspotService.getContactByEmail(email);
      let contactId: string;

      if (contactResponse.results && contactResponse.results.length > 0) {
        contactId = contactResponse.results[0].id;
      } else {
        const newContact = await this.hubspotService.createContact(email, firstName, lastName);
        contactId = newContact.id;
      }

      // Create deal in HubSpot for this order
      const dealName = `Order - ${email} - $${total.toFixed(2)}`;
      const dealResponse = await this.hubspotService.createDeal(dealName, contactId, total);

      // Create order object
      const order: Order = {
        id: dealResponse.id,
        customer_email: email,
        customer_name: `${firstName} ${lastName}`,
        items,
        total,
        status: 'confirmed',
        created_at: new Date()
      };

      console.log('Order created successfully', order);
      return order;
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw error;
    }
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export function initCheckout(hubspotService: HubSpotService): CheckoutService {
  return new CheckoutService(hubspotService);
}
