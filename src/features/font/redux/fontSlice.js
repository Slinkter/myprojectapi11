/**
 * @file Slice de Redux para gestionar el estado de la fuente de la aplicación.
 * @description Define el estado inicial y los reducers para la tipografía.
 */
import { createSlice } from "@reduxjs/toolkit";
import { fonts } from "@features/font/context/constants";

/**
 * @typedef {object} Font
 * @property {string} name - El nombre para mostrar de la fuente (ej. "Inter").
 * @property {string} family - La cadena `font-family` para CSS (ej. "'Inter', sans-serif").
 */

/**
 * Obtiene la fuente inicial desde localStorage o usa un valor por defecto.
 * @returns {string} La familia de fuentes.
 */
const getInitialFontFamily = () => {
  const savedFont = localStorage.getItem("font");
  // Validar que la fuente guardada siga existiendo en nuestras constantes.
  if (savedFont && fonts.some((f) => f.family === savedFont)) {
    return savedFont;
  }
  return fonts[0].family; // Devuelve la familia de la primera fuente por defecto.
};

const fontSlice = createSlice({
  name: "font",
  initialState: {
    /** @type {string} */
    family: getInitialFontFamily(),
    /** @type {Font[]} */
    list: fonts,
  },
  reducers: {
    /**
     * Cambia la fuente de la aplicación.
     * @param {object} state - El estado actual del slice.
     * @param {import('@reduxjs/toolkit').PayloadAction<string>} action - La acción con la nueva familia de fuentes.
     */
    changeFont: (state, action) => {
      // Validar que la fuente exista en la lista de fuentes disponibles
      if (state.list.some((f) => f.family === action.payload)) {
        state.family = action.payload;
      }
    },
  },
});

export const { changeFont } = fontSlice.actions;
export default fontSlice.reducer;
