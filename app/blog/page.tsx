import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { blogPosts } from '@/data/blog';
import { BookOpen, Clock, ArrowLeft, Calendar } from 'lucide-react';

export const metadata = {
  title: 'المدونة والمقالات الإثرائية',
  description: 'مقالات وعرائض تثقيفية عن فهم الشريك، تخفيف توتر العلاقات، ونماذج الأثر المجتمعي.',
};

export default function BlogListingPage() {
  return (
    <div className="py-12 sm:py-16 space-y-12 dir-rtl">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold">المعرفة والإثراء</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-arabic">
            المدونة والمقالات
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            مقالات قصيرة وعملية تساعدك على فهم أبعاد العلاقة والبيت السوي.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="p-6 bg-white space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="bg-sand-100 text-stone-800 font-bold px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
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

                <h3 className="text-xl font-bold text-stone-900 leading-snug hover:text-burgundy-800 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">بقلم: {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-burgundy-800 font-bold text-sm flex items-center gap-1 hover:text-burgundy-950 transition-colors"
                >
                  <span>اقرأ المقال</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
