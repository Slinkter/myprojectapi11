/**
 * @file Public API for the cats feature.
 * @description Exports only what is necessary for the rest of the application.
 */

export { default as catsReducer } from "./redux/catsSlice";
export { useCats } from "./hooks/useCats";
export { default as CatErrorHandler } from "./components/CatErrorHandler";
