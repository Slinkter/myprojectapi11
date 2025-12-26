/**
 * @file Custom Hook para acceder al contexto de la fuente.
 * @description Este hook abstrae el uso de `useContext` para el `FontContext`,
 * proporcionando una forma limpia y reutilizable de acceder al estado de la fuente
 * y a las funciones relacionadas en cualquier componente.
 */

import { useContext } from "react";
import { FontContext } from "@features/font/context/FontContext";

/**
 * Hook `useFont` que proporciona acceso al contexto de la fuente.
 *
 * @returns {object} El valor del contexto de la fuente, que incluye:
 * - `font`: La familia de fuentes CSS actual.
 * - `changeFont`: La función para actualizar la fuente.
 * - `fonts`: El array de fuentes disponibles.
 */
export const useFont = () => useContext(FontContext);
