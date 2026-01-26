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
    title: t('success.title'),
    description: t('success.subtitle'),
    path: 'course-purchase/success',
  });
}

export default async function CoursePurchaseSuccessPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ orderId?: string }>;
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

          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark font-serif mb-4">
              {t('success.title')}
            </h1>
            <p className="text-lg text-dark/70">
              {t('success.subtitle')}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gold/20 p-8 text-center mb-8">
            {orderId && (
              <div className="mb-6 pb-6 border-b border-gold/20">
                <p className="text-sm text-dark/60 mb-1">{t('success.orderIdLabel')}</p>
                <p className="text-xl font-mono font-bold text-gold">{orderId}</p>
              </div>
            )}

            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{t('success.paymentConfirmed')}</span>
              </div>
            </div>

            <p className="text-dark/80 mb-6 leading-relaxed">
              {t('success.description')}
            </p>

            <div className="bg-gold/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-dark/70">
                {t('success.contactInfo')}
              </p>
              <a
                href="mailto:Nissimkrispiltamar@gmail.com"
                className="text-gold hover:underline font-medium"
              >
                Nissimkrispiltamar@gmail.com
              </a>
            </div>

            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <span>{t('success.backToHome')}</span>
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
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
