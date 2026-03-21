/**
 * @file Public API (Entry Point) for the Cats feature.
 * @description Following Feature-Sliced Design (FSD), this file acts as a 
 * "Public API" that encapsulates internal implementation details. 
 *
 * DATA FLOW (Top-Down Architecture):
 * 
 * [CAPA UI] -> [CAPA HOOKS] -> [CAPA REDUX] -> [CAPA SERVICES] -> [CAPA API/ADAPTERS]
 * CatList   -> useCats      -> catsSlice   -> catService     -> catApi + catMapper (Zod 4)
 * (Render)  -> (Facade)     -> (Thunk)     -> (Business)     -> (Network & Validation)
 * 
 *   +-----------+         +------------+         +------------+        +------------+         +------------+
 *   |           |         |            |         |            |        |            |         |            |
 *   | RandomCat |---(1)-->|  useCats   |---(2)-->| catsSlice  |---(3)-->| catService |---(4)-->|   catApi   |
 *   |   List    | (Call)  | (Facade)   | (Thunk) | (Business) | (Call) | (Axios)    | (JSON)  | (Network)  |
 *   |           |         |            |         |            |        |            |         |            |
 *   +-----------+         +------------+         +------------+        +------------+         +------------+
 *         ^                                                                                          |
 *         |                                                                                          v
 *         |                                                                                   +------------+
 *         |                                                                                   |            |
 *         +-----------------------------(7)----------------------------(6)-------------------| catMapper  |
 *                 (Re-render)                  (Normalización)                (Zod 4)     | (Clean)    |
 *                                                                                          +------------+
 */

/** 
 * 1. Global State Connection 
 * Exports the reducer for the Redux Store configuration.
 */
export { default as catsReducer } from "./redux/catsSlice";

/** 
 * 2. Component Interface (Facade Pattern) 
 * The primary hook for UI components to interact with the feature's data and logic.
 * Hides raw Redux dispatch/select logic.
 */
export { useCats } from "./hooks/useCats";

/** 
 * 3. Feature-Specific Error UI 
 * Reusable component to handle and display API-specific errors.
 */
export { default as CatErrorHandler } from "./components/CatErrorHandler";


