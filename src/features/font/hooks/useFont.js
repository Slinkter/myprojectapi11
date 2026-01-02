/**
 * @file Custom Hook para gestionar el estado de la fuente.
 * @description Abstrae la interacción con el store de Redux para la fuente,
 * proveyendo la familia actual, la lista de fuentes y una función para cambiarla.
 */
import { useDispatch, useSelector } from "react-redux";
import { changeFont as changeFontAction } from "@features/font/redux/fontSlice";

/**
 * @typedef {import("..//redux/fontSlice").Font} Font
 */

/**
 * Hook `useFont` para acceder al estado de la fuente y modificarlo.
 * @returns {{
 *  font: string,
 *  fonts: Font[],
 *  changeFont: (newFontFamily: string) => void
 * }}
 */
export const useFont = () => {
    const dispatch = useDispatch();
    const { family: font, list: fonts } = useSelector((state) => state.font);

    /**
     * Despacha la acción para cambiar la fuente.
     * @param {string} newFontFamily La nueva familia de fuentes a aplicar.
     */
    const changeFont = (newFontFamily) => {
        dispatch(changeFontAction(newFontFamily));
    };

    return { font, fonts, changeFont };
};
