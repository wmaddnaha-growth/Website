'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Price } from '@/components/ui/Price';
import { X, Trash2, ShoppingBag, ArrowLeft, Tag, Check, Heart } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
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
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    if (!inputCoupon) return;

    const success = applyCoupon(inputCoupon);
    if (success) {
      setCouponSuccess(true);
      setInputCoupon('');
    } else {
      setCouponError('كود الخصم غير صحيح. جرب WAQF30 أو BUNDLE20');
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden dir-rtl">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-sand-200 flex items-center justify-between bg-sand-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-burgundy-800" />
              <h2 className="text-xl font-bold text-stone-900">سلة الشراء</h2>
              <span className="text-xs bg-burgundy-100 text-burgundy-900 font-bold px-2 py-0.5 rounded-full">
                {items.length} منتجات
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-sand-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">السلة فارغة حالياً</h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  ابدأ رحلة التغيير واختار الدليل المناسب لك أو باكدج البيت السوي الكامل.
                </p>
                <div className="pt-2">
                  <Button onClick={closeDrawer} variant="primary" size="md">
                    <Link href="/products">تصفح المنتجات</Link>
                  </Button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border border-sand-200 rounded-2xl bg-white shadow-xs items-center"
                >
                  <div className="w-16 h-20 rounded bg-sand-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-stone-700 text-center p-1 border border-sand-200">
                    {item.product.shortName}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-stone-900 text-sm mb-1 leading-snug">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500 mb-2">{item.product.audienceLabel}</p>

                    <div className="flex items-center justify-between">
                      <Price price={item.product.price} size="sm" />

                      <div className="flex items-center gap-2 border border-sand-200 rounded-lg bg-sand-50 px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-stone-600 hover:text-burgundy-800 text-lg font-bold px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-stone-600 hover:text-burgundy-800 text-lg font-bold px-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Social Impact Message in Cart */}
            {items.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 text-xs leading-relaxed flex items-start gap-3">
                <Heart className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-emerald-900 mb-0.5">
                    أنت تصلح بيتك، وتبني بيت غيرك
                  </span>
                  30% من أرباح هذا الطلب مخصصة لصالح مشروع وقف خيري مستدام يوفر مصدر دخل لعائلة أخرى.
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-sand-200 bg-sand-50/50 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="كود الخصم (مثل WAQF30)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-sand-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-700 text-stone-900 bg-white"
                  />
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                </div>
                <Button type="submit" variant="secondary" size="sm">
                  تطبيق
                </Button>
              </form>

              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {couponCode && (
                <div className="flex items-center justify-between text-xs bg-brand-100 text-brand-900 p-2 rounded-xl">
                  <span>تم تطبيق الكود: {couponCode}</span>
                  <button onClick={removeCoupon} className="text-red-600 underline text-[11px]">
                    إلغاء
                  </button>
                </div>
              )}

              {/* Subtotal summary */}
              <div className="space-y-1.5 text-sm border-t border-sand-200 pt-3">
                <div className="flex justify-between text-stone-600">
                  <span>المجموع الفرعي:</span>
                  <Price price={subtotal} size="sm" />
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>خصم الكود:</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-extrabold text-base pt-1">
                  <span>الإجمالي النهائي:</span>
                  <Price price={finalTotal} size="md" />
                </div>
              </div>

              {/* Checkout actions */}
              <div className="space-y-2">
                <Link href="/checkout" onClick={closeDrawer} className="block w-full">
                  <Button variant="gold" size="lg" fullWidth>
                    <span>متابعة الشراء وتأكيد الطلب</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>

                <Link href="/cart" onClick={closeDrawer} className="block text-center text-xs text-stone-600 hover:text-stone-900 underline pt-1">
                  عرض تفاصيل السلة الكاملة
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
