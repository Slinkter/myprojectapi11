/**
 * @file Componente de estado vacío.
 * @description Muestra un mensaje cuando no hay contenido para mostrar.
 */

import PropTypes from "prop-types";
import { m } from "framer-motion";

/**
 * Renderiza un mensaje de estado vacío con animación.
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {string} props.message - Mensaje a mostrar.
 * @param {string} [props.icon] - Clase de icono opcional o emoji.
 * @returns {JSX.Element} El componente de estado vacío.
 */
const EmptyState = ({ message, icon }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-12 text-center border-2 border-dashed rounded-xl text-muted-foreground border-border/50 bg-muted/20"
    >
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <div>{message}</div>
    </m.div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.node.isRequired,
  icon: PropTypes.string,
};

export default EmptyState;
