/**
 * @file Componente CatCardBody.
 * @description Renderiza el contenido principal (imagen) de una tarjeta de gato.
 */

import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";

/**
 * Componente CatCardBody.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.url - La URL de la imagen del gato.
 * @param {string} props.id - El ID del gato.
 * @returns {JSX.Element} El elemento del cuerpo.
 */
const CatCardBody = ({ url, id }) => {
  const shouldReduceMotion = useReducedMotion();

  const imageClasses = shouldReduceMotion
    ? "object-cover w-full h-full"
    : "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105";

  const overlayClasses = shouldReduceMotion
    ? "absolute inset-0 pointer-events-none"
    : "absolute inset-0 transition-opacity duration-300 opacity-0 from-black/50 via-transparent to-transparent pointer-events-none group-hover:opacity-100";

  return (
    <div className="relative aspect-square w-full">
      <img
        src={url}
        alt={`Gato ${id}`}
        loading="lazy"
        className={imageClasses}
      />
      <div className={overlayClasses} />
    </div>
  );
};

CatCardBody.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(CatCardBody);
