/**
 * @file Contenedor para la lista de gatos aleatorios.
 * @description Este componente maneja la lógica para mostrar
 * gatos aleatorios, utilizando el componente de presentación `CatList`.
 * Los datos se precargan a nivel de aplicación a través de usePreloadCats.
 */

import { useMemo, useCallback } from "react";
import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";
import { logStart, logState } from "@shared/lib/debugLogger";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Orquestas el renderizado de la lista de gatos aleatorios.
 * @component
 * @returns {JSX.Element} El componente React renderizado.
 */
const RandomCatList = () => {
  logStart("RandomCatList render");
  const { randomCats, favouriteCats, loading, saveFavouriteCat } = useCats();

  logState("RandomCatList", { randomCats: randomCats.length, "loading.random": loading.random });

  // Optimización: Memorizar IDs de favoritos en un Set para búsquedas O(1).
  const favouriteContext = useMemo(() => {
    return new Set(favouriteCats.map((cat) => cat.id));
  }, [favouriteCats]);

  /**
   * Comprueba si un gato de la lista aleatoria ya está en favoritos.
   * @param {CatEntity} cat - El gato a comprobar.
   * @returns {boolean} - `true` si el gato es un favorito.
   */
  const isCatInFavourites = useCallback(
    (cat) => {
      return favouriteContext.has(cat.id);
    },
    [favouriteContext],
  );

  console.log(`[${new Date().toISOString()}] 📄 RandomCatList: Renderizando CatList con ${randomCats.length} gatos`);

  return (
    <CatList
      title="Gatitos Aleatorios"
      cats={randomCats}
      onAction={saveFavouriteCat}
      actionType="save"
      isActionDisabled={isCatInFavourites}
      loading={loading.random}
    />
  );
};

export default RandomCatList;
