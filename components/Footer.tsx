'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  AboutIcon,
  PreviewIcon,
  PurchaseIcon,
  EmailIcon,
  LinksIcon,
  BookIcon,
  ArrowUpIcon,
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon
} from './icons/Icons';

export default function Footer() {
  const navT = useTranslations('navigation');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { key: 'home', path: '', Icon: HomeIcon },
    { key: 'about', path: '/about', Icon: AboutIcon },
    { key: 'preview', path: '/preview', Icon: PreviewIcon },
    { key: 'purchase', path: '/purchase', Icon: PurchaseIcon },
  ];

  return (
    <>
      <footer className="bg-gradient-to-b from-white via-cream/30 to-white border-t border-gold/20 mt-auto relative overflow-hidden">
        {/* Decorative top border with gradient and ornaments */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-8 text-gold/10 text-2xl pointer-events-none">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Column 1: Branding */}
            <div className="space-y-4 text-center md:text-start">
              <div className="flex items-center gap-3 justify-center md:justify-start group">
                <div className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                  ✦
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  נס התמר
                </div>
              </div>
              <p className="text-sm text-dark/70 leading-relaxed">
                {locale === 'he'
                  ? 'מסע בנתיבי תורתנו הקדושה אל עולם ההומאופתיה וצמחי המרפא'
                  : 'A journey through Torah wisdom into the world of homeopathy and medicinal plants'}
              </p>
              <div className="flex justify-center md:justify-start gap-2">
                <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent"></div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4 text-center md:text-start">
              <h3 className="text-lg font-bold text-gold flex items-center gap-2 justify-center md:justify-start">
                <LinksIcon size={20} />
                {locale === 'he' ? 'ניווט מהיר' : 'Quick Links'}
              </h3>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.path}`}
                      className="group flex items-center gap-3 text-dark/70 hover:text-gold transition-colors duration-300 justify-center md:justify-start"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium relative">
                        {navT(item.key)}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="space-y-4 text-center md:text-start">
              <h3 className="text-lg font-bold text-gold flex items-center gap-2 justify-center md:justify-start">
                <EmailIcon size={20} />
                {locale === 'he' ? 'יצירת קשר' : 'Contact'}
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@neshatamar.com"
                  className="group flex items-center gap-3 text-dark/70 hover:text-gold transition-colors duration-300 justify-center md:justify-start"
                >
                  <EmailIcon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">
                    contact@neshatamar.com
                  </span>
                </a>

                {/* Social Media Icons */}
                <div className="flex gap-4 justify-center md:justify-start pt-2">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold flex items-center justify-center text-gold hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold flex items-center justify-center text-gold hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold flex items-center justify-center text-gold hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter/CTA */}
            <div className="space-y-4 text-center md:text-start">
              <h3 className="text-lg font-bold text-gold flex items-center gap-2 justify-center md:justify-start">
                <BookIcon size={20} />
                {locale === 'he' ? 'רכישת הספר' : 'Get the Book'}
              </h3>
              <p className="text-sm text-dark/70">
                {locale === 'he'
                  ? 'רכשו את הספר עכשיו וצאו למסע מרתק'
                  : 'Get your copy now and start your journey'}
              </p>
              <Link
                href={`/${locale}/purchase`}
                className="btn-sacred-primary inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-white font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                <PurchaseIcon size={20} />
                <span>{locale === 'he' ? 'לרכישה' : 'Purchase'}</span>
              </Link>
            </div>
          </div>

          {/* Decorative middle divider */}
          <div className="mt-12 mb-8 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/50"></div>
              <div className="text-gold text-2xl animate-pulse">✦</div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/50"></div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-dark/95 backdrop-blur-sm border-t border-gold/20">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-cream/80 text-sm">
              <div className="text-center md:text-start">
                © {currentYear} נס התמר | Nes HaTamar. {locale === 'he' ? 'כל הזכויות שמורות' : 'All rights reserved'}.
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-gold transition-colors duration-300">
                  {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
                </a>
                <span className="text-gold/40">·</span>
                <a href="#" className="hover:text-gold transition-colors duration-300">
                  {locale === 'he' ? 'תנאי שימוש' : 'Terms of Use'}
                </a>
              </div>
            </div>
          </div>
          {/* Bottom gradient accent */}
          <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 ${locale === 'he' ? 'left-8' : 'right-8'} z-50 w-12 h-12 rounded-full bg-gold text-white shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center group ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUpIcon size={24} className="transform group-hover:scale-110 transition-transform" />
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20"></span>
      </button>
    </>
  );
}
