/**
 * @file Individual Cat Card Component.
 * @description Renders a cat image with an entrance animation and an overlay action button in a minimal style.
 * Implements the Compound Component pattern.
 */

import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";
import { cn } from "@shared/lib/cn";
import Card from "@shared/ui/Card";
import CatCardHeader from "./subcomponents/CatCardHeader";
import CatCardBody from "./subcomponents/CatCardBody";
import CatCardFooter from "./subcomponents/CatCardFooter";

/**
 * Individual Cat Card Component.
 * @description Renders a cat card container using the generic Card atom.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {import('react').ReactNode} props.children - Child components.
 * @param {string} [props.className] - Optional CSS classes.
 * @returns {JSX.Element} A cat card container.
 */
const CatCard = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const hoverClasses = shouldReduceMotion
    ? ""
    : "transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    <Card className={cn(
      "relative group border-none", 
      hoverClasses,
      className
    )}>
      {children}
    </Card>
  );
};


CatCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const MemoizedCatCard = React.memo(CatCard);

// Expose subcomponents as part of CatCard for easier discovery
MemoizedCatCard.Header = CatCardHeader;
MemoizedCatCard.Body = CatCardBody;
MemoizedCatCard.Footer = CatCardFooter;

export default MemoizedCatCard;
