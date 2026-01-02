/**
 * @file Service to interact with TheCatAPI.
 * @description Encapsulates all API calls for cats, using a pre-configured
 * Axios instance and normalizing response data.
 */

import axios from "axios";
import { config } from "@config/env";

/**
 * @typedef {object} Cat
 * @property {string} id - The unique ID of the cat image.
 * @property {string} url - The image URL.
 * @property {number|null} favouriteId - The ID of the favourite record, if exists.
 */

/**
 * Pre-configured Axios instance for TheCatAPI.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: { "x-api-key": config.api.apiKey },
  timeout: 5000,
});

/**
 * Normalizes cat data into a consistent structure.
 * @param {object} catData - Cat data from the API.
 * @returns {Cat} The normalized cat object.
 */
const normalizeCatData = (catData) => {
  if (catData.image) {
    return {
      id: catData.image.id,
      url: catData.image.url,
      favouriteId: catData.id,
    };
  }
  return {
    id: catData.id,
    url: catData.url,
    favouriteId: null,
  };
};

/**
 * API service grouping all methods to interact with cat endpoints.
 */
export const catApiService = {
  /**
   * Fetches random cat images.
   * @param {number} [limit=10] - The number of images to fetch.
   * @returns {Promise<Cat[]>} A promise that resolves to an array of normalized cats.
   */
  getRandomCats: async (limit = 10) => {
    const { data } = await api.get("/images/search", { params: { limit } });
    return data.map(normalizeCatData);
  },

  /**
   * Fetches all cats saved as favourites.
   * @returns {Promise<Cat[]>} A promise that resolves to an array of normalized favourite cats.
   */
  getFavouriteCats: async () => {
    const { data } = await api.get("/favourites");
    return data.map(normalizeCatData);
  },

  /**
   * Saves a cat to the favourites list.
   * @param {string} imageId - The ID of the cat image to save.
   * @returns {Promise<{id: number}>} The API response (includes the new `favouriteId`).
   */
  saveCatAsFavourite: async (imageId) => {
    const { data } = await api.post("/favourites", { image_id: imageId });
    return data;
  },

  /**
   * Removes a cat from the favourites list.
   * @param {number} favouriteId - The ID of the "favourite" record to remove.
   * @returns {Promise<object>} The API response.
   */
  deleteCatFromFavourites: async (favouriteId) => {
    const { data } = await api.delete(`/favourites/${favouriteId}`);
    return data;
  },
};
