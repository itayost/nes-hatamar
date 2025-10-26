import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
};

export default withNextIntl(nextConfig);
