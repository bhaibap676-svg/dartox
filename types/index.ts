// Dartox Type Definitions
// Hybrid Marketplace Types (Flipkart B2C + OLX C2C)

// ============================================
// USER ROLES & PROFILES
// ============================================

export type UserRole = 'BUYER' | 'INDIVIDUAL_SELLER' | 'BUSINESS_SELLER';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  // Business seller specific
  business_name?: string;
  gst_number?: string;
  razorpay_account_id?: string;
  razorpay_onboarding_status?: 'pending' | 'completed' | 'failed';
  // Location for OLX-style nearby discovery
  location?: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
    city: string;
    pincode: string;
  };
  created_at: string;
}

// ============================================
// PRODUCTS - HYBRID SCHEMA
// ============================================

export type ListingType = 'BRAND_NEW' | 'PRE_OWNED';
export type ProductCondition = 'New' | 'Like New' | 'Gently Used' | 'Heavily Used';
export type ProductStatus = 'Available' | 'Sold' | 'Under Review';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  
  // THE HYBRID SWITCH
  listingType: ListingType;
  
  // PRICING
  price: number;
  mrp?: number; // Only for BRAND_NEW (Flipkart style)
  isNegotiable: boolean; // Only for PRE_OWNED (OLX style)
  
  // SELLER INFO
  sellerId: string;
  sellerType: 'INDIVIDUAL' | 'BUSINESS';
  seller?: Profile;
  razorpayAccountId?: string;
  
  // CONDITION & SPECS (for PRE_OWNED)
  condition?: {
    grade: ProductCondition;
    age?: string; // e.g., "6 months old"
    warranty: boolean;
  };
  
  // BRAND STORE INFO (for BRAND_NEW)
  brand?: string;
  warrantyMonths?: number;
  
  // LOCATION (OLX functionality - for PRE_OWNED)
  location?: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
    city: string;
    pincode: string;
  };
  
  // IMAGES & STOCK
  images: string[];
  stock: number; // OLX usually has 1, Flipkart has many
  
  // STATUS
  status: ProductStatus;
  views: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// ORDERS
// ============================================

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'disputed';
export type PaymentStatus = 'pending' | 'held' | 'released' | 'refunded';

export interface Order {
  id: string;
  productId: string;
  product?: Product;
  buyerId: string;
  buyer?: Profile;
  sellerId: string;
  seller?: Profile;
  
  // Pricing
  amount: number;
  commission_amount: number; // Dartox's cut (5%)
  seller_amount: number; // Seller's share (95%)
  
  // Payment
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_transfer_id?: string;
  escrow_status: PaymentStatus;
  
  // Status
  status: OrderStatus;
  delivery_confirmed: boolean;
  delivery_confirmed_at?: string;
  
  created_at: string;
  updated_at: string;
}

// ============================================
// NEGOTIATION / OFFERS
// ============================================

export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED' | 'EXPIRED';

export interface Offer {
  id: string;
  productId: string;
  product?: Product;
  buyerId: string;
  buyer?: Profile;
  sellerId: string;
  seller?: Profile;
  
  originalPrice: number;
  offeredPrice: number;
  status: OfferStatus;
  
  // For counter offers
  counterPrice?: number;
  
  created_at: string;
  updated_at: string;
}

// ============================================
// CHAT / MESSAGES
// ============================================

export interface ChatRoom {
  id: string;
  productId: string;
  product?: Product;
  buyerId: string;
  buyer?: Profile;
  sellerId: string;
  seller?: Profile;
  lastMessage?: Message;
  created_at: string;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  sender?: Profile;
  content: string;
  type: 'text' | 'offer' | 'system';
  offerId?: string; // If this message is about an offer
  read: boolean;
  created_at: string;
}

// ============================================
// CATEGORIES
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  parent_id?: string;
  children?: Category[];
}

// ============================================
// WALLET / TRANSACTIONS (for sellers)
// ============================================

export type TransactionType = 'earning' | 'payout' | 'commission_refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'held';

export interface WalletTransaction {
  id: string;
  userId: string;
  orderId?: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  razorpay_transaction_id?: string;
  created_at: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  held_balance: number; // In escrow
  total_earned: number;
  total_paid_out: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================
// LOCATION SEARCH
// ============================================

export interface LocationSearchParams {
  latitude: number;
  longitude: number;
  radiusKm: number; // 5km - 50km
}

// ============================================
// CONSTANTS
// ============================================

export const SELLER_TYPE_LABELS = {
  INDIVIDUAL: 'Individual Seller (OLX Style)',
  BUSINESS: 'Brand Store (Flipkart Style)',
} as const;

export const LISTING_TYPE_LABELS = {
  BRAND_NEW: 'Brand New',
  PRE_OWNED: 'Pre-Owned',
} as const;

export const CONDITION_GRADES = [
  'New',
  'Like New',
  'Gently Used',
  'Heavily Used',
] as const;

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'vehicles', name: 'Vehicles', icon: 'Car' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa' },
  { id: 'books', name: 'Books', icon: 'BookOpen' },
  { id: 'sports', name: 'Sports', icon: 'Dumbbell' },
  { id: 'home', name: 'Home & Garden', icon: 'Home' },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase' },
  { id: 'services', name: 'Services', icon: 'Wrench' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal' },
] as const;

// Commission rates
export const COMMISSION_RATES = {
  BUSINESS: 0.10, // 10% for Flipkart-style sellers
  INDIVIDUAL: 0.02, // 2% for OLX-style sellers (min ₹20)
  MIN_FEE: 20, // Minimum safety fee
} as const;

