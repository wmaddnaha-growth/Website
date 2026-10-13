import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'سياسة الاسترجاع',
  description: 'سياسة الاسترجاع وضمان الجودة لدى مبادرة و مددناها.',
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Badge variant="gold">ضمان الجودة والرضا</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            سياسة الاسترجاع والاستبدال
          </h1>
        </div>

        <Card hoverEffect={false} className="p-8 space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          <h3 className="font-bold text-stone-900 text-lg">المنتجات الرقمية (PDF)</h3>
          <p>
            ظراً للطبيعة الرقمية للكتب الإلكترونية والوصول الفوري للمحتوى بمجرد الشراء، فإن الشراء يعتبر نهائياً. ولكن إذا واجهتك أي مشكلة في تحميل الملفات أو استلام الرابط، فنحن نضمن لك حلها فوراً من خلال تواصلك مع الدعم الفني.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">النسخ المطبوعة (في حال توفرها)</h3>
          <p>
            إذا كان المنتج نسخة مطبوعة ووصلتك تالفة أو تحتوي على عيب طباعة، يحق لك طلب استبدال النسخة مجاناً خلال 7 أيام من تاريخ الاستلام.
          </p>
        </Card>
      </Container>
    </div>
  );
}
