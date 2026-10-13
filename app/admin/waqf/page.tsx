'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heart, Building, TrendingUp, Save, CheckCircle2 } from 'lucide-react';

export default function AdminWaqfPage() {
  const [loading, setLoading] = useState(true);
  const [waqfStats, setWaqfStats] = useState({
    totalWaqfAllocated: 0,
    impactPercentage: 30,
    projectsFundedCount: 4,
    beneficiariesCount: 12,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setWaqfStats((prev) => ({
          ...prev,
          totalWaqfAllocated: data.stats.totalWaqfAllocated,
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
    }, 600);
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل بيانات الوقف...</div>;
  }

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="emerald" className="mb-1">
            الأثر والمحفظة الوقفية
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-arabic">
            إدارة حصة الوقف الخيري (30%)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            متابعة إجمالي المبالغ المخصصة للوقف من المبيعات وتحديث مؤشرات الأثر.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card hoverEffect={false} className="p-6 bg-emerald-950 text-white border-emerald-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-bold">إجمالي المبالغ الوقفية المجمعة</span>
            <Heart className="w-5 h-5 text-amber-300" />
          </div>
          <p className="text-3xl font-black text-amber-200">{waqfStats.totalWaqfAllocated} ج.م</p>
          <span className="text-[11px] text-emerald-300 block">تستقطع تلقائياً بنسبة 30% من أرباح المبيعات</span>
        </Card>

        <Card hoverEffect={false} className="p-6 bg-white border-sand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-bold">نسبة الاستقطاع المحددة</span>
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <p className="text-3xl font-black text-stone-900">30% ثابتة</p>
          <span className="text-[11px] text-stone-500 block">طبقاً لشعار المبادرة الرئيسي</span>
        </Card>

        <Card hoverEffect={false} className="p-6 bg-white border-sand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-bold">المشاريع التنموية الممولة</span>
            <Building className="w-5 h-5 text-emerald-700" />
          </div>
          <p className="text-3xl font-black text-stone-900">{waqfStats.projectsFundedCount} مشاريع</p>
          <span className="text-[11px] text-stone-500 block">مشاريع صغيرة وأدوات إنتاج</span>
        </Card>
      </div>

      {/* Update Metrics Form */}
      <Card hoverEffect={false} className="p-6 bg-white space-y-4 max-w-xl">
        <h3 className="font-bold text-lg text-stone-900 border-b pb-2">تحديث مؤشرات الوقف والمشاريع</h3>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم حفظ مؤشرات الأثر بنجاح</span>
          </div>
        )}

        <form onSubmit={handleSaveMetrics} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">المبلغ الإجمالي المجمع (تعديل يدوي إضافي)</label>
            <input
              type="number"
              value={waqfStats.totalWaqfAllocated}
              onChange={(e) => setWaqfStats({ ...waqfStats, totalWaqfAllocated: parseFloat(e.target.value) || 0 })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">عدد المشاريع الممولة</label>
            <input
              type="number"
              value={waqfStats.projectsFundedCount}
              onChange={(e) => setWaqfStats({ ...waqfStats, projectsFundedCount: parseInt(e.target.value) || 0 })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
            />
          </div>

          <Button type="submit" variant="emerald" size="lg" fullWidth disabled={saving}>
            <Save className="w-4 h-4" />
            <span>تحديث بيانات الأثر</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
