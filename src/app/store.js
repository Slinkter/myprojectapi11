/**
 * @file Configuración del store de Redux.
 * @description Este archivo crea y configura el store de Redux para la aplicación.
 * Combina todos los reducers en un único reducer raíz.
 * Actualmente, solo se utiliza el `catsReducer`.
 */

import { configureStore } from "@reduxjs/toolkit";
import { catsReducer } from "@features/cats";
import themeReducer from "@features/theme/redux/themeSlice";
import fontReducer from "@features/font/redux/fontSlice";

const store = configureStore({
  reducer: {
    cats: catsReducer,
    theme: themeReducer,
    font: fontReducer,
  },
});

export default store;
