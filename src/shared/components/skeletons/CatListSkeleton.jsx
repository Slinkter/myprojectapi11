/**
 * @file Componente de esqueleto para una lista de gatos.
 * @description Muestra una versión esquelética de la lista de gatos, incluyendo el título y una rejilla de tarjetas.
 */

import SkeletonGrid from "./SkeletonGrid";

const CatListSkeleton = () => {
  return (
    <section className="w-full mb-12">
      {/* Skeleton for the title */}
      <div className="h-7 w-48 bg-muted rounded-md animate-pulse mb-6"></div>

      {/* Skeleton for the grid using the shared layout */}
      <SkeletonGrid count={12} />
    </section>
  );
};

export default CatListSkeleton;
