/**
 * @file Hook para precargar los datos de los gatos en la inicialización de la aplicación.
 * @description Obtiene los datos inmediatamente cuando comienza la aplicación,
 * antes de que los componentes se monten, evitando saltos en el diseño.
 * Carga primero los gatos aleatorios y luego los favoritos.
 */

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomCats, fetchFavouriteCats } from "@features/cats/redux/catsSlice";
import { logAction } from "@shared/lib/debugLogger";

/**
 * Hook para precargar datos de gatos al inicio de la aplicación.
 * @returns {Object} Estado de la precarga.
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
