/**
 * @file Servicio para interactuar con TheCatAPI.
 * @description Este módulo encapsula todas las llamadas a la API para obtener, guardar y eliminar gatos.
 * Utiliza una instancia de Axios preconfigurada con la URL base y las cabeceras necesarias,
 * y normaliza los datos recibidos para mantener una estructura consistente en la aplicación.
 */

import axios from "axios";

// Se obtienen las variables de entorno para la configuración de la API.
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Instancia de Axios preconfigurada para TheCatAPI.
 * Incluye la URL base, la clave de API en las cabeceras y un timeout.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
    baseURL: BASE_URL,
    headers: { "x-api-key": API_KEY },
    timeout: 5000, // Tiempo máximo de espera para una petición.
});

/**
 * Normaliza la estructura de datos de un gato a un formato consistente y unificado.
 * La API devuelve estructuras diferentes para gatos aleatorios y gatos favoritos.
 * Esta función asegura que ambos tipos de objetos tengan la misma forma.
 *
 * @param {object} catData - Los datos del gato tal como vienen de la API.
 * @returns {{id: string, url: string, favouriteId: number|null}} - El objeto de gato normalizado.
 */
const normalizeCatData = (catData) => {
    // Si `catData` tiene una propiedad `image`, es un objeto de un gato favorito.
    if (catData.image) {
        return {
            id: catData.image.id, // El ID de la imagen original.
            url: catData.image.url, // La URL de la imagen.
            favouriteId: catData.id, // El ID del registro de "favorito".
        };
    }
    // Si no, es un objeto de un gato aleatorio.
    return {
        id: catData.id,
        url: catData.url,
        favouriteId: null, // Los gatos aleatorios no tienen un ID de favorito aún.
    };
};

/**
 * Objeto del servicio de API que agrupa todos los métodos para interactuar con los endpoints de gatos.
 */
export const catApiService = {
    /**
     * Busca un número limitado de imágenes de gatos aleatorias.
     * @param {number} [limit=10] - El número de imágenes a obtener.
     * @returns {Promise<Array<object>>} - Una promesa que resuelve a un array de gatos normalizados.
     */
    getRandomCats: async (limit = 10) => {
        const { data } = await api.get(`/images/search?limit=${limit}`);
        return data.map(normalizeCatData);
    },

    /**
     * Obtiene todos los gatos guardados como favoritos por el usuario.
     * @returns {Promise<Array<object>>} - Una promesa que resuelve a un array de gatos favoritos normalizados.
     */
    getFavouriteCats: async () => {
        const { data } = await api.get("/favourites");
        return data.map(normalizeCatData);
    },

    /**
     * Guarda un gato en la lista de favoritos.
     * @param {string} imageId - El ID de la imagen del gato a guardar.
     * @returns {Promise<object>} - Una promesa que resuelve con la respuesta de la API (incluye el nuevo `favouriteId`).
     */
    saveCatAsFavourite: async (imageId) => {
        const { data } = await api.post("/favourites", { image_id: imageId });
        return data;
    },

    /**
     * Elimina un gato de la lista de favoritos.
     * @param {number} favouriteId - El ID del registro de "favorito" a eliminar.
     * @returns {Promise<object>} - Una promesa que resuelve con la respuesta de la API.
     */
    deleteCatFromFavourites: async (favouriteId) => {
        const { data } = await api.delete(`/favourites/${favouriteId}`);
        return data;
    },
};