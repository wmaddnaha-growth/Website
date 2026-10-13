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
  PhoneCall,
  Clock,
  ArrowRight,
  BookOpen,
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

export const ShifratAlRegalLanding: React.FC = () => {
  const { addToCart } = useCart();
  const product = getProductBySlug('shifrat-al-regal');

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
    const newOrderId = 'ORD-REGAL-' + Math.floor(100000 + Math.random() * 900000);
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
      payload.append('product', 'كتاب شفرة الرجالة (310 ج.م)');
      payload.append('price', '310');

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
    `أريد كتاب شفرة الرجالة والهدايا. رقم الطلب: ${orderId} - الاسم: ${formData.name} - الهاتف: ${formData.phone}`
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
      <div className="bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 text-amber-200 text-center py-2.5 px-4 text-xs sm:text-sm font-bold shadow-xs">
        ✨ خصم خاص لفترة محدودة | كتاب شفرة الرجالة بـ 310 ج.م بدلاً من 500 ج.م + 4 كُتيبات هدايا مجانية!
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative py-10 sm:py-16 bg-gradient-to-b from-burgundy-50/70 via-white to-sand-50/40 border-b border-sand-200 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Cover Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  openLightbox([{ src: '/images/shifrat-al-regal/book-cover.jpg', alt: 'غلاف كتاب شفرة الرجالة' }])
                }
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-burgundy-700 to-brand-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/shifrat-al-regal/book-cover.jpg"
                  alt="غلاف كتاب شفرة الرجالة"
                  className="relative rounded-2xl shadow-2xl border-2 border-sand-200 max-w-[280px] sm:max-w-[340px] w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 bg-stone-900/80 text-amber-200 text-xs px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                  🔍 اضغطي للتكبير
                </span>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-burgundy-800 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                  خاص بالزوجات (For Her)
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                  🔥 الأكثر طلباً وتأثيراً
                </span>
                <span className="text-xs text-stone-500 font-medium">نسخة رقمية PDF فورية</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 leading-tight tracking-tight font-arabic">
                كتاب شفرة الرجالة
              </h1>

              <p className="text-lg sm:text-xl font-bold text-burgundy-800 leading-relaxed">
                الدليل الجريء لكل زوجة عاوزة تظبط جوزها، وتتعلم فنون وأسرار الديرتي توك، البلوجوب، و الهاندجوب اللي بيجننوا أي راجل و يخلوه يدمنك وميشوفش غيرك.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-sand-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-burgundy-900 font-bold text-sm sm:text-base">
                  <Lock className="w-5 h-5 text-burgundy-800" />
                  <span>للأزواج والزوجات فقط | محتوى جريء ومحترم 100%</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  كتالوج عملي وخطوات واضحة تمشي معكِ خطوة بخطوة لفك شفرة زوجك وفهم ما لا يستطيع التعبير عنه بالكلمات.
                </p>
              </div>

              {/* Price & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a href="#buy-section" className="flex-1">
                  <Button
                    variant="primary"
                    size="xl"
                    fullWidth
                    className="bg-burgundy-800 hover:bg-burgundy-900 text-white shadow-xl py-4 text-lg font-bold"
                  >
                    <span>احصلي على النسخة الآن (310 ج.م)</span>
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                </a>

                {product && (
                  <Button
                    onClick={() => addToCart(product)}
                    variant="gold"
                    size="xl"
                    className="shadow-md"
                  >
                    <span>أضفي للسلة</span>
                  </Button>
                )}
              </div>

              {/* Badges */}
              <div className="pt-4 border-t border-sand-200 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-stone-600">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>خصوصية وسرية تامة</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>تسليم فوراً PDF</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4 text-burgundy-700" />
                  <span>30% وقف خيري</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. WHY THIS BOOK SECTION */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-4 mb-10">
            <span className="bg-burgundy-50 text-burgundy-900 text-xs font-bold px-3 py-1 rounded-full border border-burgundy-200">
              ليه المحتوى ده مهم لبيتك؟
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 leading-tight font-arabic">
              علشان للأسف المصدر الوحيد للأسرار الجريئة اليومين دول هي "الأفلام الوحشة"...
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              معظم المعلومات المتاحة إما تنظير معقد أو محتوى غير لائق. عشان كده كتبنا هذا الدليل بأسلوب مصري راقٍ وعملي يربط بين الحب الحلال والمتعة والانسجام التام.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-burgundy-100 text-burgundy-900 font-bold flex items-center justify-center text-lg">
                01
              </div>
              <h3 className="font-bold text-stone-900 text-lg">فهم دماغ الراجل</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                الراجل مش بيعبر بالكلمات دايماً.. الدليل هيخليك تقري إشاراته ولغة جسمه واحتياجاته من غير تخمين.
              </p>
            </div>

            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-lg">
                02
              </div>
              <h3 className="font-bold text-stone-900 text-lg">كسر الخجل والخوف</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                خطوات متدرجة وسلسة تخليكِ تتعاملي بجرأة وذكاء وثقة كاملة في نفسك وبدون أي إحراج.
              </p>
            </div>

            <div className="bg-sand-50/60 p-6 rounded-2xl border border-sand-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-lg">
                03
              </div>
              <h3 className="font-bold text-stone-900 text-lg">تكتيكات الـ 14 يوماً</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                برنامج تطبيقي يومي بسيط وسريع النتائج يجدد الشغف ويخلي بيتك ملجأه الوحيد في العالم.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CHAPTERS INDEX BREAKDOWN */}
      <section className="py-14 bg-sand-50/80 border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-burgundy-900 text-amber-200 text-xs font-bold px-3 py-1 rounded-full">
              فهرس المحتويات
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">📖 خدي بصة من جوة... (فهرس الكتاب)</h2>
            <p className="text-xs sm:text-sm text-stone-600">8 فصول دسمة تغطي كل التفاصيل اللي محتاجاها:</p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: '1',
                title: 'فهم سيكولوجية الرجل وعقليته',
                sub: 'ليه الراجل بيحتاج العلاقة بشكل مختلف؟',
                desc: 'كيف يترجم الرجل مشاعره واحتياجاته، وقراءة لغة الجسم والتعبير الجسدي.',
              },
              {
                num: '2',
                title: 'فن الإثارة الذهنية والتسخين الحقيقي',
                sub: 'العلاقة تبدأ من الصباح وليس من غرفة النوم',
                desc: 'قاعدة التوقع (The Power of Anticipation)، اللمسات العابرة والرسائل النصية.',
              },
              {
                num: '3',
                title: 'مهارات التواصل والتقارب العملي',
                sub: 'كيف تعزفين على أوتار القرب؟',
                desc: 'فنون مساج الاسترخاء واللمس الحسي، لغة الهمس والتقدير.',
              },
              {
                num: '4',
                title: 'أوضاع الابتكار وكسر الروتين',
                sub: 'الراحة والعمق في التواصل الجسدي',
                desc: 'حلول مريحة للتجديد وتعديل الزوايا بدون مجهود شاق.',
              },
              {
                num: '5',
                title: 'فن الحضن والاحتواء النفسي',
                sub: 'إزاي تخليه يهرب من ضغوط العالم لحضنك',
                desc: 'أنواع الأحضان العميقة، بصمة الرائحة والأمان الروحي والبدني.',
              },
              {
                num: '6',
                title: 'كاريزما الثقة وبرستيج الملكة',
                sub: 'الثقة بالنفس وأثرها على جاذبية المرأة',
                desc: 'قانون "عينك هي مرايته"، التغلب على خجل المظهر وتحويل الثقة لجاذبية ساطعة.',
              },
              {
                num: '7',
                title: 'فن التواصل اللفظي والهمس الحميم (Dirty Talk)',
                sub: 'سيكولوجية الكلمات المحبة والجريئة بذكاء',
                desc: 'تدرج الكلام الحميم قبل وأثناء وبعد اللقاء بأسلوب راقٍ ودافئ.',
              },
              {
                num: '8',
                title: 'خطة الـ 14 يوماً التطبيقية',
                sub: 'جدول عملي متدرج للتطبيق اليومي',
                desc: 'تمارين يومية خفيفة تصنع فرقاً كبيراً في تفاصيل الحياة الزوجية.',
              },
            ].map((chap) => (
              <div
                key={chap.num}
                className="bg-white rounded-2xl p-5 border border-sand-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-burgundy-900 text-amber-200 font-black flex items-center justify-center text-sm flex-shrink-0">
                    {chap.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base sm:text-lg">{chap.title}</h3>
                    <p className="text-xs font-semibold text-burgundy-800">{chap.sub}</p>
                    <p className="text-xs text-stone-600 mt-1">{chap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. REAL SAMPLE PREVIEWS */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              عينة مجانية للقراءة
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">اقرئي عينة حقيقية من أول درسين 📜</h2>
            <p className="text-xs sm:text-sm text-stone-600">اضغطي على أي صورة لقراءتها بجودة عالية:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                src: '/images/shifrat-al-regal/1st lesson.png',
                title: 'أسلوب الطرح والمقدمة العملية',
                desc: 'عينة تشرح كيفية تبسيط المفاهيم النفسية بأسلوب راقٍ وعملي.',
              },
              {
                src: '/images/shifrat-al-regal/2nd lesson.png',
                title: 'الخطوات والتطبيقات المباشرة',
                desc: 'تطبيق مباشر يوضح طريقة الشرح خطوة بخطوة داخل الكتاب.',
              },
            ].map((sample, idx) => (
              <div
                key={idx}
                className="bg-sand-50/60 p-4 rounded-2xl border border-sand-200 space-y-3 text-center cursor-pointer group hover:border-burgundy-800 transition-all shadow-xs"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-regal/1st lesson.png', alt: 'عينة الدرس الأول' },
                      { src: '/images/shifrat-al-regal/2nd lesson.png', alt: 'عينة الدرس الثاني' },
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
            <span className="bg-burgundy-900 text-amber-200 text-xs font-bold px-3 py-1 rounded-full">
              تأكيدات الاستلام
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">ناس قبلك اشترت و ايه اللي بيستلموه بالظبط 📖</h2>
            <p className="text-xs sm:text-sm text-stone-600">صور حقيقية من المحادثات وتأكيدات التسليم على الواتساب:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/shifrat-al-regal/proofBook1.png', label: 'تأكيد الاستلام والوضوح' },
              { src: '/images/shifrat-al-regal/proofBook2.png', label: 'سهولة القراءة من الموبايل' },
              { src: '/images/shifrat-al-regal/proofBook3.png', label: 'سرعة الإرسال على الواتساب' },
              { src: '/images/shifrat-al-regal/proofBook4.png', label: 'استلام النسخة الإلكترونية' },
              { src: '/images/shifrat-al-regal/proofBook5.png', label: 'شكل الكتاب الحقيقي والتنسيق' },
              { src: '/images/shifrat-al-regal/proofBook6.png', label: 'سرعة الرد والتأكيد' },
            ].map((proof, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all text-center"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-regal/proofBook1.png', alt: 'إثبات 1' },
                      { src: '/images/shifrat-al-regal/proofBook2.png', alt: 'إثبات 2' },
                      { src: '/images/shifrat-al-regal/proofBook3.png', alt: 'إثبات 3' },
                      { src: '/images/shifrat-al-regal/proofBook4.png', alt: 'إثبات 4' },
                      { src: '/images/shifrat-al-regal/proofBook5.png', alt: 'إثبات 5' },
                      { src: '/images/shifrat-al-regal/proofBook6.png', alt: 'إثبات 6' },
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

      {/* 6. SECRETS INSIDE */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              محتويات الأسرار
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">🔥 إيه الأسرار اللي هتعرفيها جوة الكتاب؟</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'دماغ الراجل وتركيبته', desc: 'إزاي بيترجم الحب والاحتياج، وليه العلاقة عنده مصدر للتفريغ والراحة.' },
              { title: 'فن الـ Dirty Talk والهمس', desc: 'الكلمات والهمسات اللي تحرك مشاعره وتخليه ينسى الدنيا معكِ.' },
              { title: 'حركات "الأستاذة" المحترفة', desc: 'تكتيكات اللمس المساج والدلع الجريء بأسلوب محترم وراقي.' },
              { title: 'تجديد الأوضاع وكسر الروتين', desc: 'زوايا وأوضاع مريحة للزوجين تضمن التناغم دون تعب بدني.' },
              { title: 'خريطة مفاتيح جسمه', desc: 'المناطق الحساسة ومفاتيح الإثارة الذهنية والجسدية للرجل.' },
              { title: 'فنون التهيئة والدلع طول اليوم', desc: 'إزاي تبدئي العلاقة من الصبح بالرسائل واللمس العابر.' },
              { title: 'الثقة والدلع من غير خجل', desc: 'قوانين اكتساب الثقة الكاملة بجمالك وأنثوتك والتخلص من الخجل.' },
            ].map((secret, idx) => (
              <div key={idx} className="bg-sand-50/60 p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{secret.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{secret.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-14 bg-sand-50/80 border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-burgundy-50 text-burgundy-900 border border-burgundy-200 text-xs font-bold px-3 py-1 rounded-full">
              آراء وتجارب
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-arabic">تجارب وآراء الزوجات اللي جربوا 💕</h2>
            <p className="text-xs sm:text-sm text-stone-600">رسائل حقيقية من قارئات شاركنا نتائج التطبيق:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/shifrat-al-regal/testomonial1.png' },
              { src: '/images/shifrat-al-regal/testomonial2.png' },
              { src: '/images/shifrat-al-regal/testomonial3.png' },
              { src: '/images/shifrat-al-regal/testomonial4.png' },
              { src: '/images/shifrat-al-regal/testomonial5.png' },
              { src: '/images/shifrat-al-regal/testomonial6.png' },
            ].map((testi, idx) => (
              <div
                key={idx}
                className="bg-white p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-regal/testomonial1.png', alt: 'رأي 1' },
                      { src: '/images/shifrat-al-regal/testomonial2.png', alt: 'رأي 2' },
                      { src: '/images/shifrat-al-regal/testomonial3.png', alt: 'رأي 3' },
                      { src: '/images/shifrat-al-regal/testomonial4.png', alt: 'رأي 4' },
                      { src: '/images/shifrat-al-regal/testomonial5.png', alt: 'رأي 5' },
                      { src: '/images/shifrat-al-regal/testomonial6.png', alt: 'رأي 6' },
                    ],
                    idx
                  )
                }
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testi.src}
                    alt={`رأي قارئة ${idx + 1}`}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. PACKAGE & BONUSES */}
      <section className="py-14 bg-gradient-to-b from-burgundy-950 via-burgundy-900 to-burgundy-950 text-white">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <span className="bg-amber-400 text-stone-950 text-xs font-black px-4 py-1.5 rounded-full uppercase">
              العرض الكامل
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-200 font-arabic">
              🔥 إيه اللي هتاخديه بالظبط النهاردة؟
            </h2>
            <p className="text-xs sm:text-sm text-sand-200">
              عند الشراء اليوم ستحصلين على الكتاب الرئيسي بالإضافة إلى 4 كتيبات بونص مجانية:
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: '📖 كتاب شفرة الرجالة (النسخة الكاملة)',
                desc: 'الدليل الأساسي لفك شفرة الزوج، سيكولوجيته، ولغة جسده، وتطبيقات الـ 14 يوماً.',
                tag: 'الكتاب الرئيسي',
              },
              {
                title: '🎁 دليل هندسة اللذة',
                desc: 'أسرار "زوايا الحوض" لعلاقة مريحة وبدون ألم أو إرهاق بدني.',
                tag: 'بونص مجاني 1',
              },
              {
                title: '🎁 كتيب "وداعا لتمثيل الرعشة مرة اخرى"',
                desc: 'خريطة "النشوة المزدوجة" والوصول للانسجام الكامل مع الزوج.',
                tag: 'بونص مجاني 2',
              },
              {
                title: '🎁 بونص التحكم - كتالوج "الفرملة اللذيذة"',
                desc: 'تكتيكات مساعدة الزوج في التحكم وتأخير القذف والاستمتاع المتواصل.',
                tag: 'بونص مجاني 3',
              },
              {
                title: '🎁 خريطة أوضاع الابتكار',
                desc: 'دليل تصويري مريح للتجديد المبتكر وكسر الروتين دون مجهود شاق.',
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
                  <p className="text-xs text-sand-200 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-400 text-stone-950 rounded-2xl text-center space-y-2 font-bold shadow-lg">
            <h3 className="text-xl">الخلاصة: كل هذا بسعر 310 ج.م فقط اليوم!</h3>
            <p className="text-xs opacity-90">استلام فوري بصيغة PDF على موبايلك فور إتمام الطلب.</p>
          </div>
        </Container>
      </section>

      {/* 9. REPEAT CUSTOMERS */}
      <section className="py-14 bg-white border-b border-sand-200">
        <Container size="md">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-arabic">
              عميلات رجعوا يطلبوا كتبنا التانية كمان 🤝
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">ثقة ورضا قارئاتنا هو أكبر دليل على الجودة:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/shifrat-al-regal/loyal1.png' },
              { src: '/images/shifrat-al-regal/loyal2.png' },
              { src: '/images/shifrat-al-regal/loyal3.png' },
            ].map((loyal, idx) => (
              <div
                key={idx}
                className="bg-sand-50/60 p-2 rounded-2xl border border-sand-200 cursor-pointer group hover:shadow-md transition-all"
                onClick={() =>
                  openLightbox(
                    [
                      { src: '/images/shifrat-al-regal/loyal1.png', alt: 'عميلة 1' },
                      { src: '/images/shifrat-al-regal/loyal2.png', alt: 'عميلة 2' },
                      { src: '/images/shifrat-al-regal/loyal3.png', alt: 'عميلة 3' },
                    ],
                    idx
                  )
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loyal.src}
                  alt={`عميلة دافعة مكررة ${idx + 1}`}
                  className="w-full h-56 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. BUY / ORDER FORM SECTION */}
      <section className="py-16 bg-gradient-to-b from-sand-100/70 to-white border-t border-sand-200" id="buy-section">
        <Container size="md">
          <div className="text-center mb-10 space-y-2">
            <span className="bg-burgundy-900 text-amber-200 text-xs font-bold px-4 py-1.5 rounded-full">
              طلب مباشر وسريع
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
              ⚡ احصلي على نسختك الآن بسعر <span className="text-burgundy-800">310 ج.م</span> فقط
            </h2>
            <p className="text-stone-600 text-sm">أدخلي بياناتك لطلب الكتاب واستلامه فوراً عبر الواتساب</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-sand-200">
            <div className="p-6 sm:p-8">
              {isSuccess ? (
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-300">
                    🎉
                  </div>

                  <h2 className="text-2xl font-black text-stone-900 font-arabic">
                    شكراً لكِ! تم استلام طلبكِ بنجاح 💕
                  </h2>
                  <p className="text-sm text-stone-600 font-medium">
                    رقم طلبك: <span className="font-bold text-burgundy-800">{orderId}</span>
                  </p>

                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-4">
                    <span className="inline-block bg-emerald-200 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full">
                      ⚡ خيار الاستلام الفوري السريع
                    </span>

                    <p className="text-stone-800 text-sm font-bold leading-relaxed">
                      لو حابة تستلمي الكتب والحزمة <span className="text-emerald-700 font-black">فوراً دلوقتي</span>، اضغطي على زرار الواتساب وابعثي صورة التحويل (السكرين شوت) على رقم خدمة العملاء (<span className="font-mono dir-ltr font-bold text-emerald-900">01553089928</span>):
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] text-center"
                    >
                      💬 إرسال سكرين شوت التحويل عبر الواتساب (01553089928)
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
                      الاسم بالكامل <span className="text-burgundy-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخلي اسمك هنا"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-burgundy-800 text-sm text-right"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800 text-right">
                      رقم الموبايل (واتساب) <span className="text-burgundy-700">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-burgundy-800 text-sm dir-ltr text-right"
                    />
                  </div>

                  {/* Governorate */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-stone-800 text-right">المحافظة</label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:border-burgundy-800 text-sm text-right bg-white"
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
                    {/* رقم التحويل: فودافون كاش وإنستاباي */}
                    <div className="border-b border-sand-200 pb-3">
                      <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5 mb-1">
                        <span>💳 رقم التحويل (فودافون كاش & إنستاباي):</span>
                      </h4>
                      <p className="text-xs text-stone-700 leading-relaxed mb-2">
                        يرجى تحويل مبلغ <span className="font-bold text-burgundy-800">310 ج.م</span> إلى رقم المحفظة / إنستاباي التالي:
                      </p>
                      <div className="bg-white p-3 rounded-xl border-2 border-burgundy-700 text-center font-mono font-black text-xl text-burgundy-950 tracking-wider dir-ltr select-all shadow-xs">
                        01093637678
                      </div>
                      <span className="text-[11px] text-stone-500 block text-center mt-1">
                        (مخصص لاستقبال تحويلات فودافون كاش وإنستاباي فقط)
                      </span>
                    </div>

                    {/* رقم الواتساب لاستلام السكرينات */}
                    <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
                      <h5 className="font-bold text-emerald-950 text-xs flex items-center gap-1">
                        <span>📲 رقم الواتساب لإرسال إيصال التحويل (سكرين شوت):</span>
                      </h5>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        بعد إتمام التحويل، أرسلي سكرين شوت الإيصال على رقم الواتساب الرسمي لاستلام الكتاب فوراً:
                      </p>
                      <div className="bg-white p-2.5 rounded-lg border border-emerald-300 text-center font-mono font-bold text-base text-emerald-900 dir-ltr select-all">
                        01553089928
                      </div>
                      <p className="text-[11px] text-emerald-800 text-center font-medium">
                        (رقم خدمة العملاء والتواصل الرسمي لإرسال الكتب وتأكيد الحجز)
                      </p>
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/shifrat-al-regal/wallets.jpg"
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
                    className="bg-burgundy-800 hover:bg-burgundy-900 text-white font-black py-4 shadow-lg text-lg"
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
