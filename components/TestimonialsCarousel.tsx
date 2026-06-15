'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Testimonial = {
  name: string;
  title: string;
  quote: string;
};

const ROTATE_MS = 6000;

export default function TestimonialsCarousel() {
  const t = useTranslations('home.testimonials');
  const items = (t.raw('items') as Testimonial[] | undefined) ?? [];

  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Auto-rotate. Pauses on hover/focus and while a testimonial is expanded.
  // `current` in deps resets the timer after manual navigation.
  useEffect(() => {
    if (paused || expanded || items.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, expanded, items.length, current]);

  // Detect whether the clamped quote actually overflows, so the read-more
  // toggle tracks the real (responsive) truncation rather than a char guess.
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const measure = () => setIsClamped(el.scrollHeight > el.clientHeight + 1);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [current, expanded]);

  if (items.length === 0) return null;

  const goTo = (index: number) => {
    setCurrent(index);
    setExpanded(false);
  };

  const active = items[current];
  const showToggle = isClamped || expanded;

  return (
    <div className="relative">
      {/* Ornamental frame */}
      <div
        className="relative p-10 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-gold/30 shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Corner ornaments */}
        <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold/60 rounded-tl-2xl"></div>
        <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-gold/60 rounded-tr-2xl"></div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-gold/60 rounded-bl-2xl"></div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-gold/60 rounded-br-2xl"></div>

        {/* Quote mark ornament */}
        <div className="text-gold/20 text-7xl leading-none text-center mb-2 select-none">&rdquo;</div>

        {/* Slide */}
        <div key={current} className="animate-fadeIn">
          <div className="min-h-[180px] flex flex-col justify-center">
            <p
              ref={quoteRef}
              className={`text-lg italic text-dark/80 leading-relaxed text-center whitespace-pre-line ${
                !expanded ? 'line-clamp-4' : ''
              }`}
            >
              {active.quote}
            </p>

            {showToggle && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 mx-auto text-sm font-medium text-gold hover:text-gold/70 transition-colors"
              >
                {expanded ? t('readLess') : t('readMore')}
              </button>
            )}
          </div>

          {/* Attribution */}
          <div className="mt-6 text-center">
            <p className="text-gold font-bold">{active.name}</p>
            {active.title && (
              <p className="text-dark/60 text-sm mt-1">{active.title}</p>
            )}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={item.name}
              aria-current={index === current}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-6 bg-gold'
                  : 'w-2 bg-gold/30 hover:bg-gold/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating ornament */}
      <div
        className="absolute -bottom-6 -right-6 text-gold/40 text-4xl animate-float pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      >
        ✦
      </div>
    </div>
  );
}
