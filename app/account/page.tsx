'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { User, Download, ShoppingBag, Heart, Lock, Key } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'downloads' | 'settings'>('downloads');

  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container size="md">
        {/* User Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-burgundy-900 text-amber-200 font-bold text-2xl flex items-center justify-center border-2 border-amber-400">
              م
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-stone-900">حساب الشريك / المشتري</h1>
                <Badge variant="gold">عضوية دائمـة</Badge>
              </div>
              <p className="text-xs text-stone-500">مرحباً بك في منصتك الخاصة لمتابعة كتبك ومشترياتك.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/products">
              <Button variant="primary" size="sm">
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-sand-200 gap-4 text-sm font-bold">
          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'downloads'
                ? 'border-burgundy-800 text-burgundy-900 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>الكتب والتحميلات الإكترونية</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-burgundy-800 text-burgundy-900 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>سجل الطلبات السابق</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-burgundy-800 text-burgundy-900 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>إعدادات الحساب</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <Card hoverEffect={false} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 bg-burgundy-900 text-amber-200 rounded-lg flex items-center justify-center font-bold text-xs p-1">
                  شفرة الرجالة
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">دليل "شفرة الرجالة" (PDF)</h3>
                  <p className="text-xs text-stone-500">النسخة الإلكترونية الكاملة + كورس الـ 14 يوماً</p>
                </div>
              </div>
              <Button variant="gold" size="sm">
                <Download className="w-4 h-4" />
                <span>تحميل PDF</span>
              </Button>
            </Card>

            <Card hoverEffect={false} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 bg-emerald-900 text-amber-200 rounded-lg flex items-center justify-center font-bold text-xs p-1">
                  شفرة النساء
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">دليل "شفرة النساء" (PDF)</h3>
                  <p className="text-xs text-stone-500">النسخة الإلكترونية الكاملة + كتالوج الصيانة والأداء</p>
                </div>
              </div>
              <Button variant="gold" size="sm">
                <Download className="w-4 h-4" />
                <span>تحميل PDF</span>
              </Button>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <Card hoverEffect={false} className="p-8 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 mx-auto text-stone-400" />
            <h3 className="font-bold text-stone-900 text-lg">طلبات الشراء السابقة</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              يمكنك استعراض تفاصيل طلبك ورقم الفاتورة ونسبة المساهمة في الوقف الخيري.
            </p>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card hoverEffect={false} className="p-6 space-y-4 max-w-md">
            <h3 className="font-bold text-lg text-stone-900">بيانات الحساب الشخصي</h3>
            <div className="space-y-3 text-xs text-stone-700">
              <div>
                <label className="block font-bold mb-1">البريد الإلكتروني المسجل</label>
                <input
                  type="text"
                  disabled
                  value="user@example.com"
                  className="w-full p-2 border border-sand-300 rounded-lg bg-sand-50"
                />
              </div>
              <p className="text-[11px] text-stone-500">
                لحماية خصوصيتك، لا يتم مشاركة بياناتك مع أي جهة خارجية.
              </p>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
}
