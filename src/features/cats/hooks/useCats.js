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
} from "../redux/catsSlice";
import { logState } from "@shared/utils/appLogger";
import { TOAST_MESSAGES } from "@config/toastMessages";

/**
 * @typedef {Object} UseCatsFacade
 * @property {Array} randomCats
 * @property {Array} favouriteCats
 * @property {Object} loading
 * @property {string|null} error
 * @property {function(): void} loadRandomCats
 * @property {function(): void} loadFavouriteCats
 * @property {function(Object): Promise<void>} saveFavouriteCat
 * @property {function(Object): Promise<void>} deleteFavouriteCat
 */

/**
 * @returns {UseCatsFacade}
 */
export const useCats = () => {
  const dispatch = useDispatch();
  const { random, favourites, loading, error } = useSelector((state) => state.cats);

  logState("useCats", {
    random: random.length,
    favourites: favourites.length,
    loading,
  });

  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  const loadFavouriteCats = useCallback(() => {
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  const saveFavouriteCat = useCallback(async (cat) => {
    try {
      await dispatch(saveCat(cat)).unwrap();
      toast.success(TOAST_MESSAGES.SAVE_SUCCESS);
    } catch (err) {
      toast.error(TOAST_MESSAGES.SAVE_ERROR(err));
    }
  }, [dispatch]);

  const deleteFavouriteCat = useCallback(async (cat) => {
    try {
      await dispatch(deleteCat(cat)).unwrap();
      toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
    } catch (err) {
      toast.error(TOAST_MESSAGES.DELETE_ERROR(err));
    }
  }, [dispatch]);

  return {
    randomCats: random,
    favouriteCats: favourites,
    loading,
    error,
    loadRandomCats,
    loadFavouriteCats,
    saveFavouriteCat,
    deleteFavouriteCat,
  };
};
