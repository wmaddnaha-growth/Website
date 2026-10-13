'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt?: string }[];
  currentIndex: number;
  onNavigate?: (newIndex: number) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNavigate && images.length > 1) {
        onNavigate((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && onNavigate && images.length > 1) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4 backdrop-blur-md transition-opacity duration-300 dir-rtl"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 left-0 text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-700 p-2.5 rounded-full transition-colors border border-stone-600"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute -top-10 right-0 text-xs text-stone-300 font-bold bg-stone-900/90 border border-stone-700 px-3.5 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Main Image */}
        <div className="relative overflow-hidden rounded-2xl border border-sand-300/30 bg-stone-900 shadow-2xl max-h-[80vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImg.src}
            alt={currentImg.alt || 'صورة مكبرة'}
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && onNavigate && (
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              className="bg-stone-800/90 hover:bg-stone-700 text-stone-100 p-3 rounded-full transition-colors border border-stone-600"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs text-stone-300 font-medium max-w-xs truncate">{currentImg.alt}</span>
            <button
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              className="bg-stone-800/90 hover:bg-stone-700 text-stone-100 p-3 rounded-full transition-colors border border-stone-600"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
