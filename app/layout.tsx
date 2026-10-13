import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { MobileStickyCTA } from '@/components/navigation/MobileStickyCTA';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wamaddadnaha.com'),
  title: {
    default: 'و مددناها | أنت تصلح بيتك، وتبني بيت غيرك',
    template: '%s | و مددناها',
  },
  description:
    'علامة إثرائية مصرية متخصصة في مساعدة الأزواج على فهم بعضهم البعض، إصلاح أساس البيت السوي، وبناء علاقة زوجية مستقرة وعميقة. 30% من الأرباح لوقف خيري مستدام.',
  keywords: [
    'و مددناها',
    'شفرة الرجالة',
    'شفرة النساء',
    'شفرة الستات',
    'العلاقات الزوجية',
    'البيت السوي',
    'إصلاح العلاقة الزوجية',
    'وقف خيري مصر',
  ],
  authors: [{ name: 'و مددناها' }],
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://wamaddadnaha.com',
    siteName: 'و مددناها',
    title: 'و مددناها | البيت السوي بيبدأ من أساس سوي',
    description:
      'دليل تطبيقي عملي يساعد الزوجين على فهم الاختلافات وتجاوز الروتين، مع مساهمة 30% من الأرباح في وقف خيري مستدام.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'و مددناها | أنت تصلح بيتك، وتبني بيت غيرك',
    description: 'أدلة إثرائية عمليّة للمتزوجين لفهم الشريك وإصلاح أساس المنزل.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-brand-50 text-stone-900 selection:bg-brand-200 selection:text-burgundy-900">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyCTA />
        </CartProvider>
      </body>
    </html>
  );
}
