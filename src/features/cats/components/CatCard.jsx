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
      className="flex flex-col h-full overflow-hidden bg-card border border-border rounded-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-scale group"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <CatCardHeader id={cat.id} />

      {/* CARD BODY (Image) */}
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none group-hover:opacity-100" />
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
