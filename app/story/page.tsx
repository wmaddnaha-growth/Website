import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Heart, Sparkles, Home, Users, ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'قصتنا وفلسفتنا',
  description: 'قصة العلامة التجارية "و مددناها" وفلسفة إصلاح أساس البيت السوي قبل بناء الأطفال.',
};

export default function StoryPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 dir-rtl">
      {/* Header */}
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold">قصتنا وفلسفتنا</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-arabic leading-tight">
            البداية كانت فكرة إننا نبني بيت سوي.. وعشان نبني بيت سوي، لازم نصلح الأساس.
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            تعرف على الحكاية والفلسفة التي ألهمت تأسيس مبادرة "و مددناها".
          </p>
        </div>
      </Container>

      {/* Story Sections */}
      <section className="bg-white py-12 border-y border-sand-200">
        <Container size="md">
          <div className="space-y-8 text-stone-800 leading-relaxed text-base sm:text-lg">
            <div className="bg-sand-50 p-6 sm:p-8 rounded-3xl border border-sand-200 space-y-4">
              <h2 className="text-2xl font-bold text-burgundy-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-brand-600" />
                <span>حكاية الفكرة والأثر الخيري</span>
              </h2>
              <p>
                بدأت الفكرة برغبة حقيقية في تأسيس مشروع تجاري واجتماعي تكون أرباحه مصدراً لإنشاء <strong>وقف خيري مستدام</strong> يوفر فرصة عمل ومصدر دخل لعائلات وأفراد في حاجة.
              </p>
              <p>
                وفي بداية التفكير، كان المخطط الأول هو تأليف كتاب مخصص للأطفال والتربية السليمة. لكن أثناء البحث والنقاش العميق بين فريق العمل والخبراء، استوقفتنا حقيقة جوهرية غيّرت اتجاه المشروع بالكامل:
              </p>
              <blockquote className="p-6 bg-white rounded-2xl border-r-4 border-burgundy-800 font-bold text-lg text-burgundy-950 shadow-xs my-4">
                "مستحيل نربي طفل سوي في بيت الزوجين فيه مش مبسوطين ومش فاهمين بعض."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white space-y-3">
                <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-brand-700" />
                  <span>إصلاح الأساس أولاً</span>
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  البيت الهادئ والمستقر يبدأ من علاقة صحية وفاهمة بين الزوجين. لما ينتهي الجفاف والروتين والتخمين الخاطئ، يحل محله السكن والتفاهم والود.
                </p>
              </Card>

              <Card className="p-6 bg-white space-y-3">
                <h3 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-700" />
                  <span>المشكلة مش دايمًا في الحب</span>
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  المشكلة أحيانًا كثيرة تكون في "الفهم". كل طرف يحب الآخر لكنه يجهل شفرته وطريقة تفكيره واحتياجاته الحقيقية.
                </p>
              </Card>
            </div>

            {/* Journey steps */}
            <div className="bg-burgundy-950 text-sand-100 p-8 rounded-3xl space-y-6 text-center">
              <h3 className="text-2xl font-bold text-amber-200">رحلة الأثر المتمحورة حول البيت</h3>
              <p className="text-sm text-sand-300 max-w-xl mx-auto">
                منظومة مترابطة تبدأ بالفهم وتنتهي بالأثر المستدام في المجتمع:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 font-bold text-amber-100 text-sm">
                <span className="bg-burgundy-900 px-4 py-2 rounded-xl border border-burgundy-800">فهم</span>
                <span>←</span>
                <span className="bg-burgundy-900 px-4 py-2 rounded-xl border border-burgundy-800">إصلاح</span>
                <span>←</span>
                <span className="bg-burgundy-900 px-4 py-2 rounded-xl border border-burgundy-800">استقرار</span>
                <span>←</span>
                <span className="bg-burgundy-900 px-4 py-2 rounded-xl border border-burgundy-800">بناء</span>
                <span>←</span>
                <span className="bg-burgundy-900 px-4 py-2 rounded-xl border border-burgundy-800">تربية</span>
                <span>←</span>
                <span className="bg-amber-500 text-burgundy-950 px-4 py-2 rounded-xl shadow-md">أثر مستمر</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container size="sm" className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-stone-900">ابدأ في إصلاح الأساس اليوم</h3>
        <Link href="/products">
          <Button variant="gold" size="xl">
            <span>تصفح الأدلة والباكدج</span>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </Container>
    </div>
  );
}
