'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, ArrowLeft, Heart, Tag, ShieldCheck } from 'lucide-react';

export default function FullCartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon) return;

    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setInputCoupon('');
    } else {
      setCouponError('كود الخصم غير صحيح. جرب WAQF30 أو BUNDLE20');
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <Badge variant="gold">سلة الشراء</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            تفاصيل المنتجات المختارة
          </h1>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-16 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-sand-100 flex items-center justify-center text-stone-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">سلة الشراء فارغة</h2>
            <p className="text-sm text-stone-600">
              اختر الدليل المناسب لك أو باكدج البيت السوي لتبدأ رحلة التغيير والأثر.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button variant="gold" size="lg">
                  تصفح المنتجات
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-6 rounded-3xl border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-xl bg-sand-100 flex items-center justify-center font-bold text-xs text-stone-800 text-center p-2 border border-sand-200">
                      {item.product.shortName}
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-burgundy-800 bg-burgundy-50 px-2 py-0.5 rounded mb-1 inline-block">
                        {item.product.audienceLabel}
                      </span>
                      <h3 className="font-bold text-lg text-stone-900">{item.product.name}</h3>
                      <p className="text-xs text-stone-500 mt-1">{item.product.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 border-sand-100 pt-3 sm:pt-0">
                    <div className="flex items-center gap-2 border border-sand-200 rounded-xl bg-sand-50 px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-stone-700 hover:text-burgundy-800 text-lg font-bold px-1"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-stone-700 hover:text-burgundy-800 text-lg font-bold px-1"
                      >
                        +
                      </button>
                    </div>

                    <Price price={item.product.price} size="md" />

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-red-600 p-2 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Waqf Message */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-950 text-sm leading-relaxed flex items-start gap-3">
                <Heart className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 mb-1">أنت تصلح بيتك، وتبني بيت غيرك</h4>
                  <p className="text-xs text-emerald-800">
                    مشاركتك تعود بنسبة 30% من صافي الأرباح لدعم وقف خيري يمول مشاريع صغيرة مستدامة للأسر المحتاجة.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-4">
              <Card hoverEffect={false} className="p-6 bg-white space-y-6 sticky top-24">
                <h3 className="font-bold text-xl text-stone-900 border-b border-sand-200 pb-3">
                  ملخص الطلب
                </h3>

                {/* Coupon input */}
                <form onSubmit={handleApply} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="كود الخصم"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-sand-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-700 text-stone-900 bg-white"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      تطبيق
                    </Button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </form>

                {couponCode && (
                  <div className="flex items-center justify-between text-xs bg-brand-100 text-brand-900 p-2.5 rounded-xl">
                    <span>كود الخصم المطبق: {couponCode}</span>
                    <button onClick={removeCoupon} className="text-red-600 underline text-[11px]">
                      إلغاء
                    </button>
                  </div>
                )}

                <div className="space-y-3 text-sm border-t border-sand-200 pt-4">
                  <div className="flex justify-between text-stone-600">
                    <span>المجموع الفرعي:</span>
                    <Price price={subtotal} size="sm" />
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>مقدار الخصم:</span>
                      <span>-{discountAmount} ج.م</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-900 font-extrabold text-lg pt-2 border-t border-sand-100">
                    <span>المجموع النهائي:</span>
                    <Price price={finalTotal} size="lg" />
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button variant="gold" size="xl" fullWidth>
                    <span>الذهاب لإنهاء الطلب</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>

                <div className="text-center text-xs text-stone-500 space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>عملية شراء آمنة ومشفرة 100%</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
