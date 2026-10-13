import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Heart, ShieldCheck, Truck, RefreshCw, Mail, Phone, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-burgundy-950 text-sand-100 border-t border-burgundy-900 dir-rtl pt-16 pb-12">
      <Container>
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-burgundy-900 text-center md:text-right">
          <div className="flex items-center gap-3 bg-burgundy-900/40 p-4 rounded-2xl border border-burgundy-800/40">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-100">خصوصية تامة 100%</h4>
              <p className="text-xs text-sand-300">محتوى راقٍ وتغليف محترم ومستتر</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-burgundy-900/40 p-4 rounded-2xl border border-burgundy-800/40">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-100">30% وقف خيري مستدام</h4>
              <p className="text-xs text-sand-300">أنت تصلح بيتك، وتبني بيت غيرك</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-burgundy-900/40 p-4 rounded-2xl border border-burgundy-800/40">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-100">تسليم رقمي وسريع</h4>
              <p className="text-xs text-sand-300">قراءة فورية وشحن لجميع المحافظات</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-burgundy-900/40 p-4 rounded-2xl border border-burgundy-800/40">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-100">دعم واستفسارات</h4>
              <p className="text-xs text-sand-300">فريق خدمة عملاء متواجد للمساعدة</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/home" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-burgundy-950 font-extrabold text-xl flex items-center justify-center">
                و
              </div>
              <span className="font-extrabold text-2xl text-amber-100 font-arabic">و مددناها</span>
            </Link>

            <p className="text-sm text-sand-300 leading-relaxed max-w-sm">
              مبادرة زوجية عائلية تهدف لبناء وتصلح أساس البيت السوي من خلال الفهم والوعي والممارسة العملية المحترمة، مع تخصيص 30% من الأرباح لوقف خيري مستدام.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-amber-300 mb-2">أنت تصلح بيتك، وتبني بيت غيرك.</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-burgundy-900 text-sand-200 hover:text-amber-300 hover:bg-burgundy-800 flex items-center justify-center transition-colors"
                  aria-label="إنستجرام"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-burgundy-900 text-sand-200 hover:text-amber-300 hover:bg-burgundy-800 flex items-center justify-center transition-colors"
                  aria-label="فيسبوك"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-200 text-base border-b border-burgundy-900 pb-2">
              الرئيسية والمنتجات
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link href="/products" className="hover:text-amber-300 transition-colors">
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link href="/products/shifrat-al-regal" className="hover:text-amber-300 transition-colors">
                  شفرة الرجالة (للزوجات)
                </Link>
              </li>
              <li>
                <Link href="/products/shifrat-al-nesaa" className="hover:text-amber-300 transition-colors">
                  شفرة النساء (للازواج)
                </Link>
              </li>
              <li>
                <Link href="/products/bundle" className="hover:text-amber-300 transition-colors">
                  باكدج البيت السوي
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Impact */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-200 text-base border-b border-burgundy-900 pb-2">
              عن المبادرة
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link href="/story" className="hover:text-amber-300 transition-colors">
                  قصتنا وفلسفتنا
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-amber-300 transition-colors">
                  الأثر والوقف الخيري
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-300 transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-300 transition-colors">
                  المدونة والمقالات
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/201553089928"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors text-xs text-amber-300 font-semibold"
                >
                  واتساب الدعم: 01553089928
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-200 text-base border-b border-burgundy-900 pb-2">
              السياسات والشروط
            </h4>
            <ul className="space-y-2 text-sm text-sand-300">
              <li>
                <Link href="/privacy" className="hover:text-amber-300 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-amber-300 transition-colors">
                  سياسة الاسترجاع
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-amber-300 transition-colors">
                  سياسة الشحن والتسليم
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-burgundy-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <p>© {new Date().getFullYear()} و مددناها. جميع الحقوق محفوظة.</p>
          <p className="text-sand-400">
            مصمم بأسلوب مصري راقٍ لتعزيز البيوت السوية.
          </p>
        </div>
      </Container>
    </footer>
  );
};
