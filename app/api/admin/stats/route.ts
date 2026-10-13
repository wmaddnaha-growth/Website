import { NextResponse } from 'next/server';
import {
  getStoredOrders,
  getStoredProducts,
  getStoredFAQ,
  getStoredBlog,
  getStoredSettings,
} from '@/lib/store';

export async function GET() {
  const orders = getStoredOrders();
  const products = getStoredProducts();
  const faq = getStoredFAQ();
  const blog = getStoredBlog();
  const settings = getStoredSettings();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalWaqfAllocated = orders.reduce((sum, o) => sum + (o.waqfAmount || 0), 0) + settings.waqfTotalRaised;
  const completedOrdersCount = orders.filter((o) => o.status === 'completed' || o.status === 'shipped').length;

  return NextResponse.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders: orders.length,
      completedOrdersCount,
      totalWaqfAllocated,
      productsCount: products.length,
      faqCount: faq.length,
      blogCount: blog.length,
    },
    recentOrders: orders.slice(0, 5),
  });
}
