/**
 * @file Cat service layer.
 * @description Mediates between the data source (API) and the application state.
 * This is the only place that knows about the API service and the Mappers.
 */

import { catApiService } from "../api/catApi";
import { mapToCatEntities } from "../adapters/catMapper";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Service to manage cat operations. Represents the application's domain services.
 * @namespace
 */
export const catService = {
  /**
   * Gets a list of random cats.
   * @async
   * @param {number} [limit=10] - How many cats to fetch.
   * @returns {Promise<CatEntity[]>} A normalized list of cats.
   */
  getRandomCats: async (limit) => {
    const rawData = await catApiService.fetchImages(limit);
    return mapToCatEntities(rawData);
  },

  /**
   * Gets user's favourite cats.
   * @async
   * @returns {Promise<CatEntity[]>} A normalized list of favourite cats.
   */
  getFavouriteCats: async () => {
    const rawData = await catApiService.fetchFavourites();
    return mapToCatEntities(rawData);
  },

  /**
   * Saves a cat image as favourite.
   * @async
   * @param {string} imageId - The external ID of the image to favorite.
   * @returns {Promise<number>} The new database `favouriteId` assigned by the remote server.
   */
  saveFavourite: async (imageId) => {
    const response = await catApiService.postFavourite(imageId);
    return response.id;
  },

  /**
   * Deletes a favourite via its record ID.
   * @async
   * @param {number} favouriteId - The specific record ID of the favourite.
   * @returns {Promise<void>}
   */
  deleteFavourite: async (favouriteId) => {
    await catApiService.deleteFavourite(favouriteId);
  },
};
