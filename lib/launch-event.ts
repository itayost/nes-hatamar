/**
 * Book launch event at Eretz Israel Museum (MUZA).
 *
 * Single source of truth for every surface that advertises the event:
 * the entry popup and the media page section. When the event is over,
 * `isLaunchEventUpcoming()` returns false and all of them disappear on
 * their own - no code change required.
 */

export const LAUNCH_EVENT = {
  startsAt: '2026-08-27T17:00:00+03:00',
  endsAt: '2026-08-27T19:30:00+03:00',
  ticketsUrl: 'https://muza.pres.global/order/10038',
  detailsUrl:
    'https://www.eretzmuseum.org.il/features/%D7%A1%D7%99%D7%95%D7%A8-%D7%91%D7%A2%D7%A7%D7%91%D7%95%D7%AA-%D7%94%D7%A1%D7%A4%D7%A8-%D7%A0%D7%A1-%D7%94%D7%AA%D7%9E%D7%A8-%D7%9E%D7%A1%D7%A2-%D7%91%D7%99%D7%9F-%D7%97%D7%A4%D7%A6%D7%99%D7%9D/',
  /** Used for the Event JSON-LD only. */
  image: '/og-image.png',
} as const;

/**
 * Session storage key for the entry popup. Versioned by event date so a
 * future event gets a fresh key instead of being suppressed by a stale one.
 */
export const LAUNCH_EVENT_POPUP_KEY = 'nes-hatamar:launch-event-2026-08-27';

/**
 * True until the event ends. Isomorphic - called from the server on the
 * media page (which is ISR, so the check stays fresh) and from the client
 * in the popup.
 */
export function isLaunchEventUpcoming(now: Date = new Date()): boolean {
  return now.getTime() < new Date(LAUNCH_EVENT.endsAt).getTime();
}
