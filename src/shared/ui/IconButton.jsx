import React from "react";

/**
 * @file Generic Icon Button Component.
 * @description Renders a rounded button optimized for strict icon usage.
 * Encapsulates common styling (hover, focus, dark mode).
 */

import PropTypes from "prop-types";

import { cn } from "@shared/utils/cn";

/**
 * A circular button designed for icons.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {import('react').ReactNode} props.children - The icon element. Ensure icons are 24x24px (w-6 h-6).
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onClick - Click handler.
 * @param {string} [props.className] - Optional extra classes.
 * @param {string} props.ariaLabel - Accessibility label.
 * @returns {JSX.Element} The rendered React component.
 */
const IconButton = ({ children, onClick, className = "", ariaLabel }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center p-2.5 transition-all bg-card text-foreground border border-border rounded-full hover:bg-muted focus:outline-hidden focus:ring-2 focus:ring-primary/30",
        className,
      )}
      aria-label={ariaLabel}
    >
      {/* Ensure children (icons) are sized to 24x24px */}
      {React.cloneElement(children, {
        className: cn("w-6 h-6", children.props.className),
      })}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
};

export default IconButton;
