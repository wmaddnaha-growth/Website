'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyticsEvents } from '@/lib/analytics';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className,
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (item: AccordionItemData) => {
    const nextState = openId === item.id ? null : item.id;
    if (nextState) {
      analyticsEvents.faqOpen(item.question);
    }
    setOpenId(nextState);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-sand-200 rounded-2xl bg-white overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(item)}
              className="w-full text-right px-6 py-5 flex items-center justify-between gap-4 font-semibold text-stone-900 hover:text-burgundy-800 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg text-right">{item.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-brand-600 transition-transform duration-300 flex-shrink-0',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-stone-700 leading-relaxed text-base border-t border-sand-100 pt-4 bg-brand-50/30">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
