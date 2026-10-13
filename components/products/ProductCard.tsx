'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductMockup } from './ProductMockup';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-sm transition-all duration-300 hover:shadow-premium flex flex-col justify-between relative overflow-hidden ${
        featured ? 'ring-2 ring-brand-400 bg-gradient-to-b from-white to-sand-50/50' : ''
      }`}
    >
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={product.isBundle ? 'gold' : 'burgundy'}>{product.badge}</Badge>
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Book Visual */}
        <Link href={`/products/${product.slug}`} className="block transition-transform hover:scale-105">
          <ProductMockup
            title={product.name}
            subtitle={product.subtitle}
            audienceTag={product.audienceLabel}
            coverColor={product.coverColor}
            accentColor={product.accentColor}
            isBundle={product.isBundle}
          />
        </Link>

        {/* Content Details */}
        <div className="mt-4 w-full text-right">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
              {product.audienceLabel}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {product.deliveryType === 'digital' ? 'كتاب إلكتروني (PDF)' : 'نسخة رقمية + مطبوعة'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 hover:text-burgundy-800 transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {product.shortDescription}
          </p>

          {/* Key Feature Highlights */}
          {product.features && product.features.length > 0 && (
            <ul className="space-y-2 mb-6 border-t border-sand-100 pt-4 text-xs text-stone-700">
              {product.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feat.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 border-t border-sand-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={() => addToCart(product)}
            variant={product.isBundle ? 'gold' : 'primary'}
            size="md"
            className="flex-1 sm:flex-initial"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>أضف للسلة</span>
          </Button>

          <Link href={`/products/${product.slug}`} className="w-auto">
            <Button variant="outline" size="md" className="p-2.5">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
