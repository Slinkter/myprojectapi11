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
 * @param {boolean} [props.loading] - Loading state for async actions.
 * @returns {JSX.Element} The footer element.
 *
 * @example
 * ```jsx
 * <CatCardFooter actionType="save" onAction={handleSave} disabled={false} loading={false} />
 * ```
 */
const CatCardFooter = ({ actionType, onAction, disabled, loading = false }) => {
  const isSave = actionType === "save";
  const label = isSave ? "Add to favourites" : "Remove from favourites";
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onAction}
      disabled={isDisabled}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30",
        isDisabled
          ? "bg-black/50 cursor-not-allowed"
          : "bg-black/70 hover:bg-black text-white active:scale-95",
      )}
      title={label}
      aria-label={loading ? `${label} (loading)` : label}
      aria-busy={loading}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : isSave ? (
        disabled ? (
          <BsFillHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <BsHeart className="w-5 h-5" />
        )
      ) : (
        <BsTrash className="w-5 h-5 hover:text-red-500 transition-colors" />
      )}
    </button>
  );
};

CatCardFooter.propTypes = {
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
};

export default React.memo(CatCardFooter);
