'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { blogPosts } from '@/data/blog';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4 dir-rtl">
        <h1 className="text-3xl font-bold text-stone-900">المقال غير موجود</h1>
        <Link href="/blog">
          <Button variant="primary">عرض جميع المقالات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 space-y-12 dir-rtl">
      <Container size="md">
        <div className="space-y-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة للمدونة</span>
          </Link>

          <div className="space-y-3 border-b border-sand-200 pb-6">
            <Badge variant="gold">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight font-arabic">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-sand-200 shadow-xs prose max-w-none text-stone-800 leading-relaxed text-base whitespace-pre-line">
            {post.content}
          </div>

          {/* Bottom CTA */}
          <div className="bg-brand-50 p-6 rounded-2xl border border-brand-200 text-center space-y-3 mt-8">
            <h3 className="font-bold text-lg text-stone-900">هل ترغب في تطبيق هذه المفاهيم بعملية؟</h3>
            <p className="text-xs text-stone-600">اكتشف أدلة "و مددناها" وكتالوج التغيير الزوجي الكامل.</p>
            <div className="pt-1">
              <Link href="/products">
                <Button variant="gold" size="md">
                  تصفح المنتجات الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
