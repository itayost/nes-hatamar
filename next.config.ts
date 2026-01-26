import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },

  async redirects() {
    return [
      // Redirect non-www to www (URL normalization for SEO)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'neshatamar.com',
          },
        ],
        destination: 'https://www.neshatamar.com/:path*',
        permanent: true,
      },
      // Redirect old course-purchase URLs to new purchase URLs
      {
        source: '/:locale/course-purchase',
        destination: '/:locale/purchase?product=course',
        permanent: true,
      },
      {
        source: '/:locale/course-purchase/success',
        destination: '/:locale/purchase/success',
        permanent: true,
      },
      {
        source: '/:locale/course-purchase/error',
        destination: '/:locale/purchase/error',
        permanent: true,
      },
      {
        source: '/:locale/course-purchase/pending',
        destination: '/:locale/purchase/pending',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
