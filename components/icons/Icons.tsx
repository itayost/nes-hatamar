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
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8.5 14.5c1.5 2 3 3 5 3 3 0 5-2 5-5 0-3-2-5-5-5s-5 2-5 5c0 1 .5 2 1 2.5l-1 3 3-1z" />
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
