/**
 * @file Slice de Redux para gestionar el estado del tema (oscuro/claro).
 * @description Este módulo define el estado inicial y los reducers para manejar el tema de la UI.
 * La lógica para persistir en localStorage y actualizar el DOM se gestionará en un
 * componente de nivel superior que escuche los cambios de este estado.
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Obtiene el tema inicial, priorizando localStorage sobre la preferencia del sistema.
 * @returns {"dark" | "light"}
 */
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        /** @type {"dark" | "light"} */
        mode: getInitialTheme(),
    },
    reducers: {
        /**
         * Alterna el tema entre 'light' y 'dark'.
         * @param {object} state - El estado actual del slice.
         */
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
