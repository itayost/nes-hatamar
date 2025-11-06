'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { HomeIcon, AboutIcon, PreviewIcon, PurchaseIcon, LeafIcon } from './icons/Icons';

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = locale === 'he';

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    return pathname === `/${locale}${path}`;
  };

  const navItems = [
    { key: 'home', path: '', Icon: HomeIcon },
    { key: 'course', path: '/course', Icon: LeafIcon },
    { key: 'about', path: '/about', Icon: AboutIcon },
    { key: 'preview', path: '/preview', Icon: PreviewIcon },
    { key: 'purchase', path: '/purchase', Icon: PurchaseIcon },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-gold/30 shadow-lg'
            : 'border-gold/20 shadow-sm'
        }`}
      >
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-20' : 'h-24'
          }`}>
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 group transition-transform hover:scale-105 duration-300"
            >
              {/* Decorative ornament */}
              <div className="text-2xl text-purple group-hover:rotate-12 transition-transform duration-300">
                ✦
              </div>
              <div className={`font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
              }`}>
                נס התמר
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <div key={item.key} className="flex items-center">
                  <Link
                    href={`/${locale}${item.path}`}
                    className={`btn-sacred-nav px-5 py-2.5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                      isActive(item.path)
                        ? 'active bg-gold text-white shadow-lg shadow-gold/30'
                        : 'text-dark hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                  {/* Ornamental divider */}
                  {index < navItems.length - 1 && (
                    <div className="text-gold/40 mx-1">·</div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side: Language Switcher + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Language Switcher - Hidden on mobile when menu is open */}
              <div className={`${isMobileMenuOpen ? 'hidden md:block' : 'block'}`}>
                <LanguageSwitcher />
              </div>

              {/* Hamburger Menu Button - Mobile only */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gold/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-gold rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-gold rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-gold rounded-full transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : isRTL ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-gold/20 bg-gradient-to-r from-cream to-white">
            <div className="flex items-center gap-3">
              <div className="text-2xl text-purple">✦</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                נס התמר
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.Icon;
              return (
                <Link
                  key={item.key}
                  href={`/${locale}${item.path}`}
                  onClick={closeMobileMenu}
                  className={`btn-sacred flex items-center gap-4 px-5 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-md ${
                    isActive(item.path)
                      ? 'bg-gold text-white shadow-lg'
                      : 'text-dark hover:bg-gold/10 hover:text-gold'
                  }`}
                >
                  <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>{t(item.key)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher in Drawer */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="p-4 bg-cream/50 rounded-xl border border-gold/20">
              <p className="text-sm text-dark/60 mb-3 text-center">
                {locale === 'he' ? 'שפה' : 'Language'}
              </p>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
        </div>
      </div>
    </>
  );
}
