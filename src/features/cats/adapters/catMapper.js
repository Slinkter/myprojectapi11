/**
 * @file Cat mappers and adapters.
 * @description Transforms raw data from external sources into domain entities.
 * @see {@link https://github.com/Slinkter/myprojectapi11#cors-proxy|CORS Proxy Documentation}
 */

import { z } from "zod";

const CAT_ENTITY_SCHEMA = z.object({
    id: z.string(),
    url: z.string(),
    favouriteId: z.number().nullable(),
});

/**
 * @typedef {Object} CatEntity
 * @property {string} id - The Cat image unique identifier.
 * @property {string} url - The image URL (proxied in dev, direct in prod).
 * @property {number|null} favouriteId - The ID of the favourite record.
 */

/**
 * CORS proxy endpoint for development.
 * Routes through Vite dev server proxy to bypass browser CORS restrictions.
 * @constant {string}
 */
const CORS_PROXY_DEV = "/api/cors-proxy?url=";

const getImageUrl = (url) => {
    if (import.meta.env.PROD) {
        return url;
    }
    return `${CORS_PROXY_DEV}${encodeURIComponent(url)}`;
};

/**
 * Normalizes favourite response from TheCatAPI.
 * @param {Object} rawCat - Raw API response.
 * @returns {Object} Normalized cat entity with proxied URL.
 */
const normalizeFavouriteResponse = (rawCat) => ({
    id: rawCat.image.id,
    url: getImageUrl(rawCat.image.url),
    favouriteId: rawCat.id,
});

/**
 * Normalizes image search response from TheCatAPI.
 * @param {Object} rawCat - Raw API response.
 * @returns {Object} Normalized cat entity with proxied URL.
 */
const normalizeImageSearchResponse = (rawCat) => ({
    id: rawCat.id,
    url: getImageUrl(rawCat.url),
    favouriteId: null,
});

export const mapToCatEntity = (rawCat) => {
    if (rawCat.image) {
        return CAT_ENTITY_SCHEMA.parse(normalizeFavouriteResponse(rawCat));
    }
    return CAT_ENTITY_SCHEMA.parse(normalizeImageSearchResponse(rawCat));
};

export const mapToCatEntities = (rawCats) => {
    if (!Array.isArray(rawCats)) return [];
    return rawCats.map(mapToCatEntity);
};

export const validateCatEntity = (data) => CAT_ENTITY_SCHEMA.safeParse(data);
