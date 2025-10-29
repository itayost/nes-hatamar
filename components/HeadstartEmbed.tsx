'use client';

interface HeadstartEmbedProps {
  locale: string;
  size?: 'default' | 'full' | 'mini';
}

export default function HeadstartEmbed({
  locale,
  size = 'default'
}: HeadstartEmbedProps) {
  // Headstart project ID
  const projectId = '87579';

  // Dynamic language parameter based on locale
  const languageParam = locale === 'he' ? 'language=1&lang=he' : 'language=2&lang=en';

  // Embed dimensions based on size
  const dimensions = {
    default: { width: 244, height: 398 },
    full: { width: 1024, height: 368 },
    mini: { width: 244, height: 293 },
  };

  const { width, height } = dimensions[size];

  // Build iframe src URL
  const iframeSrc = `https://headstart.co.il/embed?id=${projectId}&size=${size}&${languageParam}`;

  return (
    <div className="relative w-full flex justify-center">
      {/* Iframe container with decorative styling */}
      <div className="relative">
        {/* Decorative corner ornaments */}
        <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold/60 rounded-tl-2xl pointer-events-none z-10"></div>
        <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-gold/60 rounded-tr-2xl pointer-events-none z-10"></div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-gold/60 rounded-bl-2xl pointer-events-none z-10"></div>
        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-gold/60 rounded-br-2xl pointer-events-none z-10"></div>

        {/* Iframe wrapper with responsive styling */}
        <div
          className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-gold/30 shadow-xl overflow-hidden"
          style={{
            width: size === 'full' ? '100%' : `${width}px`,
            maxWidth: '100%',
          }}
        >
          <iframe
            src={iframeSrc}
            width={width}
            height={height}
            title="Headstart Crowdfunding Campaign - נס התמר"
            className="w-full"
            style={{
              border: 'none',
              display: 'block',
              minHeight: `${height}px`,
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
