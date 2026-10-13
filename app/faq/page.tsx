'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { globalFAQ } from '@/data/faq';
import { HelpCircle, Search } from 'lucide-react';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = globalFAQ.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.includes(searchQuery) || item.answer.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 space-y-12 dir-rtl">
      <Container size="md">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="gold">مركز الدعم والإجابات</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-arabic">
            الأسئلة الشائعة
          </h1>
          <p className="text-stone-600 text-base leading-relaxed">
            إجابات شافية ومباشرة عن جميع الاستفسارات المتعلقة بالمحتوى، الخصوصية، والطلب.
          </p>

          {/* Search input */}
          <div className="relative max-w-md mx-auto pt-2">
            <input
              type="text"
              placeholder="ابحث عن سؤالك هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm px-4 py-3 pr-10 border border-sand-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 bg-white text-stone-900 shadow-xs"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-3 top-5" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'general', label: 'عامة' },
              { id: 'products', label: 'عن الأدلة' },
              { id: 'waqf', label: 'الوقف والأثر' },
              { id: 'shipping', label: 'التسليم والشحن' },
              { id: 'usage', label: 'الاستخدام والتطبيق' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-burgundy-950 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-sand-200 hover:bg-sand-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion list */}
        <div className="pt-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-sand-200 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 mx-auto text-stone-400" />
              <p className="text-stone-600 font-bold">لم نجد أسئلة تطابق بحثك.</p>
              <p className="text-xs text-stone-500">جرب البحث بكلمات أخرى أو اختر فئة مختلفة.</p>
            </div>
          ) : (
            <Accordion items={filteredItems} defaultOpenId="1" />
          )}
        </div>
      </Container>
    </div>
  );
}
