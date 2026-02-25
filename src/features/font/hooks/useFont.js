/**
 * @file Custom Hook para gestionar el estado de la fuente.
 * @description Abstrae la interacción con el store de Redux para la fuente,
 * proveyendo la familia actual, la lista de fuentes y una función para cambiarla.
 */
import { useDispatch, useSelector } from "react-redux";
import { changeFont as changeFontAction } from "@features/font/redux/fontSlice";

/**
 * @typedef {import("../redux/fontSlice").Font} Font
 */

/**
 * @typedef {Object} UseFontFacade
 * @property {string} font - La familia fuente activa (ej. 'inter').
 * @property {Font[]} fonts - Lista de componentes fuente disponibles.
 * @property {function(string): void} changeFont - Emite un cambion de fuente.
 */

/**
 * Hook `useFont` para acceder al estado de la fuente y modificarlo.
 * @returns {UseFontFacade} Fachada que controla datos fontales del DOM.
 */
export const useFont = () => {
  const { family: font, list: fonts } = useSelector((state) => state.font);
  const dispatch = useDispatch();

  /**
   * Despacha la acción para cambiar la fuente.
   * @param {string} newFontFamily La nueva familia de fuentes a aplicar.
   */
  const changeFont = (newFontFamily) => {
    dispatch(changeFontAction(newFontFamily));
  };

  return { font, fonts, changeFont };
};
