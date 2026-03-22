/**
 * @file Sticky navigation bar with branding and theme/font controls.
 */

import ThemeToggleButton from "@features/theme/components/ThemeToggleButton";
import FontDropdown from "@features/font/components/FontDropdown";

/**
 * Sticky navigation bar with branding and theme/font controls.
 * @component
 * @returns {JSX.Element} The navigation header element.
 */
const Navbar = () => (
  <header className="sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-md">
    <div className="container flex items-center justify-between px-4 py-3 mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Cat Gallery
      </h1>
      <div className="flex items-center gap-4">
        <FontDropdown />
        <ThemeToggleButton />
      </div>
    </div>
  </header>
);

export default Navbar;
