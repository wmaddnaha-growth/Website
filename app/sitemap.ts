import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { blogPosts } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wamaddadnaha.com';

  const products = getAllProducts();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticPages = [
    '',
    '/home',
    '/products',
    '/story',
    '/impact',
    '/faq',
    '/contact',
    '/blog',
    '/cart',
    '/checkout',
    '/account',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' || route === '/home' ? 1.0 : 0.7,
  }));

  return [...staticPages, ...productUrls, ...blogUrls];
}
