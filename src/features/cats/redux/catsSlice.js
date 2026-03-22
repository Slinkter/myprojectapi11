/**
 * @file Redux Slice for managing cat state.
 * @description Application layer: Handles global state and async workflows.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catService } from "../services/catService";
import { logAction, logEnd } from "@shared/utils/appLogger";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

const handleAsyncError = (error) => error.message;

export const fetchRandomCats = createAsyncThunk(
  "cats/fetchRandom",
  async (_, { rejectWithValue }) => {
    try {
      return await catService.getRandomCats();
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  },
);

export const fetchFavouriteCats = createAsyncThunk(
  "cats/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      return await catService.getFavouriteCats();
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  },
);

export const saveCat = createAsyncThunk(
  "cats/save",
  async (cat, { rejectWithValue }) => {
    try {
      const favouriteId = await catService.saveFavourite(cat.id);
      return { cat, favouriteId };
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
    }
  },
);

export const deleteCat = createAsyncThunk(
  "cats/delete",
  async (cat, { rejectWithValue }) => {
    try {
      await catService.deleteFavourite(cat.favouriteId);
      return cat.favouriteId;
    } catch (error) {
      return rejectWithValue(handleAsyncError(error));
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
  initialState,
reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Random
      .addCase(fetchRandomCats.pending, (state) => {
        logAction("fetchRandomCats PENDING");
        state.loading.random = true;
        state.error = null;
      })
      .addCase(fetchRandomCats.fulfilled, (state, action) => {
        logEnd("fetchRandomCats DONE", `${action.payload.length} cats`);
        state.loading.random = false;
        state.random = action.payload;
      })
      .addCase(fetchRandomCats.rejected, (state, action) => {
        logAction("fetchRandomCats ERROR");
        state.loading.random = false;
        state.error = action.payload;
      })
      // Fetch Favourites
      .addCase(fetchFavouriteCats.pending, (state) => {
        logAction("fetchFavouriteCats PENDING");
        state.loading.favourites = true;
        state.error = null;
      })
      .addCase(fetchFavouriteCats.fulfilled, (state, action) => {
        logEnd("fetchFavouriteCats DONE", `${action.payload.length} favourites`);
        state.loading.favourites = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavouriteCats.rejected, (state, action) => {
        logAction("fetchFavouriteCats ERROR");
        state.loading.favourites = false;
        state.error = action.payload;
      })
      // Save
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
      // Delete
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
