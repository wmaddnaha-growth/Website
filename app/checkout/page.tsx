'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { useCart } from '@/context/CartContext';
import { analyticsEvents } from '@/lib/analytics';
import {
  ShieldCheck,
  CreditCard,
  PhoneCall,
  CheckCircle2,
  Heart,
  Lock,
  Download,
  AlertCircle,
  Truck,
  Building,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'القاهرة',
    address: '',
    deliveryType: 'digital' as 'digital' | 'physical',
    paymentMethod: 'card' as 'card' | 'fawry' | 'wallet',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    total: number;
    email: string;
    deliveryType: string;
  } | null>(null);

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    analyticsEvents.beginCheckout(items, finalTotal);

    // Simulated integration boundary
    setTimeout(() => {
      const generatedOrderId = `WM-${Math.floor(100000 + Math.random() * 900000)}`;
      analyticsEvents.purchase(generatedOrderId, finalTotal, items);

      setOrderConfirmed({
        orderId: generatedOrderId,
        total: finalTotal,
        email: formData.email,
        deliveryType: formData.deliveryType,
      });

      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="py-16 sm:py-24 dir-rtl">
        <Container size="sm">
          <Card className="p-8 sm:p-12 text-center space-y-6 border-2 border-emerald-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="emerald">تم تأكيد الطلب بنجاح</Badge>
              <h1 className="text-3xl font-bold text-stone-900">شكراً لاختيارك "و مددناها"</h1>
              <p className="text-xs text-stone-500 font-mono">رقم الطلب: #{orderConfirmed.orderId}</p>
            </div>

            <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200 text-sm text-stone-800 space-y-2 text-right">
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span>الإجمالي المدفوع:</span>
                <span className="font-bold">{orderConfirmed.total} ج.م</span>
              </div>
              <div className="flex justify-between border-b border-sand-200 pb-2">
                <span>البريد الإلكتروني:</span>
                <span className="font-bold">{orderConfirmed.email}</span>
              </div>
              <div className="flex justify-between">
                <span>طريقة التسليم:</span>
                <span className="font-bold">
                  {orderConfirmed.deliveryType === 'digital' ? 'تحميل إلكتروني (PDF)' : 'شحن للعنوان'}
                </span>
              </div>
            </div>

            {orderConfirmed.deliveryType === 'digital' && (
              <div className="bg-brand-50 p-5 rounded-2xl border border-brand-200 space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">روابط التحميل المباشرة:</h4>
                <p className="text-xs text-stone-600">
                  تم إرسال نسخة من الكتب الإلكترونية إلى بريدك الإلكتروني. يمكنك أيضاً التحميل فوراً من الأزرار التالية:
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="gold" size="md" className="w-full">
                    <Download className="w-4 h-4" />
                    <span>تحميل كتب الدليل (PDF)</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Waqf Thank You Note */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl space-y-2">
              <Heart className="w-6 h-6 text-amber-300 mx-auto" />
              <p className="font-bold text-amber-200 text-base">أنت تصلح بيتك، وتبني بيت غيرك</p>
              <p className="text-xs text-emerald-200 leading-relaxed">
                تم تخصيص 30% من قيمة طلبك لصالح محفظة الوقف الخيري لتوفير مصدر رزق لعائلة محتاجة. جزاكم الله خيراً.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/home">
                <Button variant="outline" size="md">
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 dir-rtl">
        <Container size="sm">
          <Card className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-stone-900">لا توجد منتجات في السلة للإنهاء</h2>
            <p className="text-sm text-stone-600">يرجى إضافة المنتجات إلى السلة أولاً لتتمكن من إتمام الطلب.</p>
            <Link href="/products">
              <Button variant="gold" size="lg">
                عرض المنتجات
              </Button>
            </Link>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Badge variant="gold">إنهاء الطلب والتسليم</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            بيانات الشراء والتسليم
          </h1>
          <p className="text-xs text-stone-500">
            خطوة واحدة بسيطة لبدء رحلة التغيير الزوجي وبناء الأثر.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Step 1: Customer Contact Info */}
              <Card hoverEffect={false} className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-stone-900 border-b border-sand-200 pb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-burgundy-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>بيانات الشريك / المشتري</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      الاسم بالكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:ring-2 focus:ring-burgundy-700 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        البريد الإلكتروني (لاستلام نسخة PDF) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:ring-2 focus:ring-burgundy-700 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        رقم الهاتف / الواتساب <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:ring-2 focus:ring-burgundy-700 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: Delivery Type Selection */}
              <Card hoverEffect={false} className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-stone-900 border-b border-sand-200 pb-3 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-burgundy-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>طريقة التسليم الرغوبة</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      formData.deliveryType === 'digital'
                        ? 'border-burgundy-800 bg-burgundy-50/50'
                        : 'border-sand-200 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="digital"
                      checked={formData.deliveryType === 'digital'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'digital' })}
                      className="mt-1 text-burgundy-800 focus:ring-burgundy-700"
                    />
                    <div>
                      <span className="font-bold text-sm text-stone-900 block">تسليم رقمي (PDF فوري)</span>
                      <span className="text-xs text-stone-500">تحميل مباشر وقراءة فورية على الموبايل.</span>
                    </div>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      formData.deliveryType === 'physical'
                        ? 'border-burgundy-800 bg-burgundy-50/50'
                        : 'border-sand-200 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      value="physical"
                      checked={formData.deliveryType === 'physical'}
                      onChange={() => setFormData({ ...formData, deliveryType: 'physical' })}
                      className="mt-1 text-burgundy-800 focus:ring-burgundy-700"
                    />
                    <div>
                      <span className="font-bold text-sm text-stone-900 block">نسخة مطبوعة (شحن)</span>
                      <span className="text-xs text-stone-500">تغليف مستتر ومحترم وتوصيل للعنوان.</span>
                    </div>
                  </label>
                </div>

                {formData.deliveryType === 'physical' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">المحافظة</label>
                      <input
                        type="text"
                        placeholder="مثال: القاهرة / الجيزة / الإسكندرية"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-sm px-4 py-2 border border-sand-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">العنوان التفصيلي</label>
                      <input
                        type="text"
                        placeholder="المنطقة، الشارع، رقم العمارة والشقة"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full text-sm px-4 py-2 border border-sand-300 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </Card>

              {/* Step 3: Payment Method Boundary */}
              <Card hoverEffect={false} className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-stone-900 border-b border-sand-200 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-burgundy-900 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <span>طريقة الدفع في مصر</span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    تشفير آمن 100%
                  </span>
                </h3>

                <div className="space-y-3">
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      formData.paymentMethod === 'card'
                        ? 'border-burgundy-800 bg-burgundy-50/50'
                        : 'border-sand-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      />
                      <span className="font-bold text-sm text-stone-900">كارت بنكي (ميزة / فيزا / ماستركارد)</span>
                    </div>
                    <CreditCard className="w-5 h-5 text-stone-500" />
                  </label>

                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      formData.paymentMethod === 'fawry'
                        ? 'border-burgundy-800 bg-burgundy-50/50'
                        : 'border-sand-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="fawry"
                        checked={formData.paymentMethod === 'fawry'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'fawry' })}
                      />
                      <span className="font-bold text-sm text-stone-900">فوري (Fawry Pay)</span>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      كود فوري
                    </span>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      formData.paymentMethod === 'wallet'
                        ? 'border-burgundy-800 bg-burgundy-50/50'
                        : 'border-sand-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={formData.paymentMethod === 'wallet'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'wallet' })}
                      />
                      <span className="font-bold text-sm text-stone-900">محافظ إلكترونية (فودافون كاش / اتصالات / أورانج)</span>
                    </div>
                    <PhoneCall className="w-5 h-5 text-stone-500" />
                  </label>
                </div>

                {/* Integration Boundary Explanation Note */}
                <div className="bg-sand-100/70 p-3.5 rounded-xl border border-sand-200 text-xs text-stone-600 leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">حدود التكامل (Integration Boundary):</span>
                    يتم ربط بوابة الدفع المصرية (Paymob / Fawry / Kashier) من خلال المتغيرات في ملف البيئة <code className="bg-white px-1 rounded font-mono">.env.local</code>.
                  </div>
                </div>
              </Card>

              <Button
                type="submit"
                variant="gold"
                size="xl"
                fullWidth
                disabled={isSubmitting}
                className="shadow-lg py-4 text-lg"
              >
                {isSubmitting ? (
                  <span>جاري معالجة الطلب...</span>
                ) : (
                  <span>تأكيد الطلب والدفع النهائي</span>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <Card hoverEffect={false} className="p-6 space-y-6 sticky top-24">
              <h3 className="font-bold text-xl text-stone-900 border-b border-sand-200 pb-3">
                ملخص العناصر للطلب
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-bold text-stone-900">{item.product.name}</span>
                      <span className="text-xs text-stone-500 block">العدد: {item.quantity}</span>
                    </div>
                    <Price price={(item.product.price ?? 0) * item.quantity} size="sm" />
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-sand-200 pt-4 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>المجموع:</span>
                  <Price price={subtotal} size="sm" />
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>الخصم:</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-black text-xl pt-2 border-t border-sand-100">
                  <span>الإجمالي:</span>
                  <Price price={finalTotal} size="lg" />
                </div>
              </div>

              {/* Waqf Impact Card */}
              <div className="bg-emerald-900 text-white p-4 rounded-2xl text-xs space-y-1">
                <p className="font-bold text-amber-200">أنت تصلح بيتك، وتبني بيت غيرك</p>
                <p className="text-emerald-200">
                  30% من أرباح هذا الطلب تدعم مشروع الوقف الخيري لتوفير مصدر رزق عائلة أخرى.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
