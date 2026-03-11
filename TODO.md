# Dartox - Implementation Plan
## Flipkart (B2C) + OLX (C2C) Hybrid Marketplace

### Core Architecture Requirements:
1. **Dual-Mode System:**
   - **Pro-Seller (Flipkart Style):** Brand stores, inventory management, GST/Tax invoicing, bulk uploads
   - **Casual-Seller (OLX Style):** Quick 3-step listing, location-based discovery, in-app negotiation chat

2. **Tech Stack:**
   - Frontend: Next.js (Web)
   - Backend: Node.js with Express (can be API routes in Next.js)
   - Database: PostgreSQL (Supabase) for structured data
   - Real-time: Socket.io for buyer-seller chat

3. **Competitive Edge Features:**
   - Smart Negotiation with "Make an Offer" button
   - Escrow Payment System with Razorpay Route
   - AI Price Assistant

---

## Phase 1: Project Setup
- [x] Create Next.js project in d:/Projects/dartox
- [x] Install dependencies: razorpay, socket.io, socket.io-client, @supabase/supabase-js
- [x] Configure Tailwind CSS

## Phase 2: Database Schema (Supabase)
- [x] **profiles** - User profiles with roles: BUYER, INDIVIDUAL_SELLER, BUSINESS_SELLER
- [x] **products** - Hybrid product schema (NEW & PRE_OWNED)
- [x] **orders** - Order transactions
- [x] **chats** - Real-time chat messages
- [x] **offers** - Negotiation offers

## Phase 3: Core API Endpoints
- [x] POST /api/razorpay/onboard - Register sellers as Linked Accounts
- [x] POST /api/razorpay/create-order - Create payment with escrow split
- [x] POST /api/razorpay/release - Release funds after delivery confirmation
- [x] POST /api/razorpay/webhook - Handle payment events
- [x] GET/POST /api/products - Product listings with filters

## Phase 4: Frontend Pages
- [x] / - Landing page with dual-mode showcase
- [x] /login - Authentication
- [x] /signup - Registration with role selection (Individual/Business)
- [x] /products - Product listings with filters

## Phase 5: Razorpay Route Integration
- [x] Onboarding sellers as Linked Accounts
- [x] Payment split (10% commission for BUSINESS, 2% for INDIVIDUAL)
- [x] Escrow hold using on_hold parameter
- [x] Release funds function
- [x] Webhook handler for payment.captured

---

## Key Revenue Model:
- B2C (Flipkart Mode): 10-15% fixed commission
- C2C (OLX Mode): 2% or ₹20 "Safety Fee" for escrow protection

---

## Next Steps:
1. Run `npm install` to install dependencies
2. Configure .env.local with your Razorpay keys
3. Set up Supabase database
4. Test the payment flow in demo mode

