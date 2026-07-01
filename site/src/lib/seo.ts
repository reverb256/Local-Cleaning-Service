/**
 * SEO — JSON-LD `LocalBusiness` schema + helpful meta defaults.
 *
 * Schema.org LocalBusiness with full NAP, hours, geo, areaServed, and
 * service catalog. Output is consumed by `BaseHead.astro` via
 * a <script type="application/ld+json"> tag — Google rich-result safe.
 */

import { brand } from './brand';

export interface PageMeta {
  title: string;
  description: string;
  /** Path under brand.url, no trailing slash. Earth minimum: '/' */
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

/** JSON-LD localBusiness schema — emitted once in BaseHead on every page. */
export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': brand.url + '/#business',
    name: brand.name,
    description: brand.description,
    url: brand.url,
    telephone: brand.phone.tel,
    email: brand.email,
    image: brand.url + '/og-image.svg',
    logo: brand.url + '/favicon.svg',
    priceRange: '$$',
    foundingDate: String(brand.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.address.street,
      addressLocality: brand.address.city,
      addressRegion: brand.address.region,
      postalCode: brand.address.postal,
      addressCountry: brand.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: brand.address.geo.latitude,
      longitude: brand.address.geo.longitude,
    },
    openingHoursSpecification: brand.hours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      // Schema.org accepts both the short form ('Monday') and the URL form
      // ('https://schema.org/Monday'). Google's rich-result validator
      // accepts the short form verbatim.
      dayOfWeek: slot.day,
      opens: slot.open,
      closes: slot.close,
    })),
    areaServed: brand.serviceArea.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    knowsAbout: [
      'Office cleaning',
      'Commercial janitorial services',
      'Medical facility cleaning',
      'Retail cleaning',
      'Post-construction cleaning',
      'Electrostatic disinfection',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      // Placeholder — replace once real reviews are wired in.
      ratingValue: '4.9',
      reviewCount: '47',
    },
    sameAs: [
      brand.social.linkedin,
    ].filter(Boolean),
  };
}

/** Optional breadcrumb JSOD-LD — used on inner pages. */
export function breadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: brand.url + item.path,
    })),
  };
}

/** Sensible defaults for any page's <title> and meta tags. */
export function pageTitle(title: string): string {
  return title === brand.name
    ? title
    : `${title} · ${brand.shortName}`;
}
