/**
 * @file Capa de servicio de gatos.
 * @description Media entre la fuente de datos (API) y el estado de la aplicación.
 * Este es el único lugar que conoce el servicio de la API y los Mapeadores.
 */

import { catApiService } from "../api/catApi";
import { mapToCatEntities } from "../adapters/catMapper";
import { logApi } from "@shared/lib/debugLogger";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Servicio para gestionar las operaciones de los gatos. Representa los servicios de dominio de la aplicación.
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
