'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { Product } from '@/types';
import { BookOpen, Plus, Edit, Trash2, Check, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPriceSave = async (product: Product) => {
    const parsedPrice = parseFloat(newPrice);
    if (isNaN(parsedPrice)) return;

    const updated = { ...product, price: parsedPrice };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      if (data.success) {
        setProducts(products.map((p) => (p.id === product.id ? updated : p)));
        setEditingPriceId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا المنتج؟')) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل المنتجات...</div>;
  }

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="gold" className="mb-1">
            إدارة الكتالوجات
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-arabic">
            إدارة محتوى وأسعار المنتجات
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            تعديل الأسعار المباشرة، العناوين، الفصول، الشارات، وإضافة منتجات جديدة.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button variant="gold" size="md">
            <Plus className="w-4 h-4" />
            <span>إضافة كتاب / منتج جديد</span>
          </Button>
        </Link>
      </div>

      {/* Products Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} hoverEffect={false} className="p-6 bg-white space-y-4 flex flex-col justify-between border-sand-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-burgundy-800 bg-burgundy-50 px-2.5 py-0.5 rounded">
                  {product.audienceLabel}
                </span>
                {product.badge && <Badge variant="gold">{product.badge}</Badge>}
              </div>

              <h3 className="font-bold text-xl text-stone-900 leading-snug">{product.name}</h3>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Price Control Section */}
              <div className="bg-sand-50 p-3 rounded-2xl border border-sand-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-bold">السعر الحالي:</span>
                  {editingPriceId === product.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-20 text-xs px-2 py-1 border border-sand-300 rounded bg-white font-bold"
                      />
                      <button
                        onClick={() => handleQuickPriceSave(product)}
                        className="bg-emerald-700 text-white p-1 rounded hover:bg-emerald-800"
                        title="حفظ"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Price price={product.price} size="sm" />
                      <button
                        onClick={() => {
                          setEditingPriceId(product.id);
                          setNewPrice(product.price ? product.price.toString() : '');
                        }}
                        className="text-[11px] text-burgundy-800 underline font-bold"
                      >
                        تعديل السعر
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-stone-500 flex justify-between">
                  <span>نوع التسليم: {product.deliveryType === 'digital' ? 'PDF رقمي' : 'مطبوع'}</span>
                  <span>الفصول: {product.chapters?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-sand-100 flex items-center justify-between gap-2">
              <Link href={`/admin/products/${product.id}/edit`} className="flex-1">
                <Button variant="secondary" size="sm" fullWidth>
                  <Edit className="w-3.5 h-3.5" />
                  <span>تعديل المحتوى الكامل</span>
                </Button>
              </Link>

              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="حذف المنتج"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
