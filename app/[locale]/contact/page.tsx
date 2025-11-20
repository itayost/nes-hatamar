import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { generatePageMetadata } from '@/lib/og-metadata';
import { EmailIcon, WhatsAppIcon } from '@/components/icons/Icons';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-cream py-20 sm:py-28 overflow-hidden">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-6 animate-fadeIn">
            {t('title')}
          </h1>
          <p className="text-xl sm:text-2xl text-dark/70 max-w-3xl mx-auto animate-fadeIn delay-100">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider />

      {/* Contact Information Section */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll animation="slideUp">
            <h2 className="text-3xl sm:text-4xl font-bold text-gold text-center mb-12">
              {t('info.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Email Card */}
              <div className="group">
                <a
                  href={`mailto:${t('info.email.value')}`}
                  className="block h-full bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50 hover:-translate-y-1 active:scale-[0.98]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                      <EmailIcon size={40} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-gold mb-3">{t('info.email.label')}</h3>
                    <p className="text-dark/80 text-lg break-all">{t('info.email.value')}</p>
                  </div>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="group">
                <a
                  href={`https://wa.me/972547709201?text=${locale === 'he' ? '%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%9E%D7%99%D7%93%D7%A2%20%D7%A2%D7%9C%20%D7%A0%D7%A1%20%D7%94%D7%AA%D7%9E%D7%A8' : 'Hello%2C%20I%27m%20interested%20in%20Nes%20HaTamar'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50 hover:-translate-y-1 active:scale-[0.98]"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:bg-[#25D366]/20 transition-colors duration-300">
                      <WhatsAppIcon size={40} className="text-[#25D366]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gold mb-3">{t('info.whatsapp.label')}</h3>
                    <p className="text-dark text-lg font-semibold" dir="ltr">{t('info.whatsapp.value')}</p>
                  </div>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Contact Form Section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
          <AnimateOnScroll animation="slideUp">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gold mb-4">
                {t('form.title')}
              </h2>
              <p className="text-lg text-dark/70">
                {t('form.description')}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-gold/30">
              <LeadCaptureForm />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Bottom ornaments */}
      <div className="relative h-20 bg-gradient-to-t from-white to-cream">
        <CornerOrnament position="bottom-left" size="md" />
        <CornerOrnament position="bottom-right" size="md" />
      </div>
    </div>
  );
}
