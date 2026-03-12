import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', receipt, productId, sellerId } = body

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency,
      receipt: receipt || `order_${Date.now()}`,
      notes: {
        productId,
        sellerId,
        platform: 'Dartox Marketplace'
      }
    })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status
    })
  } catch (error: any) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// GET /api/razorpay/config
export async function GET() {
  return NextResponse.json({
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    name: 'Dartox Marketplace',
    description: 'Secure marketplace payments with escrow',
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
    prefill: {
      name: 'Customer',
      email: 'customer@example.com'
    },
    theme: {
      color: '#4f46e5'
    }
  })
}

