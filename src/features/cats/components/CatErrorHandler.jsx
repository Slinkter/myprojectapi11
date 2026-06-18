/**
 * @file Componente para manejar y mostrar errores de la API para la funcionalidad de Gatos.
 * @description Muestra un mensaje de error y un botón de reintento cuando falla la obtención de datos de gatos.
 */

import { MdErrorOutline } from "react-icons/md";
import { useCats } from "@features/cats/hooks/useCats";
import Button from "@shared/ui/Button";

/**
 * Componente para manejar y mostrar errores de la API.
 * @returns {JSX.Element|null} La alerta de error o null si no hay error.
 */
const CatErrorHandler = () => {
  const { error, loadRandomCats, loadFavouriteCats } = useCats();

  const handleRetry = () => {
    loadRandomCats();
    loadFavouriteCats();
  };

  if (!error) return null;

  return (
    <div
      className="flex items-center justify-between p-4 my-4 text-sm font-medium border rounded-xl bg-destructive/10 text-destructive border-destructive/20"
      role="alert"
    >
      <div className="flex items-center">
        <MdErrorOutline className="w-5 h-5 mr-2" />
        <span>
          <span className="font-bold">Error:</span> {error}
        </span>
      </div>
      <Button
        onClick={handleRetry}
        ariaLabel="Reintentar cargar gatos"
        variant="destructive"
        size="sm"
        className="font-bold text-xs"
      >
        Reintentar
      </Button>
    </div>
  );
};

export default CatErrorHandler;
