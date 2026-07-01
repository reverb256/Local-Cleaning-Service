import { useMemo, useState, useEffect } from 'react';
import {
  pricing,
  services,
  type FrequencyBand,
} from '~/content/services';
import { brand } from '~/lib/brand';

/**
 * /quote page hero — instant 3-field estimate.
 *
 * - Pure client-side calculator, posts no data anywhere
 * - Recovers last selection from localStorage so a returning user
 *   sees "their" numbers, not a blank form
 * - Final CTA routes to the phone number (no Formspree / no server)
 */

interface FormState {
  service: string;
  size: string;       // string so empty input is naturally possible
  frequency: FrequencyBand;
}

const STORAGE_KEY = 'wjs.quote.draft';

function defaultState(): FormState {
  const first = services[0];
  return { service: first.slug, size: '', frequency: 'weekly' };
}

function readDraft(): FormState | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.service === 'string') return parsed;
  } catch { /* ignore — corrupted draft */ }
  return null;
}

export default function QuoteCalculator() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const draft = readDraft();
    if (draft) setForm({ ...defaultState(), ...draft });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      } catch { /* quota exceeded etc. */ }
    }, [form, hydrated]);

    // Post-construction is one-time only — force `frequency` to 'once' and
    // surface the constraint in the UI by disabling the dropdown.
    useEffect(() => {
      if (form.service === 'post-construction' && form.frequency !== 'once') {
        setForm((s) => ({ ...s, frequency: 'once' }));
      }
    }, [form.service, form.frequency]);

    const freqDisabled = form.service === 'post-construction';
    const estimate = useMemo(() => {
    const matrix = pricing.find((p) => p.service === form.service);
    if (!matrix) return null;

    const sqm = Number(form.size);
    if (!Number.isFinite(sqm) || sqm <= 0) {
      return null;
    }

    // Post-construction bypasses the per-sqm matrix entirely.
    if (form.service === 'post-construction') {
      const lo = matrix.ratePerSqm.low * sqm;
      const hi = matrix.ratePerSqm.high * sqm;
      return { lo, hi, freqNote: 'one-time' };
    }

    const freqMult = matrix.frequencyMultiplier[form.frequency];
    if (freqMult === 0) return null;

    const lo = matrix.ratePerSqm.low  * sqm * freqMult;
    const hi = matrix.ratePerSqm.high * sqm * freqMult;
    const note =
      form.frequency === 'nightly' ? 'per visit, nightly' :
      form.frequency === 'thrice'  ? 'per visit, 3× weekly' :
      form.frequency === 'weekly'  ? 'per visit, weekly' :
      'one-time';

    return { lo, hi, freqNote: note };
  }, [form]);

  const fmt = (n: number) =>
    n.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0,
    });

  const inputCls =
    'w-full h-12 rounded-pill border border-ink-300 bg-white px-4 text-ink-900 ' +
    'focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none ' +
    'transition-shadow';

  const selectCls = inputCls + ' appearance-none pr-10';
  const labelCls = 'block text-sm font-semibold text-ink-800 mb-2';

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <form
        className="space-y-5 bg-white rounded-card-lg p-6 sm:p-8 shadow-card"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Instant estimate"
      >
        <div>
          <label htmlFor="service" className={labelCls}>
            What are you cleaning?
          </label>
          <select
            id="service"
            className={selectCls}
            value={form.service}
            onChange={(e) =>
              setForm((s) => ({ ...s, service: e.target.value }))
            }
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="size" className={labelCls}>
            Approximate area (square metres)
          </label>
          <input
            id="size"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="e.g. 350"
            value={form.size}
            onChange={(e) =>
              setForm((s) => ({ ...s, size: e.target.value }))
            }
            className={inputCls}
            aria-describedby="size-help"
          />
          <p id="size-help" className="mt-1.5 text-xs text-ink-500">
            1 sq. ft. ≈ 0.093 sq. m. We're happy to walk it for you.
          </p>
        </div>

        <div>
          <label htmlFor="freq" className={labelCls}>
            Frequency
            {freqDisabled && (
              <span className="ml-2 text-xs font-normal text-ink-500">
                (one-time only for post-construction)
              </span>
            )}
          </label>
          <select
            id="freq"
            className={selectCls}
            value={form.frequency}
            disabled={freqDisabled}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                frequency: e.target.value as FrequencyBand,
              }))
            }
          >
            <option value="once">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="thrice">3× weekly</option>
            <option value="nightly">Nightly / daily</option>
          </select>
        </div>

        <p className="text-xs text-ink-500">
          We don't ask for your address or any contact info to give an
          estimate. We'll only need that when you decide to proceed.
        </p>
      </form>

      <div className="bg-ink-900 text-white rounded-card-lg p-6 sm:p-8 shadow-card">
        <p className="text-xs uppercase tracking-wider text-brand-300">
          Your estimate
        </p>
        {estimate ? (
          <>
            <p className="mt-3 font-display text-4xl">
              {fmt(estimate.lo)} – {fmt(estimate.hi)}
            </p>
            <p className="mt-1 text-sm text-ink-300">
              {estimate.freqNote} · before walk-through adjustment
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 font-display text-2xl text-ink-300">
              Pick a service and an area.
            </p>
            <p className="mt-1 text-sm text-ink-400">
              We'll show a credible price range — no phone tag required.
            </p>
          </>
        )}

        <div className="mt-8 grid gap-3">
          <a
            href={`tel:${brand.phone.tel}`}
            className="inline-flex items-center justify-center gap-2
                       rounded-pill bg-brand-500 text-ink-900 px-6 h-12
                       font-semibold shadow-cta hover:scale-[1.02]
                       active:scale-[0.98] transition-transform"
          >
            Call to lock this estimate in
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center
                       rounded-pill bg-transparent text-brand-300 px-6 h-12
                       font-semibold border border-brand-700/40
                       hover:bg-brand-700/10 transition-colors"
          >
            Or send a message
          </a>
        </div>

        <p className="mt-6 text-xs text-ink-500 leading-relaxed">
          Estimates are calibrated against Winnipeg mid-market 2026
          rates. The number you'll actually see on the contract depends
          on layout, finishes, and access — we'll confirm in a 20-minute
          walk-through.
        </p>
      </div>
    </div>
  );
}
