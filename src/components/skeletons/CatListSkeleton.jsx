/**
 * @file Componente de esqueleto para una lista de gatos.
 * @description Muestra una versión esquelética de la lista de gatos, incluyendo el título y una rejilla de tarjetas.
 */

import React from "react";
import SkeletonCard from "./SkeletonCard";

const CatListSkeleton = () => {
    return (
        <section className="w-full mb-12">
            {/* Skeleton for the title */}
            <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>

            {/* Skeleton for the grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </section>
    );
};

export default CatListSkeleton;
