/**
 * @file Individual Cat Card Component.
 * @description Renders a cat image with an entrance animation and an overlay action button in a minimal style.
 * Implements the Compound Component pattern.
 */

import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";
import { classNames } from "@shared/lib/classNames";
import CatCardHeader from "./subcomponents/CatCardHeader";
import CatCardBody from "./subcomponents/CatCardBody";
import CatCardFooter from "./subcomponents/CatCardFooter";

/**
 * Renders a single cat card container.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {import('react').ReactNode} props.children - Child components (Header, Body, Footer).
 * @param {string} [props.className] - Optional CSS classes.
 * @returns {JSX.Element} A cat card container.
 */
const CatCard = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const hoverClasses = shouldReduceMotion
    ? ""
    : "transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    <div className={classNames(
      "relative overflow-hidden bg-muted rounded-2xl shadow-sm group", 
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
};

CatCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Expose subcomponents as part of CatCard
CatCard.Header = CatCardHeader;
CatCard.Body = CatCardBody;
CatCard.Footer = CatCardFooter;

export default React.memo(CatCard);
