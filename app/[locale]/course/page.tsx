import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CornerOrnament from '@/components/ornaments/CornerOrnament';
import Divider from '@/components/ornaments/Divider';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { generatePageMetadata } from '@/lib/og-metadata';
import { BookIcon, LeafIcon, ArrowRightIcon, CheckCircleIcon, AnimalIcon, GemIcon, CalendarIcon, ClockIcon, CoinIcon } from '@/components/icons/Icons';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'course' });

  return generatePageMetadata(locale, {
    title: `${t('title')} | נס התמר - Nes HaTamar`,
    description: t('subtitle'),
    path: '/course',
  });
}

export default async function CoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('course');

  return (
    <div className="min-h-screen bg-cream">
      {/* Section 1: Hero */}
      <section className="relative bg-gradient-to-b from-white to-cream py-20 sm:py-28 overflow-hidden">
        <CornerOrnament position="top-left" size="lg" />
        <CornerOrnament position="top-right" size="lg" />

        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <AnimateOnScroll animation="slideInRight">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent animate-fadeIn">
                  {t('title')}
                </h1>
                <p className="text-xl sm:text-2xl text-dark/70 leading-relaxed animate-fadeIn delay-100">
                  {t('subtitle')}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-gold/20">
                    <div className="text-2xl font-bold text-gold">8</div>
                    <div className="text-sm text-dark/70">{t('stats.sessions')}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-gold/20">
                    <div className="text-2xl font-bold text-gold">2</div>
                    <div className="text-sm text-dark/70">{t('stats.hours')}</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-xl border-2 border-gold/20">
                    <div className="text-2xl font-bold text-gold">{t('stats.priceValue')}</div>
                    <div className="text-sm text-dark/70">{t('stats.price')}</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Instructor Image */}
            <AnimateOnScroll animation="slideInLeft">
              <div className="relative group">
                <div className="relative bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                  <div className="aspect-[3/4] rounded-2xl relative overflow-hidden">
                    <Image
                      src="/images/preview/course-hero.jpeg"
                      alt={t('instructor.name')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />
                    {/* Decorative corner brackets */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-xl z-10"></div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-xl z-10"></div>
                  </div>
                </div>
                <CornerOrnament position="top-right" size="md" />
                <CornerOrnament position="bottom-left" size="md" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 2: About the Course */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-6">
                {t('about.title')}
              </h2>

              {/* Decorative divider */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                <LeafIcon size={32} className="text-gold" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              <p className="text-lg sm:text-xl text-dark/80 max-w-4xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Course Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll animation="slideUp">
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 shadow-lg hover:shadow-xl hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <LeafIcon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gold mb-3 text-center">{t('about.features.plant.title')}</h3>
                <p className="text-dark/70 text-center leading-relaxed">{t('about.features.plant.description')}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideUp">
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 shadow-lg hover:shadow-xl hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <AnimalIcon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gold mb-3 text-center">{t('about.features.animal.title')}</h3>
                <p className="text-dark/70 text-center leading-relaxed">{t('about.features.animal.description')}</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideUp">
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border-2 border-gold/20 shadow-lg hover:shadow-xl hover:border-gold/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <GemIcon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gold mb-3 text-center">{t('about.features.mineral.title')}</h3>
                <p className="text-dark/70 text-center leading-relaxed">{t('about.features.mineral.description')}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Divider />

      {/* Course Syllabus Section */}
      <section className="relative py-20 sm:py-24 bg-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
          <AnimateOnScroll animation="scaleIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
                {t('syllabus.title')}
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp">
            <div className="relative group">
              <div className="relative bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-gold/30 transition-all duration-300 hover:shadow-2xl hover:border-gold/50">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/preview/course-silabus.jpeg"
                    alt={t('syllabus.title')}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                    quality={90}
                  />
                </div>
              </div>
              <CornerOrnament position="top-left" size="md" />
              <CornerOrnament position="bottom-right" size="md" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Section 3: What You'll Receive */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll animation="scaleIn">
            <div className="relative bg-white/60 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl border-4 border-gold/30">
              <CornerOrnament position="top-left" size="lg" />
              <CornerOrnament position="bottom-right" size="lg" />

              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-gold rounded-tl-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-gold rounded-br-2xl"></div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <BookIcon size={56} className="text-gold mx-auto mb-6" />
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
                    {t('receive.title')}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-gold/5 p-6 rounded-xl border border-gold/20">
                    <CheckCircleIcon size={28} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-dark mb-2">{t('receive.items.course.title')}</h4>
                      <p className="text-dark/70">{t('receive.items.course.description')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gold/5 p-6 rounded-xl border border-gold/20">
                    <CheckCircleIcon size={28} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-dark mb-2">{t('receive.items.book.title')}</h4>
                      <p className="text-dark/70">{t('receive.items.book.description')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gold/5 p-6 rounded-xl border border-gold/20">
                    <CheckCircleIcon size={28} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-dark mb-2">{t('receive.items.knowledge.title')}</h4>
                      <p className="text-dark/70">{t('receive.items.knowledge.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 4: About the Instructor */}
      <section className="relative py-20 sm:py-24">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
          <AnimateOnScroll animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-4">
                {t('instructor.sectionTitle')}
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideUp">
            <div className="bg-white/60 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border-2 border-gold/30 shadow-xl">
              <div className="prose prose-lg max-w-none text-dark/90 leading-relaxed mb-8">
                <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-gold first-letter:float-start first-letter:me-3 first-letter:leading-none first-letter:mt-1">
                  {t('instructor.bio')}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-gold/5 p-4 rounded-xl">
                  <span className="text-gold mt-1 text-xl">✦</span>
                  <span className="text-dark/80">{t('instructor.highlights.experience')}</span>
                </div>
                <div className="flex items-start gap-3 bg-gold/5 p-4 rounded-xl">
                  <span className="text-gold mt-1 text-xl">✦</span>
                  <span className="text-dark/80">{t('instructor.highlights.books')}</span>
                </div>
                <div className="flex items-start gap-3 bg-gold/5 p-4 rounded-xl">
                  <span className="text-gold mt-1 text-xl">✦</span>
                  <span className="text-dark/80">{t('instructor.highlights.expertise')}</span>
                </div>
                <div className="flex items-start gap-3 bg-gold/5 p-4 rounded-xl">
                  <span className="text-gold mt-1 text-xl">✦</span>
                  <span className="text-dark/80">{t('instructor.highlights.connection')}</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Divider />

      {/* Section 5: Course Details */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-cream to-white">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl">
          <AnimateOnScroll animation="slideUp">
            <div className="bg-white/60 backdrop-blur-sm p-10 md:p-14 rounded-3xl shadow-xl border-2 border-gold/30">
              <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-10">
                {t('details.title')}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Duration */}
                <div className="bg-gold/5 p-6 rounded-2xl border-2 border-gold/20">
                  <CalendarIcon size={48} className="text-gold mb-3" />
                  <h3 className="text-xl font-bold text-gold mb-2">{t('details.duration.title')}</h3>
                  <p className="text-dark/70">{t('details.duration.value')}</p>
                </div>

                {/* Schedule */}
                <div className="bg-gold/5 p-6 rounded-2xl border-2 border-gold/20">
                  <ClockIcon size={48} className="text-gold mb-3" />
                  <h3 className="text-xl font-bold text-gold mb-2">{t('details.schedule.title')}</h3>
                  <p className="text-dark/70">{t('details.schedule.value')}</p>
                </div>

                {/* Start Date */}
                <div className="bg-gold/5 p-6 rounded-2xl border-2 border-gold/20">
                  <CalendarIcon size={48} className="text-gold mb-3" />
                  <h3 className="text-xl font-bold text-gold mb-2">{t('details.startDate.title')}</h3>
                  <p className="text-dark/70">{t('details.startDate.value')}</p>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-br from-gold/20 to-gold-light/20 p-6 rounded-2xl border-2 border-gold/40">
                  <CoinIcon size={48} className="text-gold mb-3" />
                  <h3 className="text-xl font-bold text-gold mb-2">{t('details.price.title')}</h3>
                  <p className="text-2xl font-bold text-dark mb-2">{t('details.price.value')}</p>
                  <p className="text-sm text-dark/60">{t('details.price.includes')}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 6: Enrollment CTA */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-cream">
        <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl text-center">
          <AnimateOnScroll animation="scaleIn">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                {t('cta.title')}
              </h2>

              <p className="text-lg sm:text-xl text-dark/70 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>

              {/* Decorative divider */}
              <div className="flex justify-center items-center gap-4">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold"></div>
                <div className="text-gold text-2xl">✦</div>
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              <Link
                href="https://headstart.co.il/project/87579"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-sacred-primary inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-gold via-gold to-gold-light text-white font-bold text-xl shadow-xl hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('cta.button')}
                  <ArrowRightIcon size={24} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-dark/60">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon size={20} className="text-gold" />
                  <span>{t('cta.trust.includes')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon size={20} className="text-gold" />
                  <span>{t('cta.trust.expert')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon size={20} className="text-gold" />
                  <span>{t('cta.trust.support')}</span>
                </div>
              </div>
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
