/**
 * @file Generic Select/Dropdown Component.
 * @description Wraps a native select element with custom styling
 * to ensure consistency across light and dark modes.
 */

import PropTypes from "prop-types";
import { BsChevronDown } from "react-icons/bs";

/**
 * @typedef {Object} SelectOption
 * @property {string} value - The underlying value of the option.
 * @property {string} label - The human-readable label for the option.
 */

/**
 * A styled select component.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {string|number} props.value - Controlled value.
 * @param {import('react').ChangeEventHandler<HTMLSelectElement>} props.onChange - Change handler passing the selected event.
 * @param {SelectOption[]} props.options - Array of options to display.
 * @param {string} [props.className] - Optional container classes.
 * @param {string} [props.ariaLabel] - Accessibility label.
 * @returns {JSX.Element} The rendered React component.
 */
const Select = ({ value, onChange, options, className = "", ariaLabel }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none block w-full px-4 py-2.5 pr-10 text-sm font-medium transition-all bg-card border border-border rounded-full text-foreground cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary/30"
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
        <BsChevronDown className="w-4 h-4 text-muted-foreground" />
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
    }),
  ).isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Select;
