# Technical Glossary

## Architecture & Code

*   **Feature-Sliced Design (FSD):** An architectural methodology for frontend projects. It divides the codebase into slices (features) based on business domain rather than technical layers.
*   **Facade Pattern:** A structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes (e.g., our `useCats` hook hiding Redux complexity).
*   **Thunk:** A specific kind of Redux function that can contain asynchronous logic. Thunks are written using two functions: an inside function that accepts `dispatch` and `getState` as arguments, and an outside creator function.
*   **Memoization:** An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls (e.g., `useMemo`, `React.memo`).
*   **Prop Drilling:** The process of passing data from a parent component down to further nested children. We avoid this by using Redux and Composition.

## Domain Terms

*   **Cat Entity:** The standardized internal representation of a cat image. Contains `id`, `url`, and optional `favouriteId`.
*   **TheCatAPI:** The external 3rd party service used to fetch images.
*   **Favourite:** A status applied to a Cat entity indicating the user has saved it. Persisted locally.

## UI/UX

*   **Skeleton Screen:** A placeholder UI that mimics the layout of the content that is loading, used to reduce perceived loading time.
*   **Toast:** A small message that shows up in a box at the bottom (or top) of the screen and disappears on its own after a few seconds.
*   **Dark Mode:** A color scheme that uses light-colored text, icons, and graphical user interface elements on a dark background.
