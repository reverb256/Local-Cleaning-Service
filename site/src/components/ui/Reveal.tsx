import { useEffect, useRef, type PropsWithChildren } from 'react';

interface Props {
  /** Y-translate distance in px before reveal. default 24 */
  y?: number;
  /** Delay before reveal animation starts. default 0 */
  delay?: number;
  /** Duration in seconds. default 0.6 */
  duration?: number;
  /** When true, only triggers once. default true */
  once?: boolean;
  /** Optional classNames forwarded to outer wrapper. */
  className?: string;
}

/**
 * Reveal — GSAP-powered scroll entrance wrapper.
 *
 * Lazy-loads gsap + ScrollTrigger inside `useEffect` so the component
 * itself is SSR-safe (Astro will render an inert span on the server).
 *
 * If the user prefers reduced motion, the wrapper simply renders with
 * no animation — CSS handles `prefers-reduced-motion` at the global
 * level so this doesn't need to repeat the check.
 *
 * Named export so Astro pages can `import { Reveal } from ...`.
 */
export function Reveal({
  children,
  y = 24,
  delay = 0,
  duration = 0.6,
  once = true,
  className,
}: PropsWithChildren<Props>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const el = rootRef.current!;
      gsap.set(el, { opacity: 0, y });
      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });

      cleanup = () => {
        // Kill ScrollTrigger instances FIRST so the tween they were
        // driving is detached cleanly; kill the tween last.
        // Use `st.trigger` (resolved DOM element) rather than
        // `st.vars.trigger` (config-time sentinel) to avoid matching
        // unrelated triggers on HMR re-render.
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === el)
          .forEach((st) => st.kill());
        tween.kill();
      };
    })();

    return () => cleanup();
  }, [y, delay, duration, once]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
