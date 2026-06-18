/**
 * @file Componente Select/Desplegable genérico.
 * @description Envuelve un elemento select nativo con un estilo personalizado
 * para asegurar la consistencia en los modos claro y oscuro.
 */

import PropTypes from "prop-types";
import { BsChevronDown } from "react-icons/bs";

import { cn } from "@shared/lib/cn";


/**
 * @typedef {Object} SelectOption
 * @property {string} value - El valor subyacente de la opción.
 * @property {string} label - La etiqueta legible por humanos para la opción.
 */

/**
 * Un componente de selección estilizado.
 *
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {string|number} props.value - Valor controlado.
 * @param {import('react').ChangeEventHandler<HTMLSelectElement>} props.onChange - Manejador de cambio que pasa el evento seleccionado.
 * @param {SelectOption[]} props.options - Array de opciones a mostrar.
 * @param {string} [props.className] - Clases de contenedor opcionales.
 * @param {string} [props.ariaLabel] - Etiqueta de accesibilidad.
 * @returns {JSX.Element} El componente React renderizado.
 */
const Select = ({ value, onChange, options, className = "", ariaLabel }) => {
  return (
    <div className={cn("relative", className)}>

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
