/**
 * @file Custom Hook para acceder al contexto del tema.
 * @description Este hook abstrae el uso de `useContext` para el `ThemeContext`,
 * facilitando el acceso al estado del tema (claro/oscuro) y a la función
 * para alternarlo desde cualquier componente.
 */

/**
 * @file Custom Hook para gestionar el estado del tema.
 * @description Abstrae la interacción con el store de Redux para el tema,
 * proveyendo el modo actual y una función para alternarlo.
 */
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggleThemeAction } from "@features/theme/redux/themeSlice";

/**
 * Hook `useTheme` para acceder al estado del tema y alternarlo.
 * @returns {{
 *  theme: "dark" | "light",
 *  toggleTheme: () => void
 * }}
 */
export const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);

    const toggleTheme = () => {
        dispatch(toggleThemeAction());
    };

    return { theme, toggleTheme };
};
