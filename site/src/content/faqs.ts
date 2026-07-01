/**
 * FAQ — copy that beats the wall-of-text on the competitor's site.
 *
 * Each answer surfaces a number, a commitment, or a concrete action.
 * No "we strive to" hedge language.
 */

export interface FaqRecord {
  question: string;
  answer: string;
}

export const faqs: FaqRecord[] = [
  {
    question: 'How fast can you start?',
    answer:
      'We answer the phone 30 minutes after your call or message — ' +
      'that\'s a written commitment. Most new accounts have a crew ' +
      'on site within five business days; rush starts within 48 hours ' +
      'are common.',
  },
  {
    question: 'Are you bonded and insured?',
    answer:
      'Yes. We carry $2M general liability and WCB coverage for every ' +
      'staff member. We bring certificates to the first walk-through. ' +
      'Criminal record checks are required at hire and refreshed every ' +
      'two years.',
  },
  {
    question: 'Do you bring your own supplies?',
    answer:
      'By default, yes — we use ECoLab concentrated chemistry and ' +
      'colour-coded microfibre. If your facility mandates a specific ' +
      'product (e.g. scent-free clinic floor cleaner), tell us at the ' +
      'walk-through and we\'ll match it.',
  },
  {
    question: 'Can you work around sensitive equipment?',
    answer:
      'Yes — server rooms, clean-room adjacent spaces, and client ' +
      'confidential areas are normal. We\'re happy to coordinate with ' +
      'your IT or facilities team on access procedures.',
  },
  {
    question: 'What about post-construction cleanup?',
    answer:
      'We schedule post-construction cleans around your builder\'s ' +
      'punch list and provide a 48-hour walk-through with anything ' +
      'remaining cleared before final sign-off.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Recurring contracts bill on the first of each month; one-time ' +
      'post-construction or move-in cleans bill on completion. We send ' +
      'invoices by email and accept EFT or credit card.',
  },
];
