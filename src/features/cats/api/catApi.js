/**
 * @file Infrastructure layer: TheCatAPI Client.
 * @description Low-level HTTP client for interacting with the external API.
 */

import axios from "axios";
import { config } from "@config/env";

/**
 * @typedef {Object} RawApiCat
 * @property {string} id - The unique identifier of the cat image from TheCatAPI.
 * @property {string} url - The URL pointing to the cat image.
 * @property {number} width - The width of the returned image.
 * @property {number} height - The height of the returned image.
 */

/**
 * @typedef {Object} RawFavouriteCat
 * @property {number} id - The unique identifier of the favourite record.
 * @property {string} user_id - The user ID associated with the favourite.
 * @property {string} image_id - The ID of the image that was favorited.
 * @property {string} sub_id - Optional sub-ID for filtering over TheCatApi.
 * @property {string} created_at - Timestamp of when the favourite was created.
 * @property {Pick<RawApiCat, "id" | "url">} image - The nested image object.
 */

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: { "x-api-key": config.api.apiKey },
  timeout: 5000,
});

/**
 * Low-level API client for managing requests to TheCatAPI.
 * @namespace
 */
export const catApiService = {
  /**
   * Fetches images from /images/search.
   * @async
   * @param {number} [limit=10] - Number of images to return.
   * @returns {Promise<RawApiCat[]>} Array of raw cat images.
   */
  fetchImages: async (limit = 10) => {
    const { data } = await api.get("/images/search", { params: { limit } });
    return data;
  },

  /**
   * Fetches data from /favourites.
   * @async
   * @returns {Promise<RawFavouriteCat[]>} Array of user's favourite cats.
   */
  fetchFavourites: async () => {
    const { data } = await api.get("/favourites");
    return data;
  },

  /**
   * Posts to /favourites.
   * @async
   * @param {string} image_id - The ID of the image to set as favourite.
   * @returns {Promise<{ id: number, message: string }>} Server response with the new favourite ID.
   */
  postFavourite: async (image_id) => {
    const { data } = await api.post("/favourites", { image_id });
    return data;
  },

  /**
   * Deletes from /favourites/{id}.
   * @async
   * @param {number} favouriteId - The ID of the favourite *record* to delete (not the image ID).
   * @returns {Promise<{ message: string }>} Server response confirming deletion.
   */
  deleteFavourite: async (favouriteId) => {
    const { data } = await api.delete(`/favourites/${favouriteId}`);
    return data;
  },
};
