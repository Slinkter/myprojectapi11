/**
 * @file Componente de esqueleto para una tarjeta de gato.
 * @description Muestra una animación de pulso para simular la carga de una tarjeta.
 */

import React from "react";

const SkeletonCard = () => (
    <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse"></div>
);

export default SkeletonCard;
