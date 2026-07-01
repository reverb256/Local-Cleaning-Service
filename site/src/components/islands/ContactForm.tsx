import { useState, type FormEvent } from 'react';
import { cn } from '~/lib/cn';

/**
 * ContactForm — React island mounted only on `/contact`.
 *
 * Posts to Formspree (configure at deploy time — `VITE_FORMSPREE_ID`).
 * For local previews without a Formspree ID, falls back to a mailto:
 * link so the form is still useful in `pnpm run preview`.
 *
 * Honeypot field `_gotcha` — bots fill it, humans skip it, POST is
 * dropped server-side.
 */

const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_ID ?? '';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

const inputCls =
  'w-full h-12 rounded-pill border border-ink-300 bg-white px-4 ' +
  'text-ink-900 focus:border-brand-500 focus:ring-2 ' +
  'focus:ring-brand-200 outline-none transition-shadow';

const textareaCls =
  'w-full rounded-card border border-ink-300 bg-white p-4 ' +
  'text-ink-900 focus:border-brand-500 focus:ring-2 ' +
  'focus:ring-brand-200 outline-none transition-shadow resize-y';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'submitting') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const honeypot = data.get('_gotcha');
    if (typeof honeypot === 'string' && honeypot.length > 0) {
      setStatus({ kind: 'success' });
      form.reset();
      return;
    }

    if (!FORMSPREE_ID) {
      // No Formspree wired up — bail out gracefully with mailto fallback.
      const message = data.get('message') ?? '';
      const url =
        'mailto:info@workplacejanitorial.ca?subject=' +
        encodeURIComponent('Website inquiry') +
        '&body=' +
        encodeURIComponent(String(message));
      window.location.href = url;
      setStatus({ kind: 'success' });
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        },
      );
      if (res.ok) {
        setStatus({ kind: 'success' });
        form.reset();
      } else {
        setStatus({
          kind: 'error',
          message:
            'We couldn\'t send the message. Please call (204) 415-2910.',
        });
      }
    } catch {
      setStatus({
        kind: 'error',
        message:
          'Network error. Please call (204) 415-2910 directly.',
      });
    }
  }

  if (status.kind === 'success') {
    return (
      <div
        role="status"
        className="bg-brand-50 border border-brand-200 rounded-card-lg
                   p-8 text-center"
      >
        <p className="font-display text-2xl text-brand-900">
          Thanks — we'll reply within 30 minutes.
        </p>
        <p className="mt-3 text-sm text-ink-700">
          Or skip the wait and{' '}
          <a
            href="tel:+12044152910"
            className="font-semibold text-brand-700 underline"
          >
            call (204) 415-2910
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 bg-white rounded-card-lg p-6 sm:p-8 shadow-card"
      aria-label="Contact Workplace Janitorial Services"
    >
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink-800 mb-2">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-ink-800 mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink-800 mb-2">
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-semibold text-ink-800 mb-2">
          What's it about?
        </label>
        <select
          id="reason"
          name="reason"
          className={cn(inputCls, 'appearance-none pr-10')}
        >
          <option value="office-quote">Office cleaning quote</option>
          <option value="medical-quote">Medical / clinic quote</option>
          <option value="post-construction">Post-construction</option>
          <option value="retail">Retail day-portering</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink-800 mb-2">
          Tell us a bit
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={textareaCls}
          placeholder="Square footage, when you'd like to start, anything special about the space…"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2
                   rounded-pill bg-brand-600 text-white px-7 h-14
                   font-semibold shadow-cta hover:bg-brand-700
                   hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all"
      >
        {submitting ? 'Sending…' : 'Send message'}
      </button>

      {status.kind === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {status.message}
        </p>
      )}
    </form>
  );
}
