import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'سياسة الشحن والتسليم',
  description: 'طرق التسليم الرقمي والشحن المستتر لدى و مددناها.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Badge variant="gold">التسليم والتوصيل</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            سياسة الشحن والتسليم
          </h1>
        </div>

        <Card hoverEffect={false} className="p-8 space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          <h3 className="font-bold text-stone-900 text-lg">1. التسليم الرقمي الفوري</h3>
          <p>
            تصل الكتب الإلكترونية بصيغة PDF عالية الجودة على بريدك الإلكتروني المسجل فور إتمام عملية الشراء بنجاح. كما يتم توفير روابط تحميل مباشرة في صفحة تأكيد الطلب وحسابك.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">2. الشحن والتغليف المستتر (للنسخ المطبوعة)</h3>
          <p>
            في حال اختيار النسخة المطبوعة، يتم الشحن والتغليف بأسلوب discreet ومستتر 100% يضمن الخصوصية التامة دون وضع أي شعارات أو وصف تفصيلي على الغلاف الخارجي لشحنتك.
          </p>
        </Card>
      </Container>
    </div>
  );
}
