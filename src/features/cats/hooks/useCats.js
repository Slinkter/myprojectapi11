/**
 * @file Custom Hook (Facade) to manage cat logic.
 * @description Abstracts Redux store interactions, providing components
 * with a simplified API to access cat data and actions.
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

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * @typedef {Object} LoadingState
 * @property {boolean} random
 * @property {boolean} favourites
 * @property {boolean} saving
 * @property {boolean} deleting
 */

/**
 * @typedef {Object} UseCatsFacade
 * @property {CatEntity[]} randomCats - Array of randomly generated cats.
 * @property {CatEntity[]} favouriteCats - Array of user's favourite cats.
 * @property {LoadingState} loading - Loading states for different operations.
 * @property {string|null} error - Any global error message related to cats operations.
 * @property {function(): void} loadRandomCats - Dispatches action to fetch random cats.
 * @property {function(): void} loadFavouriteCats - Dispatches action to fetch returning favourite cats.
 * @property {function(CatEntity): Promise<void>} saveFavouriteCat - Saves a given cat to favourites.
 * @property {function(CatEntity): Promise<void>} deleteFavouriteCat - Deletes a given cat from favourites.
 */

/**
 * Hook `useCats`: a facade for cat state and actions.
 *
 * @returns {UseCatsFacade} Facade API for cat data and operations.
 */
export const useCats = () => {
  const dispatch = useDispatch();

  // Selects cat state from Redux store.
  const catsState = useSelector((state) => state.cats);

  // Destructure with useMemo to ensure stable references for derived properties
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
   * Loads a fresh list of random cats.
   */
  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  /**
   * Loads the user's favourite cats.
   */
  const loadFavouriteCats = useCallback(() => {
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  /**
   * Saves a cat to favourites.
   * @param {CatEntity} cat - The cat entity to save.
   */
  const saveFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success("Cat saved to favourites!");
      } catch (err) {
        toast.error(`Failed to save: ${err}`);
      }
    },
    [dispatch],
  );

  /**
   * Removes a cat from favourites.
   * @param {CatEntity} cat - The cat entity to delete.
   */
  const deleteFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(deleteCat(cat)).unwrap();
        toast.success("Cat removed from favourites!");
      } catch (err) {
        toast.error(`Failed to delete: ${err}`);
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
