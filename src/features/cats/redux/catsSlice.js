/**
 * @file Slice de Redux para gestionar el estado de los gatos.
 * @description Capa de aplicación: Maneja el estado global y los flujos de trabajo asíncronos.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catService } from "../services/catService";
import { logAction, logEnd } from "@shared/lib/debugLogger";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Thunk para obtener una lista de gatos aleatorios.
 * @type {import('@reduxjs/toolkit').AsyncThunk<CatEntity[], void, {}>}
 */
export const fetchRandomCats = createAsyncThunk(
    "cats/fetchRandom",
    async (_, { rejectWithValue }) => {
        try {
            return await catService.getRandomCats();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

/**
 * Thunk para obtener la lista de gatos favoritos.
 * @type {import('@reduxjs/toolkit').AsyncThunk<CatEntity[], void, {}>}
 */
export const fetchFavouriteCats = createAsyncThunk(
    "cats/fetchFavorites",
    async (_, { rejectWithValue }) => {
        try {
            return await catService.getFavouriteCats();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

/**
 * Thunk para guardar un gato como favorito.
 * @type {import('@reduxjs/toolkit').AsyncThunk<{cat: CatEntity, favouriteId: number}, CatEntity, {}>}
 */
export const saveCat = createAsyncThunk(
    "cats/save",
    async (cat, { rejectWithValue }) => {
        try {
            const favouriteId = await catService.saveFavourite(cat.id);
            return { cat, favouriteId };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

/**
 * Thunk para eliminar un gato de favoritos.
 * @type {import('@reduxjs/toolkit').AsyncThunk<number, CatEntity, {}>}
 */
export const deleteCat = createAsyncThunk(
    "cats/delete",
    async (cat, { rejectWithValue }) => {
        try {
            await catService.deleteFavourite(cat.favouriteId);
            return cat.favouriteId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const initialState = {
    random: [],
    favourites: [],
    loading: {
        random: false,
        favourites: false,
        saving: false,
        deleting: false,
    },
    error: null,
};

const catsSlice = createSlice({
    name: "cats",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Obtener Aleatorios
            .addCase(fetchRandomCats.pending, (state) => {
                logAction("fetchRandomCats PENDING");
                state.loading.random = true;
                state.error = null;
            })
            .addCase(fetchRandomCats.fulfilled, (state, action) => {
                logEnd("fetchRandomCats DONE", `${action.payload.length} gatos`);
                state.loading.random = false;
                state.random = action.payload;
            })
            .addCase(fetchRandomCats.rejected, (state, action) => {
                logAction("fetchRandomCats ERROR");
                state.loading.random = false;
                state.error = action.payload;
            })
            // Obtener Favoritos
            .addCase(fetchFavouriteCats.pending, (state) => {
                logAction("fetchFavouriteCats PENDING");
                state.loading.favourites = true;
                state.error = null;
            })
            .addCase(fetchFavouriteCats.fulfilled, (state, action) => {
                logEnd(
                    "fetchFavouriteCats DONE",
                    `${action.payload.length} favoritos`,
                );
                state.loading.favourites = false;
                state.favourites = action.payload;
            })
            .addCase(fetchFavouriteCats.rejected, (state, action) => {
                logAction("fetchFavouriteCats ERROR");
                state.loading.favourites = false;
                state.error = action.payload;
            })
            // Guardar
            .addCase(saveCat.pending, (state) => {
                logAction("saveCat PENDING");
                state.loading.saving = true;
            })
            .addCase(saveCat.fulfilled, (state, action) => {
                logEnd("saveCat DONE");
                state.loading.saving = false;
                const { cat, favouriteId } = action.payload;
                state.favourites.push({ ...cat, favouriteId });
            })
            .addCase(saveCat.rejected, (state, action) => {
                logAction("saveCat ERROR");
                state.loading.saving = false;
                state.error = action.payload;
            })
            // Eliminar
            .addCase(deleteCat.pending, (state) => {
                logAction("deleteCat PENDING");
                state.loading.deleting = true;
            })
            .addCase(deleteCat.fulfilled, (state, action) => {
                logEnd("deleteCat DONE");
                state.loading.deleting = false;
                state.favourites = state.favourites.filter(
                    (fav) => fav.favouriteId !== action.payload,
                );
            })
            .addCase(deleteCat.rejected, (state, action) => {
                logAction("deleteCat ERROR");
                state.loading.deleting = false;
                state.error = action.payload;
            });
    },
});

export default catsSlice.reducer;
