import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import CoursePurchaseForm from '@/components/CoursePurchaseForm';
import { generatePageMetadata } from '@/lib/og-metadata';
import { CheckCircleIcon, ArrowRightIcon, BookIcon, CalendarIcon, ClockIcon } from '@/components/icons/Icons';

const COURSE_PRICE = 1600;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'coursePurchase' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/course-purchase',
  });
}

export default async function CoursePurchasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('coursePurchase');
  const tCourse = await getTranslations('course');

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-cream py-16 sm:py-20 overflow-hidden">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll animation="slideUp">
            <div className="text-center space-y-4 mb-8">
              <Link
                href={`/${locale}/course`}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm"
              >
                <ArrowRightIcon size={16} className="rotate-180" />
                {t('backToCourse')}
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                {t('title')}
              </h1>
              <p className="text-lg sm:text-xl text-dark/70 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 sm:py-16">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Order Summary */}
            <AnimateOnScroll animation="slideInRight">
              <div className="space-y-6">
                {/* Course Info Card */}
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 shadow-lg">
                  <h2 className="text-2xl font-bold text-gold mb-6">{t('orderSummary.title')}</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-gold/5 rounded-xl">
                      <BookIcon size={24} className="text-gold flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-dark">{tCourse('title')}</h3>
                        <p className="text-sm text-dark/70 mt-1">{tCourse('subtitle')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-dark/70">
                      <CalendarIcon size={18} className="text-gold" />
                      <span>{tCourse('details.duration.value')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-dark/70">
                      <ClockIcon size={18} className="text-gold" />
                      <span>{tCourse('details.schedule.value')}</span>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 shadow-lg">
                  <h3 className="text-lg font-bold text-gold mb-4">{t('orderSummary.includes')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon size={20} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dark/80">{tCourse('receive.items.course.title')}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon size={20} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dark/80">{tCourse('receive.items.book.title')}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon size={20} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dark/80">{tCourse('receive.items.knowledge.title')}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-sm text-dark/60">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {t('trust.secure')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark/60">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    {t('trust.cards')}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Purchase Form */}
            <AnimateOnScroll animation="slideInLeft">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gold/20 p-8 lg:sticky lg:top-8">
                <h2 className="text-2xl font-bold text-gold mb-6">{t('form.title')}</h2>
                <CoursePurchaseForm basePrice={COURSE_PRICE} />
              </div>
            </AnimateOnScroll>
          </div>
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
