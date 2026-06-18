/**
 * @file API Pública (Punto de Entrada) para la funcionalidad de Gatos.
 * @description Siguiendo el Diseño por Capas de Funcionalidades (FSD), este archivo actúa como una
 * "API Pública" que encapsula los detalles de implementación interna.
 *
 * FLUJO DE DATOS (Arquitectura Top-Down):
 * 
 * [CAPA UI] -> [CAPA HOOKS] -> [CAPA REDUX] -> [CAPA SERVICES] -> [CAPA API/ADAPTERS]
 * CatList   -> useCats      -> catsSlice   -> catService     -> catApi + catMapper (Zod 4)
 * (Render)  -> (Fachada)    -> (Thunk)     -> (Negocio)      -> (Red y Validación)
 * 
 *   +-----------+         +------------+         +------------+        +------------+         +------------+
 *   |           |         |            |         |            |        |            |         |            |
 *   | RandomCat |---(1)-->|  useCats   |---(2)-->| catsSlice  |---(3)-->| catService |---(4)-->|   catApi   |
 *   |   List    | (Call)  | (Fachada)  | (Thunk) | (Negocio)  | (Call) | (Axios)    | (JSON)  | (Red)      |
 *   |           |         |            |         |            |        |            |         |            |
 *   +-----------+         +------------+         +------------+        +------------+         +------------+
 *         ^                                                                                          |
 *         |                                                                                          v
 *         |                                                                                   +------------+
 *         |                                                                                   |            |
 *         +-----------------------------(7)----------------------------(6)-------------------| catMapper  |
 *                 (Re-renderizado)              (Normalización)                 (Zod 4)     | (Limpio)    |
 *                                                                                          +------------+
 */

/** 
 * 1. Conexión con el Estado Global 
 * Exporta el reducer para la configuración del Redux Store.
 */
export { default as catsReducer } from "./redux/catsSlice";

/** 
 * 2. Interfaz del Componente (Patrón Fachada) 
 * El hook principal para que los componentes de la UI interactúen con los datos y la lógica de la funcionalidad.
 * Oculta la lógica bruta de dispatch/select de Redux.
 */
export { useCats } from "./hooks/useCats";

/** 
 * 3. UI de Error Específica de la Funcionalidad 
 * Componente reutilizable para manejar y mostrar errores específicos de la API.
 */
export { default as CatErrorHandler } from "./components/CatErrorHandler";
