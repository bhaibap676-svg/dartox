"use client";

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShoppingBag, Image, Tag, MapPin, Smartphone, Store, Clock, CreditCard, CheckCircle, X, Upload, Camera, Ruler, Mic } from 'lucide-react';

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    listingType: 'PRE_OWNED',
    condition: 'Like New',
    location: '',
    images: [] as File[],
    isNegotiable: true,
    stock: 1
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱', sub: 'iPhone, Laptop, TV' },
    { id: 'fashion', name: 'Fashion', icon: '👕', sub: 'Clothes, Shoes, Accessories' },
    { id: 'home', name: 'Home & Garden', icon: '🏠', sub: 'Furniture, Decor, Appliances' },
    { id: 'vehicles', name: 'Vehicles', icon: '🚗', sub: 'Cars, Bikes, Parts' },
    { id: 'books', name: 'Books', icon: '📚', sub: 'Textbooks, Novels, Magazines' },
    { id: 'services', name: 'Services', icon: '🔧', sub: 'Tutoring, Repairs, Freelance' }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate API call
    toast.success('✅ Product listed successfully! Your ad is live now.');
    setLoading(false);
    setStep(1);
  };

  const ListingTypeBadge = ({ type }: { type: string }) => (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
      type === 'PRE_OWNED' 
        ? 'bg-orange-100 text-orange-800 border border-orange-200' 
        : 'bg-blue-100 text-blue-800 border border-blue-200'
    }`}>
      {type === 'PRE_OWNED' ? '🛒 Used Item (OLX Style)' : '🏪 Brand New (Flipkart Style)'}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dartox
              </h1>
              <p className="text-sm text-gray-500">Sell faster than Flipkart, safer than OLX</p>
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sell Your Product</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            3-step quick listing. 0% commission for first 10 sales. Instant payments to bank.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-12 max-w-2xl mx-auto">
          <div className={`flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ${step >= 1 ? 'bg-blue-500' : ''}`} />
          <div className={`flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ${step >= 2 ? 'bg-orange-500' : ''}`} />
          <div className={`flex-1 h-2 bg-gray-200 rounded-full overflow-hidden ${step >= 3 ? 'bg-green-500' : ''}`} />
          <div className="flex -space-x-2 -mt-2">
            <div className={`w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${step === 1 ? 'ring-4 ring-blue-200' : ''}`}>1</div>
            <div className={`w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${step === 2 ? 'ring-4 ring-orange-200' : ''}`}>2</div>
            <div className={`w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${step === 3 ? 'ring-4 ring-green-200' : ''}`}>3</div>
        </div>

        {/* 3-Step Form */}
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Tag className="w-8 h-8 text-blue-600" />
                What are you selling?
              </h3>
              
              <ListingTypeBadge type={productData.listingType} />
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Listing Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setProductData({...productData, listingType: 'PRE_OWNED', isNegotiable: true })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                        productData.listingType === 'PRE_OWNED' 
                          ? 'border-orange-500 bg-orange-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">Quick Sell (OLX Style)</h4>
                      <p className="text-orange-700 text-sm mb-3">Used items, negotiable price</p>
                      <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        List in 60 seconds
                      </div>
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setProductData({...productData, listingType: 'BRAND_NEW', isNegotiable: false })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                        productData.listingType === 'BRAND_NEW' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Store className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">Brand Store (Flipkart Style)</h4>
                      <p className="text-blue-700 text-sm mb-3">New inventory, fixed price</p>
                      <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        <CreditCard className="w-3 h-3" />
                        Bulk uploads available
                      </div>
                    </button>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setProductData({...productData, category: cat.id })}
                        className={`p-4 rounded-xl border-2 transition-all hover:shadow-md text-left ${
                          productData.category === cat.id
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{cat.icon}</div>
                        <div className="font-medium text-sm">{cat.name}</div>
                        <div className="text-xs text-gray-500">{cat.sub}</div>
                      </button>
                    ))}
                  </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                    <input
                      type="text"
                      placeholder="iPhone 14 Pro - 6 months old"
                      value={productData.title}
                      onChange={(e) => setProductData({...productData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input
                        type="number"
                        placeholder="15000"
                        value={productData.price}
                        onChange={(e) => setProductData({...productData, price: e.target.value})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                Continue to Photos
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-2">
                <X className="w-5 h-5" /> Back to details
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Image className="w-8 h-8 text-blue-600" />
                Add Photos (Max 8)
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-2 border-dashed border-gray-300 rounded-2xl text-center py-12 hover:border-blue-400 transition-colors">
                  <label className="cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-colors">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Click to upload</p>
                    <p className="text-xs text-gray-500">or drag & drop</p>
                    <input type="file" multiple accept="image/*" className="hidden" />
                  </label>
                </div>
                
                {productData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {productData.images.slice(0, 8).map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-20 object-cover rounded-lg" />
                        <button className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setStep(1)} 
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all"
                >
                  Continue to Review
                </button>
              </div>
          )}

          {step === 3 && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-2">
                <X className="w-5 h-5" /> Back to photos
              </button>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                Review & Publish
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl text-gray-900">{productData.title}</h4>
                    <ListingTypeBadge type={productData.listingType} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-bold text-lg">₹{productData.price}</span>
                      {productData.isNegotiable && (
                        <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full">Negotiable</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {productData.location || 'Your Location'}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Category</h5>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-medium">
                      {categories.find(c => c.id === productData.category)?.name || 'Select category'}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Condition</h5>
                    <select 
                      value={productData.condition}
                      onChange={(e) => setProductData({...productData, condition: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Like
