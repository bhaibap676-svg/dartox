export type UserRole = 'BUYER' | 'INDIVIDUAL_SELLER' | 'BUSINESS_SELLER';

export type ListingType = 'BRAND_NEW' | 'PRE_OWNED';

export type ProductCondition = 'New' | 'Like New' | 'Gently Used' | 'Heavily Used';

export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  city: string;
  pincode: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  listingType: ListingType;
  price: number;
  mrp?: number;
  isNegotiable: boolean;
  sellerId: string;
  sellerType: 'INDIVIDUAL' | 'BUSINESS';
  razorpayAccountId?: string;
  condition?: {
    grade: ProductCondition;
    age?: string;
    warranty?: boolean;
  };
  location: Location;
  images: string[];
  stock: number;
  status: 'Available' | 'Sold' | 'Under Review';
  created_at: string;
}

export interface Offer {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  offeredPrice: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: 'INR';
  receipt: string;
}
