/**
 * @file CatCardFooter component.
 * @description Renders a minimal floating action button for a cat card.
 */

import React from "react";
import PropTypes from "prop-types";
import { BsFillHeartFill, BsHeart, BsTrash } from "react-icons/bs";
import { cn } from "@shared/lib/cn";
import IconButton from "@shared/ui/IconButton";

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
  const label = isSave ? "Add to favourites" : "Remove from favourites";

  return (
    <IconButton
      onClick={onAction}
      disabled={disabled}
      ariaLabel={label}
      className={cn(
        "border-none active:scale-95",
        isSave 
          ? (disabled ? "bg-black/50 cursor-not-allowed" : "bg-black/70 hover:bg-black text-white")
          : "bg-black/70 hover:bg-black text-white"
      )}
    >

      {isSave ? (
        disabled ? (
          <BsFillHeartFill className="text-red-500" />
        ) : (
          <BsHeart />
        )
      ) : (
        <BsTrash className="hover:text-red-500 transition-colors" />
      )}
    </IconButton>
  );
};

CatCardFooter.propTypes = {
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(CatCardFooter);
