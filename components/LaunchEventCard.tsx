import { useTranslations } from 'next-intl';
import { LAUNCH_EVENT } from '@/lib/launch-event';
import { ArrowRightIcon, ClockIcon, LocationIcon } from './icons/Icons';

interface ScheduleItem {
  time: string;
  text: string;
}

/**
 * Shared presentation of the book launch event, rendered inside the entry
 * popup and inside the media page section. Copy and the ticket link live in
 * exactly one place.
 *
 * `popup` is a single narrow column; `section` puts the date block beside the
 * details and adds the programme timeline.
 */
export default function LaunchEventCard({
  variant = 'section',
}: {
  variant?: 'popup' | 'section';
}) {
  const t = useTranslations('event');
  const isPopup = variant === 'popup';
  const schedule = (t.raw('schedule') as ScheduleItem[] | undefined) ?? [];

  /* The date is the visual anchor: a bordered plaque with the day numeral
     set far larger than anything around it. */
  const dateBlock = (
    <div
      className={`relative flex flex-col items-center justify-center border-2 border-gold/40 bg-gradient-to-b from-white to-cream text-center shadow-sm ${
        isPopup ? 'rounded-xl px-6 py-4' : 'rounded-2xl px-8 py-7'
      }`}
    >
      {/* Corner brackets, the site's recurring frame motif */}
      <span className="absolute -top-px -start-px h-4 w-4 rounded-ss-2xl border-s-2 border-t-2 border-gold" />
      <span className="absolute -bottom-px -end-px h-4 w-4 rounded-ee-2xl border-b-2 border-e-2 border-gold" />

      <span className="text-sm font-semibold tracking-widest text-dark/50">
        {t('weekday')}
      </span>
      <span
        className={`bg-gradient-to-b from-gold to-gold-light bg-clip-text font-bold leading-none text-transparent ${
          isPopup ? 'my-1 text-5xl' : 'my-2 text-7xl'
        }`}
      >
        {t('dateDay')}
      </span>
      <span className="text-base font-semibold text-dark/80">{t('dateMonth')}</span>

      <span className="my-3 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <span className="flex items-center gap-2 text-lg font-bold text-dark">
        <ClockIcon size={18} className="text-gold" />
        {t('time')}
      </span>
      <span className="mt-1 text-xs text-dark/50">{t('duration')}</span>
    </div>
  );

  const heading = (
    <div className={isPopup ? 'text-center' : ''}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-gold">
        <span aria-hidden="true">✦</span>
        {t('badge')}
        <span aria-hidden="true">✦</span>
      </span>
      <h3
        className={`mt-3 font-bold leading-tight text-dark ${
          isPopup ? 'text-2xl' : 'text-3xl sm:text-4xl'
        }`}
      >
        {t('title')}
      </h3>
      <p className={`mt-2 text-dark/60 ${isPopup ? 'text-base' : 'text-lg'}`}>
        {t('tagline')}
      </p>
    </div>
  );

  const venue = (
    <div className={`flex items-start gap-3 ${isPopup ? 'justify-center' : ''}`}>
      <LocationIcon size={22} className="mt-0.5 flex-shrink-0 text-gold" />
      <div className={isPopup ? 'text-start' : ''}>
        <p className="font-semibold text-dark">{t('venueName')}</p>
        <p className="text-sm text-dark/60">{t('venueAddress')}</p>
      </div>
    </div>
  );

  const actions = (
    <div
      className={`flex flex-col gap-3 ${
        isPopup ? 'items-stretch' : 'items-start sm:flex-row sm:items-center'
      }`}
    >
      <a
        href={LAUNCH_EVENT.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-sacred-primary group inline-flex items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
      >
        <span className="relative z-10">{t('ticketsCta')}</span>
        <ArrowRightIcon
          size={22}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </a>
      <a
        href={LAUNCH_EVENT.detailsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-medium text-dark/60 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold ${
          isPopup ? 'text-center' : ''
        }`}
      >
        {t('detailsCta')}
      </a>
    </div>
  );

  if (isPopup) {
    return (
      <div className="space-y-6">
        {heading}
        {dateBlock}
        {venue}
        <p className="text-center text-sm leading-relaxed text-dark/70">
          {t('description')}
        </p>
        {actions}
        <p className="text-center text-xs leading-relaxed text-dark/50">{t('note')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-14">
      <div className="space-y-6">
        {dateBlock}
        {venue}
      </div>

      <div className="space-y-7">
        {heading}
        <p className="text-lg leading-relaxed text-dark/70">{t('description')}</p>

        {schedule.length > 0 && (
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-widest text-gold">
              {t('scheduleTitle')}
            </h4>
            <ol className="relative space-y-4 border-s-2 border-gold/20 ps-6">
              {schedule.map((item) => (
                <li key={item.time} className="relative">
                  {/* Gold node sitting on the timeline rail */}
                  <span className="absolute -start-[1.9rem] top-2 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-cream" />
                  <span className="font-bold text-dark">{item.time}</span>
                  <span className="mx-2 text-gold/40">·</span>
                  <span className="text-dark/70">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {actions}
        <p className="text-sm leading-relaxed text-dark/50">{t('note')}</p>
      </div>
    </div>
  );
}
