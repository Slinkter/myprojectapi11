/**
 * @file Componente de esqueleto para una rejilla de tarjetas.
 * @description Muestra una rejilla de tarjetas esqueléticas para simular la carga de contenido.
 */

import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 5 }) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);

export default SkeletonGrid;
