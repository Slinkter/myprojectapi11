/**
 * @file Cat service layer.
 * @description Mediates between the data source (API) and the application state.
 * This is the only place that knows about the API service and the Mappers.
 */

import { catApiService } from "../api/catApi";
import { mapToCatEntities } from "../adapters/catMapper";
import { logApi } from "@shared/utils/debugLogger";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Service to manage cat operations. Represents the application's domain services.
 * @namespace
 */
export const catService = {
  getRandomCats: async (limit) => {
    logApi("catService.getRandomCats");
    const rawData = await catApiService.fetchImages(limit);
    const result = mapToCatEntities(rawData);
    return result;
  },

  getFavouriteCats: async () => {
    logApi("catService.getFavouriteCats");
    const rawData = await catApiService.fetchFavourites();
    const result = mapToCatEntities(rawData);
    return result;
  },

  saveFavourite: async (imageId) => {
    logApi("catService.saveFavourite");
    const response = await catApiService.postFavourite(imageId);
    return response.id;
  },

  deleteFavourite: async (favouriteId) => {
    logApi("catService.deleteFavourite");
    await catApiService.deleteFavourite(favouriteId);
  },
};
