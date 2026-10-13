'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { analyticsEvents } from '@/lib/analytics';

export const MobileStickyCTA: React.FC = () => {
  const pathname = usePathname();
  const { openDrawer, totalItems } = useCart();

  // Hide on checkout page or cart page to avoid cluttering
  if (pathname === '/checkout' || pathname === '/cart') {
    return null;
  }

  const handleCTAClick = () => {
    analyticsEvents.clickCTA('ابدأ رحلة التغيير', 'MobileStickyCTA');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-sand-200 p-3 shadow-lg dir-rtl animate-slideUp">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={openDrawer}
          className="relative p-3 rounded-xl bg-sand-100 text-burgundy-900 border border-sand-300 flex items-center justify-center"
          aria-label="السلة"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-burgundy-800 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <Link href="/products" onClick={handleCTAClick} className="flex-1">
          <Button variant="gold" size="lg" fullWidth className="py-3 text-base shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>ابدأ رحلة التغيير</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
