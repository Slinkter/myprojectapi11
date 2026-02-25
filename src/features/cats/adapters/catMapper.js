/**
 * @file Cat mappers and adapters.
 * @description Transforms raw data structures from external sources into application domain entities.
 */

/**
 * Normalizes cat data into a consistent domain object.
 * @param {object} rawCat - Raw cat data from TheCatAPI.
 * @returns {object} The normalized cat entity.
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
 * @param {Array} rawCats - Array of raw data.
 * @returns {Array} List of domain entities.
 */
export const mapToCatEntities = (rawCats) => {
  if (!Array.isArray(rawCats)) return [];
  return rawCats.map(mapToCatEntity);
};
