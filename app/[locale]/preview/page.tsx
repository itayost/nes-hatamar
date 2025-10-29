import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { generatePageMetadata } from '@/lib/og-metadata';
import { GalleryIcon, LeafIcon, TorahScrollIcon, PaletteIcon, BookIcon, StarIcon, ArrowRightIcon } from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'preview' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/preview',
  });
}

export default async function PreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('preview');

  // Real preview images from the book
  const previewImages = [
    {
      id: 1,
      src: '/images/preview/preview1.jpeg',
      alt: 'נס התמר - Book Box | ספר בקופסא',
      titleHe: 'אריזת הספר',
      titleEn: 'Book Packaging'
    },
    {
      id: 2,
      src: '/images/preview/preview2.jpeg',
      alt: 'נס התמר - Inside Pages | עמודים פנימיים',
      titleHe: 'עמוד מהספר - צינכונה',
      titleEn: 'Book Page - Cinchona'
    },
    {
      id: 3,
      src: '/images/preview/preview3.jpeg',
      alt: 'נס התמר - Gold Edge Pages | עמודים עם זיהוב זהב',
      titleHe: 'עמודים בזיהוב זהב',
      titleEn: 'Gold-Edged Pages'
    },
  ];

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

      {/* Section 2: Book Highlights */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <AnimateOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-12">
              {t('highlights.title')}
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Highlight 1: Premium Quality */}
            <AnimateOnScroll>
              <div className="group relative">
                <div className="relative h-full p-8 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                    <StarIcon size={32} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-3">{t('highlights.quality.title')}</h3>
                  <p className="text-dark/70 leading-relaxed">{t('highlights.quality.description')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Highlight 2: Rich Content */}
            <AnimateOnScroll>
              <div className="group relative">
                <div className="relative h-full p-8 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                    <BookIcon size={32} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-3">{t('highlights.content.title')}</h3>
                  <p className="text-dark/70 leading-relaxed">{t('highlights.content.description')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Highlight 3: Beautiful Artwork */}
            <AnimateOnScroll>
              <div className="group relative">
                <div className="relative h-full p-8 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                    <PaletteIcon size={32} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-3">{t('highlights.artwork.title')}</h3>
                  <p className="text-dark/70 leading-relaxed">{t('highlights.artwork.description')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Highlight 4: One of a Kind */}
            <AnimateOnScroll>
              <div className="group relative">
                <div className="relative h-full p-8 bg-gradient-to-br from-cream/50 via-white to-cream/30 backdrop-blur-sm rounded-2xl border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
                    <TorahScrollIcon size={32} className="text-gold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gold mb-3">{t('highlights.unique.title')}</h3>
                  <p className="text-dark/70 leading-relaxed">{t('highlights.unique.description')}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 3: Gallery */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full mb-6">
                <GalleryIcon size={40} className="text-gold" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4">
                {t('gallery.title')}
              </h2>
              <p className="text-xl text-dark/70 max-w-2xl mx-auto">
                {t('gallery.description')}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {previewImages.map((image, index) => (
              <AnimateOnScroll key={image.id}>
                <div className="relative group">
                  <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

                    <CornerOrnament position="top-left" size="sm" />
                    <CornerOrnament position="bottom-right" size="sm" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-base font-semibold text-dark/80">{image.titleHe}</p>
                    <p className="text-sm text-dark/60">{image.titleEn}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 4: Sample Content */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
          <AnimateOnScroll>
            <div className="relative bg-white/60 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl border-4 border-gold/30">
              <CornerOrnament position="top-left" size="lg" />
              <CornerOrnament position="bottom-right" size="lg" />

              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
                    {t('sampleChapter.title')}
                  </h2>
                  <p className="text-lg text-dark/70">{t('sampleChapter.subtitle')}</p>
                </div>

                {/* Decorative divider */}
                <div className="flex justify-center items-center gap-4 mb-8">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                  <LeafIcon size={24} className="text-gold" />
                  <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
                </div>

                <div className="prose prose-lg max-w-none text-dark/90 leading-relaxed">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-start first-letter:me-3 first-letter:leading-none first-letter:mt-1">
                    {t('sampleChapter.excerpt')}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 5: Book Specifications */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-4">
                {t('specifications.title')}
              </h2>
              <p className="text-xl text-dark/70">{t('specifications.subtitle')}</p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Specification Cards */}
            <AnimateOnScroll>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookIcon size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gold mb-2">{t('specifications.binding')}</h4>
                  <p className="text-dark/70">{t('specifications.bindingValue')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookIcon size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gold mb-2">{t('specifications.pages')}</h4>
                  <p className="text-dark/70">{t('specifications.pagesValue')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookIcon size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gold mb-2">{t('specifications.size')}</h4>
                  <p className="text-dark/70">{t('specifications.sizeValue')}</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <StarIcon size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gold mb-2">{t('specifications.edges')}</h4>
                  <p className="text-dark/70">{t('specifications.edgesValue')}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 6: Inside Look Stats */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <AnimateOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-12">
              {t('stats.title')}
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1: Chapters */}
            <AnimateOnScroll>
              <div className="group relative text-center">
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                    <BookIcon size={32} className="text-gold" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-gold via-gold to-gold-light bg-clip-text text-transparent mb-2">
                    {t('stats.chapters')}
                  </div>
                  <div className="text-dark/70 font-medium">{t('stats.chaptersLabel')}</div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Stat 2: Plants */}
            <AnimateOnScroll>
              <div className="group relative text-center">
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                    <LeafIcon size={32} className="text-gold" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-gold via-gold to-gold-light bg-clip-text text-transparent mb-2">
                    {t('stats.plants')}
                  </div>
                  <div className="text-dark/70 font-medium">{t('stats.plantsLabel')}</div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Stat 3: Sources */}
            <AnimateOnScroll>
              <div className="group relative text-center">
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                    <TorahScrollIcon size={32} className="text-gold" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-gold via-gold to-gold-light bg-clip-text text-transparent mb-2">
                    {t('stats.sources')}
                  </div>
                  <div className="text-dark/70 font-medium">{t('stats.sourcesLabel')}</div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Stat 4: Illustrations */}
            <AnimateOnScroll>
              <div className="group relative text-center">
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                    <PaletteIcon size={32} className="text-gold" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-br from-gold via-gold to-gold-light bg-clip-text text-transparent mb-2">
                    {t('stats.illustrations')}
                  </div>
                  <div className="text-dark/70 font-medium">{t('stats.illustrationsLabel')}</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
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
