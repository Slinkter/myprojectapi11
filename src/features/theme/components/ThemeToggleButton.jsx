/**
 * @file Toggle button for Light/Dark mode.
 * @description Renders a sun or moon icon and allows the user to
 * toggle the application theme using `useTheme`.
 */

import { useTheme } from "@features/theme/hooks/useTheme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import IconButton from "@shared/ui/IconButton";

/**
 * Icon button that toggles between light and dark theme.
 *
 * @component
 * @returns {JSX.Element} An `IconButton` that changes icon based on current theme.
 */
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} ariaLabel="Toggle theme">
      {/* Renders an icon depending on the active theme. */}
      {theme === "light" ? (
        <BsMoonFill className="w-5 h-5" />
      ) : (
        <BsSunFill className="w-5 h-5" />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
