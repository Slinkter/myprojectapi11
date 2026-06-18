/**
 * @file Componente de botón de icono circular.
 * @description Un componente de botón reutilizable optimizado para mostrar iconos.
 * Proporciona un estilo consistente, estados de hover y soporte de accesibilidad.
 */

import React from "react";
import PropTypes from "prop-types";
import { m } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@shared/lib/cn";

/**
 * @typedef {Object} IconButtonProps
 * @property {React.ReactNode} children - Elemento de icono (debería ser de ~24x24px).
 * @property {React.MouseEventHandler<HTMLButtonElement>} onClick - Manejador de clics.
 * @property {boolean} [disabled=false] - Estado deshabilitado.
 * @property {string} [className] - Clases CSS adicionales.
 * @property {string} ariaLabel - Etiqueta de accesibilidad (obligatoria).
 */

/**
 * Variantes de botón para micro-interacciones.
 * @constant {Object}
 */
const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
};

/**
 * Un componente de botón circular diseñado para acciones de solo icono.
 * 
 * @component
 * @param {IconButtonProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento de botón renderizado.
 * 
 * @example
 * <IconButton onClick={handleClick} ariaLabel="Cerrar modal">
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
            className={cn(
                "flex items-center justify-center p-2.5 transition-all bg-card text-foreground border border-border rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed",
                className,
            )}
            aria-label={ariaLabel}
            whileHover={!disabled && !shouldReduceMotion ? buttonVariants.hover : undefined}
            whileTap={!disabled && !shouldReduceMotion ? buttonVariants.tap : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {React.isValidElement(children) ? React.cloneElement(children, {
                className: cn("w-6 h-6", children.props.className),
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
