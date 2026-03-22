/**
 * @file Font Dropdown component.
 * @description Dropdown selector for changing the global font family.
 */

import React from "react";
import { useFont } from "@features/font/hooks/useFont";
import Select from "@shared/ui/Select";

/**
 * Component that renders a dropdown to change global app font family.
 * @component
 * @returns {JSX.Element} A custom font selector.
 *
 * @example
 * ```jsx
 * <FontDropdown />
 * ```
 */
const FontDropdown = React.memo(() => {
    const { font, changeFont, fonts } = useFont();

    const fontOptions = fonts.map((f) => ({
        value: f.family,
        label: f.name,
    }));

    return (
        <Select
            value={font}
            onChange={(e) => changeFont(e.target.value)}
            options={fontOptions}
            className="w-48"
            ariaLabel="Select Font"
        />
    );
});

FontDropdown.displayName = "FontDropdown";

export default FontDropdown;
