/**
 * @file Generic Icon Button Component.
 * @description Renders a rounded button optimized for strict icon usage.
 * Encapsulates common styling (hover, focus, dark mode).
 */

import PropTypes from "prop-types";

/**
 * A circular button designed for icons.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - The icon element.
 * @param {function} props.onClick - Click handler.
 * @param {string} [props.className] - Optional extra classes.
 * @param {string} [props.ariaLabel] - Accessibility label.
 * @returns {JSX.Element}
 */
const IconButton = ({ children, onClick, className = "", ariaLabel }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2.5 rounded-full transition-all border focus:outline-hidden focus:ring-2 
            bg-white hover:bg-gray-100 text-gray-700 border-gray-200 focus:ring-gray-300
            dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-500
            ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
};

export default IconButton;
