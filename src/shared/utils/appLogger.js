/**
 * @file Application event logger.
 * @description Simplified logging with timestamps for key application events.
 * Logs are only output in development mode.
 */

const getTimestamp = () => new Date().toISOString().split("T")[1].slice(0, 12);

/**
 * Logs the start of an operation.
 * @param {string} label - The operation label.
 */
export const logStart = (label) => {
  if (import.meta.env.DEV) {
    console.log(`⏱️ ${getTimestamp()} ➡️ ${label}`);
  }
};

/**
 * Logs the end of an operation.
 * @param {string} label - The operation label.
 * @param {any} [data] - Optional data to log.
 */
export const logEnd = (label, data) => {
  if (import.meta.env.DEV) {
    console.log(`⏱️ ${getTimestamp()} ✅ ${label}`, data || "");
  }
};

/**
 * Logs a state change or current state.
 * @param {string} label - The state label.
 * @param {any} state - The state to log.
 */
export const logState = (label, state) => {
  if (import.meta.env.DEV) {
    console.log(`⏱️ ${getTimestamp()} 📊 ${label}:`, state);
  }
};

/**
 * Logs an application action.
 * @param {string} action - The action description.
 */
export const logAction = (action) => {
  if (import.meta.env.DEV) {
    console.log(`⏱️ ${getTimestamp()} ⚡ ${action}`);
  }
};

/**
 * Logs an API call or response.
 * @param {string} label - The API event label.
 */
export const logApi = (label) => {
  if (import.meta.env.DEV) {
    console.log(`🌍 ${getTimestamp()} ${label}`);
  }
};
