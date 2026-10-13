'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, Heart, Sparkles } from 'lucide-react';
import { analyticsEvents } from '@/lib/analytics';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/products', label: 'المنتجات' },
    { href: '/story', label: 'قصتنا' },
    { href: '/impact', label: 'الأثر والوقف' },
    { href: '/faq', label: 'الأسئلة الشائعة' },
  ];

  const handleCTAClick = () => {
    analyticsEvents.clickCTA('ابدأ رحلة التغيير', 'Header');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-sand-200'
          : 'bg-brand-50/80 backdrop-blur-sm py-4 border-b border-sand-200/60'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button & Cart Icon */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-burgundy-800 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={openDrawer}
              className="relative p-2 text-stone-700 hover:text-burgundy-800 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="سلة الشراء"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-burgundy-800 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-burgundy-900 text-amber-200 flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105 border border-amber-400/30">
              و
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-burgundy-950 font-arabic group-hover:text-burgundy-800 transition-colors">
                و مددناها
              </span>
              <span className="text-[10px] text-brand-700 font-medium tracking-wide">
                البداية إصلاح الأساس
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-burgundy-900 font-bold'
                      : 'text-stone-700 hover:text-burgundy-800'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-burgundy-800 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Primary CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openDrawer}
              className="relative p-2.5 text-stone-800 hover:text-burgundy-800 hover:bg-sand-100 rounded-xl transition-colors flex items-center gap-2 border border-sand-200"
            >
              <ShoppingBag className="w-5 h-5 text-burgundy-800" />
              <span className="text-xs font-bold">السلة</span>
              {totalItems > 0 && (
                <span className="bg-burgundy-800 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <Link href="/products" onClick={handleCTAClick}>
              <Button variant="gold" size="md">
                <Sparkles className="w-4 h-4" />
                <span>ابدأ رحلة التغيير</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-sand-200 pb-2 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold ${
                  pathname === link.href
                    ? 'bg-burgundy-50 text-burgundy-900 font-bold'
                    : 'text-stone-800 hover:bg-sand-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 px-2">
              <Link href="/products" onClick={() => { setMobileMenuOpen(false); handleCTAClick(); }}>
                <Button variant="gold" size="lg" fullWidth>
                  <span>ابدأ رحلة التغيير</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
