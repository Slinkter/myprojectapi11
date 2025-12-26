/**
 * @file Configuración del store de Redux.
 * @description Este archivo crea y configura el store de Redux para la aplicación.
 * Combina todos los reducers en un único reducer raíz.
 * Actualmente, solo se utiliza el `catsReducer`.
 */

import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "@features/cats/redux/catsSlice";

/**
 * El store de Redux para la aplicación.
 * `configureStore` simplifica la creación del store, aplicando automáticamente
 * middleware como Redux Thunk y habilitando las Redux DevTools.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({
    // El objeto `reducer` mapea los nombres de los slices del estado a sus respectivos reducers.
    reducer: {
        cats: catsReducer,
    },
});

export default store;