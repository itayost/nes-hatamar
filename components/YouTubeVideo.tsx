'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
  aspectRatio?: '16:9' | '9:16';
}

export default function YouTubeVideo({
  videoId,
  title = 'YouTube Video',
  autoplay = true,
  className = '',
  aspectRatio = '16:9',
}: YouTubeVideoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoplay) {
      setIsVisible(true);
      return;
    }

    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [autoplay]);

  // Build YouTube embed URL with parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${
    autoplay && isVisible ? 'autoplay=1&' : ''
  }mute=1&controls=1&modestbranding=1&rel=0&playsinline=1`;

  const isVertical = aspectRatio === '9:16';
  const paddingBottom = isVertical ? '177.78%' : '56.25%';

  return (
    <div ref={videoRef} className={`${isVertical ? 'max-w-[400px] mx-auto' : ''} ${className}`}>
      {/* Responsive aspect ratio container */}
      <div className="relative w-full" style={{ paddingBottom }}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
