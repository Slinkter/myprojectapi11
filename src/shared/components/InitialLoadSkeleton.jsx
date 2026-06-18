/**
 * @file Esqueleto de carga inicial.
 * @description Muestra un esqueleto mientras la aplicación se carga por primera vez.
 */

import SkeletonCard from "@shared/components/skeletons/SkeletonCard";

/**
 * Esqueleto único mostrado durante la carga inicial.
 * @component
 * @returns {JSX.Element}
 */
const InitialLoadSkeleton = () => {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="pb-2 mb-4 text-xl font-bold border-b text-foreground border-border">
          Gatitos Aleatorios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={`random-${index}`} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="pb-2 mb-4 text-xl font-bold border-b text-foreground border-border">
          Gatitos Favoritos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={`fav-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitialLoadSkeleton;
