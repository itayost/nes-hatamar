/**
 * Structured Data (JSON-LD) Generators for SEO
 * These functions generate Schema.org structured data for different page types
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neshatamar.com';

interface WebSiteSchemaParams {
  locale: string;
  name: string;
  description: string;
}

interface OrganizationSchemaParams {
  locale: string;
}

interface ProductSchemaParams {
  locale: string;
  name: string;
  description: string;
  image: string;
  authors: string[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate WebSite schema for the main site
 */
export function generateWebSiteSchema({ locale, name, description }: WebSiteSchemaParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/${locale}#website`,
    url: `${BASE_URL}/${locale}`,
    name,
    description,
    inLanguage: locale === 'he' ? 'he-IL' : 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${locale}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization schema for the authors/publishers
 */
export function generateOrganizationSchema({ locale }: OrganizationSchemaParams) {
  const isHebrew = locale === 'he';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}#organization`,
    name: isHebrew ? 'נס התמר' : 'Nes HaTamar',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/cover.png`,
      width: 1326,
      height: 1590,
    },
    founder: [
      {
        '@type': 'Person',
        name: isHebrew ? 'תמר אשל' : 'Tamar Eshel',
        jobTitle: isHebrew ? 'הומאופתית, לומדת ומלמדת מפנימיות התורה' : 'Homeopath, Student and Teacher of Inner Torah',
        url: 'https://www.tamareshel.com',
        sameAs: [],
      },
      {
        '@type': 'Person',
        name: isHebrew ? 'נסים קריספיל' : 'Nissim Krispil',
        jobTitle: isHebrew ? 'אתנובוטנאי ואנתרופולוג תרבותי' : 'Ethnobotanist & Cultural Anthropologist',
        sameAs: [],
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Hebrew', 'English'],
    },
  };
}

/**
 * Generate Product schema for the book
 */
export function generateProductSchema({ locale, name, description, image, authors }: ProductSchemaParams) {
  const isHebrew = locale === 'he';

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${BASE_URL}#book`,
    name,
    description,
    image: `${BASE_URL}${image}`,
    author: authors.map((author) => ({
      '@type': 'Person',
      name: author,
    })),
    bookFormat: 'https://schema.org/Hardcover',
    numberOfPages: '700+',
    inLanguage: 'he-IL',
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/${locale}/purchase`,
      priceCurrency: 'ILS',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        '@id': `${BASE_URL}#organization`,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };
}

interface EventSchemaParams {
  locale: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketsUrl: string;
  image: string;
}

/**
 * Generate Event schema for the book launch event
 */
export function generateEventSchema({
  locale,
  name,
  description,
  startDate,
  endDate,
  ticketsUrl,
  image,
}: EventSchemaParams) {
  const isHebrew = locale === 'he';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: 'he-IL',
    image: `${BASE_URL}${image}`,
    location: {
      '@type': 'Place',
      name: isHebrew ? 'מוזיאון ארץ ישראל' : 'Eretz Israel Museum',
      address: {
        '@type': 'PostalAddress',
        streetAddress: isHebrew ? 'חיים לבנון 2' : '2 Haim Levanon St',
        addressLocality: isHebrew ? 'תל אביב' : 'Tel Aviv',
        addressCountry: 'IL',
      },
    },
    performer: [
      {
        '@type': 'Person',
        name: isHebrew ? 'תמר אשל' : 'Tamar Eshel',
      },
      {
        '@type': 'Person',
        name: isHebrew ? 'נסים קריספיל' : 'Nissim Krispil',
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: isHebrew ? 'מוזיאון ארץ ישראל' : 'Eretz Israel Museum',
      url: 'https://www.eretzmuseum.org.il',
    },
    offers: {
      '@type': 'Offer',
      url: ticketsUrl,
      availability: 'https://schema.org/InStock',
      validFrom: startDate,
    },
    about: {
      '@type': 'Book',
      '@id': `${BASE_URL}#book`,
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ schema for course or other FAQ pages
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
