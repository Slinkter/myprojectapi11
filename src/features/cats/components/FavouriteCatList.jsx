/**
 * @file Contenedor para la lista de gatos favoritos.
 * @description Este componente maneja la lógica para mostrar
 * los gatos favoritos del usuario, utilizando el componente de presentación `CatList`.
 * Los datos se precargan a nivel de aplicación.
 */

import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";
import { logStart, logState } from "@shared/lib/debugLogger";

/**
 * Orquestas el renderizado de la lista de gatos favoritos.
 * @component
 * @returns {JSX.Element} El componente React renderizado.
 */
const FavouriteCatList = () => {
  logStart("FavouriteCatList render");
  const { favouriteCats, loading, deleteFavouriteCat } = useCats();

  logState("FavouriteCatList", { favourites: favouriteCats.length, "loading.favourites": loading.favourites });

  console.log(`[${new Date().toISOString()}] 📄 FavouriteCatList: Renderizando CatList con ${favouriteCats.length} favoritos`);

  return (
    <CatList
      title="Gatitos Favoritos"
      cats={favouriteCats}
      onAction={deleteFavouriteCat}
      actionType="delete"
      isActionDisabled={() => false}
      loading={loading.favourites}
      emptyStateMessage={
        <span>
          Aún no tienes gatitos favoritos. <br />
          ¡Haz clic en el corazón de un gatito para guardarlo!
        </span>
      }
    />
  );
};

export default FavouriteCatList;
