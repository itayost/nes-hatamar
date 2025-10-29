import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import HeadstartEmbed from '@/components/HeadstartEmbed';
import { generatePageMetadata } from '@/lib/og-metadata';
import { MailIcon, StarIcon, ArrowRightIcon } from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'purchase' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/purchase',
  });
}

export default async function PurchasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('purchase');

  return (
    <div className="min-h-screen bg-cream">
      {/* Section 1: Hero - Directive and Clear */}
      <section className="relative bg-gradient-to-b from-white to-cream py-16 sm:py-20 overflow-hidden">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4 animate-fadeIn">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-dark/70 font-semibold animate-fadeIn delay-100">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider />

      {/* Section 2: Headstart Crowdfunding Embed */}
      <section className="relative py-16 sm:py-20">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll>
            <HeadstartEmbed locale={locale} size="full" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 3: What's Included (Brief) */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
          <AnimateOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-12">
              {t('whatsIncluded.title')}
            </h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Included Item 1 */}
            <AnimateOnScroll>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold text-xl font-bold">✓</span>
                </div>
                <p className="text-dark/80 leading-relaxed">{t('whatsIncluded.book')}</p>
              </div>
            </AnimateOnScroll>

            {/* Included Item 2 */}
            <AnimateOnScroll>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold text-xl font-bold">✓</span>
                </div>
                <p className="text-dark/80 leading-relaxed">{t('whatsIncluded.pages')}</p>
              </div>
            </AnimateOnScroll>

            {/* Included Item 3 */}
            <AnimateOnScroll>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold text-xl font-bold">✓</span>
                </div>
                <p className="text-dark/80 leading-relaxed">{t('whatsIncluded.artwork')}</p>
              </div>
            </AnimateOnScroll>

            {/* Included Item 4 */}
            <AnimateOnScroll>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold text-xl font-bold">✓</span>
                </div>
                <p className="text-dark/80 leading-relaxed">{t('whatsIncluded.quality')}</p>
              </div>
            </AnimateOnScroll>

            {/* Included Item 5 */}
            <AnimateOnScroll>
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gold/20 sm:col-span-2 sm:max-w-md sm:mx-auto">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-gold text-xl font-bold">✓</span>
                </div>
                <p className="text-dark/80 leading-relaxed">{t('whatsIncluded.bookmark')}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Section 4: Trust Bar */}
      <section className="relative py-12 bg-white border-y-2 border-gold/10">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              {/* Trust 1: Secure Payment */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                  <StarIcon size={32} className="text-gold" />
                </div>
                <h3 className="font-bold text-gold text-lg">{t('trust.secure')}</h3>
              </div>

              {/* Trust 2: Fast Shipping */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                  <ArrowRightIcon size={32} className="text-gold" />
                </div>
                <h3 className="font-bold text-gold text-lg">{t('trust.shipping')}</h3>
              </div>

              {/* Trust 3: Dedicated Support */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                  <MailIcon size={32} className="text-gold" />
                </div>
                <h3 className="font-bold text-gold text-lg">{t('trust.support')}</h3>
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
