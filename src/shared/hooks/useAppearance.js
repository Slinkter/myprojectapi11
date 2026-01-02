/**
 * @file Custom Hook to manage application appearance.
 * @description Synchronizes Redux state (theme and font) with the DOM (<html>)
 * and localStorage for persistence. Replaces the old `AppearanceManager`.
 */

import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Hook that manages appearance side effects (Theme and Font).
 * Should be invoked once at the root of the application.
 */
export const useAppearance = () => {
  // Selects theme mode and font family from Redux store.
  const themeMode = useSelector((state) => state.theme.mode);
  const fontFamily = useSelector((state) => state.font.family);

  // Effect to handle theme changes and persistence.
  useEffect(() => {
    const root = window.document.documentElement;

    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", themeMode);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [themeMode]);

  // Effect to handle font changes and persistence.
  useEffect(() => {
    const root = window.document.documentElement;

    // Assumes a CSS variable --font-family is configured in global CSS.
    root.style.setProperty("--font-family", fontFamily);

    try {
      localStorage.setItem("font", fontFamily);
    } catch (error) {
      console.error("Failed to save font to localStorage:", error);
    }
  }, [fontFamily]);
};
