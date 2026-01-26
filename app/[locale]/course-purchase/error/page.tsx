import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'coursePurchase' });

  return generatePageMetadata(locale, {
    title: t('error.title'),
    description: t('error.subtitle'),
    path: 'course-purchase/error',
  });
}

export default async function CoursePurchaseErrorPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderId?: string; error?: string }>;
}) {
  const { locale } = await params;
  const { orderId } = await searchParams;
  const t = await getTranslations('coursePurchase');

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Decorative corners */}
        <div className="relative">
          <div className="absolute -top-4 -start-4 w-12 h-12 opacity-30">
            <Image
              src="/images/ornaments/TL.png"
              alt="Corner ornament - top-left"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute -top-4 -end-4 w-12 h-12 opacity-30">
            <Image
              src="/images/ornaments/TR.png"
              alt="Corner ornament - top-right"
              fill
              className="object-contain"
            />
          </div>

          {/* Error Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark font-serif mb-4">
              {t('error.title')}
            </h1>
            <p className="text-lg text-dark/70">
              {t('error.subtitle')}
            </p>
          </div>

          {/* Error Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gold/20 p-8 text-center mb-8">
            {orderId && (
              <div className="mb-6 pb-6 border-b border-gold/20">
                <p className="text-sm text-dark/60 mb-1">{t('error.orderIdLabel')}</p>
                <p className="text-xl font-mono font-bold text-dark/70">{orderId}</p>
              </div>
            )}

            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{t('error.paymentFailed')}</span>
              </div>
            </div>

            <p className="text-dark/80 mb-6 leading-relaxed">
              {t('error.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href={`/${locale}/course-purchase`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t('error.tryAgain')}</span>
              </Link>

              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gold/30 text-dark font-semibold rounded-xl hover:bg-gold/5 transition-colors"
              >
                <span>{t('error.backToHome')}</span>
              </Link>
            </div>

            <div className="bg-gold/5 rounded-xl p-4">
              <p className="text-sm text-dark/70 mb-2">
                {t('error.contactInfo')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href="mailto:Nissimkrispiltamar@gmail.com"
                  className="text-gold hover:underline font-medium"
                >
                  Nissimkrispiltamar@gmail.com
                </a>
                <span className="hidden sm:inline text-dark/30">|</span>
                <a
                  href="https://wa.me/972547709201"
                  className="text-gold hover:underline font-medium"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute -bottom-4 -start-4 w-12 h-12 opacity-30">
            <Image
              src="/images/ornaments/BL.png"
              alt="Corner ornament - bottom-left"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute -bottom-4 -end-4 w-12 h-12 opacity-30">
            <Image
              src="/images/ornaments/BR.png"
              alt="Corner ornament - bottom-right"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
