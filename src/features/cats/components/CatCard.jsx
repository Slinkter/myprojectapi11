/**
 * @file Individual Cat Card Component.
 * @description Renders a cat image with an entrance animation and an overlay action button in a minimal style.
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";
import { cn } from "@shared/utils/cn";
import CatCardFooter from "./subcomponents/CatCardFooter";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Renders a single cat card.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {CatEntity} props.cat - The normalized cat domain entity to display.
 * @param {(cat: CatEntity) => void} props.onAction - Function to execute when action button is clicked.
 * @param {'save'|'delete'} props.actionType - Action type.
 * @param {boolean} props.disabled - If action button should be disabled.
 * @returns {JSX.Element} A cat card.
 */
const CatCard = ({ cat, onAction, actionType, disabled }) => {
  const shouldReduceMotion = useReducedMotion();

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

  const hoverClasses = shouldReduceMotion
    ? ""
    : "transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  const imageClasses = shouldReduceMotion
    ? "object-cover w-full h-full"
    : "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105";

  const overlayClasses = shouldReduceMotion
    ? "absolute inset-0 pointer-events-none"
    : "absolute inset-0 transition-opacity duration-300 opacity-0 from-black/50 via-transparent to-transparent pointer-events-none group-hover:opacity-100";

  const idBadgeClasses = shouldReduceMotion
    ? "absolute top-3 left-3 px-2 py-1 text-[12px] font-mono font-medium tracking-wider text-white bg-black/40 backdrop-blur-sm rounded-md pointer-events-none"
    : "absolute top-3 left-3 px-2 py-1 text-[12px] font-mono font-medium tracking-wider text-white bg-black/40 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none";

  const buttonClasses = disabled
    ? "absolute bottom-3 right-3 z-10"
    : shouldReduceMotion
      ? "absolute bottom-3 right-3 z-10"
      : "absolute bottom-3 right-3 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100";

  return (
    <div className={cn("relative overflow-hidden bg-muted rounded-2xl shadow-sm group", hoverClasses)}>
{/* CARD BODY (Image) */}
      <div className="relative aspect-square w-full">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          loading="lazy"
          className={imageClasses}
        />
        <div className={overlayClasses} />
      </div>

      {/* Cat ID slightly visible on hover */}
      <div className={idBadgeClasses}>
        ID: {cat.id}
      </div>

      {/* Floating Action Button */}
      <div className={cn(buttonClasses, "transition-opacity duration-300")}>
        <CatCardFooter
          actionType={actionType}
          onAction={handleAction}
          disabled={disabled}
        />
      </div>
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
};

export default React.memo(CatCard);
