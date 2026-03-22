/**
 * @file Infrastructure layer: TheCatAPI Client.
 * @description Low-level HTTP client for interacting with the external API.
 */

import axios from "axios";
import { config } from "@config/env";
import { logApi } from "@shared/utils/appLogger";
import { API_TIMEOUT, DEFAULT_CAT_LIMIT } from "@config/apiConstants";

/**
 * @typedef {Object} RawApiCat
 * @property {string} id - The unique identifier of the cat image.
 * @property {string} url - The URL pointing to the cat image.
 */

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: { "x-api-key": config.api.apiKey },
  timeout: API_TIMEOUT,
});

/**
 * @namespace
 */
export const catApiService = {
  fetchImages: async (limit = DEFAULT_CAT_LIMIT) => {
    logApi("API: GET /images/search");
    const { data } = await api.get("/images/search", { params: { limit } });
    return data;
  },

  fetchFavourites: async () => {
    logApi("API: GET /favourites");
    const { data } = await api.get("/favourites");
    return data;
  },

  postFavourite: async (image_id) => {
    logApi("API: POST /favourites");
    const { data } = await api.post("/favourites", { image_id });
    return data;
  },

  deleteFavourite: async (favouriteId) => {
    logApi("API: DELETE /favourites");
    const { data } = await api.delete(`/favourites/${favouriteId}`);
    return data;
  },
};
