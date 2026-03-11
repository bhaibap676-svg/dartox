"use client";

import Link from "next/link";
import { 
  ShoppingBag, 
  Store, 
  MessageCircle, 
  Shield, 
  MapPin, 
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  CreditCard,
  Smartphone,
  Package,
  Search
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dartox
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium">
                Browse
              </Link>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600 font-medium">
                Sell
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">
                About
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The Best of Both
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Worlds Combined
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto brings together the trust of Flip">
              Dartoxkart's Brand Stores and the 
              flexibility of OLX's local listings - all in one powerful marketplace.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-200">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search for products, brands, or items near you..." 
                  className="flex-1 px-4 py-3 outline-none text-gray-700"
                />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                Escrow Protection
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                In-app Negotiation
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-purple-500" />
                Nearby Discovery
              </span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Dual Mode Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Two Ways to Sell, Unlimited Possibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a big brand or just selling your old phone, Dartox has you covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Flipkart Style - Brand Store */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🏪 Brand Store (B2C)
              </h3>
              <p className="text-gray-600 mb-6">
                For businesses and brands who want a full-featured online store.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <Star className="w-5 h-5 text-blue-500" />
                  Professional storefront with brand customization
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Package className="w-5 h-5 text-blue-500" />
                  Inventory management & bulk uploads
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  GST/Tax invoicing built-in
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Analytics & sales insights
                </li>
              </ul>
              <Link 
                href="/signup?seller=business"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                Start Selling <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* OLX Style - Quick Listing */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-3xl p-8 border border-orange-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                📱 Quick Listing (C2C)
              </h3>
              <p className="text-gray-600 mb-6">
                For individuals selling used items quickly and easily.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                  3-step listing: Photo → Title → Price
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Location-based "Nearby" discovery
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Real-time negotiation & bargaining
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <Shield className="w-5 h-5 text-orange-500" />
                  Secure in-app payments
                </li>
              </ul>
              <Link 
                href="/signup?seller=individual"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
              >
                Start Selling <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Dartox Wins
            </h2>
            <p className="text-xl text-gray-600">
              Our competitive edge features that set us apart
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Escrow Protection
              </h3>
              <p className="text-gray-600">
                Money is held safely until buyer confirms item delivery. 
                No more meeting strangers with cash.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Smart Negotiation
              </h3>
              <p className="text-gray-600">
                Make offers directly in chat. Sellers can accept, reject, 
                or counter - all with secure payment integration.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hyper-Local Discovery
              </h3>
              <p className="text-gray-600">
                Find items within 5km-50km of your location. 
                Connect with local sellers without shipping hassles.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                AI Price Assistant
              </h3>
              <p className="text-gray-600">
                Get smart pricing suggestions based on similar listings 
                and market trends. Never overprice or underprice.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Verified Inspections
              </h3>
              <p className="text-gray-600">
                Optional verification service for high-value items. 
                We verify phones, laptops before delivery.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Instant Payouts
              </h3>
              <p className="text-gray-600">
                Sellers receive payments directly to their bank account 
                after delivery confirmation. No waiting weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-200">Active Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">2L+</div>
              <div className="text-blue-200">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-blue-200">Happy Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">₹50Cr+</div>
              <div className="text-blue-200">Transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Buy or Sell?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of users already trading on Dartox. 
            Safe, secure, and local.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Create Free Account
            </Link>
            <Link 
              href="/products" 
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors text-lg"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Dartox</span>
              </div>
              <p className="text-sm">
                The hybrid marketplace combining the best of Flipkart and OLX.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="hover:text-white">Browse Products</Link></li>
                <li><Link href="/products?location=nearby" className="hover:text-white">Nearby Items</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup?seller=business" className="hover:text-white">Start Brand Store</Link></li>
                <li><Link href="/signup?seller=individual" className="hover:text-white">Quick Listing</Link></li>
                <li><Link href="/seller-faq" className="hover:text-white">Seller FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 Dartox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

