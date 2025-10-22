/**
 * @file Servicio para interactuar con TheCatAPI.
 * @description Este módulo encapsula todas las llamadas a la API para obtener, guardar y eliminar gatos.
 * Utiliza una instancia de Axios preconfigurada con la URL base y las cabeceras necesarias.
 */

import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Instancia de Axios preconfigurada para TheCatAPI.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
    baseURL: BASE_URL,
    headers: { "x-api-key": API_KEY },
    timeout: 5000,
});

/**
 * Normaliza la estructura de datos de un gato a un formato consistente.
 * @param {object} catData - Los datos del gato de la API.
 * @returns {{id: string, url: string, favouriteId: number|null}} - El objeto de gato normalizado.
 */
const normalizeCatData = (catData) => {
    if (catData.image) {
        // Es un gato favorito
        return {
            id: catData.image.id,
            url: catData.image.url,
            favouriteId: catData.id,
        };
    }
    // Es un gato aleatorio
    return {
        id: catData.id,
        url: catData.url,
        favouriteId: null,
    };
};

/**
 * Objeto del servicio de API con métodos para interactuar con los endpoints de gatos.
 */
export const catApiService = {
    /**
     * Busca un número limitado de imágenes de gatos aleatorias.
     * @param {number} limit - El número de imágenes a obtener.
     * @returns {Promise<Array<object>>} - Una promesa que resuelve a un array de gatos normalizados.
     */
    getRandomCats: async (limit = 3) => {
        const { data } = await api.get(`/images/search?limit=${limit}`);
        return data.map(normalizeCatData);
    },

    /**
     * Obtiene todos los gatos guardados como favoritos.
     * @returns {Promise<Array<object>>} - Una promesa que resuelve a un array de gatos favoritos normalizados.
     */
    getFavouriteCats: async () => {
        const { data } = await api.get("/favourites");
        return data.map(normalizeCatData);
    },

    /**
     * Guarda un gato en la lista de favoritos.
     * @param {string} imageId - El ID de la imagen del gato a guardar.
     * @returns {Promise<object>} - Una promesa que resuelve con la respuesta de la API.
     */
    saveCatAsFavourite: async (imageId) => {
        const { data } = await api.post("/favourites", { image_id: imageId });
        return data;
    },

    /**
     * Elimina un gato de la lista de favoritos.
     * @param {number} favouriteId - El ID del favorito a eliminar.
     * @returns {Promise<object>} - Una promesa que resuelve con la respuesta de la API.
     */
    deleteCatFromFavourites: async (favouriteId) => {
        const { data } = await api.delete(`/favourites/${favouriteId}`);
        return data;
    },
};
