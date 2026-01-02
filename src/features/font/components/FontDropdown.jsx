/**
 * @file Dropdown component to select the application font.
 * @description Uses `useFont` hook to access current font, update function
 * and available fonts. Renders a native `Select` styled to support light/dark themes.
 */

import { useFont } from "@features/font/hooks/useFont";
import Select from "@shared/ui/Select";

/**
 * Component that renders a dropdown to change global app font family.
 * Integrates with `FontContext` via `useFont` hook.
 *
 * @component
 * @returns {JSX.Element} A custom font selector.
 */
const FontDropdown = () => {
  const { font, changeFont, fonts } = useFont();

  // Transform fonts to options format expected by Select component
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
};

export default FontDropdown;
