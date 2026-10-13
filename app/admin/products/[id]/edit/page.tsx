'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Product } from '@/types';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        const found = data.products.find((p: Product) => p.id === id || p.slug === id);
        if (found) {
          setFormData(found);
        } else {
          setError('المنتج غير موجود');
        }
      }
    } catch (e) {
      setError('خطأ في جلب بيانات المنتج');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setError('');
    setSaving(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(data.message || 'خطأ في حفظ التغييرات');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالسيرفر');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري جلب المنتج للتعديل...</div>;
  }

  if (!formData) {
    return <div className="py-20 text-center text-stone-700 font-bold">المنتج غير موجود.</div>;
  }

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex items-center justify-between border-b border-sand-200 pb-4">
        <div>
          <Link href="/admin/products" className="text-xs text-stone-500 hover:underline flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            <span>العودة للمنتجات</span>
          </Link>
          <h1 className="text-2xl font-black text-stone-900 font-arabic">تعديل: {formData.name}</h1>
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2">البيانات والأسعار</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">اسم المنتج</label>
              <input
                type="text"
                required
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
            <label className="block text-xs font-bold text-stone-700 mb-1">العنوان الفرعي</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">السعر المباشر (ج.م)</label>
              <input
                type="number"
                value={formData.price ?? ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">السعر القديم قبل الخصم</label>
              <input
                type="number"
                value={formData.compareAtPrice ?? ''}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">الشارة (Badge)</label>
              <input
                type="text"
                value={formData.badge || ''}
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

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">الوصف التفصيلي</label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
            />
          </div>
        </Card>

        <Button type="submit" variant="gold" size="xl" disabled={saving} className="w-full">
          <Save className="w-5 h-5" />
          <span>حفظ التغييرات على المنتج</span>
        </Button>
      </form>
    </div>
  );
}
