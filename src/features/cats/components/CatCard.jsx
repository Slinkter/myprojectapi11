/**
 * @file Individual Cat Card Component.
 * @description Renders a cat image with an entrance animation and an overlay action button.
 * The component is memoized to optimize performance.
 */

import React from "react";
import PropTypes from "prop-types";

import { BsFillHeartFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
/**
 * Renders a single cat card.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {object} props.cat - The cat object to display.
 * @param {function} props.onAction - Function to execute when action button is clicked.
 * @param {string} props.actionType - Action type ("save" or "delete") to determine icon.
 * @param {boolean} props.disabled - If action button should be disabled.
 * @param {number} props.index - Card index, used for animation delay.
 * @returns {JSX.Element} A cat card.
 */
const CatCard = ({ cat, onAction, actionType, disabled, index }) => {
  /**
   * Manejador para el evento de clic en el botón de acción.
   * Previene el comportamiento por defecto y la propagación del evento.
   * Llama a la función `onAction` solo si el botón no está deshabilitado.
   * @param {React.MouseEvent} e - El evento de clic.
   */
  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onAction(cat);
    }
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full animate-fade-in-scale"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      {/* CARD HEADER */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider font-mono">
          ID: {cat.id}
        </span>
        <div className="h-2 w-2 rounded-full bg-green-400"></div>
      </div>

      {/* CARD BODY (Image) */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* CARD FOOTER */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Status</span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Nice Kitty
          </span>
        </div>

        <button
          onClick={handleAction}
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
          title={
            actionType === "save"
              ? "Add to favourites"
              : "Remove from favourites"
          }
          aria-label={
            actionType === "save"
              ? "Add to favourites"
              : "Remove from favourites"
          }
        >
          {actionType === "save" ? (
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
    </div>
  );
};

CatCard.propTypes = {
  /** The cat object containing id and url. */
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  /** Function called on action click. */
  onAction: PropTypes.func.isRequired,
  /** Defines icon and button behavior. */
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  /** If `true`, the action button is inactive. */
  disabled: PropTypes.bool.isRequired,
  /** Card index, used for animation delay. */
  index: PropTypes.number.isRequired,
};

// Memoize component to avoid unnecessary re-renders if props don't change.
const MemoizedCatCard = React.memo(CatCard);

export default MemoizedCatCard;
