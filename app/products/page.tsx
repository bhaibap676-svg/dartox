"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, CATEGORIES } from '@/types';
import { 
  Search, 
  MapPin, 
  Filter, 
  Grid3X3, 
  List,
  Heart,
  Eye,
  MessageCircle,
  Tag,
  Store,
  Smartphone,
  ChevronDown,
  X
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [search, setSearch] = useState('');
  const [listingType, setListingType] = useState<string>('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [listingType, category, city, minPrice, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (listingType) params.set('listingType', listingType);
      if (category) params.set('category', category);
      if (city) params.set('city', city);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (search) params.set('search', search);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const clearFilters = () => {
    setListingType('');
    setCategory('');
    setCity('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setNearby(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dartox
              </span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex items-center bg-gray-100 rounded-full px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for products, brands..."
                  className="flex-1 px-3 py-3 bg-transparent outline-none"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700">
                  Search
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setNearby(!nearby)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  nearby ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Nearby
              </button>
              
              <Link href="/sell" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700">
                Sell on Dartox
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setListingType('')}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              listingType === '' 
                ? 'bg-gray-900 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setListingType('BRAND_NEW')}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-2 ${
              listingType === 'BRAND_NEW' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            <Store className="w-4 h-4" />
            Brand New
          </button>
          <button
            onClick={() => setListingType('PRE_OWNED')}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-2 ${
              listingType === 'PRE_OWNED' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Pre-Owned
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(category === cat.id ? '' : cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                category === cat.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Listing Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Listing Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="listingType"
                      checked={listingType === ''}
                      onChange={() => setListingType('')}
                      className="text-blue-600"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="listingType"
                      checked={listingType === 'BRAND_NEW'}
                      onChange={() => setListingType('BRAND_NEW')}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Brand New</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="listingType"
                      checked={listingType === 'PRE_OWNED'}
                      onChange={() => setListingType('PRE_OWNED')}
                      className="text-blue-600"
                    />
                    <span className="text-sm">Pre-Owned</span>
                  </label>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">City</h4>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bangalore"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Negotiable */}
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-blue-600 rounded" />
                  <span className="text-sm">Negotiable only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {products.length} products found
              </p>
              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border rounded-lg text-sm">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-2xl" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <Link href={`/products/${product.id}`} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group card-hover">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={product.listingType === 'BRAND_NEW' ? 'badge-new' : 'badge-used'}>
            {product.listingType === 'BRAND_NEW' ? 'Brand New' : 'Pre-Owned'}
          </span>
          {product.isNegotiable && product.listingType === 'PRE_OWNED' && (
            <span className="badge-negotiable">Negotiable</span>
          )}
        </div>

        {/* Seller Type */}
        <div className="absolute top-3 right-3">
          {product.sellerType === 'BUSINESS' ? (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          {product.location?.city}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.mrp && (
            <>
              <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
              <span className="text-sm text-green-600 font-medium">{discount}% off</span>
            </>
          )}
        </div>

        {product.condition && product.listingType === 'PRE_OWNED' && (
          <div className="mt-2 text-sm text-gray-500">
            {product.condition.grade} • {product.condition.age}
          </div>
        )}

        <div className="flex items-center gap-4 mt-3 pt-3 border-t text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {product.views}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Chat
          </span>
        </div>
      </div>
    </Link>
  );
}

// Product List Item Component
function ProductListItem({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow flex gap-4 group">
      <div className="w-40 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <span className={product.listingType === 'BRAND_NEW' ? 'badge-new' : 'badge-used'}>
            {product.listingType === 'BRAND_NEW' ? 'Brand New' : 'Pre-Owned'}
          </span>
          {product.sellerType === 'BUSINESS' && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1">
              <Store className="w-3 h-3" /> Brand Store
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          {product.location?.city} • {product.condition?.grade}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.mrp && (
            <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Heart className="w-5 h-5 text-gray-400" />
        </button>
        <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </Link>
  );
}

