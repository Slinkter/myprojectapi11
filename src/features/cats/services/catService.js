/**
 * @file Cat service layer.
 * @description Mediates between the data source (API) and the application state.
 * This is the only place that knows about the API service and the Mappers.
 */

import { catApiService } from "../api/catApi";
import { mapToCatEntities } from "../adapters/catMapper";

/**
 * Service to manage cat operations.
 */
export const catService = {
  /**
   * Gets random cats.
   * @param {number} limit
   * @returns {Promise<Array>}
   */
  getRandomCats: async (limit) => {
    const rawData = await catApiService.fetchImages(limit);
    return mapToCatEntities(rawData);
  },

  /**
   * Gets favourite cats.
   * @returns {Promise<Array>}
   */
  getFavouriteCats: async () => {
    const rawData = await catApiService.fetchFavourites();
    return mapToCatEntities(rawData);
  },

  /**
   * Saves a cat as favourite.
   * @param {string} imageId
   * @returns {Promise<number>} The new favouriteId.
   */
  saveFavourite: async (imageId) => {
    const response = await catApiService.postFavourite(imageId);
    return response.id;
  },

  /**
   * Deletes a favourite.
   * @param {number} favouriteId
   */
  deleteFavourite: async (favouriteId) => {
    await catApiService.deleteFavourite(favouriteId);
  },
};
