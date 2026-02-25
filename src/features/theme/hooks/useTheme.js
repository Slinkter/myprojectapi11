/**
 * @file Custom Hook para gestionar el estado del tema.
 * @description Abstrae la interacción con el store de Redux para el tema,
 * proveyendo el modo actual y una función para alternarlo.
 */
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggleThemeAction } from "@features/theme/redux/themeSlice";

/**
 * @typedef {Object} UseThemeFacade
 * @property {"dark" | "light"} theme - El esquema de colores actual.
 * @property {function(): void} toggleTheme - Fucion que emite la mutacion del tema.
 */

/**
 * Hook `useTheme` para acceder al estado del tema y alternarlo.
 * @returns {UseThemeFacade} Fachada con configuracion de tema visual.
 */
export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return { theme, toggleTheme };
};
