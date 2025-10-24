/**
 * @file Constantes de la aplicación.
 * @description Este archivo centraliza constantes utilizadas en diferentes partes de la aplicación,
 * como la lista de fuentes disponibles. Esto facilita la gestión y modificación de estos valores.
 */

/**
 * Array de objetos que define las fuentes disponibles en la aplicación.
 * Cada objeto contiene el nombre para mostrar de la fuente y la cadena `font-family` de CSS correspondiente.
 * @type {Array<{name: string, family: string}>}
 */
export const fonts = [
    { name: "Inter", family: "'Inter', sans-serif" },
    { name: "Lato", family: "'Lato', sans-serif" },
    { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
    { name: "Playfair Display", family: "'Playfair Display', serif" },
    { name: "Lora", family: "'Lora', serif" },
];
