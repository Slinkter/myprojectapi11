/**
 * @file Componente inicializador de datos.
 * @description Maneja la carga inicial de datos para la aplicación.
 * Esto separa la lógica de obtención de datos del componente App principal.
 */

import { usePreloadCats } from "@features/cats/hooks/usePreloadCats";

/**
 * Componente responsable de precargar los datos de los gatos en la inicialización de la aplicación.
 * @component
 * @returns {null} Este componente no renderiza nada.
 */
const DataInitializer = () => {
  usePreloadCats();
  return null;
};

export default DataInitializer;
