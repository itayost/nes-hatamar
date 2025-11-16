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

      // Remove trailing slashes (URL normalization for SEO)
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
