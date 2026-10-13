'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  HelpCircle,
  FileText,
  Heart,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show admin sidebar/header layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin', label: 'اللوحة الرئيسية', icon: LayoutDashboard },
    { href: '/admin/products', label: 'إدارة المنتجات والأدلة', icon: BookOpen },
    { href: '/admin/orders', label: 'إدارة الطلبات والمبيعات', icon: ShoppingBag },
    { href: '/admin/waqf', label: 'الوقف والأثر (30%)', icon: Heart },
    { href: '/admin/faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
    { href: '/admin/blog', label: 'المدونة والمقالات', icon: FileText },
    { href: '/admin/settings', label: 'إعدادات الموقع والأسعار', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans dir-rtl flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-burgundy-950 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-burgundy-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-burgundy-900 text-amber-200"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-lg font-arabic">إدارة و مددناها</span>
        </div>

        <Link
          href="/home"
          target="_blank"
          className="text-xs bg-amber-400 text-burgundy-950 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
        >
          <span>الموقع</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-burgundy-950 text-sand-100 p-6 flex flex-col justify-between border-l border-burgundy-900 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-burgundy-900 pb-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-burgundy-950 font-black text-xl flex items-center justify-center shadow-md">
                و
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-amber-100 font-arabic">و مددناها</h2>
                <span className="text-[10px] text-amber-300/80 font-mono">لوحة التحكم والتنفيذ</span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-burgundy-950 font-bold shadow-sm'
                      : 'text-sand-200 hover:bg-burgundy-900 hover:text-amber-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-burgundy-900 space-y-3">
          <Link
            href="/home"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-burgundy-900/60 text-amber-200 border border-burgundy-800/60 hover:bg-burgundy-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>معاينة الموقع العام</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
