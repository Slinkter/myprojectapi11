/**
 * @file Hook to manage application font state.
 * @description Provides access to the current font family and a function to change it.
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFont as changeFontAction } from "@features/font/redux/fontSlice";

/**
 * @typedef {Object} UseFontFacade
 * @property {string} font - Currently active font family.
 * @property {Array<{family: string, name: string}>} fonts - List of available fonts.
 * @property {function(string): void} changeFont - Function to set a new font family.
 */

/**
 * @returns {UseFontFacade}
 */
export const useFont = () => {
    const dispatch = useDispatch();
    const { family: font, list: fonts } = useSelector((state) => state.font);

    const changeFont = useCallback((newFontFamily) => {
        dispatch(changeFontAction(newFontFamily));
    }, [dispatch]);

    return { font, fonts, changeFont };
};
