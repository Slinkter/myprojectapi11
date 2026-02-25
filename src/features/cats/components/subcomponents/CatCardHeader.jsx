/**
 * @file CatCardHeader component.
 * @description Renders the header of a cat card with ID and status indicator.
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * CatCardHeader component.
 * @param {object} props - Component properties.
 * @param {string} props.id - The cat ID.
 * @returns {JSX.Element} The header element.
 */
const CatCardHeader = ({ id }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
    <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
      ID: {id}
    </span>
    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
  </div>
);

CatCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(CatCardHeader);
