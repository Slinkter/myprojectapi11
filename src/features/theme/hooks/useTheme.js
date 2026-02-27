/**
 * @file Hook to manage application theme state.
 * @description Provides access to the current theme (light/dark mode)
 * and a function to toggle between them.
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggleThemeAction } from "@features/theme/redux/themeSlice";

/**
 * @typedef {"dark" | "light"} ThemeMode
 */

/**
 * @typedef {Object} UseThemeFacade
 * @property {ThemeMode} theme - Current active theme mode.
 * @property {function(): void} toggleTheme - Function to switch between light and dark mode.
 */

/**
 * Facade hook for theme state management.
 * 
 * @returns {UseThemeFacade} Object containing theme mode and toggle function.
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
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);

const toggleTheme = useCallback(() => {
        dispatch(toggleThemeAction());
    }, [dispatch]);

    return { theme, toggleTheme };
};
