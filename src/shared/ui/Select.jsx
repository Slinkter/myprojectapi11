/**
 * @file Generic Select/Dropdown Component.
 * @description Wraps a native select element with custom styling
 * to ensure consistency across light and dark modes.
 */

import PropTypes from "prop-types";
import { BsChevronDown } from "react-icons/bs";

/**
 * A styled select component.
 *
 * @component
 * @param {object} props
 * @param {string|number} props.value - Controlled value.
 * @param {function} props.onChange - Change handler.
 * @param {Array<{value: string, label: string}>} props.options - Options to display.
 * @param {string} [props.className] - Optional container classes.
 * @param {string} [props.ariaLabel] - Accessibility label.
 * @returns {JSX.Element}
 */
const Select = ({ value, onChange, options, className = "", ariaLabel }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2.5 pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 
                           text-gray-900 dark:text-gray-200 text-sm rounded-full 
                           focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:outline-none
                           appearance-none cursor-pointer"
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <BsChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Select;
