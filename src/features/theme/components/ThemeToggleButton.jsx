/**
 * @file Botón para cambiar entre modo claro y oscuro.
 * @description Este componente muestra un icono de sol o luna y permite al usuario
 * cambiar el tema de la aplicación utilizando el `ThemeContext`.
 */

import { useTheme } from "@features/theme/hooks/useTheme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

/**
 * Botón de tipo icono que alterna entre el tema claro y oscuro.
 *
 * @component
 * @returns {JSX.Element} Un `IconButton` que cambia de icono según el tema actual.
 */
const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all border border-gray-200 dark:border-gray-600 focus:outline-hidden focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
            aria-label="Toggle theme"
        >
            {/* Renderiza un icono u otro dependiendo del tema activo. */}
            {theme === "light" ? (
                <BsMoonFill className="w-5 h-5" />
            ) : (
                <BsSunFill className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggleButton;
