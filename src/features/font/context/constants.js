/**
 * @file Constants for the font feature.
 * @description Defines the available fonts for the application.
 */

/**
 * @typedef {object} Font
 * @property {string} name - The display name of the font.
 * @property {string} family - The CSS font-family value.
 */

/**
 * List of available fonts for the application.
 * Matches the Google Fonts imports in index.html.
 * @type {Font[]}
 */
export const fonts = [
  { name: "Inter", family: "'Inter', sans-serif" },
  { name: "Lato", family: "'Lato', sans-serif" },
  { name: "Lora", family: "'Lora', serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
];
