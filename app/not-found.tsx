import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 text-center space-y-6 dir-rtl">
      <Container size="sm">
        <div className="w-20 h-20 mx-auto rounded-full bg-burgundy-100 text-burgundy-900 flex items-center justify-center font-bold text-3xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-arabic">
            الصفحة غير موجودة
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto">
            عذراً، يبدو أن الرابط الذي حاولت الوصول إليه غير صحيح أو تم نقله.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/home">
            <Button variant="gold" size="lg">
              <Home className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </Button>
          </Link>

          <Link href="/products">
            <Button variant="outline" size="lg">
              <Compass className="w-4 h-4" />
              <span>عرض المنتجات</span>
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
