import React from "react";
import { useTheme } from "@features/theme/hooks/useTheme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import IconButton from "@shared/ui/IconButton";
import { A11Y_LABELS } from "@config/uiText";

/**
 * Icon button that toggles between light and dark theme.
 *
 * @component
 * @returns {JSX.Element} An `IconButton` that changes icon based on current theme.
 */
const ThemeToggleButton = React.memo(() => {
    const { theme, toggleTheme } = useTheme();

    return (
        <IconButton onClick={toggleTheme} ariaLabel={A11Y_LABELS.TOGGLE_THEME}>
            {theme === "light" ? (
                <BsMoonFill className="w-5 h-5" />
            ) : (
                <BsSunFill className="w-5 h-5" />
            )}
        </IconButton>
    );
});

ThemeToggleButton.displayName = "ThemeToggleButton";

export default ThemeToggleButton;
