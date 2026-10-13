'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Sparkles, BookOpen } from 'lucide-react';

interface ProductMockupProps {
  title: string;
  subtitle?: string;
  audienceTag?: string;
  coverColor?: string; // e.g. burgundy or emerald
  accentColor?: string; // e.g. gold
  isBundle?: boolean;
  className?: string;
}

export const ProductMockup: React.FC<ProductMockupProps> = ({
  title,
  subtitle,
  audienceTag,
  coverColor = '#6B1B2F',
  accentColor = '#C5A973',
  isBundle = false,
  className,
}) => {
  if (isBundle) {
    return (
      <div className={cn('relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center py-6', className)}>
        {/* Book 1 - Wives (Left/Back tilt) */}
        <div className="absolute left-4 sm:left-6 w-52 sm:w-60 h-72 sm:h-80 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#6B1B2F] via-[#521323] to-[#380A16] text-white shadow-book transform -rotate-6 transition-transform duration-300 hover:rotate-0 hover:z-20 border-r-4 border-amber-500/30 p-5 flex flex-col justify-between">
          <div className="border border-amber-400/40 p-3 h-full rounded flex flex-col justify-between bg-black/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded inline-block mb-2">
                دليل الزوجة
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-amber-100 leading-tight">شفرة الرجالة</h3>
            </div>
            <div className="text-center py-2">
              <div className="w-10 h-10 mx-auto rounded-full border border-amber-300/40 flex items-center justify-center text-amber-300 mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-amber-200/80">و مددناها</p>
            </div>
            <div className="text-[9px] text-amber-300/60 text-left font-mono">EDITION 01</div>
          </div>
        </div>

        {/* Book 2 - Husbands (Right/Front tilt) */}
        <div className="absolute right-4 sm:right-6 w-52 sm:w-60 h-72 sm:h-80 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#1F3E38] via-[#162D29] to-[#0E1E1B] text-white shadow-book transform rotate-6 transition-transform duration-300 hover:rotate-0 hover:z-20 border-r-4 border-amber-500/30 p-5 flex flex-col justify-between z-10">
          <div className="border border-amber-400/40 p-3 h-full rounded flex flex-col justify-between bg-black/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded inline-block mb-2">
                دليل الزوج
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-amber-100 leading-tight">شفرة النساء</h3>
            </div>
            <div className="text-center py-2">
              <div className="w-10 h-10 mx-auto rounded-full border border-amber-300/40 flex items-center justify-center text-amber-300 mb-1">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-amber-200/80">و مددناها</p>
            </div>
            <div className="text-[9px] text-amber-300/60 text-left font-mono">EDITION 01</div>
          </div>
        </div>

        {/* Gold Ribbon / Seal */}
        <div className="absolute z-30 -bottom-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 text-burgundy-950 font-bold text-xs px-4 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-burgundy-900" />
          <span>باكدج البيت السوي الكامل</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative group perspective-1000 my-4 inline-block', className)}>
      {/* 3D Standalone Book container */}
      <div
        className="w-56 sm:w-64 md:w-72 aspect-[3/4.2] rounded-r-xl rounded-l-sm shadow-book relative transition-all duration-500 group-hover:scale-[1.02] group-hover:rotate-1 flex flex-col justify-between p-6 overflow-hidden border-r-4 border-amber-500/40"
        style={{
          background: `linear-gradient(135deg, ${coverColor} 0%, #1A0D12 100%)`,
        }}
      >
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A973_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Inner Gold Foil Frame */}
        <div className="relative z-10 border-2 border-amber-400/40 rounded-lg p-4 h-full flex flex-col justify-between bg-black/20 backdrop-blur-[1px]">
          {/* Header Tag */}
          <div className="text-center">
            {audienceTag && (
              <span className="inline-block bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-3">
                {audienceTag}
              </span>
            )}
            <p className="text-[11px] text-amber-300/80 tracking-widest font-mono uppercase">
              و مددناها
            </p>
          </div>

          {/* Book Title */}
          <div className="text-center my-auto py-4">
            <h3 className="font-extrabold text-2xl sm:text-3xl text-amber-100 tracking-tight leading-tight mb-2 drop-shadow">
              {title}
            </h3>
            <div className="w-12 h-0.5 bg-amber-400/60 mx-auto mb-3" />
            {subtitle && (
              <p className="text-xs text-amber-200/80 line-clamp-3 leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </div>

          {/* Footer Logo Seal */}
          <div className="text-center pt-2 border-t border-amber-400/20">
            <p className="text-[10px] text-amber-300/70 font-semibold">
              كتالوج التغيير والبيت السوي
            </p>
          </div>
        </div>

        {/* Book spine simulation effect */}
        <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
