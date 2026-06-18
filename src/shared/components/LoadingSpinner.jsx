/**
 * @file Componente de spinner de carga.
 * @description Un spinner animado reutilizable para estados de carga.
 */

import { m } from "framer-motion";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LoadingSpinnerProps
 * @property {string} [size] - Tamaño del spinner (sm, md, lg).
 * @property {string} [className] - Clases CSS adicionales.
 */

/**
 * Configuraciones de tamaño para el spinner.
 * @constant {Object}
 */
const sizeConfig = {
    sm: { width: 16, height: 16, stroke: 2 },
    md: { width: 32, height: 32, stroke: 3 },
    lg: { width: 48, height: 48, stroke: 4 },
};

/**
 * Variantes de animación para la rotación.
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
 * Spinner de carga animado.
 * @component
 * @param {LoadingSpinnerProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento del spinner.
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
