/**
 * @file Botón de alternancia para el modo Claro/Oscuro.
 * @description Renderiza un icono de sol o luna y permite al usuario
 * alternar el tema de la aplicación utilizando `useTheme`.
 */

import { useTheme } from "@features/theme/hooks/useTheme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import IconButton from "@shared/ui/IconButton";

/**
 * Botón de icono que alterna entre el tema claro y oscuro.
 *
 * @component
 * @returns {JSX.Element} Un `IconButton` que cambia de icono basándose en el tema actual.
 */
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} ariaLabel="Alternar tema">
      {/* Renderiza un icono dependiendo del tema activo. */}
      {theme === "light" ? (
        <BsMoonFill className="w-5 h-5" />
      ) : (
        <BsSunFill className="w-5 h-5" />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
