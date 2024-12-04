export interface Order {
  id: string;
  userId: string;
  trackingNumber: string;
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled';
  shipmentType: 'air' | 'sea' | 'ground';
  origin: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  destination: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  package: {
    type: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    description: string;
    value: number;
  };
  customs: {
    hsCode: string;
    category: 'commercial' | 'personal' | 'restricted';
    documents: string[];
    dutyPayer: 'sender' | 'receiver' | 'third-party';
  };
  services: {
    insurance: boolean;
    insuranceAmount?: number;
    fragile: boolean;
    lastMileCarrier?: string;
    deliverySpeed: 'economy' | 'express' | 'same-day';
  };
  payment: {
    status: 'pending' | 'paid' | 'failed';
    amount: number;
    currency: string;
    method?: string;
    payer: 'sender' | 'receiver' | 'third-party';
  };
  dates: {
    created: string;
    updated: string;
    estimatedDelivery?: string;
  };
}