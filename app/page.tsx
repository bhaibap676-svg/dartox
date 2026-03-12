"use client";

import Link from 'next/link'
import { ShoppingBag, Store, MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-2xl">
              Dartox
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95">
              Flipkart meets OLX. Buy brand new products or negotiate on pre-owned items. 
              <span className="font-semibold"> Escrow protected. Location-based discovery.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sell" 
                className="btn-primary text-lg py-4 px-8 flex items-center justify-center gap-2"
              >
                <Store className="w-5 h-5" />
                Start Selling
              </Link>
              <Link 
                href="/products" 
                className="bg-white/20 backdrop-blur-xl text-white/90 hover:bg-white/30 px-8 py-4 rounded-xl font-medium transition-all duration-300 border-2 border-white/30"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need. 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Nothing You Don't.
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two marketplaces. One seamless experience. Flipkart's security + OLX's negotiation power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Escrow Protection</h3>
              <p className="text-gray-600">Money held until you confirm delivery. No scams, guaranteed.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Negotiation</h3>
              <p className="text-gray-600">Make offers, counter-offers, accept instantly. Chat-to-checkout in seconds.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nearby Discovery</h3>
              <p className="text-gray-600">Find items within 5km. No shipping fees for local deals.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dual Mode</h3>
              <p className="text-gray-600">Brand stores OR individual listings. One platform does both.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Mode Cards */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-8">
                <Store className="w-4 h-4 mr-2" />
                Flipkart Mode
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Brand Stores
              </h2>
              <ul className="space-y-4 text-lg text-gray-600 mb-8">
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Inventory management & bulk uploads
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  GST invoicing & tax compliance
                </li>
                <li className="flex items-start">
                  <Sparkles className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  Brand landing pages & SEO optimized
                </li>
              </ul>
              <Link href="/sell" className="btn-primary text-lg py-4 px-8">
                Create Store →
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 text-center text-white mb-8">
                  <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                    OLX Mode
                  </span>
                  <h3 className="text-3xl font-bold mb-4">Quick Local Sales</h3>
                  <p className="opacity-90">📱 Photo → 💬 Title → 💰 Price = Listed!</p>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <span>iPhone 14 Pro</span>
                    <span className="font-bold">₹52,999</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <span>Samsung TV 55"</span>
                    <span className="font-bold">₹28,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Marketplace Journey?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join 10K+ sellers already making money on Dartox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg py-4 px-12 flex items-center justify-center gap-3 mx-auto sm:mx-0">
              <Store className="w-6 h-6" />
              Get Started Free
            </Link>
            <Link href="/products" className="border-2 border-white/50 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white px-12 py-4 rounded-xl font-medium transition-all duration-300">
              Explore Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

