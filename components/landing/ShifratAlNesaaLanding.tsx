'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ImageModal } from '@/components/ui/ImageModal';
import { useCart } from '@/context/CartContext';
import { getProductBySlug } from '@/lib/products';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Lock,
  MessageSquare,
  Gift,
  Star,
  Zap,
  Activity,
  Gauge,
  MapPin,
  Clock,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الأسكندرية',
  'الدقهلية',
  'الشرقية',
  'المنوفية',
  'القليوبية',
  'البحيرة',
  'الغربية',
  'بور سعيد',
  'دمياط',
  'الإسماعيلية',
  'السويس',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
];

export const ShifratAlNesaaLanding: React.FC = () => {
  const { addToCart } = useCart();
  const product = getProductBySlug('shifrat-al-nesaa');

  // Lightbox Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ src: string; alt?: string }[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: 'القاهرة',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const openLightbox = (images: { src: string; alt?: string }[], index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('الرجاء إدخال الاسم ورقم الموبايل');
      return;
    }

    setIsSubmitting(true);
    const newOrderId = 'ORD-NESAA-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);

    if (product) {
      addToCart(product);
    }

    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbx0jdlGbW-rRSTI9B2GTvDDiUgorHOMRS2V_0B2-vWfoZIY6kny4572GjZz5mjCY-Qi/exec';
      const payload = new FormData();
      payload.append('orderId', newOrderId);
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('governorate', formData.governorate);
      payload.append('product', 'كتاب شفرة الستات (295 ج.م)');
      payload.append('price', '295');

      await fetch(scriptUrl, {
        method: 'POST',
        body: payload,
        mode: 'no-cors',
      });
    } catch (err) {
      console.warn('Order sync warning:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const whatsappMessage = encodeURIComponent(
    `أريد كتاب شفرة الستات والهدايا. رقم الطلب: ${orderId} - الاسم: ${formData.name} - الهاتف: ${formData.phone}`
  );
  const whatsappUrl = `https://wa.me/201553089928?text=${whatsappMessage}`;

  return (
    <div className="bg-sand-50/60 text-stone-900 font-sans dir-rtl min-h-screen">
      {/* Lightbox Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={modalImages}
        currentIndex={modalIndex}
        onNavigate={(idx) => setModalIndex(idx)}
      />

      {/* TOP NOTIFICATION BANNER */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-amber-200 text-center py-2.5 px-4 text-xs sm:text-sm font-bold shadow-xs">
        🔥 عرض خاص للرجال | كتاب شفرة الستات بـ 295 ج.م بدلاً من 450 ج.م + 4 كُتيبات هدايا مجانية!
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative py-10 sm:py-16 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden border-b border-emerald-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Cover Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  openLightbox([{ src: '/images/shifrat-al-nesaa/book-cover.jpg', alt: 'غلاف كتاب شفرة الستات' }])
                }
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/shifrat-al-nesaa/book-cover.jpg"
                  alt="غلاف كتاب شفرة الستات"
                  className="relative rounded-2xl shadow-2xl border-2 border-emerald-400/40 max-w-[280px] sm:max-w-[340px] w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 bg-stone-900/80 text-amber-300 text-xs px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                  🔍 اضغط للتكبير
                </span>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                  خاص بالرجال (For Him)
                </span>
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                  👑 الكتالوج الشامل للزوج الذكي
                </span>
                <span className="text-xs text-emerald-200 font-medium">تسليم PDF فوراً</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-amber-200 leading-tight tracking-tight font-arabic">
                كتاب شفرة الستات
              </h1>

              <p className="text-lg sm:text-xl font-bold text-emerald-100 leading-relaxed">
                دليل الزوج الذكي لفهم بيولوجيا ونفسية المرأة، وإزالة فرامل التوتر، وبناء متعة واستقرار متبادل.
              </p>

              <div className="p-4 bg-emerald-900/80 rounded-2xl border border-emerald-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span>للرجال المتزوجين فقط | مانيوال تطبيقي هندسي 100%</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  يشرح الكتاب الدورة البيولوجية والهرمونية للمرأة بأسلوب هندسي وعملي (مفهوم الفرامل والمسرعات)، وكيف تزيل ضغوط اليوم وتصل لصيانة كاملة للأداء الذكري.
                </p>
              </div>

              {/* Price & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a href="#buy-section" className="flex-1">
                  <Button
                    variant="gold"
                    size="xl"
                    fullWidth
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xl py-4 text-lg font-black"
                  >
                    <span>احصل على نسختك الآن (295 ج.م)</span>
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                </a>

                {product && (
                  <Button
                    onClick={() => addToCart(product)}
                    variant="outline"
                    size="xl"
                    className="border-emerald-400 text-emerald-100 hover:bg-emerald-900"
                  >
                    <span>أضف للسلة</span>
                  </Button>
                )}
              </div>

              {/* Badges */}
              <div className="pt-4 border-t border-emerald-800 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-emerald-200">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>خصوصية وتكتم تام</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>وصول فوري PDF</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span>30% وقف خيري</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CORE CHAPTERS BREAKDOWN */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              فهرس مانيوال المايسترو
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">📖 خد بصة من جوة... (فهرس الكتالوج)</h2>
            <p className="text-xs sm:text-sm text-stone-600">أبواب علمية وعملية مقسمة بأسلوب هندسي دقيق:</p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: '0',
                title: 'الباب صفر: صلابة وتأخير وصيانة الماكينة الذكرية',
                sub: 'التحكم، الانتصاب الحديدي، وتطوير الأداء',
                desc: 'تمارين كيجل للرجال، التحكم في القذف بتكنيك 9-1 والـ Edging، التخلص من قلق الأداء وترميم الثقة.',
              },
              {
                num: '1',
                title: 'الباب الأول: شيل الفرامل',
                sub: 'شفرة الهرمونات وفرامل التوتر وفخ الزوجة المضمونة',
                desc: 'مواسم التشغيل الهرمونية (Sport Mode vs Safe Mode)، تفريغ التوتر ومساج الأكتاف والحوض.',
              },
              {
                num: '2',
                title: 'الباب الثاني: دوس بنزين',
                sub: 'الإثارة عن بُعد وبناء الترقب',
                desc: 'اكتشاف نقطة الكريبتونيت لزوجتك، بناء الترقب بالرسائل والنوتس، وتجنب الفريندزون الزوجي.',
              },
              {
                num: '3',
                title: 'الباب الثالث: التمهيد الجسدي',
                sub: 'خريطة مناطق الإثارة والتسخين في 7 خطوات',
                desc: 'التشريح الحسي لجسد المرأة، خطوات التسخين الـ 7 البطيئة (The Build Up)، وفن القبلة الملكية.',
              },
              {
                num: '4',
                title: 'الباب الرابع: الأساليب التكتيكية للتقارب',
                sub: 'الانسجام الحسي وحركة التزامن',
                desc: 'تكتيكات اللمس الموزع والنعومة المتدرجة، التحكم في الإيقاع والهدوء وتجنب ألغام العلاقة.',
              },
              {
                num: '5',
                title: 'الباب الخامس: أسرار التناغم وبلوغ القمة',
                sub: 'إدارة اللقاء من الداخل وتأجيل المتعة',
                desc: 'التزامن الحركي والنفسي، تأجيل المتعة (Edging) لطوفان نشوة متكامل، وحضن الـ 15 دقيقة.',
              },
              {
                num: '6',
                title: 'الباب السادس: التنوع وكسر الملل',
                sub: 'سيناريوهات تجديد الحياة الزوجية وألغام السرير 8',
                desc: 'الكلام الجريء الحميم، 3 سيناريوهات ليالي التغيير وتبادل الأدوار، وتجنب 8 ألغام تقتل الرغبة.',
              },
            ].map((chap) => (
              <div
                key={chap.num}
                className="bg-sand-50/60 rounded-2xl p-5 border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-300 font-black flex items-center justify-center text-sm flex-shrink-0">
                    {chap.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base sm:text-lg">{chap.title}</h3>
                    <p className="text-xs font-semibold text-emerald-700">{chap.sub}</p>
                    <p className="text-xs text-stone-600 mt-1">{chap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. PROBLEM & STORY SECTION */}
      <section className="py-14 bg-sand-50/80 border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-4 mb-10">
            <span className="bg-red-100 text-red-900 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
              المشكلة الحقيقية
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 leading-tight font-arabic">
              هل أوضة نومك قلبت لـ "روتين ممل" أو حمل تقيل عليك؟
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              معظم الرجال بيفكروا إن المشكلة فيهم أو محتاجين مقويات، لكن الكارثة الحقيقية في عدم فهم الفرق البيولوجي والنفسي بين الزوج والزوجة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-xs space-y-3">
              <h3 className="font-bold text-red-800 text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>قبل المانيوال (الوضع الحالي):</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>تفكير زايد وقلق أداء مستمر بيضعف الثقة والانسجام.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>الزوجة مضغوطة وقافلة وأنت مش عارف تفك فرامل التوتر عندها.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>العلاقة بقت روتين مكرر وسريع خالٍ من الشغف والحب.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs space-y-3">
              <h3 className="font-bold text-emerald-800 text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>بعد قراءة المانيوال والتطبيق:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>تحكم كامل وتأخير بثقة وثبات بدني ونفسي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>قدرة على إزالة فرامل التوتر وتحويل الرفض لشغف حقيقي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>بناء سكن دائم وتناغم يخلي بيتك أهدى وأسعد.</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. REAL SAMPLE PREVIEWS */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              عينة مجانية
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">اقرأ عينة حقيقية من أول دروس الكتالوج 📜</h2>
            <p className="text-xs sm:text-sm text-stone-600">اضغط على أي صورة لقراءتها بجودة عالية:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                src: '/images/shifrat-al-nesaa/1st lesson.png',
                title: 'أسلوب الشرح الهندسي',
                desc: 'طريقة تبسيط الدورة الهرمونية بأسلوب هندسي.',
              },
              {
                src: '/images/shifrat-al-nesaa/2nd lesson.png',
                title: 'خطوات التنفيذ وتكنيكات التحكم',
                desc: 'تطبيق عملي وتدريبات التحكم في الأداء.',
              },
              {
                src: '/images/shifrat-al-nesaa/3rd lesson.png',
                title: 'التطبيق التشريحي وتكنيكات المتعة',
                desc: 'خريطة مناطق الإثارة والتسخين.',
              },
            ].map((sample, idx) => (
              <div
                key={idx}
                className="bg-sand-50/60 p-4 rounded-2xl border border-sand-200 space-y-3 text-center cursor-pointer group hover:border-emerald-600 transition-all shadow-xs"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-nesaa/1st lesson.png', alt: 'عينة 1' },
                      { src: '/images/shifrat-al-nesaa/2nd lesson.png', alt: 'عينة 2' },
                      { src: '/images/shifrat-al-nesaa/3rd lesson.png', alt: 'عينة 3' },
                    ],
                    idx
                  )
                }
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-xs border border-sand-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sample.src}
                    alt={sample.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 bg-stone-900/80 text-amber-200 text-xs px-2.5 py-1 rounded-full backdrop-blur-md">
                    🔍 تكبير العينة
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-base">{sample.title}</h4>
                <p className="text-xs text-stone-600">{sample.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. DELIVERY PROOFS */}
      <section className="py-14 bg-sand-50/80 border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-emerald-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              تأكيدات التسليم
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">إثباتات تسليمات كتبنا السابقة 📖</h2>
            <p className="text-xs sm:text-sm text-stone-600">صور حقيقية لتأكيدات استلام المانيوال على الواتساب:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/shifrat-al-nesaa/proofBook1.png', label: 'تأكيد الاستلام والوضوح' },
              { src: '/images/shifrat-al-nesaa/proofBook2.png', label: 'سهولة القراءة من الموبايل' },
              { src: '/images/shifrat-al-nesaa/proofBook3.png', label: 'سرعة الإرسال على الواتساب' },
              { src: '/images/shifrat-al-nesaa/proofBook4.png', label: 'استلام النسخة الإلكترونية' },
              { src: '/images/shifrat-al-nesaa/proofBook5.png', label: 'شكل المانيوال والتنسيق' },
              { src: '/images/shifrat-al-nesaa/proofBook6.png', label: 'سرعة الرد والتأكيد' },
            ].map((proof, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all text-center"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-nesaa/proofBook1.png', alt: 'إثبات 1' },
                      { src: '/images/shifrat-al-nesaa/proofBook2.png', alt: 'إثبات 2' },
                      { src: '/images/shifrat-al-nesaa/proofBook3.png', alt: 'إثبات 3' },
                      { src: '/images/shifrat-al-nesaa/proofBook4.png', alt: 'إثبات 4' },
                      { src: '/images/shifrat-al-nesaa/proofBook5.png', alt: 'إثبات 5' },
                      { src: '/images/shifrat-al-nesaa/proofBook6.png', alt: 'إثبات 6' },
                    ],
                    idx
                  )
                }
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proof.src}
                    alt={proof.label}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-bold text-stone-800 mt-2">{proof.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. WHO IS IT FOR */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">هذا المانيوال صُمم خصيصاً لـ:</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 space-y-2 shadow-xs">
              <h3 className="font-bold text-stone-900 text-lg">1. الزوج المرفوض أو المضمون</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                اللي حاسس إن زوجته مبقتش تبادر أو بتهرب من العلاقة، وعايز يرجع الشغف والانجذاب التلقائي.
              </p>
            </div>

            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 space-y-2 shadow-xs">
              <h3 className="font-bold text-stone-900 text-lg">2. ضحية "التفكير الزايد"</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                اللي بيدخل العلاقة وهو قلقان من الأداء والتأخير، وعايز خطة علمية تخليه واثق في نفسه تماماً.
              </p>
            </div>

            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 space-y-2 shadow-xs">
              <h3 className="font-bold text-stone-900 text-lg">3. الراجل اللي عاوز يبسط مراته بجد</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                اللي بيحب مراته وعايز يوصلها لنشوة واستقرار حقيقي يخلق سكن هادئ ومستمر في البيت.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FREE BONUSES PACKAGE */}
      <section className="py-14 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase">
              حزمة الهدايا المجانية
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-200 font-arabic">
              🔥 حزمة الهدايا الخاصة للزوجة والزوج - مجاناً اليوم
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              احصل على 4 كتيبات بونص مجانية هامة عند شراء كتاب شفرة الستات اليوم:
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: '🎁 كتيب شفرة "المبادرة"',
                desc: 'إزاي تخليها هي اللي تبدأ العلاقة وتنط عليك وتطلب التقارب بمزاجها.',
                tag: 'بونص مجاني 1',
              },
              {
                title: '🎁 فك عُقدة اللسان',
                desc: 'إزاي تكسر كسوفها في السرير وتخليها تتكلم بالديرتي توك والألفاظ اللي بتحبها وتطلب اللي عايزاه.',
                tag: 'بونص مجاني 2',
              },
              {
                title: '🎁 تحويل الرفض لشغف',
                desc: 'إزاي تحول رفضها للجنس الفموي لشغف ليها.. وتخليها تبادر بيه بمزاجها من غير ما تطلب.',
                tag: 'بونص مجاني 3',
              },
              {
                title: '🎁 التخلص من إدمان الإباحية',
                desc: 'إزاي تتخلص من إدمان الإباحية وتأثيره على الانتصاب والإحساس والتركيز الذهني.',
                tag: 'بونص مجاني 4',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md mb-1 inline-block">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-xs text-emerald-100 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-400 text-slate-950 rounded-2xl text-center space-y-2 font-bold shadow-lg">
            <h3 className="text-xl">محتويات الحزمة بالكامل بـ 295 جنيه فقط اليوم!</h3>
            <p className="text-xs opacity-90">وصول فوري وتنزيل مباشر بصيغة PDF على جهازك.</p>
          </div>
        </Container>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="py-14 bg-sand-50/80 border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              آراء العملاء
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">آراء عملائنا عن كتبنا السابقة 👑</h2>
            <p className="text-xs sm:text-sm text-stone-600">رسائل وتقييمات أزواج قاموا بالتطبيق الفعلي:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/shifrat-al-nesaa/testomonial1.png' },
              { src: '/images/shifrat-al-nesaa/testomonial2.png' },
              { src: '/images/shifrat-al-nesaa/testomonial3.png' },
              { src: '/images/shifrat-al-nesaa/testomonial4.png' },
              { src: '/images/shifrat-al-nesaa/testomonial5.png' },
              { src: '/images/shifrat-al-nesaa/testomonial6.png' },
            ].map((testi, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-nesaa/testomonial1.png', alt: 'رأي 1' },
                      { src: '/images/shifrat-al-nesaa/testomonial2.png', alt: 'رأي 2' },
                      { src: '/images/shifrat-al-nesaa/testomonial3.png', alt: 'رأي 3' },
                      { src: '/images/shifrat-al-nesaa/testomonial4.png', alt: 'رأي 4' },
                      { src: '/images/shifrat-al-nesaa/testomonial5.png', alt: 'رأي 5' },
                      { src: '/images/shifrat-al-nesaa/testomonial6.png', alt: 'رأي 6' },
                    ],
                    idx
                  )
                }
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testi.src}
                    alt={`رأي قارئ ${idx + 1}`}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. DIAMOND GUARANTEE */}
      <section className="py-12 bg-amber-50/80 border-b border-amber-200">
        <Container size="md">
          <div className="bg-white p-8 rounded-3xl border-2 border-amber-300 shadow-sm text-center space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center text-2xl mx-auto font-black">
              🛡️
            </div>
            <h3 className="text-2xl font-black text-stone-900 font-arabic">ضمان الاسترداد الماسي (Risk-Free)</h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              إذا قمت بقراءة وتطبيق التكنيكات المذكورة في الكتاب ولم تجد أثراً ملموساً وتغيراً حقيقياً في الانسجام والراحة، تواصل معنا لاسترداد المبلغ فوراً بدون أي تعقيد.
            </p>
          </div>
        </Container>
      </section>

      {/* 10. BUY / ORDER FORM SECTION */}
      <section className="py-16 bg-gradient-to-b from-sand-100/70 to-white border-t border-sand-200" id="buy-section">
        <Container size="md">
          <div className="text-center mb-10 space-y-2">
            <span className="bg-emerald-900 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full">
              طلب مباشر وسريع
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
              ⚡ احصل على نسختك الآن بسعر <span className="text-emerald-800">295 ج.م</span> فقط
            </h2>
            <p className="text-stone-600 text-sm">أدخل بياناتك لطلب الكتاب واستلامه فوراً عبر الواتساب</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-sand-200">
            <div className="p-6 sm:p-8">
              {isSuccess ? (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-300">
                    🎉
                  </div>

                  <h2 className="text-2xl font-black text-stone-900 font-arabic">
                    شكرًا لك! تم استلام طلبك بنجاح 💕
                  </h2>
                  <p className="text-sm text-stone-600 font-medium">
                    رقم طلبك: <span className="font-bold text-emerald-800">{orderId}</span>
                  </p>

                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-4">
                    <span className="inline-block bg-emerald-200 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full">
                      ⚡ خيار الاستلام الفوري السريع
                    </span>

                    <p className="text-stone-800 text-sm font-bold leading-relaxed">
                      لو حابب تستلم المانيوال والكتب <span className="text-emerald-700 font-black">فوراً دلوقتي</span>، اضغط على زرار الواتساب وابعث صورة الإيصال هناك:
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] text-center"
                    >
                      💬 اضغط هنا للاستلام الفوري عبر الواتساب
                    </a>
                  </div>

                  <div className="pt-4 border-t border-stone-200 text-xs text-stone-500">
                    تمت إضافته أيضاً لسلة التسوق بالموقع للراحة وتعدد الخيارات.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800 text-right">
                      الاسم بالكامل <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك هنا"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-emerald-700 text-sm text-right"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800 text-right">
                      رقم الموبايل (واتساب) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-emerald-700 text-sm dir-ltr text-right"
                    />
                  </div>

                  {/* Governorate */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800 text-right">المحافظة</label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-emerald-700 text-sm text-right bg-white"
                    >
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Instructions Box */}
                  <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-right space-y-3">
                    <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                      <span>💳 طرق الدفع (فودافون كاش / إنستا باي):</span>
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      يرجى تحويل مبلغ <span className="font-bold text-emerald-800">295 ج.م</span> إلى الرقم التالي:
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-sand-300 text-center font-mono font-black text-lg text-emerald-900 tracking-wider dir-ltr select-all">
                      01553089928
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/shifrat-al-nesaa/wallets.jpg"
                      alt="فودافون كاش وإنستاباي"
                      className="w-full max-w-[200px] mx-auto rounded-lg shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    fullWidth
                    disabled={isSubmitting}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-black py-4 shadow-lg text-lg"
                  >
                    {isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد الطلب والحصول على الكتاب فوراً 🚀'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
