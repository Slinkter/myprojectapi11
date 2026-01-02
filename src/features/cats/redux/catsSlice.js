/**
 * @file Redux Slice for managing cat state.
 * @description Defines state, async thunks, and reducers to handle cats,
 * their loading states, and related errors.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catApiService } from "@features/cats/api/catApi";

/**
 * @typedef {import('@features/cats/api/catApi').Cat} Cat
 */

/**
 * @typedef {object} CatsState
 * @property {Cat[]} random - List of random cats.
 * @property {Cat[]} favourites - List of favourite cats.
 * @property {object} loading - Loading states for different operations.
 * @property {boolean} loading.random - Loading random cats.
 * @property {boolean} loading.favourites - Loading favourite cats.
 * @property {boolean} loading.saving - Saving a favourite cat.
 * @property {boolean} loading.deleting - Deleting a favourite cat.
 * @property {string|null} error - Error message, if any.
 */

/**
 * Thunk to fetch a list of random cats.
 * @type {import('@reduxjs/toolkit').AsyncThunk<Cat[], void, {}>}
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
 * Thunk to fetch the list of favourite cats.
 * @type {import('@reduxjs/toolkit').AsyncThunk<Cat[], void, {}>}
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
 * Thunk to save a cat as favourite.
 * @type {import('@reduxjs/toolkit').AsyncThunk<{cat: Cat, favouriteId: number}, Cat, {}>}
 */
export const saveCat = createAsyncThunk(
  "cats/save",
  async (cat, { rejectWithValue }) => {
    try {
      const response = await catApiService.saveCatAsFavourite(cat.id);
      return { cat, favouriteId: response.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk to delete a cat from favourites.
 * @type {import('@reduxjs/toolkit').AsyncThunk<number, Cat, {}>}
 */
export const deleteCat = createAsyncThunk(
  "cats/delete",
  async (cat, { rejectWithValue }) => {
    try {
      await catApiService.deleteCatFromFavourites(cat.favouriteId);
      return cat.favouriteId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/** @type {CatsState} */
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
      // --- Fetch Random Cats ---
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
      // --- Fetch Favourite Cats ---
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
      // --- Save Cat ---
      .addCase(saveCat.pending, (state) => {
        state.loading.saving = true;
      })
      .addCase(saveCat.fulfilled, (state, action) => {
        state.loading.saving = false;
        const { cat, favouriteId } = action.payload;
        state.favourites.push({ ...cat, favouriteId });
      })
      .addCase(saveCat.rejected, (state, action) => {
        state.loading.saving = false;
        state.error = action.payload;
      })
      // --- Delete Cat ---
      .addCase(deleteCat.pending, (state) => {
        state.loading.deleting = true;
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.loading.deleting = false;
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
