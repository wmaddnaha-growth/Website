import { products } from '@/data/products';
import { Product } from '@/types';

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBundleProduct(): Product | undefined {
  return products.find((p) => p.isBundle);
}
