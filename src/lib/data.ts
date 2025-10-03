import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'phone-accessories',
    name: 'Phone Accessories',
    slug: 'phone-accessories',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    productCount: 2847,
    featured: true
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches & Wearables',
    slug: 'smartwatches-wearables',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=300&fit=crop',
    productCount: 892,
    featured: true
  },
  {
    id: 'audio-gadgets',
    name: 'Audio & Music Gadgets',
    slug: 'audio-music-gadgets',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    productCount: 1256,
    featured: true
  },
  {
    id: 'smart-home',
    name: 'Smart Home Devices',
    slug: 'smart-home-devices',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    productCount: 934,
    featured: true
  },
  {
    id: 'car-gadgets',
    name: 'Car Gadgets',
    slug: 'car-gadgets',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    productCount: 678,
    featured: false
  },
  {
    id: 'led-lighting',
    name: 'LED & Lighting',
    slug: 'led-lighting',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
    productCount: 789,
    featured: false
  },
  {
    id: 'computer-accessories',
    name: 'Computer Accessories',
    slug: 'computer-accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    productCount: 1145,
    featured: false
  }
];

export const sampleProducts: Product[] = [
  {
    id: 'wireless-charging-pad-001',
    title: 'Fast Wireless Charging Pad with LED Display',
    description: 'Ultra-fast 15W wireless charging pad with real-time LED display showing charging status, temperature, and power output. Compatible with all Qi-enabled devices including iPhone, Samsung Galaxy, and more.',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    images: [
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1631795844375-d8a5ff72c9e6?w=500&h=500&fit=crop'
    ],
    category: 'phone-accessories',
    rating: 4.8,
    reviewCount: 1247,
    features: [
      '15W Fast Wireless Charging',
      'LED Display with Status Indicators',
      'Universal Qi Compatibility',
      'Temperature Protection',
      'Non-slip Rubber Base',
      'Compact & Portable Design'
    ],
    specifications: {
      'Power Output': '15W/10W/7.5W/5W',
      'Input': 'USB-C',
      'Compatibility': 'Qi-enabled devices',
      'Dimensions': '4.3 × 4.3 × 0.4 inches',
      'Weight': '4.2 oz',
      'Material': 'Premium ABS + PC'
    },
    inStock: true,
    tags: ['wireless charging', 'fast charging', 'LED display', 'phone accessories'],
    shipping: {
      freeShipping: true,
      estimatedDays: '3-7'
    }
  },
  {
    id: 'fitness-tracker-001',
    title: 'Smart Bluetooth Fitness Tracker with Heart Rate Monitor',
    description: 'Advanced fitness tracker with 24/7 heart rate monitoring, sleep tracking, waterproof design, and 10+ sport modes. Features a vibrant color display and 7-day battery life.',
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&h=500&fit=crop'
    ],
    category: 'smartwatches',
    rating: 4.7,
    reviewCount: 892,
    features: [
      '24/7 Heart Rate Monitoring',
      'Sleep Quality Analysis',
      '10+ Sport Modes',
      'IP68 Waterproof Rating',
      '1.4" Color Touch Display',
      '7-Day Battery Life',
      'Smart Notifications',
      'GPS Connectivity'
    ],
    specifications: {
      'Display': '1.4" TFT Color Screen',
      'Battery': '180mAh Li-polymer',
      'Waterproof': 'IP68',
      'Connectivity': 'Bluetooth 5.0',
      'Compatibility': 'Android 5.0+ / iOS 9.0+',
      'Sensors': 'Heart Rate, 3-axis Accelerometer'
    },
    inStock: true,
    tags: ['fitness tracker', 'heart rate monitor', 'waterproof', 'smartwatch'],
    shipping: {
      freeShipping: true,
      estimatedDays: '5-10'
    }
  },
  {
    id: 'usb-hub-001',
    title: 'USB-C Multi-Port Hub with 4K HDMI & Fast Charging',
    description: 'Premium 7-in-1 USB-C hub with 4K HDMI output, USB 3.0 ports, SD card readers, and 100W power delivery. Perfect for laptops, tablets, and smartphones.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop'
    ],
    category: 'computer-accessories',
    rating: 4.9,
    reviewCount: 567,
    features: [
      '4K HDMI Output (3840×2160@30Hz)',
      '3× USB 3.0 High-Speed Ports',
      'SD & MicroSD Card Readers',
      '100W USB-C Power Delivery',
      'Plug & Play - No Drivers',
      'Aluminum Alloy Construction',
      'Compact Portable Design'
    ],
    specifications: {
      'HDMI Output': '4K@30Hz / 1080P@60Hz',
      'USB Ports': '3× USB 3.0 (5Gbps)',
      'Power Delivery': 'Up to 100W',
      'Card Readers': 'SD/TF simultaneous read',
      'Material': 'Aluminum Alloy',
      'Dimensions': '4.7 × 1.9 × 0.5 inches'
    },
    inStock: true,
    tags: ['USB hub', '4K HDMI', 'laptop accessories', 'multi-port'],
    shipping: {
      freeShipping: true,
      estimatedDays: '3-7'
    }
  },
  {
    id: 'led-strip-001',
    title: 'Smart RGB LED Strip Lights with Remote & App Control',
    description: 'WiFi-enabled LED strip lights with 16 million colors, music sync, voice control compatibility, and easy installation. Perfect for room ambiance and decoration.',
    price: 24.99,
    originalPrice: 39.99,
    discount: 38,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop'
    ],
    category: 'led-lighting',
    rating: 4.6,
    reviewCount: 1583,
    features: [
      '16 Million RGB Colors',
      'WiFi & Bluetooth Control',
      'Voice Control (Alexa/Google)',
      'Music Sync & Sound Activated',
      'App Control with Timer',
      'Easy Cut & Connect',
      '50,000 Hour Lifespan'
    ],
    specifications: {
      'Length': '16.4 feet (5 meters)',
      'LEDs': '150 SMD 5050 RGB LEDs',
      'Power': '24W / DC 12V',
      'Control': 'WiFi 2.4GHz / Bluetooth',
      'App': 'Smart Life / Tuya Smart',
      'Cutting': 'Every 3 LEDs (2 inches)'
    },
    inStock: true,
    tags: ['LED lights', 'smart lighting', 'RGB', 'app control', 'voice control'],
    shipping: {
      freeShipping: true,
      estimatedDays: '5-10'
    }
  },
  {
    id: 'car-mount-001',
    title: 'Magnetic Car Phone Mount with Wireless Charging',
    description: 'Premium magnetic car mount with built-in wireless charging. Strong magnetic hold, 360° rotation, and automatic clamping for safe hands-free driving.',
    price: 34.99,
    originalPrice: 54.99,
    discount: 36,
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop'
    ],
    category: 'car-gadgets',
    rating: 4.5,
    reviewCount: 423,
    features: [
      '15W Wireless Charging',
      'Strong Magnetic Hold',
      '360° Rotation & Adjustment',
      'Auto-Clamping Arms',
      'Dashboard & Vent Mount',
      'LED Charging Indicator',
      'Case-Friendly Design'
    ],
    specifications: {
      'Charging Power': '15W/10W/7.5W/5W',
      'Mount Type': 'Dashboard/Air Vent',
      'Compatibility': 'Phones 4.7-6.8 inches',
      'Rotation': '360° horizontal/vertical',
      'Material': 'ABS + Aluminum',
      'Cable Length': '4 feet'
    },
    inStock: true,
    tags: ['car mount', 'wireless charging', 'magnetic', 'car accessories'],
    shipping: {
      freeShipping: true,
      estimatedDays: '7-14'
    }
  },
  {
    id: 'bluetooth-speaker-001',
    title: 'Portable Bluetooth Speaker with RGB Lights & Bass Boost',
    description: 'Compact wireless speaker with powerful bass, colorful RGB light show, IPX6 waterproof rating, and 12-hour battery life. Perfect for parties and outdoor use.',
    price: 45.99,
    originalPrice: 69.99,
    discount: 34,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'
    ],
    category: 'audio-gadgets',
    rating: 4.7,
    reviewCount: 789,
    features: [
      'Enhanced Bass Technology',
      'RGB LED Light Show',
      'IPX6 Waterproof',
      '12-Hour Battery Life',
      'Bluetooth 5.0 Connectivity',
      'Built-in Microphone',
      'Compact Portable Design'
    ],
    specifications: {
      'Power Output': '20W (10W × 2)',
      'Bluetooth': 'Version 5.0',
      'Battery': '2400mAh',
      'Waterproof': 'IPX6',
      'Range': 'Up to 33 feet',
      'Dimensions': '7.1 × 2.8 × 2.8 inches'
    },
    inStock: true,
    tags: ['bluetooth speaker', 'waterproof', 'RGB lights', 'portable'],
    shipping: {
      freeShipping: true,
      estimatedDays: '5-10'
    }
  }
];