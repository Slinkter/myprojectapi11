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
  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">
      ID: {id}
    </span>
    <div className="h-2 w-2 rounded-full bg-green-400"></div>
  </div>
);

CatCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(CatCardHeader);
