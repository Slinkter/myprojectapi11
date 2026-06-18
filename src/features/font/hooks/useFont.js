/**
 * @file Hook para gestionar el estado de la fuente de la aplicación.
 * @description Proporciona acceso a la familia de fuentes actual, la lista de fuentes disponibles
 * y una función para cambiar la fuente activa.
 */

import { useDispatch, useSelector } from "react-redux";
import { changeFont as changeFontAction } from "@features/font/redux/fontSlice";

/**
 * @typedef {Object} Font
 * @property {string} family - Valor de font-family de CSS.
 * @property {string} name - Nombre para mostrar de la fuente.
 */

/**
 * @typedef {Object} UseFontFacade
 * @property {string} font - Familia de fuentes activa actualmente (ej. 'Inter').
 * @property {Font[]} fonts - Lista de todas las fuentes disponibles.
 * @property {function(string): void} changeFont - Función para establecer una nueva familia de fuentes.
 */

/**
 * Hook de fachada para la gestión del estado de la fuente.
 * 
 * @returns {UseFontFacade} Objeto que contiene el estado de la fuente y la función de cambio.
 * 
 * @example
 * const { font, fonts, changeFont } = useFont();
 * 
 * return (
 *     <select value={font} onChange={(e) => changeFont(e.target.value)}>
 *         {fonts.map(f => <option key={f.family} value={f.family}>{f.name}</option>)}
 *     </select>
 * );
 */
export const useFont = () => {
    const { family: font, list: fonts } = useSelector((state) => state.font);
    const dispatch = useDispatch();

    /**
     * Despacha la acción para cambiar la fuente activa.
     * @param {string} newFontFamily - La nueva familia de fuentes a aplicar.
     */
    const changeFont = (newFontFamily) => {
        dispatch(changeFontAction(newFontFamily));
    };

    return { font, fonts, changeFont };
};
