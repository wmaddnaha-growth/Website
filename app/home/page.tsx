'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Price } from '@/components/ui/Price';
import { Accordion } from '@/components/ui/Accordion';
import { ProductMockup } from '@/components/products/ProductMockup';
import { ProductSelectorQuiz } from '@/components/products/ProductSelectorQuiz';
import { getProductBySlug, getBundleProduct } from '@/lib/products';
import { globalFAQ } from '@/data/faq';
import { useCart } from '@/context/CartContext';
import { analyticsEvents } from '@/lib/analytics';
import {
  Sparkles,
  ArrowLeft,
  Heart,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Users,
  Shield,
  Coins,
  Compass,
  Zap,
  Star,
  Check,
  Building,
} from 'lucide-react';

export default function HomePage() {
  const { addToCart } = useCart();

  const wivesProduct = getProductBySlug('shifrat-al-regal');
  const husbandsProduct = getProductBySlug('shifrat-al-nesaa');
  const bundleProduct = getBundleProduct();

  const handlePrimaryCTA = (location: string) => {
    analyticsEvents.clickCTA('ابدأ رحلة التغيير', location);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* SECTION 02 — HERO */}
      <section className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-brand-50 via-white to-sand-50 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-burgundy-900/10 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-right space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-900 border border-brand-300 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>مبادرة التغيير الزوجي وبناء الأثر</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-burgundy-950 tracking-tight leading-[1.2] font-arabic">
                البيت السوي… <br className="hidden sm:inline" />
                بيبدأ من <span className="text-burgundy-800 underline decoration-brand-400 decoration-wavy decoration-2">أساس سوي.</span>
              </h1>

              <p className="text-stone-700 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
                قبل ما نبني أولادنا، لازم نفهم بعض. و«و مددناها» بتساعدك تفهم شريك حياتك، تصلّح علاقتك، وتبني بيت أهدى وأسعد.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/products" onClick={() => handlePrimaryCTA('Hero_Primary')}>
                  <Button variant="gold" size="xl" fullWidth className="shadow-lg">
                    <span>ابدأ رحلة التغيير</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>

                <Link href="#products-section">
                  <Button variant="outline" size="xl" fullWidth>
                    <span>اكتشف الشفرات</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-sand-200 grid grid-cols-3 gap-4 text-xs font-semibold text-stone-600 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>خصوصية وتكتم تام</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 text-burgundy-700" />
                  <span>30% وقف خيري</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-700" />
                  <span>خطوات تطبيقية عمليّة</span>
                </div>
              </div>
            </div>

            {/* Right Product Mockup Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <ProductMockup
                title="باكدج البيت السوي"
                subtitle="شفرة الرجالة + شفرة النساء"
                isBundle={true}
                className="scale-105 sm:scale-110"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 03 — SOCIAL PROOF & TRUST INDICATORS */}
      <section className="py-8 bg-white border-y border-sand-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-extrabold text-brand-700 uppercase tracking-widest">
              الفرق الحقيقي في منهجنا
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              مصمم عشان يتحول من قراءة… لتطبيق في نفس اليوم.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-right">
              <Card hoverEffect={false} className="p-5 bg-sand-50/60 border-sand-200">
                <div className="w-10 h-10 rounded-xl bg-burgundy-100 text-burgundy-900 flex items-center justify-center font-bold mb-3">
                  01
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-base">منهجية مصرية وعربية</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  كلام صريح ومحترم بلهجتنا اليومية بدون ترجمة آليّة أو تنظير غربي غريب.
                </p>
              </Card>

              <Card hoverEffect={false} className="p-5 bg-sand-50/60 border-sand-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-3">
                  02
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-base">حلول مبنية على PDF الأصلي</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  تحديد دقيق لمسببات التوتر والفرامل، مع طرق عمليّة لإعادة الهدوء والشغف.
                </p>
              </Card>

              <Card hoverEffect={false} className="p-5 bg-sand-50/60 border-sand-200">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-900 flex items-center justify-center font-bold mb-3">
                  03
                </div>
                <h4 className="font-bold text-stone-900 mb-1 text-base">استثمار ممتد الأثر</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  30% من أرباح طلبك مخصصة لوقف خيري يفتح أبواب رزق لعائلات أخرى.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 04 — PROBLEM / RELATABILITY */}
      <section className="py-12 bg-sand-50">
        <Container size="md">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              يمكن المشكلة مش إنكم بطلتوا تحبوا بعض… <br />
              <span className="text-burgundy-800">يمكن إنكم بطلتوا تفهموا بعض.</span>
            </h2>
            <p className="text-stone-600 text-base max-w-xl mx-auto">
              مع دوامة الحياة اليومية ومسئوليات الأطفال والعمل، تبدأ التراكمات الصغيرة تكبّر المسافة بين الزوجين:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'بتحبه… بس مش فاهمة طريقة تفكيره أو احتياجه للراحة.',
              'بتحبها… بس مش عارف هي محتاجة إيه وبتتضايق من إيه.',
              'العلاقة بينكم بقت روتين مكرر وواجب يومي عابر.',
              'الكلام الحقيقي بينكم قل وبقى الموضـوع مجرد مسئوليات.',
              'كل واحد بقـى بيخمن التاني عايز إيه وبيزعل لما التخمين يخيب.',
              'فيه حاجات كتير نفسكم تتكلموا فيها ومش عارفين تبدأوا منين.',
            ].map((text, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-sand-200 flex items-start gap-3 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-burgundy-100 text-burgundy-800 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  !
                </div>
                <p className="text-stone-800 text-sm font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 05 — SOLUTION & PRODUCTS */}
      <section id="products-section" className="py-12">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="gold">الحل العلمي والعملي</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
              عشان كده عملنا "الشفرات".
            </h2>
            <p className="text-stone-600 text-base leading-relaxed">
              كل واحد فينا عنده طبيعة واحتياجات وطريقة مختلفة في التفكير والتعبير. والمشكلة إن محدش علّمنا نفهم الشخص اللي اخترنا نكمل معاه حياتنا.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {wivesProduct && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-burgundy-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="burgundy">دليل الزوجة (For Her)</Badge>
                    <span className="text-xs text-stone-500 font-medium">كتاب إلكتروني (PDF)</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{wivesProduct.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {wivesProduct.shortDescription}
                  </p>
                  <div className="flex justify-center mb-6">
                    <ProductMockup
                      title={wivesProduct.name}
                      subtitle={wivesProduct.subtitle}
                      coverColor={wivesProduct.coverColor}
                      audienceTag="For Her"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                  <Price price={wivesProduct.price} size="md" />
                  <div className="flex items-center gap-2">
                    <Button onClick={() => addToCart(wivesProduct)} variant="burgundy" size="md">
                      أضف للسلة
                    </Button>
                    <Link href={`/products/${wivesProduct.slug}`}>
                      <Button variant="outline" size="md">
                        التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {husbandsProduct && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="emerald">دليل الزوج (For Him)</Badge>
                    <span className="text-xs text-stone-500 font-medium">كتاب إلكتروني (PDF)</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{husbandsProduct.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {husbandsProduct.shortDescription}
                  </p>
                  <div className="flex justify-center mb-6">
                    <ProductMockup
                      title={husbandsProduct.name}
                      subtitle={husbandsProduct.subtitle}
                      coverColor={husbandsProduct.coverColor}
                      audienceTag="For Him"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                  <Price price={husbandsProduct.price} size="md" />
                  <div className="flex items-center gap-2">
                    <Button onClick={() => addToCart(husbandsProduct)} variant="emerald" size="md">
                      أضف للسلة
                    </Button>
                    <Link href={`/products/${husbandsProduct.slug}`}>
                      <Button variant="outline" size="md">
                        التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* SECTION 06 — PRODUCT BENEFITS */}
      <section className="py-12 bg-white border-y border-sand-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
              مش هتشتري كتاب… <span className="text-burgundy-800">هتشتري فهم.</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              هذه ليست معلومات مكررة من النت، بل هو منهج مستخلص لإحداث تغيير ملموس في حياتك:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'تفهم شريكك بحق', desc: 'استيعاب الدوافع البيولوجية والنفسية وراء كل تظاهر أو نكد أو انسحاب.' },
              { num: '02', title: 'تعرف احتياجاته الدفينة', desc: 'كشف الاحتياجات النفسية والبدنية التي قد يتردد الشريك في طلبها مباشرة.' },
              { num: '03', title: 'تتعامل مع الاختلاف بدل ما تخمن', desc: 'إلغاء التخمينات الخاطئة واحلال لغة الحوار والتقدير المتبادل محلها.' },
              { num: '04', title: 'تلاقي خطوات عملية 1-2-3', desc: 'تمارين وتكتيكات يومية خفيفة للتطبيق المباشر بأسلوب بسيط ورائع.' },
              { num: '05', title: 'تكسر الروتين وجفاف العلاقة', desc: 'استعادة الشغف والحرارة والضحك بينكما كأنكما في أيام الزواج الأولى.' },
              { num: '06', title: 'تبدأ تصلح أساس بيتك', desc: 'توفير البيئة السوية الهادئة التي ينشأ فيها أبناؤك بسلام وأمان عاطفي.' },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 bg-sand-50/50">
                <span className="text-brand-600 font-mono font-bold text-lg block mb-2">{benefit.num}</span>
                <h3 className="font-bold text-stone-900 text-lg mb-2">{benefit.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 07 — HOW IT WORKS */}
      <section className="py-12">
        <Container size="md">
          <div className="text-center mb-12">
            <Badge variant="burgundy">منهجية التغيير</Badge>
            <h2 className="text-3xl font-extrabold text-stone-900 mt-2">كيف تعمل "الشفرات"؟</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', title: 'افهم', desc: 'اقرأ الكتالوج لتستوعب شفرة شريكك ودوافعه.' },
              { step: '2', title: 'جرّب', desc: 'طبق لمسة أو تكتيكاً واحداً بسيطاً في اليوم.' },
              { step: '3', title: 'طبّق', desc: 'لاحظ استجابة شريكك وقم بتعديل الأسلوب.' },
              { step: '4', title: 'قرّب المسافة', desc: 'استمتع بالسكن والهدوء والانسجام في بيتك.' },
            ].map((st, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs relative">
                <div className="w-10 h-10 mx-auto rounded-full bg-burgundy-800 text-white font-bold flex items-center justify-center mb-3">
                  {st.step}
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-1">{st.title}</h3>
                <p className="text-xs text-stone-600">{st.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 08 — WHAT IS INSIDE PREVIEW */}
      <section className="py-12 bg-burgundy-950 text-sand-100">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-widest block mb-2">
              جوا الشفرة هتلاقي…
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-100">محتوى راقٍ، عملي ومصمم بعناية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-burgundy-900/60 p-6 rounded-2xl border border-burgundy-800 space-y-3">
              <h4 className="font-bold text-lg text-amber-200">فهم طبيعة الطرف الآخر</h4>
              <p className="text-xs text-sand-300 leading-relaxed">
                شرح مبسط للسيكولوجيا والبيولوجيا وتفكيك سوء الفهم المتكرر في المواقف اليومية.
              </p>
            </div>

            <div className="bg-burgundy-900/60 p-6 rounded-2xl border border-burgundy-800 space-y-3">
              <h4 className="font-bold text-lg text-amber-200">قراءة الإشارات والتواصل الصامت</h4>
              <p className="text-xs text-sand-300 leading-relaxed">
                كيف تفهم نظرة العين، لغة الجسد، وإشارات الفرامل والقبول بدون الحاجة للحديث المعقد.
              </p>
            </div>

            <div className="bg-burgundy-900/60 p-6 rounded-2xl border border-burgundy-800 space-y-3">
              <h4 className="font-bold text-lg text-amber-200">التطبيق والتجديد المستمر</h4>
              <p className="text-xs text-sand-300 leading-relaxed">
                خطوات 1-2-3 ومساج الاسترخاء وسيناريوهات الليالي المتجددة لكسر الروتين نهائياً.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 09 & 10 — BRAND STORY & THE JOURNEY */}
      <section className="py-16 bg-white border-y border-sand-200">
        <Container size="md">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <Badge variant="gold">قصتنا وفلسفتنا</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
              إحنا مش بنبيع كتب.. إحنا بنحاول نبني بيوت أسوى.
            </h2>
            <p className="text-stone-700 text-base leading-relaxed">
              البداية كانت فكرة وقف خيري وإيجاد مصدر رزق مستدام لعائلة محتاجة. وفكرنا في البداية بإنشاء كتاب للأطفال، ولكن سرعان ما أدركنا الحقيقة التالية:
            </p>

            <blockquote className="p-6 bg-brand-50 rounded-2xl border-r-4 border-brand-500 my-6 text-stone-900 font-bold text-lg leading-relaxed">
              "مستحيل نربي طفل سوي في بيت الزوجين فيه مش مبسوطين."
            </blockquote>

            <p className="text-stone-600 text-sm leading-relaxed">
              عشان كده كانت البداية من الزوجين والأساس. لما نصلح أساس البيت، ينعكس الهدوء والانسجام على تربية الأبناء، وينشأ مجتمع صحي وقوي.
            </p>
          </div>

          {/* The Journey Visual */}
          <div className="bg-sand-50 p-8 rounded-3xl border border-sand-200 text-center space-y-6">
            <h3 className="text-2xl font-bold text-stone-900">رحلة التغيير أكبر من كتاب</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-bold text-stone-800">
              <span className="bg-white px-4 py-2 rounded-xl border border-sand-300 shadow-2xs">فهم</span>
              <span className="text-brand-600">←</span>
              <span className="bg-white px-4 py-2 rounded-xl border border-sand-300 shadow-2xs">إصلاح</span>
              <span className="text-brand-600">←</span>
              <span className="bg-white px-4 py-2 rounded-xl border border-sand-300 shadow-2xs">استقرار</span>
              <span className="text-brand-600">←</span>
              <span className="bg-white px-4 py-2 rounded-xl border border-sand-300 shadow-2xs">بناء</span>
              <span className="text-brand-600">←</span>
              <span className="bg-white px-4 py-2 rounded-xl border border-sand-300 shadow-2xs">تربية</span>
              <span className="text-brand-600">←</span>
              <span className="bg-brand-500 text-white px-4 py-2 rounded-xl shadow-xs">أثر مستمر</span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 11 — SOCIAL IMPACT MODEL */}
      <section className="py-16 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold">
              <Heart className="w-4 h-4 text-emerald-400" />
              <span>نموذج الأثر المجتمعي (30% وقف)</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-arabic">
              أنت تصلح بيتك… وتبني بيت غيرك.
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg font-light leading-relaxed">
              تخصص المبادرة 30% من أرباح كل طلب لصالح محفظة وقف خيري يهدف لتمويل مشاريع صغيرة وتوفير أدوات إنتاج لعائلة محتاجة لضمان مصدر عيش كريم ومستدام.
            </p>

            {/* Impact Flow Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-6 text-center">
              <div className="bg-emerald-900/50 p-4 rounded-xl border border-emerald-800">
                <span className="text-xs text-emerald-300 font-bold block mb-1">01</span>
                <span className="text-sm font-semibold">شراءك للمنتج</span>
              </div>
              <div className="bg-emerald-900/50 p-4 rounded-xl border border-emerald-800">
                <span className="text-xs text-emerald-300 font-bold block mb-1">02</span>
                <span className="text-sm font-semibold">تطوير بيتك</span>
              </div>
              <div className="bg-emerald-800 p-4 rounded-xl border border-emerald-700 shadow-md">
                <span className="text-xs text-amber-300 font-bold block mb-1">03</span>
                <span className="text-sm font-bold text-amber-200">30% للوقف</span>
              </div>
              <div className="bg-emerald-900/50 p-4 rounded-xl border border-emerald-800">
                <span className="text-xs text-emerald-300 font-bold block mb-1">04</span>
                <span className="text-sm font-semibold">مشروع مستدام</span>
              </div>
              <div className="bg-emerald-900/50 p-4 rounded-xl border border-emerald-800">
                <span className="text-xs text-emerald-300 font-bold block mb-1">05</span>
                <span className="text-sm font-semibold">أثر مستمر</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/impact">
                <Button variant="outline" size="md" className="border-emerald-400 text-emerald-100 hover:bg-emerald-900">
                  اقرأ المزيد عن نموذج الأثر والوقف
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 12 — BUNDLE OFFER SECTION */}
      {bundleProduct && (
        <section className="py-12 bg-sand-100/60">
          <Container size="md">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-brand-400 shadow-premium text-right relative overflow-hidden">
              <div className="absolute top-0 left-0 bg-brand-500 text-burgundy-950 text-xs font-black px-6 py-2 rounded-br-2xl">
                العرض الأكثر طلباً وتوفيراً
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <Badge variant="gold">باكدج البيت السوي المتكامل</Badge>
                  <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
                    البداية الحقيقية لما الاتنين يفهموا بعض.
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    احصل على دليل الزوج ودليل الزوجة معاً في باكدج واحد متكامل يغطي كافة جوانب العلاقة ويضمن أعلى نسبة أثر وتوفير.
                  </p>

                  <ul className="space-y-2 text-sm text-stone-800 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>كتاب "شفرة الرجالة" (دليل الزوجة) كامل</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>كتاب "شفرة النساء" (دليل الزوج) كامل</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>خطة الـ 14 يوماً التطبيقية المتبادلة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>مساهمة 30% من طلبك في الوقف الخيري</span>
                    </li>
                  </ul>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <Price price={bundleProduct.price} compareAtPrice={bundleProduct.compareAtPrice} size="xl" />

                    <Button
                      onClick={() => addToCart(bundleProduct)}
                      variant="gold"
                      size="xl"
                      className="w-full sm:w-auto shadow-lg"
                    >
                      <span>ابدأوا الرحلة سوا</span>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <ProductMockup
                    title="باكدج البيت"
                    subtitle="شفرة الرجالة + شفرة النساء"
                    isBundle={true}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 13 & 14 — WHO IS IT FOR & SELECTOR QUIZ */}
      <section className="py-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-stone-900 mb-3">الشفرة دي معمولة لمين؟</h2>
            <p className="text-stone-600 text-sm">لكل من يبحث عن استقرار ودُفء حقيقي في بيته:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              'للمتزوجين الجدد الراغبين في بناء أساس صحي من البداية.',
              'للمتزوجين اللي حاسين إن العلاقة بقت روتين ومملة.',
              'للي بيحب شريكه جداً بس مش فاهم طريقته ولا احتياجه.',
              'للي عايز يطور من نفسه ويحسن من جودة التواصل الفعلي.',
              'للي عايز يتعلم منهج عملي محترم بدل التخمين والتجارب الخاطئة.',
              'لأي زوجين يرغبان في ترك أثر طيب ومبارك في بيتهما ومجتمعهما.',
            ].map((claim, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-sand-200 flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-stone-800 text-sm font-semibold">{claim}</span>
              </div>
            ))}
          </div>

          {/* Interactive Role Selector Quiz */}
          <ProductSelectorQuiz />
        </Container>
      </section>

      {/* SECTION 15 — FAQ */}
      <section className="py-12 bg-white border-y border-sand-200">
        <Container size="md">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="gold">الأسئلة الشائعة</Badge>
            <h2 className="text-3xl font-extrabold text-stone-900">كل ما تحتاج معرفته عن الشفرات والطلب</h2>
          </div>

          <Accordion items={globalFAQ} defaultOpenId="1" />
        </Container>
      </section>

      {/* SECTION 16 — FINAL CTA */}
      <section className="py-16 bg-gradient-to-b from-burgundy-900 to-burgundy-950 text-white text-center">
        <Container size="sm">
          <div className="space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-amber-100 leading-tight font-arabic">
              إنت مش بتصلح علاقتك بس. <br />
              <span className="text-amber-300">إنت بتصلح الأساس اللي هيتبني عليه بيت كامل.</span>
            </h2>

            <p className="text-sand-200 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
              أنت تصلح بيتك، وتبني بيت غيرك. ابدأ اليوم أول خطوة في رحلة الفهم والتغيير المستدام.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" onClick={() => handlePrimaryCTA('Final_CTA')}>
                <Button variant="gold" size="xl" className="shadow-lg">
                  <span>ابدأ رحلة التغيير</span>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/products">
                <Button variant="outline" size="xl" className="border-amber-300 text-amber-200 hover:bg-burgundy-900">
                  <span>شوف المنتجات</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
