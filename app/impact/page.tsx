import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Heart, Building, TrendingUp, ShieldCheck, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'نموذج الأثر والوقف الخيري (30%)',
  description: 'كيف يساهم طلبك في تخصيص 30% من الأرباح لصالح مشروع وقف خيري مستدام يوفر فرص عمل ومصادر رزق.',
};

export default function ImpactPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 dir-rtl">
      {/* Header */}
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="emerald">الأثر والمشاركة المجتمعية</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight font-arabic leading-tight">
            أنت تصلح بيتك… وتبني بيت غيرك.
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            تعرف على نموذج الأثر الخيري المستدام وكيف تتحول كل شفرة تقتنيها إلى غراس مبارك لعائلة أخرى.
          </p>
        </div>
      </Container>

      {/* Impact Mechanism */}
      <section className="bg-white py-12 border-y border-sand-200">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            <Card hoverEffect={false} className="p-6 bg-emerald-50/50 border-emerald-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">30% تخصيص مباشر</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                يتم تخصيص 30% من صافي أرباح مبيعات الكتالوجات والباكدج لصالح الأنشطة الوقفية بشكل منتظم.
              </p>
            </Card>

            <Card hoverEffect={false} className="p-6 bg-emerald-50/50 border-emerald-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">مشاريع إنتاجية مستدامة</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                الهدف هو توفير أدوات عمل وتمويل مشاريع صغيرة تتيح للأسر المحتاجة الاعتماد على نفسها وتأمين عيش كريم.
              </p>
            </Card>

            <Card hoverEffect={false} className="p-6 bg-emerald-50/50 border-emerald-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">أثر مضاعف لا ينقطع</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                الوقف يضمن استمرار النفع وتوليد الدخل المستمر بدلاً من المساعدات المؤقتة، ليكون أثراً مباركاً ممتداً.
              </p>
            </Card>
          </div>

          {/* Visual Flow Diagram */}
          <div className="bg-emerald-950 text-white p-8 sm:p-12 rounded-3xl space-y-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-200">
              رحلة تحول الطلب إلى أثر ملموس
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold text-amber-300 block mb-1">الخطوة 1</span>
                <span className="text-sm font-semibold">طلب الكتالوج</span>
              </div>
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold text-amber-300 block mb-1">الخطوة 2</span>
                <span className="text-sm font-semibold">تحسين بيتك</span>
              </div>
              <div className="bg-emerald-800 p-4 rounded-2xl border border-emerald-700 shadow-lg">
                <span className="text-xs font-bold text-amber-300 block mb-1">الخطوة 3</span>
                <span className="text-sm font-extrabold text-amber-200">30% أرباح الوقف</span>
              </div>
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold text-amber-300 block mb-1">الخطوة 4</span>
                <span className="text-sm font-semibold">تمويل المشروع</span>
              </div>
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800">
                <span className="text-xs font-bold text-amber-300 block mb-1">الخطوة 5</span>
                <span className="text-sm font-semibold">رزق مستدام للأسر</span>
              </div>
            </div>

            <div className="pt-4 max-w-xl mx-auto text-xs text-emerald-200 leading-relaxed bg-emerald-900/40 p-4 rounded-xl border border-emerald-800">
              <p>
                نحن نلتزم بالشفافية الكاملة والأمانة الفكرية. لا نختلق أرقاماً أو مؤسسات وهمية، بل نتبع نموذجاً تجارياً واجتماعياً واضحاً يضمن توجيه النسبة المحددة لبناء الأصول الوقفية.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container size="sm" className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-stone-900">شارَك في التغيير والأثر الآن</h3>
        <Link href="/products">
          <Button variant="gold" size="xl">
            <span>تصفح المنتجات واطلب نسختك</span>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </Container>
    </div>
  );
}
