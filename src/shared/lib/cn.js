/**
 * @file Utilidad para fusionar clases de Tailwind CSS.
 * @description Combina clsx y tailwind-merge para manejar clases condicionales y resolver conflictos.
 * Utiliza la convención de nomenclatura estándar de la industria 'cn'.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusiona nombres de clases y maneja conflictos de Tailwind CSS.
 * 
 * @param {...import('clsx').ClassValue[]} inputs - Nombres de clases o expresiones a fusionar.
 * @returns {string} La cadena de clases fusionada y resuelta.
 * 
 * @example
 * cn("px-2 py-1", isError && "bg-red-500", customClass);
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
