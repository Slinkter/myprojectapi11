/**
 * @file Constantes para la funcionalidad de fuentes.
 * @description Define las fuentes disponibles para la aplicación.
 */

/**
 * @typedef {object} Font
 * @property {string} name - El nombre para mostrar de la fuente.
 * @property {string} family - El valor de font-family de CSS.
 */

/**
 * Lista de fuentes disponibles para la aplicación.
 * Coincide con las importaciones de Google Fonts en index.html.
 * @type {Font[]}
 */
export const AVAILABLE_FONTS = [
  { name: "Inter", family: "'Inter', sans-serif" },
  { name: "Lato", family: "'Lato', sans-serif" },
  { name: "Lora", family: "'Lora', serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
];
