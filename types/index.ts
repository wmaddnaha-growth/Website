export type DeliveryType = 'digital' | 'physical' | 'hybrid';

export interface Chapter {
  number: number | string;
  title: string;
  subtitle?: string;
  description: string;
  lessons?: string[];
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  targetAudience: 'wives' | 'husbands' | 'couples';
  audienceLabel: string;
  shortDescription: string;
  description: string;
  price: number | null; // Configurable / dynamic pricing
  compareAtPrice: number | null;
  currency: string;
  coverColor: string;
  accentColor: string;
  badge?: string;
  isFeatured?: boolean;
  isBundle?: boolean;
  deliveryType: DeliveryType;
  features: ProductFeature[];
  chapters: Chapter[];
  includedItems?: string[];
  faq: ProductFAQ[];
  previews?: {
    title: string;
    excerpt: string;
  }[];
  sampleImages?: {
    src: string;
    title: string;
    desc: string;
  }[];
  proofImages?: {
    src: string;
    label: string;
  }[];
  testimonialImages?: {
    src: string;
  }[];
  bonuses?: {
    title: string;
    desc: string;
    tag: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'products' | 'waqf' | 'shipping' | 'usage';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  image?: string;
}
