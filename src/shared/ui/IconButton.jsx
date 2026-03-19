/**
 * @file Circular icon button component.
 * @description A reusable button component optimized for displaying icons.
 * Provides consistent styling, hover states, and accessibility support.
 */

import React from "react";
import PropTypes from "prop-types";
import { m } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { classNames } from "@shared/lib/classNames";

/**
 * @typedef {Object} IconButtonProps
 * @property {React.ReactNode} children - Icon element (should be ~24x24px).
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - Click handler.
 * @property {boolean} [disabled=false] - Disabled state.
 * @property {string} [className] - Additional CSS classes.
 * @property {string} ariaLabel - Accessibility label (required).
 */

/**
 * Button variants for micro-interactions.
 * @constant {Object}
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
 * 
 * @example
 * <IconButton onClick={handleClick} ariaLabel="Close modal">
 *     <BsXCircle />
 * </IconButton>
 */
const IconButton = ({ children, onClick, disabled = false, className = "", ariaLabel }) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={classNames(
                "flex items-center justify-center p-2.5 transition-all bg-card text-foreground border border-border rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed",
                className,
            )}
            aria-label={ariaLabel}
            whileHover={!disabled && !shouldReduceMotion ? buttonVariants.hover : undefined}
            whileTap={!disabled && !shouldReduceMotion ? buttonVariants.tap : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {React.isValidElement(children) ? React.cloneElement(children, {
                className: classNames("w-6 h-6", children.props.className),
            }) : children}
        </m.button>
    );
};

IconButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    ariaLabel: PropTypes.string.isRequired,
};

export default IconButton;
