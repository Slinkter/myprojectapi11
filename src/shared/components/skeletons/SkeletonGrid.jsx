/**
 * @file Componente de esqueleto para una rejilla de tarjetas.
 * @description Muestra una rejilla de tarjetas esqueléticas para simular la carga de contenido con el espaciado exacto del componente principal.
 */

import PropTypes from "prop-types";
import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 12 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

SkeletonGrid.propTypes = {
  count: PropTypes.number,
};

export default SkeletonGrid;
