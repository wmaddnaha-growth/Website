import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'burgundy' | 'emerald' | 'stone' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className,
  ...props
}) => {
  const variants = {
    gold: 'bg-brand-100 text-brand-800 border border-brand-300',
    burgundy: 'bg-burgundy-100 text-burgundy-900 border border-burgundy-200',
    emerald: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
    stone: 'bg-stone-100 text-stone-800 border border-stone-200',
    outline: 'border border-stone-300 text-stone-700 bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
