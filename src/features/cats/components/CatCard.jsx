/**
 * @file Componente de Tarjeta de Gato Individual.
 * @description Renderiza una imagen de gato con una animación de entrada y un botón de acción superpuesto en un estilo minimalista.
 * Implementa el patrón de Componente Compuesto.
 */

import React from "react";
import PropTypes from "prop-types";
import { useReducedMotion } from "framer-motion";
import { cn } from "@shared/lib/cn";
import Card from "@shared/ui/Card";
import CatCardHeader from "./subcomponents/CatCardHeader";
import CatCardBody from "./subcomponents/CatCardBody";
import CatCardFooter from "./subcomponents/CatCardFooter";

/**
 * Componente de Tarjeta de Gato Individual.
 * @description Renderiza un contenedor de tarjeta de gato utilizando el átomo genérico Card.
 *
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {import('react').ReactNode} props.children - Componentes hijos.
 * @param {string} [props.className] - Clases CSS opcionales.
 * @returns {JSX.Element} Un contenedor de tarjeta de gato.
 */
const CatCard = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const hoverClasses = shouldReduceMotion
    ? ""
    : "transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    <Card className={cn(
      "relative group border-none", 
      hoverClasses,
      className
    )}>
      {children}
    </Card>
  );
};


CatCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const MemoizedCatCard = React.memo(CatCard);

// Exponer subcomponentes como parte de CatCard para facilitar su descubrimiento
MemoizedCatCard.Header = CatCardHeader;
MemoizedCatCard.Body = CatCardBody;
MemoizedCatCard.Footer = CatCardFooter;

export default MemoizedCatCard;
