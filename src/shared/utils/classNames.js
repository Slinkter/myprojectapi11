/**
 * @file Utility for merging Tailwind CSS classes.
 * @description Combines clsx and tailwind-merge to handle conditional classes and resolve conflicts.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names and handles Tailwind CSS conflicts.
 * 
 * @param {...import('clsx').ClassValue[]} inputs - Class names or expressions to merge.
 * @returns {string} The merged and resolved class string.
 * 
 * @example
 * classNames("px-2 py-1", isError && "bg-red-500", customClass);
 */
export function classNames(...inputs) {
  return twMerge(clsx(inputs));
}
