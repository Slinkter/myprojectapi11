/**
 * @file Generic Card component.
 * @description A reusable card container following Atomic Design.
 */

import PropTypes from "prop-types";
import { cn } from "@shared/lib/cn";

/**
 * A basic card component.
 * 
 * @component
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Card content.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The rendered card.
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
 * Card Header subcomponent.
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
 * Card Body subcomponent.
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
 * Card Footer subcomponent.
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
