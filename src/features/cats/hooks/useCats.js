/**
 * @file Custom Hook para gestionar la lógica de los gatos.
 * @description Este hook abstrae la interacción con el store de Redux,
 * proveyendo a los componentes los datos de los gatos (aleatorios y favoritos),
 * el estado de carga/error y las funciones para interactuar con ellos.
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
 * Hook `useCats` para gestionar el estado y las acciones relacionadas con los gatos.
 *
 * @returns {{
 *  randomCats: Array<object>,
 *  favouriteCats: Array<object>,
 *  loading: object,
 *  error: string|null,
 *  loadRandomCats: () => void,
 *  loadFavouriteCats: () => void,
 *  saveFavouriteCat: (cat: object) => Promise<void>,
 *  deleteFavouriteCat: (cat: object) => Promise<void>
 * }} - Objeto con el estado y los manejadores de acciones.
 */
export const useCats = () => {
    const dispatch = useDispatch();

    // Selección del estado desde el store de Redux
    const randomCats = useSelector((state) => state.cats.random);
    const favouriteCats = useSelector((state) => state.cats.favourites);
    const loading = useSelector((state) => state.cats.loading);
    const error = useSelector((state) => state.cats.error);

    // Despachadores de acciones memoizados con useCallback para optimizar el rendimiento
    const loadRandomCats = useCallback(() => {
        dispatch(fetchRandomCats());
    }, [dispatch]);

    const loadFavouriteCats = useCallback(() => {
        dispatch(fetchFavouriteCats());
    }, [dispatch]);

    const saveFavouriteCat = useCallback(
        async (cat) => {
            try {
                // .unwrap() convierte el resultado del thunk en una promesa que se resuelve
                // con el payload de 'fulfilled' o se rechaza con el de 'rejected'.
                await dispatch(saveCat(cat)).unwrap();
                toast.success("Cat saved to favourites!");
            } catch (err) {
                // El error aquí es el payload de la acción 'rejected'.
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
