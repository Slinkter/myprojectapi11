/**
 * @file Optimized Debug Logging Utility.
 * @description Provides a standardized, visually distinct way to trace application 
 * events, state changes, and API lifecycle in the browser console.
 * Each log includes a high-resolution timestamp (HH:MM:SS.mmm).
 */

/**
 * Returns a formatted timestamp string (HH:MM:SS.mmm).
 * Configured for Lima, Peru (GMT-05).
 * 
 * @private
 * @returns {string} The current time substring.
 * 
 * @description
 * Uses 'en-GB' (British English) for a consistent 24-hour clock format 
 * (00:00:00 to 23:59:59) which is the preferred standard for engineering logs,
 * while keeping the physical time data from the 'America/Lima' timezone.
 * 
 * @example 
 * // Output format: 09:30:15.123 (GMT-05)
 * 
 * // Original UTC version (Archived):
 * // const time = () => new Date().toISOString().split("T")[1].slice(0, 12);
 */
const time = () => {
    const options = {
        timeZone: "America/Lima",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", options);
    const ms = String(now.getMilliseconds()).padStart(3, "0");

    return `${timeStr}.${ms}`;
};




/**
 * Logs the start of a logical sequence (render, mount, logic start).
 * @param {string} label - The name of the process being started.
 * @example logStart("CatGallery mounted"); 
 * // Output: ⏱️ 09:12:45.123 ➡️ CatGallery mounted
 */
export const logStart = (label) => console.log(`⏱️ ${time()} ➡️ ${label}`);

/**
 * Logs the successful completion of a sequence with optional data.
 * @param {string} label - The name of the process completed.
 * @param {any} [data] - Optional payload or result object to inspect.
 * @example logEnd("RandomCats Load", { total: 10 }); 
 * // Output: ⏱️ 09:12:46.540 ✅ RandomCats Load { total: 10 }
 */
export const logEnd = (label, data) =>
    console.log(`⏱️ ${time()} ✅ ${label}`, data || "");

/**
 * Logs the current value of a state or variable.
 * @param {string} label - Description of the state.
 * @param {any} state - The state object or value to tree-view.
 * @example logState("UserPreferences", { theme: 'dark' });
 * // Output: ⏱️ 09:12:46.800 📊 UserPreferences: { theme: 'dark' }
 */
export const logState = (label, state) =>
    console.log(`⏱️ ${time()} 📊 ${label}:`, state);

/**
 * Logs a Redux action or specific atomic event.
 * @param {string} action - The action identifier or description.
 * @example logAction("cats/save/pending");
 * // Output: ⏱️ 09:12:47.100 ⚡ cats/save/pending
 */
export const logAction = (action) => console.log(`⏱️ ${time()} ⚡ ${action}`);

/**
 * Logs an outgoing network request or API orchestration step.
 * @param {string} label - Description of the API call.
 * @example logApi("catService.fetchImages");
 * // Output: 🌍 09:12:47.250 catService.fetchImages
 */
export const logApi = (label) => console.log(`🌍 ${time()} ${label}`);

