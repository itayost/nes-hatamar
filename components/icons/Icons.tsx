import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Home Icon - Elegant dwelling with ornamental roof
export const HomeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    {/* Ornamental dot at roof peak */}
    <circle cx="12" cy="3" r="1" fill="currentColor" />
  </svg>
);

// About Icon - Open book with ornamental details
export const AboutIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 6.5C10.5 4.5 8.5 4 6.5 4C4.5 4 3 4.5 3 4.5v14s1.5-0.5 3.5-0.5c2 0 4 0.5 5.5 2.5c1.5-2 3.5-2.5 5.5-2.5c2 0 3.5 0.5 3.5 0.5v-14s-1.5-0.5-3.5-0.5c-2 0-4 0.5-5.5 2.5z" />
    {/* Ornamental bookmark */}
    <path d="M12 6.5v13.5" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

// Preview Icon - Eye with ornamental frame
export const PreviewIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
    {/* Ornamental accents */}
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

// Purchase Icon - Elegant scroll with seal
export const PurchaseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 2a1 1 0 00-1 1v1H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1z" />
    {/* Ornamental checkmark/seal */}
    <path d="M9 11l2 2 4-4" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" opacity="0.2" fill="currentColor" />
  </svg>
);

// Email Icon - Elegant envelope
export const EmailIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    {/* Ornamental seal */}
    <circle cx="12" cy="12" r="2" opacity="0.3" fill="currentColor" />
  </svg>
);

// Links Icon - Ornamental list/scroll
export const LinksIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    {/* Ornamental lines */}
    <path d="M9 12h6M9 16h6" strokeWidth="2" />
    <circle cx="9" cy="12" r="0.5" fill="currentColor" />
    <circle cx="9" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

// Book Icon - Closed book with ornamental details
export const BookIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    {/* Ornamental bookmark and details */}
    <path d="M12 2v7l2-1.5L16 9V2" fill="currentColor" opacity="0.2" />
    <path d="M8 10h8M8 14h5" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Star/Ornament Icon - Decorative accent
export const OrnamentIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Arrow Up Icon - For back to top
export const ArrowUpIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

// Social Icons - Simple, elegant circular designs
export const FacebookIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M14 9h2.5L16 12h-2v7h-3v-7H9v-3h2V8.5A2.5 2.5 0 0113.5 6H15v3h-1a1 1 0 00-1 1v-1z" fill="currentColor" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* WhatsApp logo shape - phone handset in speech bubble */}
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Leaf Icon - For plants and natural healing
export const LeafIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main leaf shape */}
    <path d="M12 2C8 2 4 6 4 10c0 4 3 8 8 10 5-2 8-6 8-10 0-4-4-8-8-8z" />
    {/* Leaf vein - center line */}
    <path d="M12 2v18" strokeDasharray="2 2" opacity="0.6" />
    {/* Ornamental side veins */}
    <path d="M12 6c-2 1-4 3-4 6" opacity="0.4" />
    <path d="M12 6c2 1 4 3 4 6" opacity="0.4" />
    {/* Ornamental dots */}
    <circle cx="12" cy="4" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="9" cy="10" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="15" cy="10" r="0.5" fill="currentColor" opacity="0.4" />
  </svg>
);

// Torah Scroll Icon - For Torah and sacred texts
export const TorahScrollIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Scroll rollers */}
    <rect x="3" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="19" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.3" />
    {/* Scroll paper */}
    <path d="M5 6h14v12H5z" />
    {/* Torah text lines */}
    <path d="M8 10h8M8 12h8M8 14h6" strokeWidth="1" opacity="0.6" />
    {/* Ornamental crown/decoration at top */}
    <path d="M12 4v2" strokeWidth="2" />
    <circle cx="12" cy="3.5" r="1" fill="currentColor" />
    {/* Side decorative dots */}
    <circle cx="7" cy="8" r="0.5" fill="currentColor" opacity="0.4" />
    <circle cx="17" cy="8" r="0.5" fill="currentColor" opacity="0.4" />
  </svg>
);

// Palette Icon - For art and creativity
export const PaletteIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Palette shape */}
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 2.5-1 2.5-2.5 0-.7-.2-1.3-.6-1.8-.3-.4-.4-.9-.4-1.4 0-1.4 1.1-2.5 2.5-2.5h3c3.3 0 6-2.7 6-6 0-5-4.5-6-10-6z" />
    {/* Paint color dots */}
    <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" opacity="0.6" />
    <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" opacity="0.3" />
    {/* Ornamental sparkle */}
    <path d="M19 4l.5 1.5L21 6l-1.5.5L19 8l-.5-1.5L17 6l1.5-.5z" fill="currentColor" opacity="0.4" strokeWidth="0.5" />
  </svg>
);

// Arrow Right Icon - For CTAs and navigation
export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// User Icon - For author profiles and people
export const UserIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Head */}
    <circle cx="12" cy="8" r="4" />
    {/* Body/shoulders */}
    <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    {/* Decorative dots for sacred style */}
    <circle cx="12" cy="5" r="0.8" fill="currentColor" opacity="0.4" />
    <circle cx="9" cy="8" r="0.6" fill="currentColor" opacity="0.3" />
    <circle cx="15" cy="8" r="0.6" fill="currentColor" opacity="0.3" />
  </svg>
);

// Mail Icon - For contact and email
export const MailIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Envelope */}
    <rect x="3" y="5" width="18" height="14" rx="2" />
    {/* Letter fold */}
    <path d="M3 7l9 6 9-6" />
    {/* Decorative seal */}
    <circle cx="12" cy="13" r="2" opacity="0.3" />
    <circle cx="12" cy="13" r="1" fill="currentColor" opacity="0.4" />
  </svg>
);

// Gallery Icon - For image galleries and visual content
export const GalleryIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main frame */}
    <rect x="3" y="3" width="18" height="18" rx="2" />
    {/* Inner decorative frame */}
    <rect x="6" y="6" width="12" height="12" rx="1" opacity="0.5" />
    {/* Mountains/landscape */}
    <path d="M6 15l3-3 3 3 3-4 3 3" opacity="0.6" />
    {/* Sun/moon */}
    <circle cx="15" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
  </svg>
);

// Star Icon - For quality and premium features
export const StarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main star */}
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    {/* Inner decorative star */}
    <path d="M12 6l1.5 3 3.3.5-2.4 2.3.6 3.3L12 13.5l-3 1.6.6-3.3-2.4-2.3 3.3-.5L12 6z" opacity="0.3" />
    {/* Center glow */}
    <circle cx="12" cy="11" r="2" opacity="0.2" />
    <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.4" />
    {/* Decorative sparkle dots */}
    <circle cx="12" cy="2" r="0.8" fill="currentColor" opacity="0.5" />
    <circle cx="22" cy="9.27" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="2" cy="9.27" r="0.6" fill="currentColor" opacity="0.4" />
  </svg>
);

// Check Circle Icon - For confirmations and checkmarks
export const CheckCircleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Circle */}
    <circle cx="12" cy="12" r="10" />
    {/* Check mark */}
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
    {/* Decorative inner circle */}
    <circle cx="12" cy="12" r="6" opacity="0.1" fill="currentColor" />
  </svg>
);

// Animal Icon - For animals and living creatures
export const AnimalIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Animal paw print - main pad */}
    <ellipse cx="12" cy="14" rx="3.5" ry="4" />
    {/* Top left toe */}
    <ellipse cx="7" cy="9" rx="1.8" ry="2.2" />
    {/* Top center toe */}
    <ellipse cx="12" cy="7" rx="1.8" ry="2.2" />
    {/* Top right toe */}
    <ellipse cx="17" cy="9" rx="1.8" ry="2.2" />
    {/* Decorative dots */}
    <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="7" cy="9" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="12" cy="7" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="17" cy="9" r="0.6" fill="currentColor" opacity="0.4" />
  </svg>
);

// Gem Icon - For minerals, gems, and precious stones
export const GemIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Diamond/gem shape */}
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    {/* Top facets */}
    <path d="M6 3l6 6m6-6l-6 6m-6 0h12" opacity="0.5" />
    {/* Side facets */}
    <path d="M2 9l10 3m10-3L12 12" opacity="0.4" />
    {/* Center facets */}
    <path d="M6 9l6 3m6-3l-6 3" opacity="0.3" />
    {/* Sparkle effect */}
    <circle cx="12" cy="7" r="0.8" fill="currentColor" opacity="0.6" />
    <circle cx="8" cy="9" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="16" cy="9" r="0.5" fill="currentColor" opacity="0.5" />
  </svg>
);

// Calendar Icon - For dates and scheduling
export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Calendar frame */}
    <rect x="3" y="4" width="18" height="18" rx="2" />
    {/* Top binding */}
    <path d="M3 9h18" strokeWidth="2" />
    {/* Hanging loops */}
    <path d="M8 3v4m8-4v4" strokeWidth="2" />
    {/* Date dots/marks */}
    <circle cx="8" cy="13" r="0.8" fill="currentColor" />
    <circle cx="12" cy="13" r="0.8" fill="currentColor" />
    <circle cx="16" cy="13" r="0.8" fill="currentColor" />
    <circle cx="8" cy="17" r="0.8" fill="currentColor" />
    <circle cx="12" cy="17" r="0.8" fill="currentColor" />
    <circle cx="16" cy="17" r="0.8" fill="currentColor" />
    {/* Decorative highlight */}
    <circle cx="12" cy="13" r="1.5" opacity="0.2" />
  </svg>
);

// Clock Icon - For time and duration
export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Clock circle */}
    <circle cx="12" cy="12" r="9" />
    {/* Clock hands - showing 10:10 (classic watch advertisement time) */}
    <path d="M12 6v6l4 2" strokeWidth="2" />
    {/* Hour markers */}
    <circle cx="12" cy="5" r="0.8" fill="currentColor" />
    <circle cx="17" cy="7" r="0.8" fill="currentColor" />
    <circle cx="19" cy="12" r="0.8" fill="currentColor" />
    <circle cx="17" cy="17" r="0.8" fill="currentColor" />
    <circle cx="12" cy="19" r="0.8" fill="currentColor" />
    <circle cx="7" cy="17" r="0.8" fill="currentColor" />
    <circle cx="5" cy="12" r="0.8" fill="currentColor" />
    <circle cx="7" cy="7" r="0.8" fill="currentColor" />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// Coin Icon - For money, pricing, and currency
export const CoinIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Main coin */}
    <circle cx="12" cy="12" r="9" />
    {/* Inner decorative circle */}
    <circle cx="12" cy="12" r="6.5" opacity="0.3" />
    {/* Currency symbol - Shekel ₪ */}
    <path d="M10 8v8m4-8v4c0 1.1-.9 2-2 2" strokeWidth="2" />
    {/* Coin shine/highlight effect */}
    <path d="M8 6c2-1.5 6-1.5 8 0" opacity="0.4" />
    <circle cx="9" cy="8" r="1" fill="currentColor" opacity="0.3" />
    {/* Decorative dots around edge */}
    <circle cx="12" cy="4" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="18" cy="8" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="18" cy="16" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="6" cy="8" r="0.6" fill="currentColor" opacity="0.4" />
    <circle cx="6" cy="16" r="0.6" fill="currentColor" opacity="0.4" />
  </svg>
);
