import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Use locale prefix only for non-default locales (better for SEO)
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except Next.js internals and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
