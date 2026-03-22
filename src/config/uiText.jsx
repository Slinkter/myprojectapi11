/**
 * @file UI text constants.
 * @description Centralizes user-facing text strings.
 */

/**
 * Empty state messages for cat lists.
 * @constant {Object}
 */
export const EMPTY_STATE_MESSAGES = {
    FAVOURITES: (
        <span>
            You have no favourite kittens yet. <br />
            Click the heart on a kitten to save it!
        </span>
    ),
};

/**
 * Section titles.
 * @constant {Object}
 */
export const SECTION_TITLES = {
    RANDOM_CATS: "Random Kittens",
    FAVOURITE_CATS: "Favourite Kittens",
};

/**
 * Accessibility labels.
 * @constant {Object}
 */
export const A11Y_LABELS = {
    TOGGLE_THEME: "Toggle theme",
};