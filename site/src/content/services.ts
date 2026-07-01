import type { ReactNode } from 'react';

/**
 * Services catalog — plain TS data. Kept out of HTML so we can reuse
 * across pages (home matrix, dedicated /services, quote calculator).
 */

export interface ServiceRecord {
  slug: string;
  name: string;
  summary: string;
  includes: string[];
  priceRange: string;
  /** Used to drive the inline SVG icon in the services matrix. */
  icon: 'office' | 'medical' | 'post' | 'retail';
  audience: string;
}

/**
 * Pricing reflects Winnipeg commercial-cleaning 2026 mid-market ranges.
 * Last edited: 2026-07-01. Update when material costs change >5%.
 */
export const services: ServiceRecord[] = [
  {
    slug: 'office-cleaning',
    name: 'Daily & weekly office cleaning',
    summary:
      'Washrooms, kitchens, boardrooms, desks, hard floors, glass doors, ' +
      'and the front-of-house. Same crew, same time, same checklist — ' +
      'every visit.',
    includes: [
      'Washroom & kitchen sanitization (ECoLab concentrate)',
      'Hard-floor mop + vacuum (HEPA H13)',
      'Boardroom reset, glass doors, water-station wipe-down',
      'Recycling & landfill removal to your dumpster',
      'Touchpoint disinfection (handles, light switches, fobs)',
    ],
    priceRange: '$0.18 – $0.32 / sq. ft. / visit',
    icon: 'office',
    audience: 'Office tenants 1,500 – 80,000 sq. ft.',
  },
  {
    slug: 'medical-cleaning',
    name: 'Medical, dental & clinic cleaning',
    summary:
      'Two-step disinfection on every exam room after the last patient. ' +
      'Colour-coded microfibre, ATP-tested monthly, logbook on request.',
    includes: [
      'Waiting-room reset + reception-area glass',
      'Exam-room two-step disinfection (quaternary ammonium)',
      'Colour-coded microfibre system, single-use disposal',
      'Monthly ATP swab test + logbook to your compliance officer',
      'Sharps & biohazard pickup coordinated with your vendor',
    ],
    priceRange: '$0.32 – $0.55 / sq. ft. / visit',
    icon: 'medical',
    audience: 'Clinics, dental, vet, optical, allied-health',
  },
  {
    slug: 'post-construction',
    name: 'Post-construction & move-in cleaning',
    summary:
      'One-time detail to make the space tenant- or sale-ready. ' +
      'We work nights and weekends, on your builder\'s schedule.',
    includes: [
      'Dry-wipe of every surface (cabinets, trim, fixtures)',
      'Interior glass, mirrors, and storefront',
      'Hard-floor scrub + polish (multi-coat for retail)',
      'HEPA vacuum for dust + construction debris',
      'Final walk-through punch list cleared within 48 hours',
    ],
    priceRange: '$0.65 – $1.10 / sq. ft. (one-time)',
    icon: 'post',
    audience: 'New builds, renovations, tenant fit-outs',
  },
  {
    slug: 'retail-day-porter',
    name: 'Retail day-portering & floor care',
    summary:
      'Mid-shift touch-up during business hours: spill response, ' +
      'washroom reset, fitting-room turnover, and a clean front-of-house.',
    includes: [
      'Washroom reset every 90 minutes during peak hours',
      'Spill-response patrols (carpet, hard floor, glass)',
      'Fitting-room turnover + replenishment sign-off',
      'Front-of-house sweep + entry glass polish',
      'A visible, branded vest so your customers see us, not just us',
    ],
    priceRange: '$28 – $38 / hour',
    icon: 'retail',
    audience: 'Strip-mall retail, big-box, grocery',
  },
];

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug);
}

export type ServiceIcon = ServiceRecord['icon'] | 'sparkle';

/** Helper for the home matrix — first N services. */
export function featuredServices(n = 3): ServiceRecord[] {
  return services.slice(0, n);
}

/**
 * Estimate model used by `/quote`. Pricing is multiplied by:
 *   - service rate (low/mid/high per service)
 *   - size modifier
 *   - frequency multiplier (more frequent = cheaper per visit)
 *
 * Numbers reflect Winnipeg mid-market 2026 rates.
 */
export interface PricingMatrix {
  service: string;          // slug
  ratePerSqm: {             // CAD / sq. meter / visit (mid-band)
    low: number;
    mid: number;
    high: number;
  };
  frequencyMultiplier: Record<FrequencyBand, number>;
}

export type FrequencyBand = 'once' | 'weekly' | 'thrice' | 'nightly';

export const pricing: PricingMatrix[] = [
  {
    service: 'office-cleaning',
    ratePerSqm: { low: 1.85, mid: 2.55, high: 3.40 },
    frequencyMultiplier: { once: 1.30, weekly: 1.00, thrice: 0.92, nightly: 0.78 },
  },
  {
    service: 'medical-cleaning',
    ratePerSqm: { low: 3.25, mid: 4.45, high: 5.80 },
    frequencyMultiplier: { once: 1.35, weekly: 1.00, thrice: 0.94, nightly: 0.82 },
  },
  {
    service: 'post-construction',
    ratePerSqm: { low: 6.65, mid: 9.10, high: 12.0 },
    frequencyMultiplier: { once: 1.00, weekly: 0, thrice: 0, nightly: 0 },
  },
  {
    service: 'retail-day-porter',
    ratePerSqm: { low: 0, mid: 0, high: 0 },     // hourly, not per-sqm — handled separately
    frequencyMultiplier: { once: 1.0, weekly: 0.95, thrice: 0.90, nightly: 0.85 },
  },
];
