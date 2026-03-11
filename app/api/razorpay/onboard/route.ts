import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================================
// RAZORPAY ROUTE - SELLER ONBOARDING
// ============================================
// This API registers sellers as "Linked Accounts" on Razorpay
// so they can receive payments directly to their bank account

interface OnboardRequest {
  userId: string;
  email: string;
  phone: string;
  businessName?: string;
  bankAccountNumber: string;
  bankIfsc: string;
}

/**
 * POST /api/razorpay/onboard
 * Register a seller as a Linked Account on Razorpay Route
 * 
 * In production, you would:
 * 1. Create a contact (the seller)
 * 2. Create a fund account (their bank account)
 * 3. Return the account ID to store in your database
 */
export async function POST(request: NextRequest) {
  try {
    const body: OnboardRequest = await request.json();
    const { userId, email, phone, businessName, bankAccountNumber, bankIfsc } = body;

    if (!userId || !email || !phone || !bankAccountNumber || !bankIfsc) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, uncomment the actual Razorpay API calls
    
    /* 
    // Step 1: Create a Contact (the seller)
    const contact = await razorpay.contacts.create({
      name: businessName || email.split('@')[0],
      email: email,
      phone: phone,
      type: 'customer', // or 'vendor' for marketplace
      reference_id: userId,
    });

    // Step 2: Create a Fund Account (bank account)
    const fundAccount = await razorpay.fundAccounts.create({
      contact_id: contact.id,
      account_type: 'bank_account',
      bank_account: {
        name: businessName || email.split('@')[0],
        ifsc: bankIfsc,
        account_number: bankAccountNumber,
      },
    });

    // Step 3: Return the account ID (this is what you use for transfers)
    // This would be stored in your database linked to the seller
    */

    // Demo mode - simulate successful onboarding
    const mockAccountId = `acc_${Date.now()}_${userId}`;
    
    console.log(`[Demo] Onboarding seller ${userId} with account ${mockAccountId}`);

    return NextResponse.json({
      success: true,
      message: 'Seller onboarded successfully',
      data: {
        account_id: mockAccountId,
        contact_id: `cont_${Date.now()}`,
        status: 'created',
        // In production, you would also return a registration link:
        // onboarding_link: 'https://razorpay.com/xxxxx'
      }
    });

  } catch (error: any) {
    console.error('Razorpay onboarding error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to onboard seller' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/razorpay/onboard
 * Check onboarding status for a user
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID required' },
      { status: 400 }
    );
  }

  // In production, you would fetch from your database
  // For demo, return mock status
  return NextResponse.json({
    success: true,
    data: {
      userId,
      onboarding_status: 'completed', // 'pending', 'completed', 'failed'
      account_id: `acc_demo_${userId}`,
    }
  });
}

