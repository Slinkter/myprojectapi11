/**
 * @file Utility: Tailwind className merger.
 * @description Combines `clsx` and `tailwind-merge` to merge Tailwind CSS classes safely.
 */

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and deduplicates Tailwind CSS class names.
 *
 * @param {...*} args - Class names, objects, or arrays to merge.
 * @returns {string} Combined Tailwind class string with no duplicates.
 *
 * @example
 * ```js
 * cn('px-2 py-1', { 'bg-red-500': true }, ['px-2', 'bg-blue-500']);
 * // => 'py-1 bg-blue-500'
 * ```
 */
export function cn(...args) {
  return twMerge(clsx(...args));
}
