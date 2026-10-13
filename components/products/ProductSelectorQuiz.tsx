'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getProductBySlug } from '@/lib/products';
import { analyticsEvents } from '@/lib/analytics';
import { User, UserCheck, ArrowLeft, Sparkles, Heart } from 'lucide-react';

export const ProductSelectorQuiz: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'wife' | 'husband' | 'both' | null>(null);

  const handleSelectRole = (role: 'wife' | 'husband' | 'both') => {
    setSelectedRole(role);
    analyticsEvents.quizComplete(role);
  };

  const wivesProduct = getProductBySlug('shifrat-al-regal');
  const husbandsProduct = getProductBySlug('shifrat-al-nesaa');
  const bundleProduct = getProductBySlug('bundle');

  return (
    <Card className="bg-gradient-to-br from-sand-50 via-white to-brand-50/40 border-brand-200 text-center p-8 sm:p-10 my-8 shadow-sm">
      <div className="max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>مرشد الاختيار السريع</span>
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3">
          مش عارف تبدأ منين؟ اختار حسب دورك في البيت
        </h3>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
          اختار دورك الحالي وسنقوم بترشيح الكتاب الأكثر فائدة وملاءمة لخطواتك الأولى في إصلاح أساس العلاقة.
        </p>

        {/* Selection buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => handleSelectRole('wife')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              selectedRole === 'wife'
                ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-900 shadow-sm'
                : 'border-sand-200 bg-white hover:border-sand-400 text-stone-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-burgundy-100 flex items-center justify-center text-burgundy-800">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="font-bold text-base">أنا ست / زوجة</span>
            <span className="text-xs text-stone-500">عايزة أفهم زوجي</span>
          </button>

          <button
            onClick={() => handleSelectRole('husband')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              selectedRole === 'husband'
                ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm'
                : 'border-sand-200 bg-white hover:border-sand-400 text-stone-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <User className="w-6 h-6" />
            </div>
            <span className="font-bold text-base">أنا راجل / زوج</span>
            <span className="text-xs text-stone-500">عايز أفهم زوجتي</span>
          </button>

          <button
            onClick={() => handleSelectRole('both')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              selectedRole === 'both'
                ? 'border-brand-500 bg-brand-50 text-brand-900 shadow-sm'
                : 'border-sand-200 bg-white hover:border-sand-400 text-stone-800'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-800">
              <Heart className="w-6 h-6" />
            </div>
            <span className="font-bold text-base">نبدأ سوا (الزوجين)</span>
            <span className="text-xs text-stone-500">باكدج التغيير المتكامل</span>
          </button>
        </div>

        {/* Result presentation */}
        {selectedRole && (
          <div className="mt-6 pt-6 border-t border-sand-200 animate-fadeIn text-right">
            {selectedRole === 'wife' && wivesProduct && (
              <div className="bg-white p-5 rounded-2xl border border-burgundy-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-burgundy-800 bg-burgundy-50 px-2 py-0.5 rounded mb-1 inline-block">
                    الترشيح المناسب لكي:
                  </span>
                  <h4 className="font-bold text-lg text-stone-900">{wivesProduct.name}</h4>
                  <p className="text-xs text-stone-600 mt-1">{wivesProduct.shortDescription}</p>
                </div>
                <Link href={`/products/${wivesProduct.slug}`}>
                  <Button variant="burgundy" size="md" className="whitespace-nowrap">
                    <span>اكتشفي الكتاب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}

            {selectedRole === 'husband' && husbandsProduct && (
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mb-1 inline-block">
                    الترشيح المناسب لك:
                  </span>
                  <h4 className="font-bold text-lg text-stone-900">{husbandsProduct.name}</h4>
                  <p className="text-xs text-stone-600 mt-1">{husbandsProduct.shortDescription}</p>
                </div>
                <Link href={`/products/${husbandsProduct.slug}`}>
                  <Button variant="emerald" size="md" className="whitespace-nowrap">
                    <span>اكتشف الكتاب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}

            {selectedRole === 'both' && bundleProduct && (
              <div className="bg-white p-5 rounded-2xl border border-brand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-brand-800 bg-brand-100 px-2 py-0.5 rounded mb-1 inline-block">
                    الترشيح الشامل للزوجين:
                  </span>
                  <h4 className="font-bold text-lg text-stone-900">{bundleProduct.name}</h4>
                  <p className="text-xs text-stone-600 mt-1">{bundleProduct.shortDescription}</p>
                </div>
                <Link href={`/products/${bundleProduct.slug}`}>
                  <Button variant="gold" size="md" className="whitespace-nowrap">
                    <span>ابدأوا الرحلة سوا</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
