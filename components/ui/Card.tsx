import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  bordered = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 transition-all duration-300',
        bordered && 'border border-sand-200',
        hoverEffect && 'hover:shadow-premium hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
