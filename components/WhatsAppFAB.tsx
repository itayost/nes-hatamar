'use client';

import { useLocale } from 'next-intl';
import { WhatsAppIcon } from './icons/Icons';

export default function WhatsAppFAB() {
  const locale = useLocale();
  const isRTL = locale === 'he';

  // WhatsApp message (Hebrew)
  const message = encodeURIComponent('שלום, אני מעוניין/ת לקבל מידע על קורס ההומאופתיה');
  const whatsappUrl = `https://wa.me/972547709201?text=${message}`;

  const ariaLabel = locale === 'he'
    ? 'שליחת הודעת WhatsApp לתמר'
    : 'Send WhatsApp message to Tamar';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`fixed bottom-5 ${isRTL ? 'right-5' : 'left-5'} md:${isRTL ? 'right-8' : 'left-8'} md:bottom-8
        w-14 h-14 md:w-16 md:h-16
        bg-[#25D366] hover:bg-[#128C7E]
        rounded-full
        flex items-center justify-center
        shadow-2xl hover:shadow-[#25D366]/50
        transition-all duration-300
        hover:scale-110
        active:scale-95
        z-50
        group
        animate-pulse hover:animate-none`}
    >
      <WhatsAppIcon
        size={32}
        className="text-white md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-110"
      />

      {/* Ripple effect on hover */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
    </a>
  );
}
