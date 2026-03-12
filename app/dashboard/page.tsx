"use client"

import { useState } from 'react'
import { ShoppingBag, DollarSign, MapPin, MessageCircle, Users } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types'

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB - Like New',
    description: 'Used for 6 months, perfect condition with box & charger',
    category: 'Electronics',
    listingType: 'PRE_OWNED',
    price: 72999,
    isNegotiable: true,
    sellerId: 'seller1',
    sellerType: 'INDIVIDUAL',
    condition: {
      grade: 'Like New',
      age: '6 months',
      warranty: true
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      city: 'Bangalore',
      pincode: '560001'
    },
    images: ['/api/placeholder/400/400'],
    stock: 1,
    status: 'Available',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Samsung 55" QLED TV',
    description: 'Brand new 2024 model, full warranty',
    category: 'Electronics',
    listingType: 'BRAND_NEW',
    price: 28500,
    mrp: 35000,
    isNegotiable: false,
    sellerId: 'seller2',
    sellerType: 'BUSINESS',
    razorpayAccountId: 'rzp_account_xxx',
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      city: 'Bangalore',
      pincode: '560001'
    },
    images: ['/api/placeholder/400/400'],
    stock: 5,
    status: 'Available',
    created_at: '2024-01-14T14:20:00Z'
  }
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('listings')

  const stats = {
    totalListings: 12,
    totalOrders: 5,
    totalEarnings: 245000,
    pendingOffers: 3
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Offers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOffers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1 mb-8">
          <div className="flex bg-gray-50 rounded-xl p-1">
            {[
              { id: 'listings', label: 'My Listings', icon: ShoppingBag },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'offers', label: 'Offers', icon: MessageCircle },
              { id: 'analytics', label: 'Analytics', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white shadow-md text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Listings ({stats.totalListings})</h2>
                <Link href="/sell" className="btn-primary px-6 py-2">
                  + New Listing
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {mockProducts.map((product) => (
                <div key={product.id} className="p-8 hover:bg-gray-50">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 truncate">{product.title}</h3>
                        <span className={`badge-${product.listingType === 'BRAND_NEW' ? 'new' : 'used'}`}>
                          {product.listingType.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-indigo-600">
                            ₹{product.price.toLocaleString()}
                            {product.mrp && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{product.mrp.toLocaleString()}
                              </span>
                            )}
                          </p>
                          {product.isNegotiable && (
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              💬 Negotiable
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {product.location.city}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                      <Link 
                        href={`/products/${product.id}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

