import { NextRequest, NextResponse } from 'next/server';
import { Product, ListingType, ProductCondition, ProductStatus } from '@/types';

// Mock data for demo
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB',
    description: 'Excellent condition, barely used. Includes original box and charger.',
    category: 'electronics',
    listingType: 'PRE_OWNED',
    price: 65000,
    mrp: 139900,
    isNegotiable: true,
    sellerId: 'seller1',
    sellerType: 'INDIVIDUAL',
    condition: {
      grade: 'Like New',
      age: '3 months',
      warranty: false,
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      city: 'Bangalore',
      pincode: '560001',
    },
    images: ['/placeholder/iphone.jpg'],
    stock: 1,
    status: 'Available',
    views: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Samsung 55" Smart TV 4K',
    description: 'Brand new, sealed. Official warranty.',
    category: 'electronics',
    listingType: 'BRAND_NEW',
    price: 42000,
    mrp: 59999,
    isNegotiable: false,
    sellerId: 'seller2',
    sellerType: 'BUSINESS',
    brand: 'Samsung',
    warrantyMonths: 24,
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760],
      city: 'Mumbai',
      pincode: '400001',
    },
    images: ['/placeholder/tv.jpg'],
    stock: 5,
    status: 'Available',
    views: 156,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Wooden Dining Table 6 Seater',
    description: 'Used for 1 year, good condition. Can negotiate on price.',
    category: 'furniture',
    listingType: 'PRE_OWNED',
    price: 8500,
    isNegotiable: true,
    sellerId: 'seller3',
    sellerType: 'INDIVIDUAL',
    condition: {
      grade: 'Gently Used',
      age: '1 year',
      warranty: false,
    },
    location: {
      type: 'Point',
      coordinates: [78.9629, 20.5937],
      city: 'Hyderabad',
      pincode: '500001',
    },
    images: ['/placeholder/table.jpg'],
    stock: 1,
    status: 'Available',
    views: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Nike Air Max Running Shoes',
    description: 'Size 9, barely worn. Original purchase receipt available.',
    category: 'fashion',
    listingType: 'PRE_OWNED',
    price: 3200,
    mrp: 8999,
    isNegotiable: true,
    sellerId: 'seller4',
    sellerType: 'INDIVIDUAL',
    condition: {
      grade: 'Like New',
      age: '1 month',
      warranty: false,
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      city: 'Bangalore',
      pincode: '560001',
    },
    images: ['/placeholder/shoes.jpg'],
    stock: 1,
    status: 'Available',
    views: 312,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'MacBook Air M2 2023',
    description: 'Apple Certified Refurbished. 1 year warranty.',
    category: 'electronics',
    listingType: 'BRAND_NEW',
    price: 78000,
    mrp: 99900,
    isNegotiable: false,
    sellerId: 'seller5',
    sellerType: 'BUSINESS',
    brand: 'Apple',
    warrantyMonths: 12,
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716],
      city: 'Bangalore',
      pincode: '560001',
    },
    images: ['/placeholder/macbook.jpg'],
    stock: 3,
    status: 'Available',
    views: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * GET /api/products
 * 
 * Fetch products with filters:
 * - listingType: 'BRAND_NEW' | 'PRE_OWNED'
 * - category: string
 * - city: string
 * - minPrice, maxPrice: number
 * - radius: number (km for nearby)
 * - latitude, longitude: for nearby search
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const listingType = searchParams.get('listingType') as ListingType | null;
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const search = searchParams.get('search');
  const radius = searchParams.get('radius'); // km
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  let filteredProducts = [...mockProducts];

  // Filter by listing type
  if (listingType) {
    filteredProducts = filteredProducts.filter(p => p.listingType === listingType);
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  // Filter by city
  if (city) {
    filteredProducts = filteredProducts.filter(p => 
      p.location?.city.toLowerCase() === city.toLowerCase()
    );
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }

  // Search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Note: For actual geospatial search, you would use PostGIS
  // SELECT * FROM products WHERE ST_DWithin(
  //   location::geography,
  //   ST_MakePoint(longitude, latitude)::geography,
  //   radius * 1000
  // );

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
    filters: {
      listingType,
      category,
      city,
      search,
    }
  });
}

/**
 * POST /api/products
 * 
 * Create a new product listing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, category, listingType, price, sellerId, sellerType } = body;
    
    if (!title || !description || !category || !listingType || !price || !sellerId || !sellerType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      title,
      description,
      category,
      listingType,
      price,
      mrp: body.mrp,
      isNegotiable: body.isNegotiable || false,
      sellerId,
      sellerType,
      condition: body.condition,
      brand: body.brand,
      warrantyMonths: body.warrantyMonths,
      location: body.location,
      images: body.images || [],
      stock: body.stock || 1,
      status: 'Available',
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In production, save to database
    // mockProducts.push(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: listingType === 'BRAND_NEW' 
        ? 'Brand store product created successfully!'
        : 'Quick listing created! It will appear in nearby searches.'
    });

  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

