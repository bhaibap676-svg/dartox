import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

interface ReleaseRequest {
  orderId: string;
  transferId: string;
  sellerId: string;
  productId: string;
}

/**
 * POST /api/razorpay/release
 * 
 * Release funds from escrow after buyer confirms "Item Received"
 * 
 * This is called when:
 * 1. Buyer clicks "Confirm Delivery" on the frontend
 * 2. After the dispute period passes (if no dispute)
 * 3. After a dispute is resolved in seller's favor
 */
export async function POST(request: NextRequest) {
  try {
    const body: ReleaseRequest = await request.json();
    const { orderId, transferId, sellerId, productId } = body;

    if (!orderId || !transferId || !sellerId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`[Release] Releasing funds for order ${orderId}, transfer ${transferId}`);

    // In production, you would:
    // 1. Fetch the transfer from Razorpay to verify it's still on hold
    // 2. Update your database to mark the order as completed
    // 3. Release the hold on the transfer

    /*
    // Step 1: Fetch transfer details to verify status
    const transfer = await razorpay.transfers.fetch(transferId);
    
    if (transfer.on_hold !== 1) {
      return NextResponse.json(
        { error: 'Transfer is not on hold or already released' },
        { status: 400 }
      );
    }

    // Step 2: Release the hold (this transfers funds to seller's account)
    const release = await razorpay.transfers.create({
      amount: transfer.amount,
      currency: 'INR',
      account: transfer.account_id,
      notes: {
        released_from_order: orderId,
        product_id: productId,
      }
    });

    // OR: Use the direct transfer release endpoint
    // await razorpay.transfers.release(transferId);
    */

    // Demo mode
    console.log(`[Demo] Released funds for transfer ${transferId}`);

    return NextResponse.json({
      success: true,
      message: 'Funds released successfully! Seller will receive payment within 1-3 business days.',
      data: {
        order_id: orderId,
        transfer_id: transferId,
        status: 'released',
        released_at: new Date().toISOString(),
      }
    });

  } catch (error: any) {
    console.error('Razorpay release error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to release funds' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/razorpay/release
 * Check release status of a transfer
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transferId = searchParams.get('transferId');
  const orderId = searchParams.get('orderId');

  if (!transferId && !orderId) {
    return NextResponse.json(
      { error: 'Transfer ID or Order ID required' },
      { status: 400 }
    );
  }

  // In production, fetch from your database or Razorpay
  return NextResponse.json({
    success: true,
    data: {
      transfer_id: transferId,
      order_id: orderId,
      status: 'on_hold', // 'on_hold', 'released', 'reversed'
      hold_expires_at: null,
    }
  });
}

