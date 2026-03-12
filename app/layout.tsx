import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dartox - Flipkart + OLX Hybrid Marketplace',
  description: 'Buy & Sell new and used products with escrow protection and smart negotiation'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                  🚀 Dartox
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/sell" className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                  Sell
                </Link>
                <Link href="/products" className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link href="/dashboard" className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}

