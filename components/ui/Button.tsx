import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'burgundy' | 'emerald';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-burgundy-800 text-white hover:bg-burgundy-900 focus:ring-burgundy-700 shadow-md hover:shadow-lg',
      secondary:
        'bg-sand-100 text-burgundy-900 hover:bg-sand-200 focus:ring-sand-400 border border-sand-300',
      gold:
        'bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 text-burgundy-950 font-semibold shadow-md hover:shadow-glow focus:ring-brand-400',
      burgundy:
        'bg-burgundy-900 text-sand-100 hover:bg-burgundy-950 focus:ring-burgundy-700 shadow-md',
      emerald:
        'bg-emerald-800 text-white hover:bg-emerald-900 focus:ring-emerald-700 shadow-md',
      outline:
        'border-2 border-burgundy-800 text-burgundy-800 hover:bg-burgundy-50 focus:ring-burgundy-700',
      ghost:
        'text-stone-700 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-400',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-base px-5 py-2.5 gap-2',
      lg: 'text-lg px-7 py-3.5 gap-2.5 font-semibold',
      xl: 'text-xl px-8 py-4 gap-3 font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
