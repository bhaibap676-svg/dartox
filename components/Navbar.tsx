"use client"

import Link from 'next/link'
import { ShoppingCart, User, Bell } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="backdrop-blur-xl bg-white/80 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🚀 Dartox
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/products" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium">
              <span>Products</span>
            </Link>
            <Link href="/sell" className="btn-primary px-6 py-2 text-sm">
              Sell Now
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

