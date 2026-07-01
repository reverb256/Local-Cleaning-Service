import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * StatementPretext \u2014 scroll-coupled canvas-text reveal.
 *
 * Renders an oversized editorial headline with a kinetic brand-cyan
 * fill that progresses left-to-right as the section enters the viewport.
 *
 * Single source of truth: the `STATEMENT` constant below is the only
 * place copy lives. Both the SSR HTML fallback and the canvas drawing
 * derive from it; any edit propagates to both paths at once.
 *
 * Lifecycle:
 *   - SSR emits SSR HTML (heading + subhead); visible on initial paint
 *     and serves the no-JS / prefers-reduced-motion case unchanged.
 *   - When motion is allowed and fonts are ready, the SSR heading
 *     fades to opacity-0 and a `<canvas>` overlays it with the words
 *     drawn at the same font-size (`getComputedStyle(heading).fontSize`)
 *     so the bounding box matches \u2014 no layout shift on hydration.
 *   - Auto-reveal runs first (1.6s, scrolls\u2011in feel); only after it
 *     completes do we attach the ScrollTrigger scrub so the two writers
 *     never race on `progressRef.current`.
 *
 * Color resolution reads from `--color-*` CSS custom properties at
 * mount so a future edit to `tokens.css` propagates to the canvas
 * without touching this file.
 */

interface Segment {
  text: string;
  accent: boolean;
}

const STATEMENT = {
  eyebrow: 'Operating principle',
  segments: [
    { text: 'Same crew.',        accent: false },
    { text: 'Same checklist.',   accent: false },
    { text: 'Every single visit.', accent: true  },
  ] as readonly Segment[],
  subhead:
    'Consistent cleaners, strict compliance audits, ' +
    'and a 30-minute response guarantee. ' +
    'When you hand over the keys, you hand over the headache.',
} as const;

interface CanvasColors {
  ink900: string;
  ink300: string;
  brand500: string;
  brand800: string;
}

export default function StatementPretext() {
  const [canvasActive, setCanvasActive] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  /** 0..1 \u2014 fill progress; driven by auto-reveal then ScrollTrigger. */
  const progressRef = useRef(0);
  const triggerRef  = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const prefersReduce = window
      .matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      // SSR HTML stays as-is for reduced-motion users. Done.
      return;
    }

    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    const heading = headingRef.current;
    if (!section || !canvas || !heading) return;

    let raf = 0;
    let cleanup = () => {};

    gsap.registerPlugin(ScrollTrigger);

    (async () => {
      // If the canvas draws before Fraunces/Inter swaps in, the
      // headline bakes the fallback font into the pixel grid and the
      // layout visibly shifts on hydration.
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise<void>((resolve) => setTimeout(resolve, 1500)),
        ]);
      } catch { /* fall-through with system fonts */ }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resolve brand colors from CSS custom properties at mount.
      function resolveColors(): CanvasColors {
        const cs = window.getComputedStyle(document.documentElement);
        const get = (name: string, fallback: string) => {
          const v = cs.getPropertyValue(name).trim();
          return v || fallback;
        };
        return {
          ink900:   get('--color-ink-900',   '#0f172a'),
          ink300:   get('--color-ink-300',   '#cbd5e1'),
          brand500: get('--color-brand-500', '#06b6d4'),
          brand800: get('--color-brand-800', '#155e75'),
        };
      }
      const COLORS = resolveColors();

      // Read the SSR heading's resolved font-size so the canvas draws
      // at the exact same metric across breakpoints. No more drift
      // between the typed `<h2>` and the painted canvas.
      function readFontSize(): number {
        const computed = parseFloat(
          window.getComputedStyle(heading!).fontSize,
        );
        return Number.isFinite(computed) && computed > 0 ? computed : 56;
      }

      function syncCanvasSize() {
        if (!canvas || !heading) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = heading.getBoundingClientRect();
        const cssW = Math.max(rect.width, 1);
        const cssH = Math.max(rect.height, 1);
        canvas.width  = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width  = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
      }

      function draw() {
        raf = 0;
        renderHeadline(
          canvas!,
          ctx!,
          progressRef.current,
          COLORS,
          readFontSize(),
        );
      }
      const schedule = () => {
        if (raf) return;
        raf = requestAnimationFrame(draw);
      };

      // Initial paint.
      syncCanvasSize();
      renderHeadline(canvas, ctx, 0, COLORS, readFontSize());
      setCanvasActive(true);

      // 1) Auto-reveal runs alone on mount (every visitor sees the
      //    headline fill in once, regardless of scroll behaviour).
      gsap.fromTo(
        progressRef,
        { current: 0 },
        {
          current: 1,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.25,
          onUpdate: schedule,
          onComplete: () => {
            // 2) AFTER auto-reveal finishes, attach the scroll-scrubbed
            //    re-reveal. Sequencing prevents two writers racing on
            //    `progressRef.current` during the intro window.
            triggerRef.current = ScrollTrigger.create({
              trigger: section,
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 0.6,
              onUpdate: (self) => {
                progressRef.current = self.progress;
                schedule();
              },
            });
          },
        },
      );

      // Resize: device rotation, mobile URL-bar collapse on iOS, etc.
      const ro = new ResizeObserver(() => {
        syncCanvasSize();
        schedule();
        triggerRef.current?.refresh();
      });
      ro.observe(section);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        triggerRef.current?.kill();
        triggerRef.current = null;
        ro.disconnect();
      };
    })();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-ink-950 text-white py-24 md:py-32"
      aria-labelledby="statement-headline"
    >
      <div className="container-page">
        <span className="eyebrow text-brand-300">{STATEMENT.eyebrow}</span>

        <div className="relative mt-6 max-w-5xl">
          {/* SSR fallback \u2014 visible on initial paint + reduced-motion. */}
          <h2
            id="statement-headline"
            ref={headingRef}
            className={
              'font-display leading-[1.05] font-bold tracking-[-0.015em] ' +
              'text-[clamp(2.75rem,8vw,6.5rem)] ' +
              (canvasActive ? 'opacity-0' : 'text-ink-100')
            }
            style={{ transition: 'opacity 320ms ease-out' }}
          >
            {STATEMENT.segments.map((seg, i) => (
              <span key={i} className="block">
                {seg.accent
                  ? <span className="text-brand-400">{seg.text}</span>
                  : seg.text}
              </span>
            ))}
          </h2>

          {/* Canvas overlay, mounted only when motion is allowed. */}
          {canvasActive && (
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full pointer-events-none"
            />
          )}
        </div>

        <p className="mt-8 text-lg md:text-xl text-ink-300 max-w-2xl leading-relaxed">
          {STATEMENT.subhead}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Canvas rendering \u2014 library-agnostic. If @chenglou/pretext (or
 * react-text-fabric) is later adopted, replace only this function;
 * lifecycle around it is preserved.
 * ------------------------------------------------------------------ */

function renderHeadline(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  progress: number,
  COLORS: CanvasColors,
  fontPx: number,
) {
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.width  / dpr;
  const cssH = canvas.height / dpr;

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  ctx.font = `700 ${fontPx}px "Fraunces", ui-serif, Georgia, serif`;
  ctx.textBaseline = 'top';
  ctx.lineJoin = 'round';

  const lineHeight = Math.round(fontPx * 1.05);
  const lines = STATEMENT.segments.map((seg, i) => ({
    text: seg.text,
    accent: seg.accent,
    y: i * lineHeight,
  }));

  // 1) Base layer \u2014 delicate ink-300 stroke + transparent fill so
  //    the headline reads before scroll-driven fill hits.
  ctx.strokeStyle = COLORS.ink300;
  ctx.lineWidth = 0.75;
  ctx.fillStyle = 'rgba(241, 245, 249, 0.04)';
  for (const { text, y } of lines) {
    ctx.fillText(text, 0, y);
    ctx.strokeText(text, 0, y);
  }

  // 2) Kinetic fill \u2014 left-to-right brand gradient clipped to
  //    0..progress * cssW. Leading edge is the cyan wash, wake is
  //    solid ink-900, edge fades to white so the clip pops visibly.
  if (progress > 0) {
    const reveal  = Math.min(1, Math.max(0, progress));
    const fillX   = reveal * cssW;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, fillX, cssH);
    ctx.clip();

    const grad = ctx.createLinearGradient(0, 0, cssW, 0);
    grad.addColorStop(0,    COLORS.ink900);
    grad.addColorStop(0.55, COLORS.brand800);
    grad.addColorStop(0.92, COLORS.brand500);
    grad.addColorStop(1,    '#ffffff');

    ctx.fillStyle = grad;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.25;
    for (const { text, y } of lines) {
      ctx.fillText(text, 0, y);
      ctx.strokeText(text, 0, y);
    }
    ctx.restore();
  }

  ctx.restore();
}
