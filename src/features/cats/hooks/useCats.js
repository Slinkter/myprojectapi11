/**
 * @file Hook Personalizado (Fachada) para gestionar la lógica de los gatos.
 * @description Abstrae las interacciones con el store de Redux, proporcionando a los componentes
 * una API simplificada para acceder a los datos y acciones de los gatos.
 */

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchRandomCats,
  fetchFavouriteCats,
  saveCat,
  deleteCat,
} from "../redux/catsSlice";
import { logState } from "@shared/lib/debugLogger";

/**
 * Hook `useCats`: una fachada para el estado y las acciones de los gatos.
 *
 * @returns {UseCatsFacade} API de fachada para datos y operaciones de gatos.
 */
export const useCats = () => {
  const dispatch = useDispatch();

  // Selecciona el estado de los gatos del store de Redux.
  const catsState = useSelector((state) => state.cats);

  logState("useCats", {
    random: catsState.random.length,
    favourites: catsState.favourites.length,
    loading: catsState.loading,
  });

// Desestructurar con useMemo para asegurar referencias estables para propiedades derivadas
  const { randomCats, favouriteCats, loading, error } = useMemo(
    () => ({
      randomCats: catsState.random,
      favouriteCats: catsState.favourites,
      loading: catsState.loading,
      error: catsState.error,
    }),
    [catsState],
  );

  /**
   * Carga una lista nueva de gatos aleatorios.
   */
  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  /**
   * Carga los gatos favoritos del usuario.
   */
  const loadFavouriteCats = useCallback(() => {
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  /**
   * Guarda un gato en favoritos.
   * @param {CatEntity} cat - La entidad de gato a guardar.
   */
  const saveFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success("¡Gato guardado en favoritos!");
      } catch (err) {
        toast.error(`Error al guardar: ${err}`);
      }
    },
    [dispatch],
  );

  /**
   * Elimina un gato de favoritos.
   * @param {CatEntity} cat - La entidad de gato a eliminar.
   */
  const deleteFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(deleteCat(cat)).unwrap();
        toast.success("¡Gato eliminado de favoritos!");
      } catch (err) {
        toast.error(`Error al eliminar: ${err}`);
      }
    },
    [dispatch],
  );

return {
    randomCats,
    favouriteCats,
    loading,
    error,
    loadRandomCats,
    loadFavouriteCats,
    saveFavouriteCat,
    deleteFavouriteCat,
  };
};
