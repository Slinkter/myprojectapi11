import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1/";
const API_KEY =
    "live_BgeabuZRHRH2irUsFWjZREQBJ38KmhA2OdWWkOycJQLQ54j44JApcrWGIqXZn9Ym";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "X-Custom-Header": "foobar", "x-api-key": API_KEY },
    timeout: 3000,
});

const fetchCatsRandom = createAsyncThunk("cats/fetchRandom", async () => {
    const res = await api.get("/images/search?limit=2");
    return res.data;
});
const fetchCatsFav = createAsyncThunk("cats/fetchFavorites", async () => {
    const res = await api.get("/favourites");
    return res.data;
});
const saveCat = createAsyncThunk("cats/save", async (cat, { dispatch }) => {
    await api.post("/favourites", { image_id: cat.id });
    dispatch(fetchCatsFav());
});
const deleteCat = createAsyncThunk("cats/delete", async (cat, { dispatch }) => {
    await api.delete(`/favourites/${cat.id}`);
    dispatch(fetchCatsFav());
});

const catsSlice = createSlice({
    name: "cats",
    initialState: {
        cats: [],
        favorites: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatsRandom.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCatsRandom.fulfilled, (state, action) => {
                state.loading = false;
                state.cats = action.payload;
            })
            .addCase(fetchCatsRandom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCatsFav.fulfilled, (state, action) => {
                state.favorites = action.payload;
            });
    },
});

export default catsSlice.reducer;
export { fetchCatsRandom, fetchCatsFav, saveCat, deleteCat };
