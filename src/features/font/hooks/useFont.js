/**
 * @file Hook to manage application font state.
 * @description Provides access to the current font family, list of available
 * fonts, and a function to change the active font.
 */

import { useDispatch, useSelector } from "react-redux";
import { changeFont as changeFontAction } from "@features/font/redux/fontSlice";

/**
 * @typedef {Object} Font
 * @property {string} family - CSS font-family value.
 * @property {string} name - Display name for the font.
 */

/**
 * @typedef {Object} UseFontFacade
 * @property {string} font - Currently active font family (e.g., 'Inter').
 * @property {Font[]} fonts - List of all available fonts.
 * @property {function(string): void} changeFont - Function to set a new font family.
 */

/**
 * Facade hook for font state management.
 * 
 * @returns {UseFontFacade} Object containing font state and change function.
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
     * Dispatches action to change the active font.
     * @param {string} newFontFamily - The new font family to apply.
     */
    const changeFont = (newFontFamily) => {
        dispatch(changeFontAction(newFontFamily));
    };

    return { font, fonts, changeFont };
};
