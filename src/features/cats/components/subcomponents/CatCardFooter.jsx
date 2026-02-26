/**
 * @file CatCardFooter component.
 * @description Renders a minimal floating action button for a cat card.
 */

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@shared/utils/cn";
import { BsFillHeartFill, BsHeart, BsTrash } from "react-icons/bs";

/**
 * CatCardFooter component.
 * @param {object} props - Component properties.
 * @param {'save' | 'delete'} props.actionType - Action type.
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onAction - Action handler triggered on click.
 * @param {boolean} props.disabled - Disabled state.
 * @returns {JSX.Element} The footer element.
 */
const CatCardFooter = ({ actionType, onAction, disabled }) => {
  const isSave = actionType === "save";
  // Use 'text-red-500' as it's likely a brand accent color, as per design system notes on accent colors.
  const accentColor = "text-red-500";
  const label = isSave ? "Add to favourites" : "Remove from favourites";

  return (
    <button
      onClick={onAction}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center p-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30",
        disabled
          ? "bg-card/90 border-transparent cursor-not-allowed"
          : "bg-card/70 hover:bg-muted text-foreground active:scale-95",
      )}
      title={label}
      aria-label={label}
    >
      {isSave ? (
        disabled ? (
          <BsFillHeartFill
            className={cn("w-5 h-5 transition-colors", accentColor)}
          />
        ) : (
          <BsHeart className="w-5 h-5 transition-colors" />
        )
      ) : (
        <BsTrash
          className={cn(
            "w-5 h-5 text-foreground transition-colors",
            `hover:${accentColor}`,
          )}
        />
      )}
    </button>
  );
};

CatCardFooter.propTypes = {
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(CatCardFooter);
