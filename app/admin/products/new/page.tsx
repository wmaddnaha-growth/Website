'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Product } from '@/types';
import { ArrowLeft, Save, Plus, Trash2, BookOpen } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<Product>>({
    id: '',
    slug: '',
    name: '',
    shortName: '',
    subtitle: '',
    targetAudience: 'wives',
    audienceLabel: 'خاص بالزوجات (For Her)',
    shortDescription: '',
    description: '',
    price: 350,
    compareAtPrice: 500,
    currency: 'EGP',
    coverColor: '#6B1B2F',
    accentColor: '#C5A973',
    badge: 'جديد',
    isFeatured: false,
    isBundle: false,
    deliveryType: 'digital',
    features: [
      { icon: 'Brain', title: 'عنوان الفائدة', description: 'وصف الفائدة الفرعية' }
    ],
    chapters: [],
    faq: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.id || !formData.name || !formData.slug) {
      setError('يرجى كتابة اسم المنتج والمعرف والرابط (Slug)');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(data.message || 'خطأ في حفظ المنتج');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex items-center justify-between border-b border-sand-200 pb-4">
        <div>
          <Link href="/admin/products" className="text-xs text-stone-500 hover:underline flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            <span>العودة لقائمة المنتجات</span>
          </Link>
          <h1 className="text-2xl font-black text-stone-900 font-arabic">إضافة كتاب / منتج جديد</h1>
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2">البيانات الأساسية للمنتج</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">المعرف (ID)</label>
              <input
                type="text"
                required
                placeholder="مثال: shifrat-al-regal"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value, slug: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">رابط المنتج (Slug)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">اسم المنتج الكامل</label>
              <input
                type="text"
                required
                placeholder="مثال: شفرة الرجالة"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">الاسم المختصر</label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">العنوان الفرعي (Subtitle)</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">السعر (ج.م)</label>
              <input
                type="number"
                value={formData.price ?? ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">السعر قبل الخصم</label>
              <input
                type="number"
                value={formData.compareAtPrice ?? ''}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">الشارة المميزة (Badge)</label>
              <input
                type="text"
                placeholder="مثال: الأكثر طلبًا"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">الوصف المختصر</label>
            <textarea
              rows={3}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
            />
          </div>
        </Card>

        <Button type="submit" variant="gold" size="xl" disabled={loading} className="w-full">
          <Save className="w-5 h-5" />
          <span>حفظ المنتج الجديد</span>
        </Button>
      </form>
    </div>
  );
}
