/**
 * @file Individual Cat Card Component.
 * @description Renders a cat image with an entrance animation and an overlay action button.
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import CatCardHeader from "./subcomponents/CatCardHeader";
import CatCardFooter from "./subcomponents/CatCardFooter";

/**
 * Renders a single cat card.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {object} props.cat - The cat object to display.
 * @param {function} props.onAction - Function to execute when action button is clicked.
 * @param {string} props.actionType - Action type ("save" or "delete").
 * @param {boolean} props.disabled - If action button should be disabled.
 * @param {number} props.index - Card index, used for animation delay.
 * @returns {JSX.Element} A cat card.
 */
const CatCard = ({ cat, onAction, actionType, disabled, index }) => {
  /**
   * Handle action click.
   */
  const handleAction = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        onAction(cat);
      }
    },
    [disabled, onAction, cat],
  );

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full animate-fade-in-scale"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <CatCardHeader id={cat.id} />

      {/* CARD BODY (Image) */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <CatCardFooter
        actionType={actionType}
        onAction={handleAction}
        disabled={disabled}
      />
    </div>
  );
};

CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  disabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(CatCard);
