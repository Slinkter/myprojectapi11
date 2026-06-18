/**
 * @file Hook para sincronizar la apariencia de la aplicación con el DOM.
 * @description Gestiona el tema (modo oscuro/claro) y la familia de fuentes mediante:
 * - La aplicación de clases CSS al elemento raíz del documento
 * - La persistencia de preferencias en localStorage
 *
 * Este hook debe ser llamado una vez en la raíz de la aplicación.
 */

import { useEffect } from "react";
import { useTheme } from "@features/theme/hooks/useTheme";
import { useFont } from "@features/font/hooks/useFont";

/**
 * @typedef {Object} UseAppearanceReturn
 * @description Este hook no devuelve ningún valor. Solo gestiona efectos secundarios.
 */

/**
 * Sincroniza el estado del tema y la fuente con el DOM y localStorage.
 *
 * @returns {UseAppearanceReturn} Este hook no devuelve un valor.
 *
 * @example
 * const App = () => {
 *     useAppearance();
 *     return <div>Mi Aplicación</div>;
 * };
 */
export const useAppearance = () => {
    const { theme: themeMode } = useTheme();
    const { font: fontFamily } = useFont();

    /**
     * Efecto: Aplica la clase de tema al raíz del documento y persiste en localStorage.
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
            console.error("Error al persistir el tema en localStorage:", error);
        }
    }, [themeMode]);

    /**
     * Efecto: Aplica la variable CSS de familia de fuentes al raíz del documento y persiste en localStorage.
     */
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--font-family", fontFamily);

        try {
            localStorage.setItem("font", fontFamily);
        } catch (error) {
            console.error("Error al persistir la fuente en localStorage:", error);
        }
    }, [fontFamily]);
};
