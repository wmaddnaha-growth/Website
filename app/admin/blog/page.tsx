'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BlogPost } from '@/types';
import { FileText, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost),
      });

      const data = await res.json();
      if (data.success) {
        fetchPosts();
        setEditingPost(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا المقال؟')) return;

    try {
      const res = await fetch(`/api/admin/blog?slug=${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p.slug !== slug));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-500 font-bold">جاري تحميل المقالات...</div>;
  }

  return (
    <div className="space-y-8 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <Badge variant="gold" className="mb-1">
            إدارة المحتوى والمقالات
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-arabic">
            إدارة المدونة ({posts.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">كتابة مقالات إثرائية جديدة وتعديل المنشور حالياً.</p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditingPost({
              slug: `article-${Date.now()}`,
              title: '',
              excerpt: '',
              content: '',
              author: 'فريق و مددناها',
              category: 'العلاقات الزوجية',
              publishedAt: new Date().toISOString().split('T')[0],
              readingTime: '5 دقائق',
            });
          }}
          variant="gold"
          size="md"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مقال جديد</span>
        </Button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.slug} hoverEffect={false} className="p-6 bg-white space-y-3 border-sand-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-stone-600 bg-sand-100 px-2 py-0.5 rounded inline-block mb-1">
                  {post.category}
                </span>
                <h3 className="font-bold text-lg text-stone-900 leading-snug">{post.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingPost(post);
                  }}
                  className="p-1.5 text-stone-600 hover:text-burgundy-800 rounded-lg hover:bg-sand-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          </Card>
        ))}
      </div>

      {/* Modal Edit/New Article */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 dir-rtl overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <h3 className="font-bold text-lg text-stone-900">
                {isNew ? 'كتابة مقال جديد' : 'تعديل المقال'}
              </h3>
              <button onClick={() => setEditingPost(null)} className="p-1 text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">عنوان المقال</label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">رابط المقال (Slug)</label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">الفئة</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full text-sm p-2.5 border border-sand-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">المقدمة / الملخص</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">محتوى المقال الكامل</label>
                <textarea
                  required
                  rows={6}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full text-sm p-2.5 border border-sand-300 rounded-xl resize-none"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" fullWidth>
                <Save className="w-4 h-4" />
                <span>حفظ المقال</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
