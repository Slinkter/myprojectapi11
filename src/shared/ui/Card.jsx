/**
 * @file Componente de Tarjeta genérico.
 * @description Un contenedor de tarjeta reutilizable siguiendo el Diseño Atómico.
 */

import PropTypes from "prop-types";
import { cn } from "@shared/lib/cn";

/**
 * Un componente de tarjeta básico.
 * 
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido de la tarjeta.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} La tarjeta renderizada.
 */
const Card = ({ children, className = "" }) => {
  return (
    <div className={cn(
      "bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Subcomponente Card Header.
 */
Card.Header = ({ children, className = "" }) => (
  <div className={cn("px-4 py-3 border-b border-border bg-muted/50", className)}>
    {children}
  </div>
);
Card.Header.displayName = "Card.Header";

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Subcomponente Card Body.
 */
Card.Body = ({ children, className = "" }) => (
  <div className={cn("p-4", className)}>
    {children}
  </div>
);
Card.Body.displayName = "Card.Body";

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Subcomponente Card Footer.
 */
Card.Footer = ({ children, className = "" }) => (
  <div className={cn("px-4 py-3 border-t border-border bg-muted/50", className)}>
    {children}
  </div>
);
Card.Footer.displayName = "Card.Footer";

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
