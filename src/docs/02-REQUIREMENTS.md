# System Requirements

## 1. Functional Requirements (FR)

### FR-01: Browse Random Cats

**Description:** Display a grid of random cat images fetched from TheCatAPI.

| Acceptance Criteria | Detail                                                                            |
| ------------------- | --------------------------------------------------------------------------------- |
| Show loading state  | `SkeletonGrid` must appear — same grid columns and card size as the final content |
| Animate on arrival  | Cards enter with scale + fade via Framer Motion                                   |
| Handle API errors   | Show `CatErrorHandler` with retry button                                          |
| No duplicate logic  | API calls go through `catApi.js → catMapper.js → catService.js` only              |

### FR-02: Favorites Management

**Description:** Users save and remove favorite cats via TheCatAPI's `/favourites` endpoint.

| Acceptance Criteria  | Detail                                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Heart icon saves     | `saveCat` thunk: POST `/favourites` with `image_id`                           |
| Trash icon removes   | `deleteCat` thunk: DELETE `/favourites/{favouriteId}`                         |
| Duplicate prevention | Memoized `Set` lookup (`O(1)`) in `RandomCatList`                             |
| Disabled state       | Heart button disabled (filled, red) after saving — re-enables only if removed |
| Toast feedback       | react-hot-toast on success and failure                                        |

### FR-03: Theme Customization

| Acceptance Criteria  | Detail                                        |
| -------------------- | --------------------------------------------- |
| Toggle switch        | Sun/Moon `IconButton` in header               |
| LocalStorage persist | `useAppearance` reads preference on mount     |
| DOM update           | Adds/removes `dark` class on `<html>` element |

### FR-04: Typography Customization

| Acceptance Criteria  | Detail                                                  |
| -------------------- | ------------------------------------------------------- |
| Font dropdown        | `Select` component in header populated from font `list` |
| Instant apply        | Updates `--font-family` CSS variable on `<body>`        |
| LocalStorage persist | persisted by `useAppearance`                            |

---

## 2. Non-Functional Requirements (NFR)

### NFR-01: Performance

| Metric                        | Target                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- |
| FCP (First Contentful Paint)  | < 1.5s on 4G                                                                  |
| CLS (Cumulative Layout Shift) | `0.0` — Skeletons must match final card dimensions exactly                    |
| Code splitting                | `RandomCatList` and `FavouriteCatList` lazy-loaded via `React.lazy`           |
| Memoization                   | `CatCard` wrapped in `React.memo`; `useCats` uses `useMemo` and `useCallback` |

### NFR-02: Usability

| Requirement   | Detail                                                      |
| ------------- | ----------------------------------------------------------- |
| Responsive    | Works on 320px (mobile) through 1440px+ (desktop)           |
| Accessibility | All interactive elements have `aria-label`                  |
| Keyboard nav  | Buttons are focusable, visible focus ring                   |
| Animations    | Smooth entrance + exit with Framer Motion `AnimatePresence` |

### NFR-03: Code Architecture

| Requirement                   | Detail                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| No direct API calls in UI     | Must go through `catService.js`                                        |
| No raw API data in components | Must go through `catMapper.js`                                         |
| No Redux in UI                | Must go through facade hook                                            |
| 100% JSDoc                    | All exported functions, hooks, types must have `@typedef` and `@param` |
| Tailwind v4 semantic tokens   | Use `bg-muted`, `text-foreground` — never hardcode `bg-gray-200`       |

### NFR-04: Environment

| Requirement               | Detail                                                           |
| ------------------------- | ---------------------------------------------------------------- |
| `.env` required variables | `VITE_BASE_URL`, `VITE_API_KEY`                                  |
| Validation on boot        | `src/config/env.js` validates on load and logs errors if missing |

---

## 3. Use Cases

### UC-1: Save a Cat

1. Random cat list is loaded (`CatEntity[]` in store).
2. User hovers over a `CatCard` → overlay with heart button appears.
3. User clicks heart → `useCats.saveFavouriteCat(cat)` called.
4. `saveCat` thunk POSTs to API → receives new `favouriteId`.
5. Redux state updated: cat added to `favourites[]`.
6. Heart button becomes filled red and disabled in `RandomCatList`.
7. Toast: "Cat saved to favourites!" shown.

### UC-2: Remove a Favorite

1. User views `FavouriteCatList`.
2. User clicks trash icon on a card.
3. `useCats.deleteFavouriteCat(cat)` called.
4. `deleteCat` thunk DELETEs `/favourites/{cat.favouriteId}`.
5. Redux: cat removed from `favourites[]` with Framer Motion exit animation.
6. Toast: "Cat removed from favourites!" shown.

### UC-3: Toggle Theme

1. User clicks Moon/Sun icon.
2. `useTheme.toggleTheme()` dispatches action.
3. `useAppearance` effect runs → toggles `dark` class on `<html>`.
4. All Tailwind semantic tokens instantly reflect new theme.
5. Preference saved to LocalStorage.
