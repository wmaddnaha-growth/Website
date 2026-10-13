'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FAQItem } from '@/types';
import { HelpCircle, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminFAQPage() {
  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchFAQ();
  }, []);

  const fetchFAQ = async () => {
    try {
      const res = await fetch('/api/admin/faq');
      const data = await res.json();
      if (data.success) {
        setFaqList(data.faq);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/faq', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const data = await res.json();
      if (data.success) {
        fetchFAQ();
        setEditingItem(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا السؤال؟')) return;

    try {
      const res = await fetch(`/api/admin/faq?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFaqList(faqList.filter((f) => f.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل الأسئلة...</div>;
  }

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="gold" className="mb-1">
            إدارة الدعم والإجابات
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-arabic">
            إدارة الأسئلة الشائعة ({faqList.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">إضافة وتعديل الأسئلة والأجوبة الظاهرة للمستخدمين.</p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditingItem({ id: Date.now().toString(), question: '', answer: '', category: 'general' });
          }}
          variant="gold"
          size="md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال جديد</span>
        </Button>
      </div>

      {/* FAQ Cards List */}
      <div className="space-y-4">
        {faqList.map((item) => (
          <Card hoverEffect={false} key={item.id} className="p-6 bg-white space-y-3 border-sand-200">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-burgundy-800 bg-burgundy-50 px-2 py-0.5 rounded inline-block">
                  الفئة: {item.category}
                </span>
                <h3 className="font-bold text-base text-stone-900">{item.question}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingItem(item);
                  }}
                  className="p-1.5 text-stone-600 hover:text-burgundy-800 rounded-lg hover:bg-sand-100"
                  title="تعديل"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed border-t border-sand-100 pt-3">{item.answer}</p>
          </Card>
        ))}
      </div>

      {/* Modal Edit/New */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <h3 className="font-bold text-lg text-stone-900">
                {isNew ? 'إضافة سؤال جديد' : 'تعديل السؤال'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">السؤال</label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الفئة</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
                >
                  <option value="general">عامة</option>
                  <option value="products">عن الأدلة والكتب</option>
                  <option value="waqf">الوقف والأثر</option>
                  <option value="shipping">الشحن والتسليم</option>
                  <option value="usage">الاستخدام والتطبيق</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">الإجابة</label>
                <textarea
                  required
                  rows={4}
                  value={editingItem.answer}
                  onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" fullWidth>
                <Save className="w-4 h-4" />
                <span>حفظ السؤال</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
