import { useEffect } from 'react';

/**
 * SmoothScroll — Lenis-initializer React island.
 *
 * Mounted once on the top-level layout. Provides buttery scroll for
 * hero/anchor interactions and integrates with GSAP's ScrollTrigger
 * ticker so reveals stay in sync.
 *
 * Two important details:
 *   - Lenis is bound to the GSAP ticker (not a parallel rAF loop) so
 *     ScrollTrigger can read scroll position immediately without
 *     single-frame jitter.
 *   - `gsap.ticker.lagSmoothing(0)` is set while Lenis is active so
 *     GSAP doesn't interpolate frame gaps that Lenis already smoothed.
 *
 * Doesn't render anything \u2014 just side-effects.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let cleanup = () => {};
    (async () => {
      const LenisMod = await import('lenis');
      const { gsap }    = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const Lenis = LenisMod.default;
      const lenis = new Lenis({
        duration: 1.0,
        smoothWheel: true,
      });

      // Drive Lenis off the GSAP ticker instead of a parallel rAF so
      // scroll position and ScrollTrigger stay in lock-step.
      const onTick = (time: number) => {
        // GSAP ticker fires in seconds; Lenis expects ms.
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      // GSAP's default lag smoothing interpolates missed frames —
      // disable it for the lifetime of Lenis.
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        // Restore lagSmoothing to default so a later page (or tests)
        // isn't left with a globally-disabled setting.
        gsap.ticker.lagSmoothing(500, 33);
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
