'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Lock, Sparkles, Shield, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4 dir-rtl font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-sand-200 shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-burgundy-900 text-amber-200 flex items-center justify-center font-bold text-3xl shadow-md">
            و
          </div>
          <h1 className="text-2xl font-black text-stone-900 font-arabic">
            لوحة تحكم "و مددناها"
          </h1>
          <p className="text-xs text-stone-500">
            تسجيل الدخول لإدارة محتوى الموقع والمنتجات والطلبات
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              كلمة مرور الإدارة (Default: admin123)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full text-sm px-4 py-3 pl-10 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-800 bg-white"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            fullWidth
            disabled={loading}
            className="py-3 text-base shadow-md"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'دخول لوحة التحكم'}
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-sand-100 text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>منطقة آمنة ومحمية لإدارة المحتوى</span>
        </div>
      </div>
    </div>
  );
}
