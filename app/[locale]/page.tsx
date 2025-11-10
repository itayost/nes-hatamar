import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import YouTubeVideo from '@/components/YouTubeVideo';
import { generatePageMetadata } from '@/lib/og-metadata';
import {
  LeafIcon,
  TorahScrollIcon,
  PaletteIcon,
  ArrowRightIcon,
  OrnamentIcon,
  AboutIcon,
  PreviewIcon
} from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | Nes HaTamar`,
    description: t('subtitle'),
    path: '',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-cream/30 to-cream py-20 md:py-32 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Book Cover */}
            <div className="relative">
              <div className="relative mx-auto max-w-md group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full animate-glow"></div>

                {/* Decorative corner elements on frame */}
                <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-2xl border-4 border-gold/30 animate-float">
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-gold rounded-tl-lg"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-gold rounded-tr-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-gold rounded-bl-lg"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-gold rounded-br-lg"></div>

                  <div className="relative">
                    <Image
                      src="/images/cover.png"
                      alt={t('title')}
                      width={1326}
                      height={1590}
                      className="w-full h-auto rounded-md shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                      priority
                    />
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-md"></div>
                  </div>
                </div>

                {/* Additional decorative corner ornaments */}
                <div className="absolute -top-4 -left-4">
                  <CornerOrnament position="top-left" size="sm" />
                </div>
                <div className="absolute -top-4 -right-4">
                  <CornerOrnament position="top-right" size="sm" />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <CornerOrnament position="bottom-left" size="sm" />
                </div>
                <div className="absolute -bottom-4 -right-4">
                  <CornerOrnament position="bottom-right" size="sm" />
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6 md:space-y-8">
              {/* Title */}
              <div className="animate-slideUp">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gold leading-tight mb-4">
                  {t('title')}
                </h1>
                {/* Decorative underline */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1 w-16 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
                  <div className="h-1 w-8 bg-gold-light rounded-full"></div>
                  <div className="h-1 w-4 bg-gold-light/50 rounded-full"></div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-dark/80 leading-relaxed animate-slideUp delay-100">
                {t('subtitle')}
              </p>

              {/* Author Names */}
              <div className="flex items-center gap-3 text-dark/70 animate-slideUp delay-200">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold"></div>
                <p className="text-lg font-medium">
                  {locale === 'he' ? 'תמר אשל • נסים קריספיל' : 'Tamar Eshel • Nissim Krispil'}
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-6 animate-slideUp delay-300">
                <Link
                  href={`/${locale}/purchase`}
                  className="group btn-sacred-primary inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-gold via-gold to-gold-light text-white font-bold text-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('cta')}
                    <ArrowRightIcon size={24} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>

                <Link
                  href={`/${locale}/preview`}
                  className="group btn-sacred inline-flex items-center justify-center px-12 py-5 border-2 border-gold text-gold font-bold text-xl bg-white/50 backdrop-blur-sm hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                >
                  {locale === 'he' ? 'הצצה לספר' : 'Preview Book'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Description Section */}
      <section className="py-20 bg-cream relative overflow-hidden">
        {/* Floating ornaments in background */}
        <div className="absolute top-20 left-1/4 text-gold/5 text-6xl pointer-events-none animate-float">✦</div>
        <div className="absolute bottom-20 right-1/4 text-gold/5 text-6xl pointer-events-none animate-float" style={{ animationDelay: '1s' }}>✦</div>

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Main Description */}
            <div className="space-y-8 text-lg leading-relaxed text-dark/90">
              <p className="text-xl font-medium first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-start first-letter:me-3 first-letter:leading-[0.8]">
                {t('description')}
              </p>

              <p>
                {t('journey')}
              </p>

              <p>
                {t('connection')}
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 py-4">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gold/40"></div>
                <div className="text-gold text-2xl">✦</div>
                <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gold/40"></div>
              </div>
            </div>

            {/* Right Column - Pull Quote / Highlight */}
            <div className="relative">
              {/* Ornamental frame */}
              <div className="relative p-10 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-gold/30 shadow-xl">
                {/* Corner ornaments */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold/60 rounded-tl-2xl"></div>
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-gold/60 rounded-tr-2xl"></div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-gold/60 rounded-bl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-gold/60 rounded-br-2xl"></div>

                {/* Quote mark ornament */}
                <div className="text-gold/20 text-8xl leading-none mb-4"></div>

                {/* Quote content */}
                <p className="text-xl italic text-dark/80 leading-relaxed mb-6">
                  {t('experience')}
                </p>

                {/* Bottom decorative element */}
                <div className="flex justify-center gap-2 mt-8">
                  <div className="w-3 h-3 rounded-full bg-gold"></div>
                  <div className="w-3 h-3 rounded-full bg-gold/60"></div>
                  <div className="w-3 h-3 rounded-full bg-gold/30"></div>
                </div>
              </div>

              {/* Floating ornament */}
              <div className="absolute -bottom-6 -right-6 text-gold/40 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>✦</div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Video Section */}
      <section className="relative py-20 bg-cream overflow-hidden">
        {/* Floating ornaments in background */}
        <div className="absolute top-20 left-1/4 text-gold/5 text-6xl pointer-events-none animate-float">✦</div>
        <div className="absolute bottom-20 right-1/4 text-gold/5 text-6xl pointer-events-none animate-float" style={{ animationDelay: '1s' }}>✦</div>

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          {/* Section Header */}
          <AnimateOnScroll animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gold mb-4">
                {t('video.title')}
              </h2>
              <p className="text-xl text-dark/70 max-w-3xl mx-auto">
                {t('video.subtitle')}
              </p>
              {/* Decorative underline */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="text-gold text-2xl">✦</div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold"></div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Video Container with Ornamental Frame */}
          <AnimateOnScroll animation="slideUp">
            <div className="relative">
              <div className="relative p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-gold/30 shadow-xl">
                {/* Corner ornaments */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold/60 rounded-tl-2xl"></div>
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-gold/60 rounded-tr-2xl"></div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-gold/60 rounded-bl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-gold/60 rounded-br-2xl"></div>

                {/* YouTube Video */}
                <YouTubeVideo
                  videoId="xP7-L3CsCQ4"
                  title={t('video.title')}
                  autoplay={true}
                />
              </div>

              {/* Floating ornament */}
              <div className="absolute -bottom-6 -right-6 text-gold/40 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>✦</div>
            </div>
          </AnimateOnScroll>

          {/* Call-to-Action Buttons */}
          <AnimateOnScroll animation="slideUp">
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
              <Link
                href={`/${locale}/purchase`}
                className="group btn-sacred-primary inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gold via-gold to-gold-light text-white font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('video.ctaPrimary')}
                  <ArrowRightIcon size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>

              <Link
                href={`/${locale}/preview`}
                className="group btn-sacred inline-flex items-center justify-center px-10 py-4 border-2 border-gold text-gold font-bold text-lg bg-white/50 backdrop-blur-sm hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
              >
                {t('video.ctaSecondary')}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Video Section 2 */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Floating ornaments in background */}
        <div className="absolute top-20 left-1/4 text-gold/5 text-6xl pointer-events-none animate-float">✦</div>
        <div className="absolute bottom-20 right-1/4 text-gold/5 text-6xl pointer-events-none animate-float" style={{ animationDelay: '1s' }}>✦</div>

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          {/* Section Header */}
          <AnimateOnScroll animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gold mb-4">
                {t('video2.title')}
              </h2>
              <p className="text-xl text-dark/70 max-w-3xl mx-auto">
                {t('video2.subtitle')}
              </p>
              {/* Decorative underline */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="text-gold text-2xl">✦</div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold"></div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Video Container with Ornamental Frame */}
          <AnimateOnScroll animation="slideUp">
            <div className="relative">
              <div className="relative p-6 md:p-8 bg-cream/60 backdrop-blur-sm rounded-2xl border-2 border-gold/30 shadow-xl">
                {/* Corner ornaments */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-gold/60 rounded-tl-2xl"></div>
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-gold/60 rounded-tr-2xl"></div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-gold/60 rounded-bl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-gold/60 rounded-br-2xl"></div>

                {/* YouTube Video */}
                <YouTubeVideo
                  videoId="aIPXpxhFgTY"
                  title={t('video2.title')}
                  autoplay={true}
                />
              </div>

              {/* Floating ornament */}
              <div className="absolute -bottom-6 -right-6 text-gold/40 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>✦</div>
            </div>
          </AnimateOnScroll>

          {/* Call-to-Action Buttons */}
          <AnimateOnScroll animation="slideUp">
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
              <Link
                href={`/${locale}/purchase`}
                className="group btn-sacred-primary inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gold via-gold to-gold-light text-white font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('video2.ctaPrimary')}
                  <ArrowRightIcon size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>

              <Link
                href={`/${locale}/preview`}
                className="group btn-sacred inline-flex items-center justify-center px-10 py-4 border-2 border-gold text-gold font-bold text-lg bg-white/50 backdrop-blur-sm hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
              >
                {t('video2.ctaSecondary')}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative ornaments */}
        <div className="absolute top-10 left-10 text-gold/5 text-9xl pointer-events-none">✦</div>
        <div className="absolute bottom-10 right-10 text-gold/5 text-9xl pointer-events-none">✦</div>

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {/* Feature 1 - Plants & Minerals */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative">
              {/* Numbered badge */}
              <div className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                01
              </div>

              {/* Card with glass morphism */}
              <div className="relative h-full p-10 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2 overflow-hidden">
                {/* Ornamental corner borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1.5s' }}></div>

                <div className="relative text-center space-y-5">
                  {/* Icon with animation */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors duration-300">
                    <LeafIcon size={48} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-gold group-hover:text-gold-light transition-colors duration-300">
                    {t('features.plants.title')}
                  </h3>

                  <p className="text-dark/70 leading-relaxed">
                    {t('features.plants.description')}
                  </p>

                  {/* Decorative dot */}
                  <div className="flex justify-center gap-2 pt-2">
                    <div className="w-2 h-2 rounded-full bg-gold/40"></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60"></div>
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                  </div>
                </div>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Feature 2 - Torah & Homeopathy */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative">
              {/* Numbered badge */}
              <div className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                02
              </div>

              {/* Card with glass morphism */}
              <div className="relative h-full p-10 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2 overflow-hidden">
                {/* Ornamental corner borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1.5s' }}></div>

                <div className="relative text-center space-y-5">
                  {/* Icon with animation */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors duration-300">
                    <TorahScrollIcon size={48} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-gold group-hover:text-gold-light transition-colors duration-300">
                    {t('features.torah.title')}
                  </h3>

                  <p className="text-dark/70 leading-relaxed">
                    {t('features.torah.description')}
                  </p>

                  {/* Decorative dot */}
                  <div className="flex justify-center gap-2 pt-2">
                    <div className="w-2 h-2 rounded-full bg-gold/40"></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60"></div>
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                  </div>
                </div>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Feature 3 - Art & Experience */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative">
              {/* Numbered badge */}
              <div className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                03
              </div>

              {/* Card with glass morphism */}
              <div className="relative h-full p-10 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2 overflow-hidden">
                {/* Ornamental corner borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1.5s' }}></div>

                <div className="relative text-center space-y-5">
                  {/* Icon with animation */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors duration-300">
                    <PaletteIcon size={48} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-gold group-hover:text-gold-light transition-colors duration-300">
                    {t('features.art.title')}
                  </h3>

                  <p className="text-dark/70 leading-relaxed">
                    {t('features.art.description')}
                  </p>

                  {/* Decorative dot */}
                  <div className="flex justify-center gap-2 pt-2">
                    <div className="w-2 h-2 rounded-full bg-gold/40"></div>
                    <div className="w-2 h-2 rounded-full bg-gold/60"></div>
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                  </div>
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Divider />

      {/* What's Inside Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background ornaments */}
        <div className="absolute top-1/4 left-10 text-gold/5 text-7xl pointer-events-none rotate-45">✦</div>
        <div className="absolute bottom-1/4 right-10 text-gold/5 text-7xl pointer-events-none -rotate-45">✦</div>

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gold mb-4">
              {t('whatsInside.title')}
            </h2>
            <p className="text-xl text-dark/70 max-w-3xl mx-auto">
              {t('whatsInside.subtitle')}
            </p>
            {/* Decorative underline */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold"></div>
              <div className="text-gold text-2xl">✦</div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold"></div>
            </div>
          </div>

          {/* Content Grid - 2x3 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Item 1 - Torah Sources */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/references.jpeg"
                  alt={t('whatsInside.items.torahSources.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.torahSources.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.torahSources.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Item 2 - Homeopathy & Chassidut */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/homeopathia.jpeg"
                  alt={t('whatsInside.items.homeopathyChassidut.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.homeopathyChassidut.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.homeopathyChassidut.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Item 3 - Plant Remedies */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/plants.jpeg"
                  alt={t('whatsInside.items.plantRemedies.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.plantRemedies.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.plantRemedies.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Item 4 - Animal Remedies */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/animals-kingdom.jpeg"
                  alt={t('whatsInside.items.animalRemedies.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.animalRemedies.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.animalRemedies.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Item 5 - Mineral Remedies */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/minerals-kingdom.jpeg"
                  alt={t('whatsInside.items.mineralRemedies.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.mineralRemedies.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.mineralRemedies.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Item 6 - Seven Metals */}
            <AnimateOnScroll animation="slideUp">
            <div className="group relative overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/preview/metal-kingdom.jpeg"
                  alt={t('whatsInside.items.sevenMetals.title')}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-cream/40 to-white">
                <h3 className="text-xl font-bold text-gold mb-2">{t('whatsInside.items.sevenMetals.title')}</h3>
                <p className="text-dark/70 text-sm leading-relaxed">{t('whatsInside.items.sevenMetals.description')}</p>
              </div>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Divider />

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gold/10 via-cream/50 to-gold/5 overflow-hidden">
        {/* Large background ornaments */}
        <div className="absolute top-10 left-10 text-gold/5 text-9xl pointer-events-none animate-float">✦</div>
        <div className="absolute top-10 right-10 text-gold/5 text-9xl pointer-events-none animate-float" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/5 text-9xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}>✦</div>

        {/* Corner ornaments */}
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl relative">
          {/* Ornamental frame */}
          <div className="relative p-12 md:p-16 bg-white/60 backdrop-blur-md rounded-3xl border-4 border-gold/30 shadow-2xl">
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-gold rounded-tr-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-gold rounded-bl-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

            <div className="text-center space-y-8">
              {/* Title */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  {t('finalCta.title')}
                </h2>
                <p className="text-xl sm:text-2xl text-dark/70 leading-relaxed max-w-3xl mx-auto">
                  {t('finalCta.subtitle')}
                </p>
              </div>

              {/* Decorative divider */}
              <div className="flex justify-center items-center gap-4 py-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="text-gold text-3xl animate-pulse">✦</div>
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href={`/${locale}/purchase`}
                  className="group btn-sacred-primary relative inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-gold via-gold-light to-gold text-white font-bold text-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('finalCta.button')}
                    <ArrowRightIcon size={28} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-dark/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold">✓</span>
                  </div>
                  <span className="font-medium">{t('finalCta.trust.secure')}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gold/30"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold">✓</span>
                  </div>
                  <span className="font-medium">{t('finalCta.trust.shipping')}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gold/30"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold">✓</span>
                  </div>
                  <span className="font-medium">{t('finalCta.trust.support')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom corner ornaments */}
        <CornerOrnament position="bottom-left" size="lg" />
        <CornerOrnament position="bottom-right" size="lg" />
      </section>

      {/* Bottom ornaments */}
      <div className="relative h-20 bg-gradient-to-t from-white to-cream">
        <CornerOrnament position="bottom-left" size="md" />
        <CornerOrnament position="bottom-right" size="md" />
      </div>
    </div>
  );
}
