import React from 'react';
import { formatCurrency, cn } from '@/lib/utils';

interface PriceProps {
  price: number | null | undefined;
  compareAtPrice?: number | null | undefined;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  compareAtPrice,
  currency = 'EGP',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl lg:text-4xl font-black',
  };

  return (
    <div className={cn('inline-flex items-baseline gap-3 dir-rtl', className)}>
      <span className={cn('text-burgundy-900', sizeClasses[size])}>
        {formatCurrency(price, currency)}
      </span>
      {compareAtPrice && price !== null && price !== undefined && compareAtPrice > price && (
        <span className="text-stone-400 line-through text-sm sm:text-base font-normal">
          {formatCurrency(compareAtPrice, currency)}
        </span>
      )}
    </div>
  );
};
