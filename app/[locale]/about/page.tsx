import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { generatePageMetadata } from '@/lib/og-metadata';
import { UserIcon, BookIcon, ArrowRightIcon } from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('about');

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

      {/* Section 2: Tamar Eshel Profile */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Author Card */}
            <AnimateOnScroll animation="slideInRight">
              <div className="relative group">
                <div className="relative bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                  <div className="aspect-[3/4] rounded-2xl relative overflow-hidden group">
                    <Image
                      src="/images/authors/Tamar.webp"
                      alt={t('tamar.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 z-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">
                        {t('tamar.name')}
                      </h3>
                      <p className="text-base text-white/90 text-center drop-shadow-md">{t('tamar.title')}</p>
                    </div>

                    {/* Decorative corner brackets inside */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-xl z-10"></div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-xl z-10"></div>
                  </div>
                </div>
                <CornerOrnament position="top-left" size="md" />
                <CornerOrnament position="bottom-right" size="md" />
              </div>
            </AnimateOnScroll>

            {/* Bio Content */}
            <AnimateOnScroll animation="slideInLeft">
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none text-dark/90 leading-relaxed">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-start first-letter:me-3 first-letter:leading-none first-letter:mt-1">
                    {t('tamar.bio')}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-gold/20 space-y-3">
                  <h4 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Key Highlights
                  </h4>
                  <ul className="space-y-3 text-dark/80">
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('tamar.highlights.education')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('tamar.highlights.practice')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('tamar.highlights.torah')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('tamar.highlights.author')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 4: Nissim Krispil Profile */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Bio Content (Reversed Order on Desktop) */}
            <AnimateOnScroll animation="slideInRight">
              <div className="space-y-6 lg:order-1 order-2">
                <div className="prose prose-lg max-w-none text-dark/90 leading-relaxed">
                  <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-start first-letter:me-3 first-letter:leading-none first-letter:mt-1">
                    {t('nissim.bio')}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-gold/20 space-y-3">
                  <h4 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Key Highlights
                  </h4>
                  <ul className="space-y-3 text-dark/80">
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('nissim.highlights.pioneer')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('nissim.highlights.research')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('nissim.highlights.encyclopedia')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-1 text-xl">✦</span>
                      <span>{t('nissim.highlights.multidisciplinary')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Author Card */}
            <AnimateOnScroll animation="slideInLeft">
              <div className="relative group lg:order-2 order-1">
                <div className="relative bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                  <div className="aspect-[3/4] rounded-2xl relative overflow-hidden group">
                    <Image
                      src="/images/authors/Nisim.webp"
                      alt={t('nissim.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 z-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">
                        {t('nissim.name')}
                      </h3>
                      <p className="text-base text-white/90 text-center drop-shadow-md">{t('nissim.title')}</p>
                    </div>

                    {/* Decorative corner brackets inside */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-xl z-10"></div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-xl z-10"></div>
                  </div>
                </div>
                <CornerOrnament position="top-right" size="md" />
                <CornerOrnament position="bottom-left" size="md" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl text-center">
          <AnimateOnScroll animation="slideUp">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                {t('cta.title')}
              </h2>

              {/* Decorative divider */}
              <div className="flex justify-center items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                <BookIcon size={32} className="text-gold" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              <Link
                href={`/${locale}/preview`}
                className="group btn-sacred-primary inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-gold via-gold to-gold-light text-white font-bold text-xl shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('cta.button')}
                  <ArrowRightIcon size={24} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
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
