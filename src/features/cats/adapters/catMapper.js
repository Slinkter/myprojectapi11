/**
 * @file Cat mappers and adapters.
 * @description Transforms raw data structures from external sources into application domain entities.
 */

/**
 * @typedef {import('../api/catApi').RawApiCat} RawApiCat
 * @typedef {import('../api/catApi').RawFavouriteCat} RawFavouriteCat
 */

/**
 * Base Cat Domain Entity used throughout the application UI.
 * @typedef {Object} CatEntity
 * @property {string} id - The Cat image unique identifier.
 * @property {string} url - The URL to the cat image.
 * @property {number|null} favouriteId - The ID of the favourite record, if it exists in the user's favourites list (otherwise null).
 */

/**
 * Normalizes cat data into a consistent domain object.
 * @param {RawApiCat | RawFavouriteCat} rawCat - Raw cat data from TheCatAPI.
 * @returns {CatEntity} The normalized cat entity ready for the UI.
 */
export const mapToCatEntity = (rawCat) => {
  // If it comes from 'favourites' endpoint, it has a different structure
  if (rawCat.image) {
    return {
      id: rawCat.image.id,
      url: rawCat.image.url,
      favouriteId: rawCat.id,
    };
  }

  // Standard image search response
  return {
    id: rawCat.id,
    url: rawCat.url,
    favouriteId: null,
  };
};

/**
 * Maps a list of raw cats to domain entities.
 * @param {Array<RawApiCat | RawFavouriteCat>} rawCats - Array of raw data from external API.
 * @returns {CatEntity[]} List of clean domain entities.
 */
export const mapToCatEntities = (rawCats) => {
  if (!Array.isArray(rawCats)) return [];
  return rawCats.map(mapToCatEntity);
};
