import React, { useMemo } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LoadingSpinnerProps
 * @property {'sm'|'md'|'lg'} [size] - Size of the spinner.
 * @property {string} [className] - Additional CSS classes.
 */

const sizeConfig = {
    sm: { width: 16, height: 16, stroke: 2 },
    md: { width: 32, height: 32, stroke: 3 },
    lg: { width: 48, height: 48, stroke: 4 },
};

/**
 * Animated loading spinner.
 * @component
 * @param {LoadingSpinnerProps} props - Component properties.
 * @returns {JSX.Element} Spinner element.
 */
const LoadingSpinner = React.memo(({ size = "md", className = "" }) => {
    const config = useMemo(() => sizeConfig[size] || sizeConfig.md, [size]);

    return (
        <svg
            width={config.width}
            height={config.height}
            viewBox={`0 0 ${config.width} ${config.height}`}
            className={`animate-spin ${className}`}
        >
            <circle
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
        </svg>
    );
});

LoadingSpinner.displayName = "LoadingSpinner";

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
};

export default LoadingSpinner;
