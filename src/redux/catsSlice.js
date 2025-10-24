/**
 * @file Slice de Redux para gestionar el estado de los gatos.
 * @description Este módulo define el estado inicial, los async thunks para operaciones de API
 * y los reducers para manejar los gatos aleatorios y favoritos, incluyendo sus estados de carga y error.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catApiService } from "../services/catApi";

// --- Thunks asíncronos para interactuar con la API de gatos ---

/**
 * Thunk para obtener una lista de gatos aleatorios.
 */
export const fetchRandomCats = createAsyncThunk(
    "cats/fetchRandom",
    async (_, { rejectWithValue }) => {
        try {
            return await catApiService.getRandomCats();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para obtener la lista de gatos favoritos.
 */
export const fetchFavouriteCats = createAsyncThunk(
    "cats/fetchFavorites",
    async (_, { rejectWithValue }) => {
        try {
            return await catApiService.getFavouriteCats();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para guardar un gato como favorito.
 * @param {object} cat - El objeto del gato a guardar.
 */
export const saveCat = createAsyncThunk(
    "cats/save",
    async (cat, { rejectWithValue }) => {
        try {
            const response = await catApiService.saveCatAsFavourite(cat.id);
            // Devolvemos el gato original y el ID del favorito para la actualización optimista.
            return { cat, favouriteId: response.id };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Thunk para eliminar un gato de los favoritos.
 * @param {object} cat - El objeto del gato a eliminar (debe contener `favouriteId`).
 */
export const deleteCat = createAsyncThunk(
    "cats/delete",
    async (cat, { rejectWithValue }) => {
        try {
            await catApiService.deleteCatFromFavourites(cat.favouriteId);
            // Devolvemos el ID del favorito para la actualización optimista en el reducer.
            return cat.favouriteId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Creación del Slice de Gatos ---

const catsSlice = createSlice({
    name: "cats",
    initialState: {
        random: [],
        favourites: [],
        loading: {
            random: false,
            favourites: false,
            saving: false,
            deleting: false,
        },
        error: null,
    },
    // `reducers` se deja vacío ya que toda la lógica de estado se maneja con `extraReducers` y los thunks.
    reducers: {},
    // `extraReducers` maneja las acciones definidas fuera del slice (como los async thunks).
    extraReducers: (builder) => {
        builder
            // --- Casos para fetchRandomCats ---
            .addCase(fetchRandomCats.pending, (state) => {
                state.loading.random = true;
                state.error = null;
            })
            .addCase(fetchRandomCats.fulfilled, (state, action) => {
                state.loading.random = false;
                state.random = action.payload;
            })
            .addCase(fetchRandomCats.rejected, (state, action) => {
                state.loading.random = false;
                state.error = action.payload;
            })
            // --- Casos para fetchFavouriteCats ---
            .addCase(fetchFavouriteCats.pending, (state) => {
                state.loading.favourites = true;
                state.error = null;
            })
            .addCase(fetchFavouriteCats.fulfilled, (state, action) => {
                state.loading.favourites = false;
                state.favourites = action.payload;
            })
            .addCase(fetchFavouriteCats.rejected, (state, action) => {
                state.loading.favourites = false;
                state.error = action.payload;
            })
            // --- Casos para saveCat (guardar favorito) ---
            .addCase(saveCat.pending, (state) => {
                state.loading.saving = true;
                state.error = null;
            })
            .addCase(saveCat.fulfilled, (state, action) => {
                state.loading.saving = false;
                const { cat, favouriteId } = action.payload;
                // Actualización optimista: se añade el gato a favoritos en el estado local.
                state.favourites.push({ ...cat, favouriteId });
            })
            .addCase(saveCat.rejected, (state, action) => {
                state.loading.saving = false;
                state.error = action.payload;
            })
            // --- Casos para deleteCat (eliminar favorito) ---
            .addCase(deleteCat.pending, (state) => {
                state.loading.deleting = true;
                state.error = null;
            })
            .addCase(deleteCat.fulfilled, (state, action) => {
                state.loading.deleting = false;
                // Actualización optimista: se filtra el gato eliminado del estado local.
                state.favourites = state.favourites.filter(
                    (fav) => fav.favouriteId !== action.payload
                );
            })
            .addCase(deleteCat.rejected, (state, action) => {
                state.loading.deleting = false;
                state.error = action.payload;
            });
    },
});

export default catsSlice.reducer;
