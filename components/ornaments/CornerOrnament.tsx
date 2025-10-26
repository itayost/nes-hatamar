import Image from 'next/image';

export default function CornerOrnament({
  position = 'top-left',
  size = 'md'
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
}) {
  // Map size to pixel dimensions
  const sizeValues = {
    sm: 48,   // 12 * 4 = 48px
    md: 64,   // 16 * 4 = 64px
    lg: 96    // 24 * 4 = 96px
  };

  // Map position to image file and CSS positioning
  const ornamentConfig = {
    'top-left': {
      src: '/images/ornaments/TL.png',
      className: 'top-0 left-0'
    },
    'top-right': {
      src: '/images/ornaments/TR.png',
      className: 'top-0 right-0'
    },
    'bottom-left': {
      src: '/images/ornaments/BL.png',
      className: 'bottom-0 left-0'
    },
    'bottom-right': {
      src: '/images/ornaments/BR.png',
      className: 'bottom-0 right-0'
    }
  };

  const config = ornamentConfig[position];
  const dimensions = sizeValues[size];

  return (
    <div
      className={`absolute ${config.className} opacity-40 pointer-events-none`}
      style={{ width: dimensions, height: dimensions }}
    >
      <Image
        src={config.src}
        alt={`Corner ornament - ${position}`}
        width={375}
        height={375}
        className="w-full h-full object-contain"
        quality={95}
      />
    </div>
  );
}
