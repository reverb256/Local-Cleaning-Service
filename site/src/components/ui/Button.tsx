import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/cn';

/**
 * Button — a React island. Used in Astro pages with `client:load`.
 *
 * Why an island? Buttons sometimes need onClick handlers (calculator,
 * modal triggers). For pure-link CTAs the simpler `ButtonLink.astro`
 * static variant is preferred — keep islands lean.
 */

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 font-semibold ' +
  'rounded-pill transition-transform duration-200 ' +
  'focus-visible:outline focus-visible:outline-3 ' +
  'focus-visible:outline-brand-500 focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white shadow-cta hover:bg-brand-700 ' +
          'hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-white text-ink-900 border border-ink-300 shadow-card ' +
          'hover:bg-ink-50 hover:border-ink-400 hover:scale-[1.02] ' +
          'active:scale-[0.98]',
        ghost:
          'bg-transparent text-brand-700 hover:bg-brand-50 ' +
          'hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        md: 'h-11 px-5 text-sm',
        lg: 'h-14 px-7 text-base',
        sm: 'h-9  px-3 text-xs',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps =
  & VariantProps<typeof buttonStyles>
  & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
  & { className?: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...rest}
      />
    );
  },
);

/** As-link variant — keeps styles, uses anchor tag for proper href + a11y. */
type ButtonLinkProps =
  & VariantProps<typeof buttonStyles>
  & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>
  & { className?: string };

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ className, variant, size, ...rest }, ref) {
    return (
      <a
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...rest}
      />
    );
  },
);
