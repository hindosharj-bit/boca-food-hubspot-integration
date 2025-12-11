// HubSpot API Integration
const HUBSPOT_API_URL = 'https://api.hubapi.com';

interface HubSpotConfig {
  accessToken: string;
}

class HubSpotService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: any
  ) {
    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${HUBSPOT_API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  async getProducts() {
    return this.makeRequest(
      '/crm/v3/objects/products?limit=100&properties=name,price,description'
    );
  }

  async createProduct(data: any) {
    return this.makeRequest(
      '/crm/v3/objects/products',
      'POST',
      { properties: data }
    );
  }

  // Contacts
  async createContact(email: string, firstName: string, lastName: string) {
    return this.makeRequest(
      '/crm/v3/objects/contacts',
      'POST',
      {
        properties: {
          email,
          firstname: firstName,
          lastname: lastName,
        },
      }
    );
  }

  async getContactByEmail(email: string) {
    return this.makeRequest(
      `/crm/v3/objects/contacts/search`,
      'POST',
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
      }
    );
  }

  // Deals
  async createDeal(dealName: string, contactId: string, amount: number) {
    return this.makeRequest(
      '/crm/v3/objects/deals',
      'POST',
      {
        properties: {
          dealname: dealName,
          amount: amount.toString(),
        },
        associations: [
          {
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 3,
              },
            ],
            id: contactId,
          },
        ],
      }
    );
  }
}

export function initHubSpot(accessToken: string): HubSpotService {
  return new HubSpotService(accessToken);
}

export { HubSpotService };
