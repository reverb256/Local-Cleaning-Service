import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compose class names with conditional logic AND Tailwind-class dedup.
 *
 * @example
 *   cn("px-4 py-2", isPrimary && "bg-brand-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
