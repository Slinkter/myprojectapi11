/**
 * @file Componente CatCardHeader.
 * @description Renderiza la cabecera de una tarjeta de gato con el ID e indicador de estado.
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * Componente CatCardHeader.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.id - El ID del gato.
 * @returns {JSX.Element} El elemento de la cabecera.
 */
const CatCardHeader = ({ id }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
    <span className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
      ID: {id}
    </span>
    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
  </div>
);

CatCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(CatCardHeader);
