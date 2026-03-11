"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ShoppingBag, Mail, Lock, User, Phone, MapPin, Store, Smartphone, ArrowRight, Check } from 'lucide-react';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sellerParam = searchParams.get('seller');
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: sellerParam === 'business' ? 'BUSINESS_SELLER' : sellerParam === 'individual' ? 'INDIVIDUAL_SELLER' : 'BUYER',
    businessName: '',
    gstNumber: '',
    city: '',
    pincode: '',
    bankAccount: '',
    bankIfsc: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Account created successfully!');
    if (formData.role === 'BUSINESS_SELLER') {
      router.push('/dashboard?tab=store');
    } else if (formData.role === 'INDIVIDUAL_SELLER') {
      router.push('/dashboard?tab=listings');
    } else {
      router.push('/products');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Dartox</span>
          </Link>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Start Selling Today<br />
            <span className="text-blue-200">India's #1 Hybrid Marketplace</span>
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Check className="w-4 h-4" /></div>
              <span>0% Commission for first 10 sales</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Check className="w-4 h-4" /></div>
              <span>Secure Escrow Payments</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Check className="w-4 h-4" /></div>
              <span>Instant Bank Transfers</span>
            </div>
          </div>
        </div>
        <p className="text-white/60 text-sm">© 2024 Dartox. All rights reserved.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dartox</span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600 mb-8">Join thousands of sellers on Dartox</p>

          <div className="flex items-center gap-2 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className="flex-1 h-1 bg-gray-200"><div className={`h-full bg-blue-600 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} /></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className="flex-1 h-1 bg-gray-200"><div className={`h-full bg-blue-600 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} /></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I want to...</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" onClick={() => setFormData({ ...formData, role: 'BUYER' })} className={`p-4 rounded-xl border-2 text-center transition-all ${formData.role === 'BUYER' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <User className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <span className="text-sm font-medium">Buy Only</span>
                    </button>
                    <button type="button" onClick={() => setFormData({ ...formData, role: 'INDIVIDUAL_SELLER' })} className={`p-4 rounded-xl border-2 text-center transition-all ${formData.role === 'INDIVIDUAL_SELLER' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <Smartphone className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <span className="text-sm font-medium">Quick Sell</span>
                    </button>
                    <button type="button" onClick={() => setFormData({ ...formData, role: 'BUSINESS_SELLER' })} className={`p-4 rounded-xl border-2 text-center transition-all ${formData.role === 'BUSINESS_SELLER' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <Store className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <span className="text-sm font-medium">Brand Store</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && formData.role !== 'BUYER' && (
              <div className="space-y-5">
                {formData.role === 'BUSINESS_SELLER' ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h3 className="font-medium text-blue-900 mb-1">🏪 Brand Store Setup</h3>
                      <p className="text-sm text-blue-700">Create your professional online store</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                      <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your Brand Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number (Optional)</label>
                      <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="22AAAAA0000A1Z5" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <h3 className="font-medium text-orange-900 mb-1">📱 Quick Listing Setup</h3>
                      <p className="text-sm text-orange-700">Set your location for "nearby" discovery</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Bangalore" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="560001" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </>
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
                </div>
              </div>
            )}

            {step === 2 && formData.role === 'BUYER' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">Back</button>
                  <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">{loading ? 'Creating...' : 'Create Account'} <ArrowRight className="w-5 h-5" /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-green-50 p-4 rounded-xl">
                  <h3 className="font-medium text-green-900 mb-1">💳 Connect Bank Account</h3>
                  <p className="text-sm text-green-700">Receive payments directly to your bank via Razorpay</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                  <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="1234567890" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input type="text" name="bankIfsc" value={formData.bankIfsc} onChange={handleChange} placeholder="HDFC0001234" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                </div>
                <p className="text-xs text-gray-500">🔒 Your bank details are securely encrypted and stored with Razorpay</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">Back</button>
                  <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">{loading ? 'Creating...' : 'Complete Signup'} <ArrowRight className="w-5 h-5" /></button>
                </div>
              </div>
            )}
          </form>
          <p className="mt-8 text-center text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

function SignupLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense fallback={<SignupLoader />}>
      <SignupContent />
    </Suspense>
  );
}

