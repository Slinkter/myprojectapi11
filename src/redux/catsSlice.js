/**
 * @file Slice de Redux para gestionar el estado de los gatos.
 * @description Este módulo define el estado inicial, los async thunks para operaciones de API
 * y los reducers para manejar los gatos aleatorios y favoritos.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catApiService } from "../services/catApi";

// Thunks asíncronos para interactuar con la API de gatos
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

export const saveCat = createAsyncThunk(
    "cats/save",
    async (cat, { rejectWithValue }) => {
        try {
            const response = await catApiService.saveCatAsFavourite(cat.id);
            // Devolvemos el gato original y el ID del favorito creado para la actualización optimista
            return { cat, favouriteId: response.id };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCat = createAsyncThunk(
    "cats/delete",
    async (cat, { rejectWithValue }) => {
        try {
            await catApiService.deleteCatFromFavourites(cat.favouriteId);
            // Devolvemos el ID del favorito para la actualización optimista
            return cat.favouriteId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Random Cats
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
            // Fetch Favourite Cats
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
            // Save Cat
            .addCase(saveCat.pending, (state) => {
                state.loading.saving = true;
                state.error = null;
            })
            .addCase(saveCat.fulfilled, (state, action) => {
                state.loading.saving = false;
                const { cat, favouriteId } = action.payload;
                // Añadimos el gato a favoritos con su nuevo ID de favorito
                state.favourites.push({ ...cat, favouriteId });
            })
            .addCase(saveCat.rejected, (state, action) => {
                state.loading.saving = false;
                state.error = action.payload;
            })
            // Delete Cat
            .addCase(deleteCat.pending, (state) => {
                state.loading.deleting = true;
                state.error = null;
            })
            .addCase(deleteCat.fulfilled, (state, action) => {
                state.loading.deleting = false;
                // Eliminamos el gato de favoritos por su ID de favorito
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
