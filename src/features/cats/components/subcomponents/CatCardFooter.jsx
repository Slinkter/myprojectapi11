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
    <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">Status</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Nice Kitty
        </span>
      </div>

      <button
        onClick={onAction}
        disabled={disabled}
        className={`
          p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm border
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          ${
            disabled
              ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
              : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95"
          }
        `}
        title={label}
        aria-label={label}
      >
        {isSave ? (
          <BsFillHeartFill
            className={`${
              disabled ? "text-gray-300" : "text-red-500"
            } w-5 h-5 transition-colors`}
          />
        ) : (
          <BsTrashFill className="text-gray-400 hover:text-red-500 w-5 h-5 transition-colors" />
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
