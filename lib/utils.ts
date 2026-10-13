import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined, currency = 'EGP'): string {
  if (amount === null || amount === undefined) {
    return 'السعر يحدد لاحقًا';
  }
  return `${amount} ${currency === 'EGP' ? 'ج.م' : currency}`;
}
