/**
 * @file Hook para gestionar el estado del tema de la aplicación.
 * @description Proporciona acceso al tema actual (modo claro/oscuro)
 * y una función para alternar entre ellos.
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggleThemeAction } from "@features/theme/redux/themeSlice";

/**
 * @typedef {"dark" | "light"} ThemeMode
 */

/**
 * @typedef {Object} UseThemeFacade
 * @property {ThemeMode} theme - Modo de tema activo actual.
 * @property {function(): void} toggleTheme - Función para cambiar entre modo claro y oscuro.
 */

/**
 * Hook de fachada para la gestión del estado del tema.
 *
 * @returns {UseThemeFacade} Objeto que contiene el modo de tema y la función de alternancia.
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 *
 * return (
 *     <button onClick={toggleTheme}>
 *         {theme === 'dark' ? '🌙' : '☀️'}
 *     </button>
 * );
 */
export const useTheme = () => {
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    const toggleTheme = useCallback(() => {
        dispatch(toggleThemeAction());
    }, [dispatch]);

    return { theme, toggleTheme };
};
