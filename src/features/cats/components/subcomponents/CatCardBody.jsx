/**
 * @file CatCardBody component.
 * @description Renders the main content (image) of a cat card.
 */

import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";

/**
 * CatCardBody component.
 * @param {object} props - Component properties.
 * @param {string} props.url - The cat image URL.
 * @param {string} props.id - The cat ID.
 * @returns {JSX.Element} The body element.
 */
const CatCardBody = ({ url, id }) => {
  const shouldReduceMotion = useReducedMotion();

  const imageClasses = shouldReduceMotion
    ? "object-cover w-full h-full"
    : "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105";

  const overlayClasses = shouldReduceMotion
    ? "absolute inset-0 pointer-events-none"
    : "absolute inset-0 transition-opacity duration-300 opacity-0 from-black/50 via-transparent to-transparent pointer-events-none group-hover:opacity-100";

  return (
    <div className="relative aspect-square w-full">
      <img
        src={url}
        alt={`Cat ${id}`}
        loading="lazy"
        className={imageClasses}
      />
      <div className={overlayClasses} />
    </div>
  );
};

CatCardBody.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(CatCardBody);
