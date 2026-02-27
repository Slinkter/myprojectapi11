/**
 * @file Hook to synchronize application appearance with the DOM.
 * @description Manages theme (dark/light mode) and font family by:
 * - Applying CSS classes to the document root
 * - Persisting preferences to localStorage
 * 
 * This hook should be called once at the root of the application.
 */

import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * @typedef {Object} UseAppearanceReturn
 * @description This hook does not return any value. It handles side effects only.
 */

/**
 * Synchronizes Redux theme and font state with the DOM and localStorage.
 * 
 * @returns {UseAppearanceReturn} This hook does not return a value.
 * 
 * @example
 * const App = () => {
 *     useAppearance();
 *     return <div>My App</div>;
 * };
 */
export const useAppearance = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    const fontFamily = useSelector((state) => state.font.family);

    /**
     * Effect: Apply theme class to document root and persist to localStorage.
     */
    useEffect(() => {
        const root = document.documentElement;

        if (themeMode === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        try {
            localStorage.setItem("theme", themeMode);
        } catch (error) {
            console.error("Failed to persist theme to localStorage:", error);
        }
    }, [themeMode]);

    /**
     * Effect: Apply font family CSS variable to document root and persist to localStorage.
     */
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--font-family", fontFamily);

        try {
            localStorage.setItem("font", fontFamily);
        } catch (error) {
            console.error("Failed to persist font to localStorage:", error);
        }
    }, [fontFamily]);
};
