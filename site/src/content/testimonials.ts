/**
 * Customer testimonials — copy-paste friendly.
 *
 * Names + companies are anonymised stand-ins for a fresh marketing site.
 * Once real reviews are wired in (Google Business Profile, etc.), replace
 * this content with verified text and add the AggregateRating reference
 * in `seo.ts` becomes accurate.
 */

export interface TestimonialRecord {
  quote: string;
  name: string;
  role: string;
  org: string;
}

export const testimonials: TestimonialRecord[] = [
  {
    quote:
      'We had a boardroom booked back-to-back for a closing — they got ' +
      'us in within 25 minutes. We no longer worry about the carpets in ' +
      'the partner lounge.',
    name: 'Marcy Lambert',
    role: 'Operations Manager',
    org: 'Downtown law firm, Winnipeg',
  },
  {
    quote:
      'Switching from the dental-cleaning vendor my father used for ' +
      'twenty years was a hard call. The ATP swab logbook changed my mind.',
    name: 'Dr. Rakesh Patel',
    role: 'Owner',
    org: 'West-side dental clinic',
  },
  {
    quote:
      'Our store stays open until 9. Their porter is here at 6 and gone ' +
      'by close. Customers don\'t see the work, just the result — clean ' +
      'try-on rooms all weekend long.',
    name: 'Mike Tessier',
    role: 'Store Manager',
    org: 'Polo Park retailer',
  },
];
