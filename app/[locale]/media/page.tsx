import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import YouTubeVideo from '@/components/YouTubeVideo';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import { generatePageMetadata } from '@/lib/og-metadata';
import { ArrowRightIcon, BookIcon, MediaIcon } from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'media' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/media',
  });
}

const videos = [
  {
    id: 's_MQZdp7YOc',
    titleKey: 'videos.channel13.title',
  },
  {
    id: 'aIPXpxhFgTY',
    titleKey: 'videos.channel14.title',
  },
  {
    id: '-9NtsvylPYM',
    titleKey: 'videos.kolchai.title',
  },
];

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('media');

  return (
    <div className="min-h-screen bg-cream">
      {/* Section 1: Hero */}
      <section className="relative bg-gradient-to-b from-white to-cream py-20 sm:py-28 overflow-hidden">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-6 animate-fadeIn">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-dark/70 max-w-3xl mx-auto animate-fadeIn delay-100">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider />

      {/* Section 2: Featured Image */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
          <AnimateOnScroll>
            <div className="relative bg-white/60 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-2xl border-4 border-gold/30 hover:border-gold/40 transition-all duration-300">
              <CornerOrnament position="top-left" size="md" />
              <CornerOrnament position="bottom-right" size="md" />

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src="/images/media/media_hero.webp"
                  alt={t('title')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Section 3: Videos */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          {/* Section Title */}
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full mb-6">
                <MediaIcon size={40} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4">
                {t('videosSection.title')}
              </h2>
              <p className="text-xl text-dark/70 max-w-2xl mx-auto">
                {t('videosSection.subtitle')}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Videos Grid */}
          <div className="space-y-8">
            {videos.map((video, index) => (
              <AnimateOnScroll key={video.id}>
                <div className="relative bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
                  {/* Video Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-6 flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </span>
                    <span>{t(video.titleKey)}</span>
                  </h3>

                  {/* YouTube Embed */}
                  <YouTubeVideo
                    videoId={video.id}
                    title={t(video.titleKey)}
                    autoplay={false}
                    className="rounded-xl overflow-hidden"
                  />

                  {/* Decorative corner brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-lg"></div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 4: Podcast */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
          {/* Section Title */}
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full mb-6">
                <BookIcon size={40} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4">
                {t('podcastSection.title')}
              </h2>
              <p className="text-xl text-dark/70 max-w-2xl mx-auto">
                {t('podcastSection.subtitle')}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Spotify Embed */}
          <AnimateOnScroll>
            <div className="relative bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300">
              {/* Podcast Info */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gold mb-2">
                  {t('podcastSection.episodeTitle')}
                </h3>
                <p className="text-dark/60">
                  {t('podcastSection.podcastName')}
                </p>
              </div>

              {/* Spotify Player */}
              <SpotifyEmbed
                episodeId="3DVo39jSl2pjozJc5qxFvb"
                title={t('podcastSection.episodeTitle')}
              />

              {/* Decorative elements */}
              <CornerOrnament position="top-left" size="sm" />
              <CornerOrnament position="bottom-right" size="sm" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-cream">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
          <AnimateOnScroll>
            <div className="relative p-12 md:p-16 bg-white/60 backdrop-blur-md rounded-3xl border-4 border-gold/30 shadow-2xl text-center">
              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-gold rounded-tr-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-gold rounded-bl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

              <div className="space-y-8">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  {t('cta.title')}
                </h2>
                <p className="text-xl sm:text-2xl text-dark/70 leading-relaxed max-w-3xl mx-auto">
                  {t('cta.subtitle')}
                </p>

                {/* Decorative divider */}
                <div className="flex justify-center items-center gap-4 py-4">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                  <div className="text-gold text-3xl">✦</div>
                  <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
                </div>

                <Link
                  href={`/${locale}/purchase`}
                  className="group btn-sacred-primary relative inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-gold via-gold-light to-gold text-white font-bold text-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] animate-pulse-glow"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('cta.button')}
                    <ArrowRightIcon size={28} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Bottom ornaments */}
      <div className="relative h-20 bg-gradient-to-t from-white to-cream">
        <CornerOrnament position="bottom-left" size="md" />
        <CornerOrnament position="bottom-right" size="md" />
      </div>
    </div>
  );
}
