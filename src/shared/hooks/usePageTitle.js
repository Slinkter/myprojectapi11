/**
 * @file Hook para gestionar el título de la página del documento.
 * @description Establece el título del documento en el navegador al montar y restaura
 * el título anterior al desmontar para evitar efectos secundarios.
 */

import { useEffect } from "react";

/**
 * Establece el título del documento dinámicamente.
 *
 * @param {string} title - El nuevo título a mostrar en la pestaña del navegador.
 * @returns {void} Este hook no devuelve ningún valor.
 *
 * @example
 * usePageTitle("Mi Título Personalizado");
 */
export const usePageTitle = (title) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};
