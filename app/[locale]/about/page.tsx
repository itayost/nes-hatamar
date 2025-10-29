import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
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

      <Divider />

      {/* Section 2: Why These Authors */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll>
            <div className="relative bg-white/60 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl border-4 border-gold/30">
              <CornerOrnament position="top-left" size="md" />
              <CornerOrnament position="bottom-right" size="md" />

              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  {t('whyAuthors.title')}
                </h2>

                {/* Decorative divider */}
                <div className="flex justify-center items-center gap-4">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                  <div className="text-gold text-2xl">✦</div>
                  <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
                </div>

                <p className="text-lg sm:text-xl text-dark/90 leading-relaxed">
                  {t('whyAuthors.description')}
                </p>

                {/* Credentials Grid */}
                <div className="grid sm:grid-cols-2 gap-8 pt-6">
                  {/* Tamar's Credentials */}
                  <div className="bg-gold/10 p-6 rounded-xl border-2 border-gold/30">
                    <div className="text-5xl font-bold bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-2">
                      {t('credentials.tamarYears')}
                    </div>
                    <div className="text-dark/70 font-medium mb-4">{t('credentials.tamarYearsLabel')}</div>
                    <div className="text-2xl font-bold text-gold mb-1">
                      {t('credentials.tamarBooks')}
                    </div>
                    <div className="text-sm text-dark/60">{t('credentials.tamarBooksLabel')}</div>
                  </div>

                  {/* Nissim's Credentials */}
                  <div className="bg-gold/10 p-6 rounded-xl border-2 border-gold/30">
                    <div className="text-5xl font-bold bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent mb-2">
                      {t('credentials.nissimYears')}
                    </div>
                    <div className="text-dark/70 font-medium mb-4">{t('credentials.nissimYearsLabel')}</div>
                    <div className="text-2xl font-bold text-gold mb-1">
                      {t('credentials.nissimBooks')}
                    </div>
                    <div className="text-sm text-dark/60">{t('credentials.nissimBooksLabel')}</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 3: Tamar Eshel Profile */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Author Card */}
            <AnimateOnScroll>
              <div className="relative group">
                <div className="relative bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold-light/30 via-white to-gold/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-8">
                    <UserIcon size={120} className="mb-6 text-gold transform group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-2 text-center">
                      {t('tamar.name')}
                    </h3>
                    <p className="text-base text-dark/70 text-center">{t('tamar.title')}</p>

                    {/* Decorative corner brackets inside */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>
                  </div>
                </div>
                <CornerOrnament position="top-left" size="md" />
                <CornerOrnament position="bottom-right" size="md" />
              </div>
            </AnimateOnScroll>

            {/* Bio Content */}
            <AnimateOnScroll>
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
            <AnimateOnScroll>
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
            <AnimateOnScroll>
              <div className="relative group lg:order-2 order-1">
                <div className="relative bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold-light/30 via-white to-gold/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-8">
                    <UserIcon size={120} className="mb-6 text-gold transform group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-2 text-center">
                      {t('nissim.name')}
                    </h3>
                    <p className="text-base text-dark/70 text-center">{t('nissim.title')}</p>

                    {/* Decorative corner brackets inside */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-xl"></div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-xl"></div>
                  </div>
                </div>
                <CornerOrnament position="top-right" size="md" />
                <CornerOrnament position="bottom-left" size="md" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 5: Together Section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-white to-cream">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll>
            <div className="relative bg-white/60 backdrop-blur-sm p-10 md:p-16 lg:p-20 rounded-3xl shadow-2xl border-4 border-gold/30">
              <CornerOrnament position="top-left" size="lg" />
              <CornerOrnament position="bottom-right" size="lg" />

              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  {/* Collaboration icon using two UserIcons */}
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="relative">
                      <UserIcon size={56} className="text-gold" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-gold text-4xl">✦</div>
                    <div className="relative">
                      <UserIcon size={56} className="text-gold" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-pulse delay-100"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-6">
                    {t('together.title')}
                  </h2>
                </div>

                {/* Decorative divider */}
                <div className="flex justify-center items-center gap-4 mb-8">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                  <div className="text-gold text-2xl">✦</div>
                  <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
                </div>

                <p className="text-xl sm:text-2xl text-dark/90 leading-relaxed text-center mb-8">
                  {t('together.description')}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl text-center">
          <AnimateOnScroll>
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
