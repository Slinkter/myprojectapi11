/**
 * @file Configuración del store de Redux.
 * @description Este archivo crea y configura el store de Redux para la aplicación.
 * Combina todos los reducers en un único reducer raíz.
 * Actualmente, solo se utiliza el `catsReducer`.
 */

/**

 * @file Configuración del store de Redux.

 * @description Crea y configura el store, combinando los reducers y exportando

 * los tipos `RootState` y `AppDispatch` para su uso en toda la aplicación.

 */

import { configureStore } from "@reduxjs/toolkit";

import catsReducer from "@features/cats/redux/catsSlice";

import themeReducer from "@features/theme/redux/themeSlice";

import fontReducer from "@features/font/redux/fontSlice";



const store = configureStore({

    reducer: {

        cats: catsReducer,

        theme: themeReducer,

        font: fontReducer,

    },

});



/**

 * @typedef {ReturnType<typeof store.getState>} RootState

 * @typedef {typeof store.dispatch} AppDispatch

 */



export default store;


