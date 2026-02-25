/**
 * @file CatCardFooter component.
 * @description Renders the footer of a cat card with action buttons.
 */

import React from "react";
import PropTypes from "prop-types";
import { BsFillHeartFill, BsTrashFill } from "react-icons/bs";

/**
 * CatCardFooter component.
 * @param {object} props - Component properties.
 * @param {string} props.actionType - Action type ("save" or "delete").
 * @param {function} props.onAction - Action handler.
 * @param {boolean} props.disabled - Disabled state.
 * @returns {JSX.Element} The footer element.
 */
const CatCardFooter = ({ actionType, onAction, disabled }) => {
  const isSave = actionType === "save";
  const label = isSave ? "Add to favourites" : "Remove from favourites";

  return (
    <div className="flex items-center justify-between p-4 bg-card border-t border-border">
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Status</span>
        <span className="text-sm font-semibold text-foreground">
          Nice Kitty
        </span>
      </div>

      <button
        onClick={onAction}
        disabled={disabled}
        className={`
          flex items-center justify-center p-2.5 rounded-xl border shadow-sm transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${
            disabled
              ? "bg-muted text-muted-foreground border-transparent cursor-not-allowed"
              : "bg-card border-border text-foreground hover:bg-muted active:scale-95"
          }
        `}
        title={label}
        aria-label={label}
      >
        {isSave ? (
          <BsFillHeartFill
            className={`${
              disabled ? "text-muted-foreground" : "text-red-500"
            } w-5 h-5 transition-colors`}
          />
        ) : (
          <BsTrashFill className="w-5 h-5 text-muted-foreground transition-colors hover:text-red-500" />
        )}
      </button>
    </div>
  );
};

CatCardFooter.propTypes = {
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(CatCardFooter);
