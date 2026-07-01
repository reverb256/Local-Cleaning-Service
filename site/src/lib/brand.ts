/**
 * Brand — single source of truth.
 *
 * Edit this file once and every page picks it up, including the
 * JSON-LD `LocalBusiness` schema emitted by `BaseHead.astro` and the
 * structured copy rendered on /contact, /about, /quote.
 */

export const brand = {
  // -- Identity -----------------------------------------------------------
  name: 'Workplace Janitorial Services',
  shortName: 'Workplace Janitorial',
  tagline: 'Winnipeg commercial cleaning, bonded and WCB-covered.',
  description:
    'A bonded, WCB-covered janitorial service cleaning offices, ' +
    'medical clinics, retail spaces, and post-construction sites across ' +
    'Winnipeg, Manitoba. 30-minute response guarantee on every request.',
  founded: 2010,
  url: 'https://workplacejanitorial.ca',
  language: 'en-CA',

  // -- NAP (Name / Address / Phone) ---------------------------------------
  phone: {
    display: '(204) 415-2910',
    tel: '+12044152910',
  },
  email: 'info@workplacejanitorial.ca',
  address: {
    street: '2-761 Marion Street',
    city: 'Winnipeg',
    region: 'MB',
    postal: 'R2J 0K6',
    country: 'CA',
    // Approximate business location for JSON-LD geo coordinates.
    // TODO: replace with the actual storefront GPS reading.
    geo: { latitude: 49.8712, longitude: -97.1236 },
  },

  // -- Hours (24h) — used by JSON-LD openingHoursSpecification ------------
  hours: [
    { day: 'Monday',    open: '08:00', close: '18:00' },
    { day: 'Tuesday',   open: '08:00', close: '18:00' },
    { day: 'Wednesday', open: '08:00', close: '18:00' },
    { day: 'Thursday',  open: '08:00', close: '18:00' },
    { day: 'Friday',    open: '08:00', close: '18:00' },
    { day: 'Saturday',  open: '09:00', close: '16:00' },
  ],

  // -- Service area (for areaServed in JSON-LD) ---------------------------
  serviceArea: [
    'Winnipeg',
    'St. Boniface',
    'Transcona',
    'St. Vital',
    'River Heights',
    'Downtown Winnipeg',
    'Manitoba',
  ],

  // -- Social ------------------------------------------------------------
  social: {
    linkedin: 'https://www.linkedin.com/company/workplace-janitorial-services',
    // No Facebook / Instagram kept on-site on purpose; the audience is
    // property managers who DM via LinkedIn or call.
  },
} as const;

export type Brand = typeof brand;
