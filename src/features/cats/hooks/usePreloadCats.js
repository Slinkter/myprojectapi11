/**
 * @file Hook to preload cat data on app initialization.
 * @description Fetches data immediately when the app starts,
 * before components mount, preventing layout shift.
 * Loads random cats first, then favourites.
 */

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomCats, fetchFavouriteCats } from "@features/cats/redux/catsSlice";
import { logAction } from "@shared/utils/debugLogger";

/**
 * Hook to preload cat data at app startup.
 * @returns {Object} Preloading status.
 */
export const usePreloadCats = () => {
    const { random, favourites, loading } = useSelector((state) => state.cats);
    const dispatch = useDispatch();

    const hasPreloaded = useRef(false);

    useEffect(() => {
        if (!hasPreloaded.current) {
            hasPreloaded.current = true;
            logAction("🚀 INICIANDO CARGA");
            dispatch(fetchRandomCats());
            dispatch(fetchFavouriteCats());
        }
    }, [dispatch]);

    return {
        isPreloading: loading.random || loading.favourites,
        hasData: random.length > 0 || favourites.length > 0,
    };
};
