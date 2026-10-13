'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllProducts } from '@/lib/products';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Heart } from 'lucide-react';

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const [filter, setFilter] = useState<'all' | 'wives' | 'husbands' | 'bundle'>('all');

  const filteredProducts = allProducts.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'wives') return p.targetAudience === 'wives';
    if (filter === 'husbands') return p.targetAudience === 'husbands';
    if (filter === 'bundle') return p.isBundle;
    return true;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container>
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold">كتالوج الأدلة الزوجية</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-arabic">
            اختر الدليل المناسب لخطوتك القادمة
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            جميع المنتجات مصممة بأسلوب راقٍ وتطبيقي يضمن الخصوصية الكاملة وتحقيق الفهم والاستقرار الزوجي، مع مساهمة 30% من أرباح طلبك لصالح وقف خيري مستدام.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === 'all'
                  ? 'bg-burgundy-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              جميع الأدلة ({allProducts.length})
            </button>
            <button
              onClick={() => setFilter('wives')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === 'wives'
                  ? 'bg-burgundy-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              خاص بالزوجات (For Her)
            </button>
            <button
              onClick={() => setFilter('husbands')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === 'husbands'
                  ? 'bg-burgundy-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              خاص بالرجال (For Him)
            </button>
            <button
              onClick={() => setFilter('bundle')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === 'bundle'
                  ? 'bg-brand-500 text-burgundy-950 shadow-sm font-extrabold'
                  : 'bg-white text-stone-700 border border-sand-200 hover:bg-sand-100'
              }`}
            >
              باكدج البيت السوي (الزوجين)
            </button>
          </div>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} featured={product.isBundle} />
          ))}
        </div>

        {/* Waqf Guarantee Note */}
        <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">أنت تصلح بيتك، وتبني بيت غيرك</h3>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-xl mx-auto">
            30% من صافي أرباح مبيعات كل الدلائل المتاحة تعود مباشرة للمحفظة الوقفية لخلق فرص عمل ومصادر رزق مستدامة للأسر المحتاجة.
          </p>
        </div>
      </Container>
    </div>
  );
}
