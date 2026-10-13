import React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'سياسة الخصوصية',
  description: 'سياسة الخصوصية وحماية بيانات المستخدمين لدى مبادرة و مددناها.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 space-y-8 dir-rtl">
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <Badge variant="emerald">حماية البيانات والسرية</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            سياسة الخصوصية
          </h1>
        </div>

        <Card hoverEffect={false} className="p-8 space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 text-emerald-800 font-bold text-lg border-b border-sand-200 pb-3">
            <ShieldCheck className="w-6 h-6" />
            <span>التزامنا الكامل بالسرية والخصوصية</span>
          </div>

          <p>
            في مبادرة <strong>"و مددناها"</strong>، ندرك تماماً حساسية وأهمية الخصوصية في كل ما يتعلق بالعلاقات الزوجية والحياة العائلية. لذلك نلتزم بأعلى معايير الأمان والتكتم الشديد في التعامل مع بياناتك.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">1. البيانات التي نجمعها</h3>
          <p>
            نجمع فقط البيانات الأساسية اللازمة لإتمام الشراء والتسليم، مثل الاسم، البريد الإلكتروني، رقم الهاتف لاستلام روابط الكتب أو تأكيد الشحن. لا نطلب ولا نخزن أي تفاصيل شخصية أو معلومات خاصة غير ضرورية.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">2. حماية البيانات والدفع</h3>
          <p>
            تتم جميع العمليات المالية عبر بوابات دفع إلكترونية معتمدة ومشفرة بأعلى تقنيات الأمان (SSL / TLS). لا يتم الوصول لبينات بطاقتك البنكية أو تخزينها على خوادمنا.
          </p>

          <h3 className="font-bold text-stone-900 text-lg">3. عدم مشاركة البيانات</h3>
          <p>
            نعدك بشكل قاطع بعدم بيع أو تأجير أو مشاركة أي من بياناتك الشخصية أو بريدك الإلكتروني مع أي طرف ثالث لأغراض تسويقية أو غيرها.
          </p>
        </Card>
      </Container>
    </div>
  );
}
