'use client';

interface SpotifyEmbedProps {
  episodeId: string;
  title?: string;
  className?: string;
}

export default function SpotifyEmbed({
  episodeId,
  title = 'Spotify Episode',
  className = '',
}: SpotifyEmbedProps) {
  const embedUrl = `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`;

  return (
    <div className={className}>
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        style={{ borderRadius: '12px' }}
      />
    </div>
  );
}
