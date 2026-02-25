/**
 * @file Infrastructure layer: TheCatAPI Client.
 * @description Low-level HTTP client for interacting with the external API.
 */

import axios from "axios";
import { config } from "@config/env";

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: { "x-api-key": config.api.apiKey },
  timeout: 5000,
});

/**
 * Low-level API client.
 */
export const catApiService = {
  /**
   * Fetches images from /images/search.
   * @param {number} limit
   */
  fetchImages: async (limit = 10) => {
    const { data } = await api.get("/images/search", { params: { limit } });
    return data;
  },

  /**
   * Fetches data from /favourites.
   */
  fetchFavourites: async () => {
    const { data } = await api.get("/favourites");
    return data;
  },

  /**
   * Posts to /favourites.
   * @param {string} image_id
   */
  postFavourite: async (image_id) => {
    const { data } = await api.post("/favourites", { image_id });
    return data;
  },

  /**
   * Deletes from /favourites/{id}.
   * @param {number} favouriteId
   */
  deleteFavourite: async (favouriteId) => {
    const { data } = await api.delete(`/favourites/${favouriteId}`);
    return data;
  },
};
