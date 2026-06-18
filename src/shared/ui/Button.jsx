/**
 * @file Componente de Botón genérico.
 * @description Un componente de botón reutilizable con múltiples variantes y tamaños.
 */

import PropTypes from "prop-types";
import { m } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@shared/lib/cn";

/**
 * Variantes de botón para las interacciones con framer-motion.
 */
const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

/**
 * Un componente de botón reutilizable.
 *
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del botón.
 * @param {() => void} [props.onClick] - Manejador de clics.
 * @param {string} [props.type='button'] - Tipo de botón.
 * @param {'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'} [props.variant='primary'] - Estilo visual.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Tamaño del botón.
 * @param {boolean} [props.disabled=false] - Estado deshabilitado.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @param {string} [props.ariaLabel] - Etiqueta de accesibilidad.
 * @returns {JSX.Element} El botón renderizado.
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ariaLabel,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-destructive/20",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={!disabled && !shouldReduceMotion ? buttonVariants.hover : undefined}
      whileTap={!disabled && !shouldReduceMotion ? buttonVariants.tap : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </m.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "destructive", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;
