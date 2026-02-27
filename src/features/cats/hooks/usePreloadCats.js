/**
 * @file Hook to preload cat data on app initialization.
 * @description Fetches data immediately when the app starts,
 * before components mount, preventing layout shift.
 */

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchRandomCats,
    fetchFavouriteCats,
} from "@features/cats/redux/catsSlice";

/**
 * Hook to preload cat data at app startup.
 * @returns {Object} Preloading status.
 */
export const usePreloadCats = () => {
    const dispatch = useDispatch();
    const hasPreloaded = useRef(false);
    const { random, favourites, loading } = useSelector((state) => state.cats);

    useEffect(() => {
        if (!hasPreloaded.current) {
            hasPreloaded.current = true;
            dispatch(fetchRandomCats());
            dispatch(fetchFavouriteCats());
        }
    }, [dispatch]);

    return {
        isPreloading: loading.random || loading.favourites,
        hasData: random.length > 0 || favourites.length > 0,
    };
};
