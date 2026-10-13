// Analytics Helper Boundary for Google Analytics, Meta Pixel, and GTM

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event Tracked]: ${eventName}`, params);
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }

  // GTM DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
};

// Standard E-commerce Events
export const analyticsEvents = {
  viewProduct: (product: { id: string; name: string; price: number | null }) => {
    trackEvent('view_product', product);
  },
  addToCart: (product: { id: string; name: string; price: number | null; quantity: number }) => {
    trackEvent('add_to_cart', product);
  },
  removeFromCart: (product: { id: string; name: string }) => {
    trackEvent('remove_from_cart', product);
  },
  beginCheckout: (items: any[], total: number) => {
    trackEvent('begin_checkout', { items, total });
  },
  purchase: (orderId: string, total: number, items: any[]) => {
    trackEvent('purchase', { orderId, total, items });
  },
  clickCTA: (label: string, location: string) => {
    trackEvent('click_cta', { label, location });
  },
  viewBundle: () => {
    trackEvent('view_bundle', { bundle: 'باكدج البيت' });
  },
  faqOpen: (question: string) => {
    trackEvent('faq_open', { question });
  },
  quizStart: () => {
    trackEvent('quiz_start');
  },
  quizComplete: (selectedRole: string) => {
    trackEvent('quiz_complete', { selectedRole });
  },
};
