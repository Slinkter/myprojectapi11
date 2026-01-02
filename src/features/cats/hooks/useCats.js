/**
 * @file Custom Hook (Facade) to manage cat logic.
 * @description Abstracts Redux store interactions, providing components
 * with a simplified API to access cat data and actions.
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchRandomCats,
  fetchFavouriteCats,
  saveCat,
  deleteCat,
} from "@features/cats/redux/catsSlice";

/**
 * @typedef {import('@features/cats/api/catApi').Cat} Cat
 * @typedef {import('@features/cats/redux/catsSlice').CatsState} CatsState
 * @typedef {import('@app/store').RootState} RootState
 */

/**
 * Hook `useCats`: a facade for cat state and actions.
 *
 * @returns {{
 *  randomCats: Cat[],
 *  favouriteCats: Cat[],
 *  loading: CatsState['loading'],
 *  error: string|null,
 *  loadRandomCats: () => void,
 *  loadFavouriteCats: () => void,
 *  saveFavouriteCat: (cat: Cat) => Promise<void>,
 *  deleteFavouriteCat: (cat: Cat) => Promise<void>
 * }}
 */
export const useCats = () => {
  const dispatch = useDispatch();

  // Selects cat state from Redux store.
  const { randomCats, favouriteCats, loading, error } = useSelector(
    /** @param {RootState} state */
    (state) => ({
      randomCats: state.cats.random,
      favouriteCats: state.cats.favourites,
      loading: state.cats.loading,
      error: state.cats.error,
    })
  );

  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  const loadFavouriteCats = useCallback(() => {
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  const saveFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success("Cat saved to favourites!");
      } catch (err) {
        toast.error(`Failed to save: ${err}`);
      }
    },
    [dispatch]
  );

  const deleteFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(deleteCat(cat)).unwrap();
        toast.success("Cat removed from favourites!");
      } catch (err) {
        toast.error(`Failed to delete: ${err}`);
      }
    },
    [dispatch]
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
