/**
 * @file Debug logger utilities.
 * @description Simplified debug logging with timestamps for key application events.
 */

const time = () => new Date().toISOString().split("T")[1].slice(0, 12);

/**
 * Logs the start of a sequence or operation.
 *
 * @param {string} label - Descriptive label for the operation.
 * @returns {void}
 *
 * @example
 * logStart("App render");
 */
export const logStart = (label) => console.log(`⏱️ ${time()} ➡️ ${label}`);

/**
 * Logs the successful completion of a sequence.
 *
 * @param {string} label - Descriptive label for the operation.
 * @param {*} [data] - Optional additional data to log.
 * @returns {void}
 *
 * @example
 * logEnd("fetchRandomCats", "12 cats");
 */
export const logEnd = (label, data) => console.log(`⏱️ ${time()} ✅ ${label}`, data || "");

/**
 * Logs the current state of an entity.
 *
 * @param {string} label - Descriptive label.
 * @param {Object} state - State object to inspect.
 * @returns {void}
 *
 * @example
 * logState("useCats", { random: 12, favourites: 3 });
 */
export const logState = (label, state) =>
    console.log(`⏱️ ${time()} 📊 ${label}:`, state);

/**
 * Logs a Redux action dispatch.
 *
 * @param {string} action - The action name or type.
 * @returns {void}
 *
 * @example
 * logAction("fetchRandomCats PENDING");
 */
export const logAction = (action) =>
    console.log(`⏱️ ${time()} ⚡ ${action}`);

/**
 * Logs an API request or response.
 *
 * @param {string} label - Descriptive label for the API call.
 * @returns {void}
 *
 * @example
 * logApi("API: GET /images/search");
 */
export const logApi = (label) =>
    console.log(`🌍 ${time()} ${label}`);
