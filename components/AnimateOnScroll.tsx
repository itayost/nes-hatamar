'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = 'animate-fadeIn',
  delay = 0,
  threshold = 0.1,
  className = '',
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing (animation only happens once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px', // Start animation slightly before element is fully visible
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
      style={{
        animationDelay: isVisible && delay > 0 ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
