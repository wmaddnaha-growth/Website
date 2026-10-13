'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import {
  TrendingUp,
  ShoppingBag,
  Heart,
  BookOpen,
  Plus,
  HelpCircle,
  FileText,
  Settings,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-stone-500 font-bold text-base">
        جاري تحميل بيانات لوحة التحكم...
      </div>
    );
  }

  const stats = data?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    completedOrdersCount: 0,
    totalWaqfAllocated: 0,
    productsCount: 0,
    faqCount: 0,
    blogCount: 0,
  };

  const recentOrders = data?.recentOrders || [];

  return (
    <div className="space-y-8 dir-rtl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-burgundy-950 via-burgundy-900 to-burgundy-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-burgundy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="gold" className="mb-2">
            لوحة الإدارة الرئيسية
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black font-arabic text-amber-100">
            مرحباً بك في لوحة تحكم "و مددناها"
          </h1>
          <p className="text-xs sm:text-sm text-sand-300 mt-1">
            إدارة المبيعات، تحديث الأسعار، التحكم في المنتجات، ومتابعة الوقف الخيري.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/products/new">
            <Button variant="gold" size="md">
              <Plus className="w-4 h-4" />
              <span>إضافة منتج جديد</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card hoverEffect={false} className="p-5 border-sand-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">إجمالي المبيعات</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{stats.totalRevenue} ج.م</p>
          <span className="text-[11px] text-stone-500 mt-1 block">من جميع الطلبات الإجمالية</span>
        </Card>

        <Card hoverEffect={false} className="p-5 border-sand-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">عدد الطلبات</span>
            <div className="w-9 h-9 rounded-xl bg-burgundy-100 text-burgundy-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{stats.totalOrders} طلبات</p>
          <span className="text-[11px] text-stone-500 mt-1 block">
            المكتمل منها: {stats.completedOrdersCount}
          </span>
        </Card>

        <Card hoverEffect={false} className="p-5 border-sand-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">حصة الوقف 30%</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-800">{stats.totalWaqfAllocated} ج.م</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            مخصصة للمحفظة الوقفية
          </span>
        </Card>

        <Card hoverEffect={false} className="p-5 border-sand-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">المنتجات النشطة</span>
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{stats.productsCount} أدلة</p>
          <span className="text-[11px] text-stone-500 mt-1 block">جاهزة للشراء المباشر</span>
        </Card>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/admin/products" className="block">
          <Card hoverEffect className="p-4 text-center space-y-2 bg-white">
            <BookOpen className="w-6 h-6 mx-auto text-burgundy-800" />
            <span className="text-xs font-bold text-stone-800 block">إدارة الكتب والأسعار</span>
          </Card>
        </Link>

        <Link href="/admin/orders" className="block">
          <Card hoverEffect className="p-4 text-center space-y-2 bg-white">
            <ShoppingBag className="w-6 h-6 mx-auto text-burgundy-800" />
            <span className="text-xs font-bold text-stone-800 block">متابعة جميع الطلبات</span>
          </Card>
        </Link>

        <Link href="/admin/faq" className="block">
          <Card hoverEffect className="p-4 text-center space-y-2 bg-white">
            <HelpCircle className="w-6 h-6 mx-auto text-burgundy-800" />
            <span className="text-xs font-bold text-stone-800 block">الأسئلة الشائعة ({stats.faqCount})</span>
          </Card>
        </Link>

        <Link href="/admin/settings" className="block">
          <Card hoverEffect className="p-4 text-center space-y-2 bg-white">
            <Settings className="w-6 h-6 mx-auto text-burgundy-800" />
            <span className="text-xs font-bold text-stone-800 block">إعدادات الموقع والنصوص</span>
          </Card>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <Card hoverEffect={false} className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <h2 className="font-bold text-lg text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-burgundy-800" />
            <span>أحدث الطلبات المستلمة</span>
          </h2>

          <Link href="/admin/orders" className="text-xs font-bold text-burgundy-800 hover:underline">
            عرض كل الطلبات
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-500">لا توجد طلبات مسجلة بعد.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-sand-200 text-stone-500 font-bold bg-sand-50/50">
                  <th className="p-3">رقم الطلب</th>
                  <th className="p-3">اسم المشتري</th>
                  <th className="p-3">الهاتف والبريد</th>
                  <th className="p-3">التسليم</th>
                  <th className="p-3">الإجمالي</th>
                  <th className="p-3">الوقف (30%)</th>
                  <th className="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-sand-100 hover:bg-sand-50/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-stone-900">{order.id}</td>
                    <td className="p-3 font-bold text-stone-800">{order.customerName}</td>
                    <td className="p-3 text-stone-600">
                      <div>{order.phone}</div>
                      <div className="text-[11px] text-stone-400">{order.email}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-700 font-medium">
                        {order.deliveryType === 'digital' ? 'PDF رقمي' : 'شحن مطبوع'}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-stone-900">{order.total} ج.م</td>
                    <td className="p-3 font-bold text-emerald-700">+{order.waqfAmount} ج.م</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status === 'completed'
                          ? 'مكتمل'
                          : order.status === 'shipped'
                          ? 'تم الشحن'
                          : order.status === 'cancelled'
                          ? 'ملغي'
                          : 'قيد الانتظار'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
