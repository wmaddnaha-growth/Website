'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SiteSettings } from '@/lib/store';
import { Settings, Save, CheckCircle2, DollarSign, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSavedSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSavedSuccess(true);
      } else {
        setError(data.message || 'خطأ في حفظ الإعدادات');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالسيرفر');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل الإعدادات...</div>;
  }

  if (!settings) return null;

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="gold" className="mb-1">
            إعدادات المنصة والأسعار
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-arabic">
            إعدادات الموقع العامة
          </h1>
          <p className="text-xs text-stone-500 mt-1">تحديد الأسعار الافتراضية، بيانت التواصل، وبوابات الدفع.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 text-sm rounded-2xl border border-emerald-200 flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <span>تم حفظ الإعدادات بنجاح وتحديث الأسعار والمحتوى في الموقع العام!</span>
        </div>
      )}

      {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{error}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Prices Settings Card */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-burgundy-800" />
            <span>الأسعار الافتراضية للمنتجات</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">سعر "شفرة الرجالة" (ج.م)</label>
              <input
                type="number"
                value={settings.defaultPriceWives}
                onChange={(e) => setSettings({ ...settings, defaultPriceWives: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">سعر "شفرة النساء" (ج.م)</label>
              <input
                type="number"
                value={settings.defaultPriceHusbands}
                onChange={(e) => setSettings({ ...settings, defaultPriceHusbands: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">سعر "باكدج البيت السوي" (ج.م)</label>
              <input
                type="number"
                value={settings.defaultPriceBundle}
                onChange={(e) => setSettings({ ...settings, defaultPriceBundle: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold text-emerald-800"
              />
            </div>
          </div>
        </Card>

        {/* Brand Headlines Card */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2">عناوين الواجهة الرئيسية (Hero Section)</h3>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">العنوان الرئيسي</label>
            <input
              type="text"
              value={settings.mainHeadline}
              onChange={(e) => setSettings({ ...settings, mainHeadline: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">الوصف الفرعي الهام</label>
            <textarea
              rows={3}
              value={settings.mainSubheadline}
              onChange={(e) => setSettings({ ...settings, mainSubheadline: e.target.value })}
              className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
            />
          </div>
        </Card>

        {/* Contact Info Card */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2">بيانات التواصل والدعم الفني</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">رقم الواتساب والتواصل الرسمي</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">رقم فودافون كاش & إنستاباي (للدفع)</label>
              <input
                type="text"
                value={settings.paymentPhone || '01093637678'}
                onChange={(e) => setSettings({ ...settings, paymentPhone: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">البريد الإلكتروني للدعم</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
              />
            </div>
          </div>
        </Card>

        {/* Payment Gateways Toggle */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h3 className="font-bold text-lg text-stone-900 border-b pb-2">تفعيل وسائل الدفع المتاحة في مصر</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paymentGatewaysEnabled?.card ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentGatewaysEnabled: { ...settings.paymentGatewaysEnabled, card: e.target.checked },
                  })
                }
                className="w-4 h-4 text-burgundy-800 rounded"
              />
              <span className="text-sm font-bold">الدفع عبر الكروت البنكية (ميزة / فيزا / ماستركارد)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paymentGatewaysEnabled?.fawry ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentGatewaysEnabled: { ...settings.paymentGatewaysEnabled, fawry: e.target.checked },
                  })
                }
                className="w-4 h-4 text-burgundy-800 rounded"
              />
              <span className="text-sm font-bold">الدفع عبر كود فوري (Fawry Pay)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paymentGatewaysEnabled?.wallet ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    paymentGatewaysEnabled: { ...settings.paymentGatewaysEnabled, wallet: e.target.checked },
                  })
                }
                className="w-4 h-4 text-burgundy-800 rounded"
              />
              <span className="text-sm font-bold">الدفع عبر المحافظ الإلكترونية (فودافون كاش / اتصالات / أورانج)</span>
            </label>
          </div>
        </Card>

        <Button type="submit" variant="gold" size="xl" disabled={saving} className="w-full">
          <Save className="w-5 h-5" />
          <span>حفظ وتطبيق جميع الإعدادات</span>
        </Button>
      </form>
    </div>
  );
}
