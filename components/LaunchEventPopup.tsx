'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import CornerOrnament from './ornaments/CornerOrnament';
import LaunchEventCard from './LaunchEventCard';
import { CloseIcon } from './icons/Icons';
import {
  LAUNCH_EVENT_POPUP_KEY,
  isLaunchEventUpcoming,
} from '@/lib/launch-event';

/** Delay before opening so the popup never competes with the hero LCP. */
const OPEN_DELAY_MS = 1200;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** sessionStorage throws in Safari private mode - never let that break the page. */
function hasSeenPopup(): boolean {
  try {
    return window.sessionStorage.getItem(LAUNCH_EVENT_POPUP_KEY) === '1';
  } catch {
    return true;
  }
}

function markPopupSeen(): void {
  try {
    window.sessionStorage.setItem(LAUNCH_EVENT_POPUP_KEY, '1');
  } catch {
    // Ignore - the popup simply shows again in this browser.
  }
}

/**
 * Entry popup announcing the book launch event. Shows once per browser
 * session, on any page except checkout, and stops appearing on its own once
 * the event date has passed.
 */
export default function LaunchEventPopup() {
  const t = useTranslations('event');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Decide whether to open. Date check runs on the client, so it stays
  // accurate no matter when the page was statically built.
  useEffect(() => {
    if (!isLaunchEventUpcoming()) return;
    if (pathname?.includes('/purchase')) return;
    if (hasSeenPopup()) return;

    const timer = window.setTimeout(() => {
      markPopupSeen();
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
    // Intentionally runs once per mount: marking the popup as seen already
    // prevents it from reopening on client-side navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll while open, and restore it on close or unmount.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Move focus into the dialog on open and return it to the trigger on close.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  // Escape to dismiss, Tab cycles within the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm animate-fadeIn"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-event-popup-title"
        className="relative z-10 max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl border-4 border-gold/30 bg-cream p-6 shadow-2xl animate-scaleIn sm:p-8"
      >
        <CornerOrnament position="top-left" size="sm" />
        <CornerOrnament position="bottom-right" size="sm" />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label={t('close')}
          className="absolute top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-dark/60 shadow-md transition-all duration-200 hover:bg-white hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold end-3"
        >
          <CloseIcon size={20} />
        </button>

        {/* Accessible name for the dialog; the visible heading lives in the card. */}
        <h2 id="launch-event-popup-title" className="sr-only">
          {t('badge')} - {t('title')}
        </h2>

        <div className="relative pt-6">
          <LaunchEventCard variant="popup" />
        </div>
      </div>
    </div>
  );
}
