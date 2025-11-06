'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface FlipbookEmbedProps {
  hash: string;
  className?: string;
}

export default function FlipbookEmbed({ hash, className = '' }: FlipbookEmbedProps) {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`flipbook-embed-container ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream/50 backdrop-blur-sm rounded-lg z-10">
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gold font-medium">
              {locale === 'he' ? 'טוען את הספר...' : 'Loading the book...'}
            </p>
          </div>
        </div>
      )}

      {/* Responsive iframe wrapper */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        <iframe
          src={`https://player.flipsnack.com?hash=${hash}`}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          seamless
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-read; clipboard-write"
          onLoad={handleLoad}
          title={locale === 'he' ? 'נס התמר - דפדפן הספר' : 'Nes HaTamar - Book Flipbook'}
          loading="lazy"
        />
      </div>

      {/* Instructions */}
      <p className="text-center text-sm text-dark/50 mt-6">
        {locale === 'he'
          ? 'לחץ על הספר לדפדוף, או השתמש בחצים לניווט בין העמודים'
          : 'Click the book to flip pages, or use arrows to navigate'}
      </p>
    </div>
  );
}
