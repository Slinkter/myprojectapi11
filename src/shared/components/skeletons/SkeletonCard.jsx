/**
 * @file Componente de esqueleto para una tarjeta de gato.
 * @description Muestra una animación de pulso para simular la carga de una tarjeta con un diseño y medidas exactas a CatCard.
 */

const SkeletonCard = () => (
  <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden animate-pulse shadow-sm">
    {/* Opcional: simulador del ID card tag position */}
    <div className="absolute top-3 left-3 w-16 h-5 bg-muted-foreground/20 rounded-md"></div>

    {/* Opcional: simulador de floating action button */}
    <div className="absolute bottom-3 right-3 w-11 h-11 bg-muted-foreground/20 rounded-full"></div>
  </div>
);

export default SkeletonCard;
