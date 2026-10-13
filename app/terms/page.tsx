import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'الشروط والأحكام',
  description: 'الشروط والأحكام الخاصة باستعمال موقع ومحتوى و مددناها.',
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Badge variant="gold">اتفاقية الاستخدام</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            الشروط والأحكام
          </h1>
        </div>

        <Card hoverEffect={false} className="p-8 space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          <h3 className="font-bold text-stone-900 text-lg">1. الملكية الفكرية وحقوق النشر</h3>
          <p>
            جميع محتويات الكتب والكتالوجات والمواد المنشورة على موقع "و مددناها" محمية بموجب قوانين الملكية الفكرية وحقوق النشر. يُحظر إعادة نشر أو توزيع أو بيع أو مشاركة النسخ الإلكترونية بأي شكل دون إذن كتابي صريح.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">2. الاستخدام المخصص للمتزوجين</h3>
          <p>
            المحتوى والأدلة مصممة ومخصصة للاستخدام الزوجي الشرعي والعائلي فقط، بهدف بناء الفهم والانسجام في إطار البيت السوي.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">3. الوقف الخيري (30%)</h3>
          <p>
            تلتزم المبادرة بتوجيه 30% من أرباح المبيعات لصالح المحفظة الوقفية المحددة لدعم المشاريع الإنتاجية المستدامة.
          </p>
        </Card>
      </Container>
    </div>
  );
}
