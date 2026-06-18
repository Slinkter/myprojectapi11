/**
 * @file Capa de infraestructura: Cliente de TheCatAPI.
 * @description Cliente HTTP de bajo nivel para interactuar con la API externa.
 */

import axios from "axios";
import { config } from "@config/env";
import { logApi } from "@shared/lib/debugLogger";

/**
 * @typedef {Object} RawApiCat
 * @property {string} id - El identificador único de la imagen del gato de TheCatAPI.
 * @property {string} url - La URL que apunta a la imagen del gato.
 * @property {number} width - El ancho de la imagen devuelta.
 * @property {number} height - El alto de la imagen devuelta.
 */

/**
 * @typedef {Object} RawFavouriteCat
 * @property {number} id - El identificador único del registro de favorito.
 * @property {string} user_id - El ID de usuario asociado con el favorito.
 * @property {string} imageId - El ID de la imagen que fue marcada como favorita.
 * @property {string} subId - Sub-ID opcional para filtrar en TheCatApi.
 * @property {string} created_at - Marca de tiempo de cuando se creó el favorito.
 * @property {Pick<RawApiCat, "id" | "url">} image - El objeto de imagen anidado.
 */

const api = axios.create({
    baseURL: config.api.baseUrl,
    headers: { "x-api-key": config.api.apiKey },
    timeout: 5000,
});

/**
 * Cliente de API de bajo nivel para gestionar solicitudes a TheCatAPI.
 * @namespace
 */
export const catApiService = {
    fetchImages: async (limit = 12) => {
        logApi("API: GET /images/search");
        const { data } = await api.get("/images/search", { params: { limit } });
        return data;
    },

    fetchFavourites: async () => {
        logApi("API: GET /favourites");
        const { data } = await api.get("/favourites");
        return data;
    },

    postFavourite: async (imageId) => {
        logApi("API: POST /favourites");
        const { data } = await api.post("/favourites", { image_id: imageId });
        return data;
    },

    deleteFavourite: async (favouriteId) => {
        logApi("API: DELETE /favourites");
        const { data } = await api.delete(`/favourites/${favouriteId}`);
        return data;
    },
};
