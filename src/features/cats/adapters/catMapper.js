/**
 * @file Cat mappers and adapters.
 * @description Transforms raw data from external sources into domain entities.
 */

import { z } from "zod";

const CAT_ENTITY_SCHEMA = z.object({
    id: z.string(),
    url: z.string().url(),
    favouriteId: z.number().nullable(),
});

/**
 * @typedef {Object} CatEntity
 * @property {string} id - The Cat image unique identifier.
 * @property {string} url - The URL to the cat image.
 * @property {number|null} favouriteId - The ID of the favourite record.
 */

const normalizeFavouriteResponse = (rawCat) => ({
    id: rawCat.image.id,
    url: rawCat.image.url,
    favouriteId: rawCat.id,
});

const normalizeImageSearchResponse = (rawCat) => ({
    id: rawCat.id,
    url: rawCat.url,
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
