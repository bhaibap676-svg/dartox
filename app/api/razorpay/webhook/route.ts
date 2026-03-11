import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ============================================
// RAZORPAY WEBHOOK HANDLER
// ============================================
// This handles events from Razorpay like:
// - payment.captured - When buyer completes payment
// - payment.failed - When payment fails
// - transfer.created - When funds are transferred to seller
// - transfer.reversed - When funds are reversed (refunds)

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

/**
 * POST /api/razorpay/webhook
 * 
 * Razorpay sends webhook events here. You must:
 * 1. Verify the webhook signature
 * 2. Handle different event types
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';

    // In production, verify the webhook signature
    /*
    const isValidSignature = verifyWebhookSignature(rawBody, signature);
    if (!isValidSignature) {
      console.error('[Webhook] Invalid signature!');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
    */

    const event = JSON.parse(rawBody);
    const eventType = event.event;
    
    console.log(`[Webhook] Received event: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case 'payment.captured':
        await handlePaymentCaptured(event);
        break;
        
      case 'payment.failed':
        await handlePaymentFailed(event);
        break;
        
      case 'transfer.created':
        await handleTransferCreated(event);
        break;
        
      case 'transfer.reversed':
        await handleTransferReversed(event);
        break;
        
      case 'order.paid':
        await handleOrderPaid(event);
        break;
        
      default:
        console.log(`[Webhook] Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error: any) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle payment.captured event
 * This is the main event - payment was successful
 */
async function handlePaymentCaptured(event: any) {
  const payment = event.payload.payment.entity;
  const order = event.payload.order?.entity;
  
  console.log(`[Webhook] Payment captured: ${payment.id}`);
  console.log(`[Webhook] Order: ${order?.receipt}`);
  console.log(`[Webhook] Amount: ₹${payment.amount / 100}`);
  
  // TODO: Update your database
  // 1. Mark order as "paid" in your database
  // 2. Update product status to "Sold" (if single stock)
  // 3. Send notification to seller that payment received
  // 4. Create escrow record
  
  /*
  await db.orders.update({
    where: { razorpay_payment_id: payment.id },
    data: {
      payment_status: 'captured',
      razorpay_payment_id: payment.id,
      status: 'paid',
    }
  });
  */
}

/**
 * Handle payment.failed event
 */
async function handlePaymentFailed(event: any) {
  const payment = event.payload.payment.entity;
  
  console.log(`[Webhook] Payment failed: ${payment.id}`);
  console.log(`[Webhook] Failure reason: ${payment.error_description}`);
  
  // TODO: Update your database
  // 1. Mark order as "failed"
  // 2. Notify seller
  // 3. Release inventory hold
}

/**
 * Handle transfer.created event
 * Funds have been transferred to seller's account (on hold)
 */
async function handleTransferCreated(event: any) {
  const transfer = event.payload.transfer.entity;
  
  console.log(`[Webhook] Transfer created: ${transfer.id}`);
  console.log(`[Webhook] Amount: ₹${transfer.amount / 100}`);
  console.log(`[Webhook] On hold: ${transfer.on_hold === 1 ? 'Yes' : 'No'}`);
  
  // TODO: Update your database
  // 1. Store the transfer ID for later release
  // 2. Update order with escrow status "held"
  // 3. Notify seller that funds are waiting (on hold)
}

/**
 * Handle transfer.reversed event
 * Funds have been reversed (refund or dispute)
 */
async function handleTransferReversed(event: any) {
  const transfer = event.payload.transfer.entity;
  
  console.log(`[Webhook] Transfer reversed: ${transfer.id}`);
  console.log(`[Webhook] Reversed amount: ₹${transfer.amount / 100}`);
  
  // TODO: Update your database
  // 1. Mark order as "refunded" or "disputed"
  // 2. Update escrow status to "reversed"
  // 3. Notify both buyer and seller
}

/**
 * Handle order.paid event
 */
async function handleOrderPaid(event: any) {
  const order = event.payload.order.entity;
  
  console.log(`[Webhook] Order paid: ${order.id}`);
  console.log(`[Webhook] Amount: ₹${order.amount / 100}`);
  
  // Similar to payment.captured but for the order level
}

/**
 * Verify Razorpay webhook signature
 */
function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('[Webhook] Signature verification error:', error);
    return false;
  }
}

// ============================================
// HOW RAZORPAY ROUTE ESCROW WORKS:
// ============================================
// 
// 1. Buyer makes payment (payment.captured)
//    └─> Money goes to your Master Account
// 
// 2. Razorpay auto-creates transfer to seller (transfer.created)
//    └─> Seller's share goes to their Linked Account
//    └─> BUT it's ON HOLD (escrow)
// 
// 3. Buyer confirms "Item Received" (you call /api/razorpay/release)
//    └─> Hold is removed, money released to seller
// 
// 4. If dispute or buyer doesn't confirm (after timeout):
//    └─> transfer.reversed - money goes back to buyer
//
// This is exactly how Dartox combines Flipkart's trust with OLX's P2P safety!

