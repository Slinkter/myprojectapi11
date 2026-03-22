import React from "react";
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@shared/utils/cn";

/**
 * @typedef {Object} IconButtonProps
 * @property {React.ReactNode} children - Icon element (should be ~24x24px).
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - Click handler.
 * @property {string} [className] - Additional CSS classes.
 * @property {string} ariaLabel - Accessibility label (required).
 * @property {boolean} [disabled] - Disabled state.
 */

const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
};

/**
 * A circular button component designed for icon-only actions.
 *
 * @component
 * @param {IconButtonProps} props - Component properties.
 * @returns {JSX.Element} Rendered button element.
 */
const IconButton = React.memo(({ children, onClick, className = "", ariaLabel, disabled = false }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex items-center justify-center p-2.5 transition-all bg-card text-foreground border border-border rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30",
                disabled && "opacity-50 cursor-not-allowed",
                className,
            )}
            aria-label={ariaLabel}
            whileHover={!shouldReduceMotion && !disabled ? buttonVariants.hover : undefined}
            whileTap={!shouldReduceMotion && !disabled ? buttonVariants.tap : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </m.button>
    );
});

IconButton.displayName = "IconButton";

IconButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    ariaLabel: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default IconButton;
