/**
 * @file Hook to preload cat data on app initialization.
 * @description Provides a function to fetch essential data (random and favourite cats)
 * at app startup to prevent layout shift.
 */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomCats, fetchFavouriteCats } from "@features/cats/redux/catsSlice";
import { logAction } from "@shared/utils/appLogger";

/**
 * @typedef {Object} UsePreloadCatsFacade
 * @property {boolean} isPreloading - True while any cat data is being fetched.
 * @property {boolean} hasData - True when at least some cat data has been loaded.
 * @property {function(): void} preloadData - Function to trigger data preloading.
 */

/**
 * Hook to preload cat data at app startup.
 * @returns {UsePreloadCatsFacade} Preloading status and actions.
 *
 * @example
 * ```js
 * const { preloadData, isPreloading } = usePreloadCats();
 * useEffect(() => { preloadData(); }, [preloadData]);
 * ```
 */
export const usePreloadCats = () => {
  const { random, favourites, loading } = useSelector((state) => state.cats);
  const dispatch = useDispatch();

  /**
   * Triggers the preloading of random and favourite cats.
   */
  const preloadData = useCallback(() => {
    logAction("🚀 INICIANDO CARGA INICIAL");
    dispatch(fetchRandomCats());
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  return {
    isPreloading: loading.random || loading.favourites,
    hasData: random.length > 0 || favourites.length > 0,
    preloadData,
  };
};
