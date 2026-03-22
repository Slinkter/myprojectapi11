/**
 * @file Cat mappers and adapters.
 * @description Transforms raw data structures from external sources into application domain entities.
 * Uses Zod for runtime validation.
 */

import { z } from "zod";

/**
 * Zod schema for raw API response from /images/search.
 * @constant {z.ZodType<Object>}
 */
const CAT_ENTITY_SCHEMA = z.object({
    id: z.string(),
    url: z.string().url(),
    favouriteId: z.number().nullable(),
});

/**
 * Base Cat Domain Entity used throughout the application UI.
 * @typedef {Object} CatEntity
 * @property {string} id - The Cat image unique identifier.
 * @property {string} url - The URL to the cat image.
 * @property {number|null} favouriteId - The ID of the favourite record, if it exists (otherwise null).
 */

/**
 * Normalizes raw cat data into a consistent domain object.
 * @param {Object} rawCat - Raw cat data from API.
 * @returns {CatEntity} Normalized cat entity.
 */
export const mapToCatEntity = (rawCat) => {
    let normalized;

    // If it comes from 'favourites' endpoint, it has image nested
    if (rawCat.image) {
        normalized = {
            id: rawCat.image.id,
            url: rawCat.image.url,
            favouriteId: rawCat.id,
        };
    } else {
        // Standard image search response
        normalized = {
            id: rawCat.id,
            url: rawCat.url,
            favouriteId: null,
        };
    }

    // Validate with Zod
return CAT_ENTITY_SCHEMA.parse(normalized);
};

/**
 * Maps a list of raw cats to domain entities with validation.
 * @param {Array} rawCats - Array of raw data from external API.
 * @returns {CatEntity[]} List of clean domain entities.
 */
export const mapToCatEntities = (rawCats) => {
    if (!Array.isArray(rawCats)) return [];
    return rawCats.map(mapToCatEntity);
};

/**
 * Validates normalized data against CatEntity schema.
 * @param {Object} data - Data to validate.
 * @returns {{success: boolean, data?: CatEntity, error?: z.ZodError}}
 */
export const validateCatEntity = (data) => {
    return CAT_ENTITY_SCHEMA.safeParse(data);
};
