'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'he' ? 'en' : 'he';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="px-6 py-3 text-base font-bold text-gold border-2 border-gold rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] bg-white/50 backdrop-blur-sm"
      aria-label="Switch language"
    >
      {locale === 'he' ? 'EN' : 'עב'}
    </button>
  );
}
