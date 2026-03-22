/**
 * @file Redux store configuration.
 * @description Creates and configures the Redux store for the application.
 * Combines all feature reducers into a single root reducer.
 *
 * @see {@link https://redux.js.org/api/store} Redux Store
 */

import { configureStore } from "@reduxjs/toolkit";
import { catsReducer } from "@features/cats";
import themeReducer from "@features/theme/redux/themeSlice";
import fontReducer from "@features/font/redux/fontSlice";

/**
 * The Redux store instance for the application.
 * @type {import('@reduxjs/toolkit').Store}
 */
const store = configureStore({
  reducer: {
    cats: catsReducer,
    theme: themeReducer,
    font: fontReducer,
  },
});

export default store;
