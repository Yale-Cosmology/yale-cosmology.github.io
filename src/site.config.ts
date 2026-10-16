/**
 * Site-wide settings. Edit this file to change the series name, semester,
 * default time and room, hosts, and the department address.
 */
export const site = {
  title: 'Cosmology Seminar',
  series: 'Yale Physics × Astronomy',
  semester: 'Fall 2026',
  description:
    'The Yale Physics × Astronomy Cosmology Seminar: weekly talks on cosmology, large-scale structure, the CMB, gravitational lensing and dark matter.',

  /** Defaults applied to every talk unless the talk's own file overrides them. */
  defaults: {
    weekday: 'Tuesdays',
    time: '1:30 PM',
    room: 'KT 401',
    building: 'Kline Tower',
  },

  /** Organizers listed in the footer and on the Visit page. */
  hosts: [
    { name: 'Isaque Dutra', email: 'isaque.dutra@yale.edu' },
    { name: 'Isabel Medlock', email: 'isabel.medlock@yale.edu' },
    { name: 'Barry T. Chiang', email: 'barry.chiang@yale.edu' },
  ],

  funding: 'This series is funded by the Dean’s Fund for Colloquia and Symposia.',

  address: {
    building: 'Kline Tower',
    street: '219 Prospect Street',
    city: 'New Haven, CT 06511',
    mapsUrl: 'https://maps.google.com/?q=Kline+Tower,+219+Prospect+St,+New+Haven,+CT+06511',
  },
};

/** Sort talks by date, then by the optional `order` field, then by file name. */
export function byDate<T extends { id: string; data: { date: Date; order?: number } }>(a: T, b: T): number {
  return (
    a.data.date.getTime() - b.data.date.getTime() ||
    (a.data.order ?? 0) - (b.data.order ?? 0) ||
    a.id.localeCompare(b.id)
  );
}

/** Prefix an absolute site path with the configured base (needed for GitHub Pages project sites). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Today's date in New Haven, as a UTC-midnight Date so it compares cleanly with talk dates. */
export function todayInNewHaven(): Date {
  const ymd = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  return new Date(`${ymd}T00:00:00Z`);
}

const longDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const shortDate = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' });
const weekdayShort = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'short' });

export const formatLongDate = (d: Date) => longDate.format(d);
export const formatShortDate = (d: Date) => shortDate.format(d);
export const formatWeekday = (d: Date) => weekdayShort.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
