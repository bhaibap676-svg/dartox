import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Commission rates
const COMMISSION_RATES = {
  BUSINESS: 0.10, // 10% for Flipkart-style sellers
  INDIVIDUAL: 0.02, // 2% for OLX-style sellers (min ₹20)
  MIN_FEE: 20,
};

interface CreateOrderRequest {
  productId: string;
  buyerId: string;
  sellerId: string;
  amount: number; // in rupees
  sellerType: 'INDIVIDUAL' | 'BUSINESS';
  sellerRazorpayAccountId: string;
  isNegotiated?: boolean; // If this is a negotiated price
}

/**
 * POST /api/razorpay/create-order
 * 
 * Creates a Razorpay order with ESCROW (on_hold) functionality
 * 
 * Payment Flow:
 * 1. Buyer pays ₹1000
 * 2. ₹50 (5%) goes to Dartox Master Account as commission
 * 3. ₹950 is transferred to Seller's Linked Account with ON_HOLD
 * 4. Funds stay on hold until buyer confirms "Item Received"
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();
    const { 
      productId, 
      buyerId, 
      sellerId, 
      amount, 
      sellerType, 
      sellerRazorpayAccountId,
      isNegotiated 
    } = body;

    // Validate required fields
    if (!productId || !buyerId || !sellerId || !amount || !sellerRazorpayAccountId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate commission and seller share
    const percentage = sellerType === 'BUSINESS' ? COMMISSION_RATES.BUSINESS : COMMISSION_RATES.INDIVIDUAL;
    let commission = Math.round(amount * percentage);
    
    // Ensure minimum fee for individual sellers
    if (sellerType === 'INDIVIDUAL' && commission < COMMISSION_RATES.MIN_FEE) {
      commission = COMMISSION_RATES.MIN_FEE;
    }

    const sellerAmount = amount - commission;

    console.log(`[Payment Split] Amount: ₹${amount}, Commission: ₹${commission}, Seller: ₹${sellerAmount}`);

    // In production, uncomment the actual Razorpay order creation
    
    /*
    // Step 1: Create the order with transfer configuration
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_${productId}_${buyerId}_${Date.now()}`,
      notes: {
        productId,
        buyerId,
        sellerId,
        sellerType,
        isNegotiated: isNegotiated ? 'true' : 'false',
      },
      // This enables automatic split to linked account
      transfers: [
        {
          account: sellerRazorpayAccountId,
          amount: sellerAmount * 100, // Seller's share in paise
          currency: 'INR',
          on_hold: 1, // KEY: Hold funds until buyer confirms delivery
          // on_hold_until: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // Optional: hold for 7 days
          notes: {
            order_type: 'sale',
            product_id: productId,
          },
        },
      ],
    });

    // Step 2: Store order details in your database
    // You'll need these for the webhook and for releasing funds later
    */

    // Demo mode
    const mockOrderId = `order_${Date.now()}`;
    const mockTransferId = `transfer_${Date.now()}`;

    console.log(`[Demo] Created order ${mockOrderId} with transfer ${mockTransferId}`);

    return NextResponse.json({
      success: true,
      data: {
        order_id: mockOrderId,
        amount: amount * 100, // in paise
        currency: 'INR',
        // Transfer details
        transfer: {
          id: mockTransferId,
          account_id: sellerRazorpayAccountId,
          amount: sellerAmount * 100,
          on_hold: true, // Funds are held in escrow
        },
        // Split breakdown (for UI display)
        breakdown: {
          total: amount,
          commission_amount: commission,
          commission_percentage: Math.round(percentage * 100),
          seller_amount: sellerAmount,
        },
      },
      message: isNegotiated 
        ? 'Order created for negotiated price. Payment will be held in escrow until delivery confirmed.'
        : 'Order created. Payment will be held in escrow until delivery confirmed.'
    });

  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/razorpay/create-order
 * Get order status
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID required' },
      { status: 400 }
    );
  }

  // In production, fetch from your database
  return NextResponse.json({
    success: true,
    data: {
      order_id: orderId,
      status: 'created',
      on_hold: true,
    }
  });
}

