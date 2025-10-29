import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export function generatePageMetadata(
  locale: string,
  page: PageMetadata
): Metadata {
  const isHebrew = locale === 'he';
  const ogLocale = isHebrew ? 'he_IL' : 'en_US';
  const alternateLocale = isHebrew ? 'en_US' : 'he_IL';
  const baseUrl = 'https://neshatamar.com';
  const fullUrl = `${baseUrl}/${locale}${page.path}`;
  const ogImageUrl = `${baseUrl}/og-image.png`;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      locale: ogLocale,
      alternateLocale: alternateLocale,
      type: 'website',
      url: fullUrl,
      siteName: isHebrew ? 'נס התמר' : 'Nes HaTamar',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'he': `${baseUrl}/he${page.path}`,
        'en': `${baseUrl}/en${page.path}`,
      },
    },
  };
}
