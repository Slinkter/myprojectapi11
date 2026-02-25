# Use Case Specifications

This document details all interaction flows. These are the source of truth for feature acceptance testing.

## Actors

- **User** — A visitor browsing the application in any browser.

---

## UC-01: Browse Random Cats

**Goal:** View fresh random cat images on load.
**Trigger:** Application initial render.

**Main Flow:**

1. App renders `RandomCatList` (lazy-loaded via `React.lazy`).
2. `useEffect` calls `loadRandomCats()` if list is empty.
3. `SkeletonGrid` appears (8 cards, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, `gap-6`).
4. `fetchRandomCats` thunk fires — GET `/images/search`.
5. Response passes through `catMapper.js` → `CatEntity[]`.
6. Redux `random` array updated.
7. Framer Motion `AnimatePresence` renders each card with scale + fade-in animation.

**Alternate Flow (API Error):**

- Step 4 fails → `rejectWithValue` → `error` set in Redux slice.
- `CatErrorHandler` component displays error message and retry button.
- User clicks retry → returns to Step 2.

---

## UC-02: Save a Cat to Favorites

**Goal:** Persist a cat image as a personal favorite.
**Trigger:** User clicks the Heart button on a `CatCard`.

**Precondition:** Random cat list is loaded. Cat is NOT already in `favourites[]`.

**Main Flow:**

1. User hovers over `CatCard` → overlay with `CatCardFooter` appears.
2. Heart outline button (`BsHeart`) is visible and enabled.
3. User clicks heart button.
4. `handleAction` in `CatCard` prevents default and calls `onAction(cat)`.
5. `useCats.saveFavouriteCat(cat)` dispatches `saveCat` thunk.
6. Thunk: POST `/favourites` with `{ image_id: cat.id }`.
7. Response: `{ id: <new favouriteId>, message: "SUCCESS" }`.
8. Redux updates: cat appended to `favourites[]`, `favouriteId` assigned.
9. Heart button becomes filled (`BsFillHeartFill`, red, `disabled=true`).
10. `react-hot-toast` shows "Cat saved to favourites!".

**Disabled State Rule:** After saving, the heart button stays disabled — it re-enables only when the user removes the cat from `FavouriteCatList`.

---

## UC-03: Remove a Cat from Favorites

**Goal:** Remove a cat from the favorites list.
**Trigger:** User clicks the Trash button on a card in `FavouriteCatList`.

**Main Flow:**

1. User views the `FavouriteCatList` section.
2. User hovers a card → Trash icon (`BsTrash`) appears.
3. User clicks trash icon.
4. `useCats.deleteFavouriteCat(cat)` dispatches `deleteCat` thunk.
5. Thunk: DELETE `/favourites/{cat.favouriteId}`.
6. Redux: card removed from `favourites[]`.
7. Framer Motion `AnimatePresence` plays exit animation (scale to 0.5 + fade out).
8. Remaining cards flow smoothly into new positions via `layout` prop.
9. Toast: "Cat removed from favourites!".
10. If list becomes empty → animated empty state message appears.

---

## UC-04: Toggle Dark/Light Theme

**Goal:** Switch between dark and light color scheme.
**Trigger:** User clicks Moon/Sun `IconButton` in the sticky header.

**Main Flow:**

1. User clicks theme toggle.
2. `useTheme.toggleTheme()` fires.
3. Redux toggles `theme.mode` between `"light"` and `"dark"`.
4. `useAppearance` detects change → adds/removes `dark` CSS class on `<html>`.
5. All Tailwind CSS v4 semantic tokens (`bg-background`, `text-foreground`, etc.) instantly reflect the new theme.
6. Preference saved to LocalStorage key `theme`.

---

## UC-05: Change Font Family

**Goal:** Apply a different typography to the application.
**Trigger:** User selects a font from the `FontDropdown` in the header.

**Main Flow:**

1. User opens the `Select` dropdown.
2. Available fonts are rendered from `font.list` Redux state.
3. User selects a font (e.g., "Roboto").
4. `useFont.changeFont("Roboto")` fires.
5. Redux updates `font.family`.
6. `useAppearance` detects change → sets `document.body.style.setProperty("--font-family", "Roboto, sans-serif")`.
7. All text in the app instantly changes typeface.
8. Preference saved to LocalStorage key `font`.
