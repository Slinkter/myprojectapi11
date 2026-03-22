/**
 * @file Toast messages constants.
 * @description Centralizes user-facing messages for toasts.
 */

/**
 * Toast messages for cat operations.
 * @constant {Object}
 */
export const TOAST_MESSAGES = {
    SAVE_SUCCESS: "Cat saved to favourites!",
    SAVE_ERROR: (err) => `Failed to save: ${err}`,
    DELETE_SUCCESS: "Cat removed from favourites!",
    DELETE_ERROR: (err) => `Failed to delete: ${err}`,
};