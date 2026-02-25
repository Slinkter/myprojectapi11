/**
 * @file CatCardFooter component.
 * @description Renders a minimal floating action button for a cat card.
 */

import React from "react";
import PropTypes from "prop-types";
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
  const label = isSave ? "Add to favourites" : "Remove from favourites";

  return (
    <button
      onClick={onAction}
      disabled={disabled}
      className={`
        flex items-center justify-center p-3 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20
        ${
          disabled
            ? "bg-white/90 border-transparent cursor-not-allowed"
            : "bg-white/70 hover:bg-white text-gray-800 hover:text-red-500 active:scale-95"
        }
      `}
      title={label}
      aria-label={label}
    >
      {isSave ? (
        disabled ? (
          <BsFillHeartFill className="w-5 h-5 text-red-500 transition-colors" />
        ) : (
          <BsHeart className="w-5 h-5 transition-colors" />
        )
      ) : (
        <BsTrash className="w-5 h-5 text-gray-800 transition-colors hover:text-red-500" />
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
