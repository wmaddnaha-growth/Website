'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { Accordion } from '@/components/ui/Accordion';
import { ImageModal } from '@/components/ui/ImageModal';
import { ProductMockup } from '@/components/products/ProductMockup';
import { useCart } from '@/context/CartContext';
import { analyticsEvents } from '@/lib/analytics';
import {
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Heart,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Clock,
  Award,
  Users,
  Star,
  FileText,
  Gift,
  Shield,
  Zap,
  Lock,
  MessageCircle,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();

  // Lightbox Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{ src: string; alt?: string }[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openLightbox = (images: { src: string; alt?: string }[], index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  useEffect(() => {
    if (product) {
      analyticsEvents.viewProduct({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 text-center space-y-4 dir-rtl">
        <h1 className="text-3xl font-bold text-stone-900">المنتج غير موجود</h1>
        <p className="text-stone-600">عذراً، لم نتمكن من العثور على الدليل المطلوب.</p>
        <Link href="/products">
          <Button variant="primary">عرض جميع المنتجات</Button>
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `أريد كتاب ${product.name} (بسعر ${product.price ?? ''} ج.م) والاستفادة من عرض الهدايا`
  );
  const whatsappUrl = `https://wa.me/201553089928?text=${whatsappMessage}`;

  return (
    <div className="py-10 space-y-16 dir-rtl">
      {/* Lightbox Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={modalImages}
        currentIndex={modalIndex}
        onNavigate={(idx) => setModalIndex(idx)}
      />

      {/* Breadcrumb Navigation */}
      <Container>
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/home" className="hover:text-stone-800 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-stone-800 transition-colors">
            المنتجات
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">{product.name}</span>
        </nav>
      </Container>

      {/* 1. HERO & PRODUCT IDENTITY */}
      <section className="bg-gradient-to-b from-brand-50/70 via-white to-sand-50/50 py-10 border-b border-sand-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mockup Column */}
            <div className="lg:col-span-5 flex justify-center">
              <ProductMockup
                title={product.name}
                subtitle={product.subtitle}
                audienceTag={product.audienceLabel}
                coverColor={product.coverColor}
                accentColor={product.accentColor}
                isBundle={product.isBundle}
                className="scale-105 sm:scale-115"
              />
            </div>

            {/* Right Copy & Purchase Box Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={product.isBundle ? 'gold' : 'burgundy'}>
                  {product.audienceLabel}
                </Badge>
                {product.badge && <Badge variant="emerald">{product.badge}</Badge>}
                <span className="text-xs text-stone-500 font-semibold bg-white px-2.5 py-1 rounded-md border border-sand-200">
                  {product.deliveryType === 'digital' ? 'تسليم PDF فوراً' : 'نسخة رقمية ومطبوعة'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight font-arabic">
                {product.name}
              </h1>

              <p className="text-stone-700 text-base sm:text-lg font-medium leading-relaxed">
                {product.subtitle}
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Pricing & Cart Action Box */}
              <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500 font-medium">سعر الاستثمار الزوجي:</span>
                  <Price price={product.price} compareAtPrice={product.compareAtPrice} size="xl" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => addToCart(product)}
                    variant={product.isBundle ? 'gold' : 'primary'}
                    size="xl"
                    fullWidth
                    className="shadow-md"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>أضف للسلة واحصل على النسخة فوراً</span>
                  </Button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>طلب سريع عبر الواتساب</span>
                  </a>
                </div>

                <div className="pt-3 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2 border-t border-sand-100">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>خصوصية وتكتم تام في التعامل</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>تحميل مباشر بصيغة PDF</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-burgundy-700" />
                    <span>30% وقف خيري مستدام</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. BONUS PACKAGES SECTION (IF AVAILABLE) */}
      {product.bonuses && product.bonuses.length > 0 && (
        <section className="py-10 bg-gradient-to-b from-sand-100/60 to-white border-b border-sand-200">
          <Container size="md">
            <div className="text-center space-y-3 mb-8">
              <Badge variant="gold">حزمة الهدايا المجانية المرفقة</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                🔥 ماذا ستستلم مجاناً مع هذا الدليل؟
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                كتيبات ملحقة مجانية لتعزيز الفائدة والتطبيق المباشر:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.bonuses.map((bonus, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-sand-300/80 shadow-xs flex items-start gap-3 space-y-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gift className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-burgundy-800 bg-burgundy-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      {bonus.tag}
                    </span>
                    <h3 className="font-bold text-stone-900 text-base">{bonus.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. SAMPLE LESSON IMAGES (IF AVAILABLE) */}
      {product.sampleImages && product.sampleImages.length > 0 && (
        <section className="py-12 bg-white border-b border-sand-200">
          <Container size="md">
            <div className="text-center space-y-3 mb-10">
              <Badge variant="burgundy">عينة مجانية للقراءة</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                اقرأ عينة حقيقية من دروس الكتالوج 📜
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                اضغط على أي صورة للتكبير والقراءة بجودة عالية:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {product.sampleImages.map((sample, idx) => (
                <div
                  key={idx}
                  className="bg-sand-50 p-4 rounded-2xl border border-sand-200 space-y-3 text-center cursor-pointer group hover:border-burgundy-700 transition-all shadow-xs"
                  onClick={() =>
                    openLightbox(
                      product.sampleImages!.map((s) => ({ src: s.src, alt: s.title })),
                      idx
                    )
                  }
                >
                  <div className="relative overflow-hidden rounded-xl bg-white border border-sand-200 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sample.src}
                      alt={sample.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-stone-900/80 text-amber-200 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                      🔍 تكبير العينة
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{sample.title}</h4>
                  <p className="text-xs text-stone-600">{sample.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. WHO IS IT FOR? */}
      <section className="py-8">
        <Container size="md">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">مين اللي محتاج الدليل ده؟</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.targetAudience === 'wives' && (
              <>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">لكل زوجة بتحب جوزها بس حاسة إن فيه مسافة ومش عارفة هو بيتضايق من إيه.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">لكل ست حاسة إن العلاقة بينكم بقت واجب مكرر وعايزة ترجع الشغف والود.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">للي عايزة تفهم طريقة تفكير الراجل ولغة جسده وتتعامل بثقة وبدون خجل.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-burgundy-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">للي بتدور على خطوات عملية وحلول حقيقية 1-2-3 تطبقها بنفسها فوراً.</p>
                </div>
              </>
            )}

            {product.targetAudience === 'husbands' && (
              <>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">لكل زوج عايز يفهم التغيرات النفسية والهرمونية لزوجته ومينكدهاش ع الفاضي.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">لكل راجل عايز يتعلم إزاي يفك فرامل التوتر عند زوجته قبل ما يدخل في أي تقارب.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">للي عايز يظبط أداءه الذكري ويتعلم تمارين وتكنيكات التحكم والتأخير بثقة.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">للي بيحب مراته وعايز يوصلها لنشوة واستقرار حقيقي يخلق سكن دائم في البيت.</p>
                </div>
              </>
            )}

            {product.targetAudience === 'couples' && (
              <>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">لأي زوجين قررا يبدأوا صفحة جديدة قائمة على الفهم الواعي المتبادل.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-brand-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-800">للأزواج الذين يفضلون التوفير واقتناء الكتالوج الكامل للشريكين معاً.</p>
                </div>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* 5. TRANSFORMATION (BEFORE vs AFTER) */}
      <section className="py-12 bg-sand-50/80 border-y border-sand-200">
        <Container size="md">
          <div className="text-center mb-10">
            <Badge variant="gold">التحول المستهدف</Badge>
            <h2 className="text-3xl font-extrabold text-stone-900 mt-2">
              فرق الإدراك بين قبل وبعد قراءة هذا الدليل
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Card */}
            <div className="bg-white p-6 rounded-3xl border border-red-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-red-700 font-bold text-lg border-b border-red-100 pb-3">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                <span>قبل القراءة (الوضع الحالي)</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>"أنا بحب شريكي بس مش فاهم هو بيتفكر إزاي."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>"علاقتنا بقت روتين وكل واحد بيخمن التاني زعلان من إيه."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>"إحنا عايشين مع بعض في نفس البيت بس مش قريبين من بعض."</span>
                </li>
              </ul>
            </div>

            {/* After Card */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-300 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg border-b border-emerald-100 pb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>بعد القراءة والتطبيق</span>
              </div>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>"فهمت شريكي وعرفت أتعامل مع الاختلافات بيننا بذكاء."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>"بقى عندي خطوات عملية وتكتيكات واضحة بنطبقها في حياتنا."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>"بقينا أقرب وبدأنا نصلح أساس بيتنا لتكون العائلة أهدى وأسعد."</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. DELIVERY PROOF SCREENSHOTS (IF AVAILABLE) */}
      {product.proofImages && product.proofImages.length > 0 && (
        <section className="py-12 bg-white border-b border-sand-200">
          <Container size="md">
            <div className="text-center space-y-3 mb-10">
              <Badge variant="burgundy">تأكيدات التسليم</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                إثباتات تسليمات الكتب على الواتساب 📖
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                صور حقيقية لتأكيد وصول المانيوال وقراءته من الموبايل:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {product.proofImages.map((proof, idx) => (
                <div
                  key={idx}
                  className="bg-sand-50 p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all text-center"
                  onClick={() =>
                    openLightbox(
                      product.proofImages!.map((p) => ({ src: p.src, alt: p.label })),
                      idx
                    )
                  }
                >
                  <div className="relative overflow-hidden rounded-xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proof.src}
                      alt={proof.label}
                      className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-xs font-bold text-stone-800 mt-2">{proof.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 7. CHAPTERS BREAKDOWN */}
      {product.chapters && product.chapters.length > 0 && (
        <section className="py-12">
          <Container size="md">
            <div className="text-center mb-10 space-y-2">
              <Badge variant="burgundy">فصول ومحتويات الدليل</Badge>
              <h2 className="text-3xl font-extrabold text-stone-900">جوا الكتاب هتلاقي إيه؟</h2>
              <p className="text-stone-600 text-sm">استعراض لأهم الفصول والمحاور المدونة بالداخل:</p>
            </div>

            <div className="space-y-6">
              {product.chapters.map((chap) => (
                <div
                  key={chap.number}
                  className="bg-white rounded-2xl p-6 border border-sand-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-sand-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-burgundy-900 text-amber-200 font-bold flex items-center justify-center text-sm">
                        {chap.number}
                      </span>
                      <h3 className="font-bold text-stone-900 text-lg sm:text-xl">{chap.title}</h3>
                    </div>
                    {chap.subtitle && (
                      <span className="text-xs text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md hidden sm:inline-block">
                        {chap.subtitle}
                      </span>
                    )}
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed">{chap.description}</p>

                  {chap.lessons && chap.lessons.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-stone-800 mb-2">أبرز المحاور والدروس التطبيقية:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                        {chap.lessons.map((les, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                            <span>{les}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 8. CUSTOMER TESTIMONIALS SCREENSHOTS (IF AVAILABLE) */}
      {product.testimonialImages && product.testimonialImages.length > 0 && (
        <section className="py-12 bg-sand-50/70 border-y border-sand-200">
          <Container size="md">
            <div className="text-center space-y-3 mb-10">
              <Badge variant="gold">تجارب وآراء القراء</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                ماذا قال القراء عن هذا المانيوال؟ 💕
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                رسائل حقيقية وتجارب تطبيق فعلي من الأزواج والزوجات:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {product.testimonialImages.map((testi, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded-2xl border border-sand-200 shadow-xs cursor-pointer group hover:shadow-md transition-all"
                  onClick={() =>
                    openLightbox(
                      product.testimonialImages!.map((t, i) => ({
                        src: t.src,
                        alt: `رأي قارئ ${i + 1}`,
                      })),
                      idx
                    )
                  }
                >
                  <div className="relative overflow-hidden rounded-xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testi.src}
                      alt={`رأي ${idx + 1}`}
                      className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 9. DIAMOND GUARANTEE BOX */}
      <section className="py-8">
        <Container size="md">
          <div className="bg-white p-8 rounded-3xl border-2 border-brand-300 shadow-sm text-center space-y-3 max-w-xl mx-auto">
            <div className="w-12 h-12 bg-brand-100 text-brand-900 rounded-full flex items-center justify-center text-xl mx-auto font-bold">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-stone-900">ضمان الاسترداد الماسي (Risk-Free)</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              إذا قمت بقراءة وتطبيق التكنيكات المذكورة في الكتاب ولم تجد أثراً ملموساً وتغيراً حقيقياً في الانسجام والراحة، تواصل معنا لاسترداد المبلغ فوراً بدون أي تعقيد.
            </p>
          </div>
        </Container>
      </section>

      {/* 10. PRODUCT FAQ */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-8">
          <Container size="md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900">أسئلة شائعة حول هذا الدليل</h2>
            </div>
            <Accordion
              items={product.faq.map((f, i) => ({
                id: `pfaq-${i}`,
                question: f.question,
                answer: f.answer,
              }))}
            />
          </Container>
        </section>
      )}

      {/* 11. IMPACT MESSAGE */}
      <section className="py-10 bg-emerald-950 text-white rounded-3xl mx-4 sm:mx-8">
        <Container size="md">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-200">
              أنت تصلح بيتك، وتبني بيت غيرك.
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed max-w-lg mx-auto">
              30% من أرباح شراء هذا المنتج تذهب مباشرة لدعم وقف خيري مستدام يوفر فرصة عمل ورزق كريم لعائلة أخرى.
            </p>
          </div>
        </Container>
      </section>

      {/* 12. FINAL PRODUCT CTA */}
      <section className="py-12 text-center space-y-6">
        <Container size="sm">
          <h2 className="text-3xl font-black text-stone-900">جاهز تبدأ رحلة التغيير الحقيقية؟</h2>
          <p className="text-stone-600 text-sm">احصل على النسخة الإلكترونية الآن واستمتع بقراءة عملية فورية.</p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => addToCart(product)}
              variant={product.isBundle ? 'gold' : 'primary'}
              size="xl"
              className="shadow-lg min-w-[260px]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>أضف للسلة - {product.name}</span>
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-md transition-colors min-w-[260px]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>طلب مباشر عبر الواتساب</span>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
