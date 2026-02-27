/**
 * @file Loading spinner component.
 * @description A reusable animated spinner for loading states.
 */

import { m } from "framer-motion";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LoadingSpinnerProps
 * @property {string} [size] - Size of the spinner (sm, md, lg).
 * @property {string} [className] - Additional CSS classes.
 */

/**
 * Size configurations for the spinner.
 * @constant {Object}
 */
const sizeConfig = {
    sm: { width: 16, height: 16, stroke: 2 },
    md: { width: 32, height: 32, stroke: 3 },
    lg: { width: 48, height: 48, stroke: 4 },
};

/**
 * Animation variants for rotation.
 * @constant {Object}
 */
const spinVariants = {
    animate: {
        rotate: 360,
        transition: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
        },
    },
};

/**
 * Animated loading spinner.
 * @component
 * @param {LoadingSpinnerProps} props - Component properties.
 * @returns {JSX.Element} Spinner element.
 */
const LoadingSpinner = ({ size = "md", className = "" }) => {
    const config = sizeConfig[size] || sizeConfig.md;

    return (
        <m.svg
            width={config.width}
            height={config.height}
            viewBox={`0 0 ${config.width} ${config.height}`}
            className={className}
            variants={spinVariants}
            initial="initial"
            animate="animate"
        >
            <m.circle
                cx={config.width / 2}
                cy={config.width / 2}
                r={(config.width - config.stroke) / 2}
                fill="transparent"
                stroke="currentColor"
                strokeWidth={config.stroke}
                strokeLinecap="round"
                strokeDasharray={Math.PI * (config.width - config.stroke)}
                strokeDashoffset={Math.PI * (config.width - config.stroke) * 0.75}
            />
        </m.svg>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
};

export default LoadingSpinner;
