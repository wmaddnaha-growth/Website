import { Product, FAQItem, BlogPost } from '@/types';
import { products as initialProducts } from '@/data/products';
import { globalFAQ as initialFAQ } from '@/data/faq';
import { blogPosts as initialBlog } from '@/data/blog';

// Data Store Interfaces
export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  deliveryType: 'digital' | 'physical';
  paymentMethod: 'card' | 'fawry' | 'wallet';
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discountAmount: number;
  total: number;
  waqfAmount: number; // 30% of profit
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  mainHeadline: string;
  mainSubheadline: string;
  impactPercentage: number;
  waqfTotalRaised: number;
  supportPhone: string;
  supportEmail: string;
  currency: string;
  defaultPriceWives: number;
  defaultPriceHusbands: number;
  defaultPriceBundle: number;
  paymentGatewaysEnabled: {
    card: boolean;
    fawry: boolean;
    wallet: boolean;
  };
}

export const defaultSettings: SiteSettings = {
  siteName: 'و مددناها',
  tagline: 'أنت تصلح بيتك، وتبني بيت غيرك',
  mainHeadline: 'البيت السوي… بيبدأ من أساس سوي.',
  mainSubheadline: 'قبل ما نبني أولادنا، لازم نفهم بعض. و«و مددناها» بتساعدك تفهم شريك حياتك، تصلّح علاقتك، وتبني بيت أهدى وأسعد.',
  impactPercentage: 30,
  waqfTotalRaised: 45200,
  supportPhone: '+20 155 308 9928',
  supportEmail: 'support@wamaddadnaha.com',
  currency: 'EGP',
  defaultPriceWives: 350,
  defaultPriceHusbands: 350,
  defaultPriceBundle: 550,
  paymentGatewaysEnabled: {
    card: true,
    fawry: true,
    wallet: true,
  },
};

const initialOrders: Order[] = [
  {
    id: 'WM-849201',
    customerName: 'أحمد محمود',
    email: 'ahmed.m@example.com',
    phone: '01012345678',
    city: 'القاهرة',
    deliveryType: 'digital',
    paymentMethod: 'card',
    items: [
      {
        productId: 'bundle',
        productName: 'باكدج البيت السوي (شفرة الرجالة + شفرة النساء)',
        price: 550,
        quantity: 1,
      },
    ],
    subtotal: 550,
    discountAmount: 0,
    total: 550,
    waqfAmount: 165,
    status: 'completed',
    createdAt: '2026-10-05T14:20:00Z',
  },
  {
    id: 'WM-739102',
    customerName: 'سارة السيد',
    email: 'sara.s@example.com',
    phone: '01223456789',
    city: 'الإسكندرية',
    deliveryType: 'digital',
    paymentMethod: 'fawry',
    items: [
      {
        productId: 'shifrat-al-regal',
        productName: 'شفرة الرجالة',
        price: 350,
        quantity: 1,
      },
    ],
    subtotal: 350,
    discountAmount: 0,
    total: 350,
    waqfAmount: 105,
    status: 'completed',
    createdAt: '2026-10-05T18:45:00Z',
  },
];

// Helper for server-side FS operations
function readJsonFileServer<T>(filename: string, defaultData: T): T {
  if (typeof window !== 'undefined') {
    return defaultData;
  }
  try {
    const fs = require('fs');
    const path = require('path');
    const STORE_DIR = path.join(process.cwd(), 'data', 'store');
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    const filePath = path.join(STORE_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    return defaultData;
  }
}

function writeJsonFileServer<T>(filename: string, data: T): void {
  if (typeof window !== 'undefined') return;
  try {
    const fs = require('fs');
    const path = require('path');
    const STORE_DIR = path.join(process.cwd(), 'data', 'store');
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    const filePath = path.join(STORE_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

// Product Store Functions
export function getStoredProducts(): Product[] {
  const products = readJsonFileServer<Product[]>('products.json', initialProducts);
  const settings = getStoredSettings();

  return products.map((p) => {
    let pPrice = p.price;
    let pCompare = p.compareAtPrice;

    if (pPrice === null || pPrice === undefined) {
      if (p.id === 'shifrat-al-regal') pPrice = settings.defaultPriceWives;
      else if (p.id === 'shifrat-al-nesaa') pPrice = settings.defaultPriceHusbands;
      else if (p.isBundle || p.id === 'bundle') pPrice = settings.defaultPriceBundle;
      else pPrice = 350;
    }

    if (pCompare === null || pCompare === undefined) {
      if (p.id === 'shifrat-al-regal') pCompare = 500;
      else if (p.id === 'shifrat-al-nesaa') pCompare = 500;
      else if (p.isBundle || p.id === 'bundle') pCompare = 800;
    }

    return {
      ...p,
      price: pPrice,
      compareAtPrice: pCompare,
    };
  });
}

export function saveStoredProducts(products: Product[]): void {
  writeJsonFileServer('products.json', products);
}

// Order Store Functions
export function getStoredOrders(): Order[] {
  return readJsonFileServer<Order[]>('orders.json', initialOrders);
}

export function saveStoredOrders(orders: Order[]): void {
  writeJsonFileServer('orders.json', orders);
}

export function addStoredOrder(newOrder: Omit<Order, 'createdAt'>): Order {
  const orders = getStoredOrders();
  const fullOrder: Order = {
    ...newOrder,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(fullOrder);
  saveStoredOrders(orders);

  const settings = getStoredSettings();
  settings.waqfTotalRaised += fullOrder.waqfAmount;
  saveStoredSettings(settings);

  return fullOrder;
}

// FAQ Store Functions
export function getStoredFAQ(): FAQItem[] {
  return readJsonFileServer<FAQItem[]>('faq.json', initialFAQ);
}

export function saveStoredFAQ(faqList: FAQItem[]): void {
  writeJsonFileServer('faq.json', faqList);
}

// Blog Store Functions
export function getStoredBlog(): BlogPost[] {
  return readJsonFileServer<BlogPost[]>('blog.json', initialBlog);
}

export function saveStoredBlog(blogList: BlogPost[]): void {
  writeJsonFileServer('blog.json', blogList);
}

// Site Settings Store Functions
export function getStoredSettings(): SiteSettings {
  return readJsonFileServer<SiteSettings>('settings.json', defaultSettings);
}

export function saveStoredSettings(settings: SiteSettings): void {
  writeJsonFileServer('settings.json', settings);
}
