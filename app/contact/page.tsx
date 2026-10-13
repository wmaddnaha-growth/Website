'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Mail, Phone, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'استفسار عام',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated integration boundary
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'استفسار عام', message: '' });
    }, 800);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12 dir-rtl">
      <Container size="md">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="gold">تواصل معنا</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight font-arabic">
            يسعدنا تواصلك واستفسارك
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            فريق الدعم متواجد للإجابة عن أسئلتك بخصوص الطلب أو المحتوى بخصوصية وأمان تام.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-6 bg-sand-50/60 space-y-4">
              <h3 className="font-bold text-lg text-stone-900 border-b border-sand-200 pb-2">
                معلومات التواصل
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-burgundy-100 text-burgundy-900 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">البريد الإلكتروني:</span>
                    <span className="font-semibold text-stone-900">support@wamaddadnaha.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-burgundy-100 text-burgundy-900 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">واتساب والدعم الفني:</span>
                    <span className="font-semibold text-stone-900 dir-ltr inline-block">+20 155 308 9928</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">ضمان الخصوصية:</span>
                    <span className="font-semibold text-stone-900">سرية تامة لجميع البيانات والرسائل</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-brand-50 p-6 rounded-2xl border border-brand-200 text-xs text-brand-900 leading-relaxed space-y-2">
              <p className="font-bold text-sm">ملاحظة هامة:</p>
              <p>
                نحن نحترم خصوضيتك للغاية. لا نطلب تفاصيل شخصية حساسة في نموذج التواصل، وسيتم الرد عليك عبر البريد أو الواتساب الرسمي المسجل فقط.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7">
            <Card hoverEffect={false} className="p-8">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">تم استلام رسالتك بنجاح!</h3>
                  <p className="text-sm text-stone-600 max-w-sm mx-auto">
                    شكراً لتواصلك معنا. سيرد عليك فريق الدعم في أقرب وقت ممكن.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="secondary" size="md">
                    إرسال رسالة أخرى
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-xl text-stone-900 mb-4">أرسل لنا استفسارك</h3>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      الاسم الكريـم <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-stone-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-stone-900 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        رقم الهاتف / الواتساب
                      </label>
                      <input
                        type="tel"
                        placeholder="010XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-stone-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      موضوع الاستفسار
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-stone-900 bg-white"
                    >
                      <option value="استفسار عام">استفسار عام حول المبادرة</option>
                      <option value="مساعدة في الطلب">مساعدة في أداء الطلب والشراء</option>
                      <option value="استفسار عن الوقف">استفسار عن نموذج الوقف 30%</option>
                      <option value="مقترحات">مقترحات وملاحظات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      نص الرسالة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="اكتب استفسارك هنا..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-sm px-4 py-2.5 border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-stone-900 bg-white resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                    {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
