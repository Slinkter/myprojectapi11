/**
 * @file Custom Hook para acceder al contexto del tema.
 * @description Este hook abstrae el uso de `useContext` para el `ThemeContext`,
 * facilitando el acceso al estado del tema (claro/oscuro) y a la función
 * para alternarlo desde cualquier componente.
 */

import { useContext } from "react";
import { ThemeContext } from "@features/theme/context/ThemeContext";

/**
 * Hook `useTheme` que proporciona acceso al contexto del tema.
 *
 * @returns {{theme: string, toggleTheme: () => void}} El valor del contexto del tema, que incluye:
 * - `theme`: El tema actual ("light" or "dark").
 * - `toggleTheme`: La función para cambiar entre los temas.
 */
export const useTheme = () => useContext(ThemeContext);
