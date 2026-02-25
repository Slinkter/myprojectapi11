# Architecture & Design Patterns

## 1. Architectural Style: Feature-Sliced Design (FSD)

This project uses a simplified FSD: the codebase is split into **isolated vertical slices by business domain** (features), not by technical role (components/actions/reducers).

---

## 2. Full Directory Structure

```text
src/
|   App.css
|   App.jsx
|   index.css
|   main.jsx
|
+---app/
|       store.js              ← Redux store (combines 3 slices: cats, theme, font)
|
+---config/
|       env.js                ← Environment variable validation + export
|
+---docs/
|       00-SETUP-GUIDE.md
|       01-PROJECT-CHARTER.md
|       02-REQUIREMENTS.md
|       03-USE-CASES.md
|       04-ARCHITECTURE.md
|       05-UI-DESIGN-SYSTEM.md
|       06-CONTRIBUTING.md
|       07-SCRUM-PROCESS.md
|       08-GLOSSARY.md
|       DOCUMENTATION.md
|
+---features/
|   +---cats/
|   |   |   index.js          ← Public API: only exports what other features need
|   |   +---adapters/
|   |   |       catMapper.js  ← Anti-corruption: RawApiCat/RawFavouriteCat → CatEntity
|   |   +---api/
|   |   |       catApi.js     ← Axios HTTP client for TheCatAPI
|   |   +---components/
|   |   |   |   CatCard.jsx
|   |   |   |   CatErrorHandler.jsx
|   |   |   |   CatList.jsx
|   |   |   |   FavouriteCatList.jsx
|   |   |   |   RandomCatList.jsx
|   |   |   \---subcomponents/
|   |   |           CatCardFooter.jsx
|   |   |           CatCardHeader.jsx
|   |   +---hooks/
|   |   |       useCats.js    ← Facade Hook: hides Redux from all UI components
|   |   +---redux/
|   |   |       catsSlice.js  ← Thunks (fetchRandom, saveCat, deleteCat) + reducers
|   |   \---services/
|   |           catService.js ← Orchestrates API → Mapper → return CatEntity[]
|   +---font/
|   |   +---components/
|   |   |       FontDropdown.jsx
|   |   +---context/
|   |   |       constants.js  ← List of available font families
|   |   +---hooks/
|   |   |       useFont.js    ← Facade Hook for typography
|   |   \---redux/
|   |           fontSlice.js
|   \---theme/
|       +---components/
|       |       ThemeToggleButton.jsx
|       +---hooks/
|       |       useTheme.js   ← Facade Hook for dark/light mode
|       \---redux/
|               themeSlice.js
|
\---shared/
    +---components/
    |   \---skeletons/
    |           CatListSkeleton.jsx    ← Used by Suspense fallback
    |           SkeletonCard.jsx       ← Single card placeholder
    |           SkeletonGrid.jsx       ← Full grid placeholder
    +---hooks/
    |       useAppearance.js           ← Applies theme + font to DOM
    |       usePageTitle.js
    \---ui/
            IconButton.jsx             ← Circular button with aria-label
            Select.jsx                 ← Styled native select dropdown
```

---

## 3. Vite Path Aliases

Configured in `vite.config.js`. Avoids deep relative imports like `../../../../features/cats`.

| Alias       | Resolves To     | Example Usage                                                          |
| ----------- | --------------- | ---------------------------------------------------------------------- |
| `@features` | `src/features/` | `import { useCats } from "@features/cats/hooks/useCats"`               |
| `@shared`   | `src/shared/`   | `import SkeletonGrid from "@shared/components/skeletons/SkeletonGrid"` |
| `@app`      | `src/app/`      | `import store from "@app/store"`                                       |
| `@config`   | `src/config/`   | `import { config } from "@config/env"`                                 |

---

## 4. Redux State Shape

Three slices combined in `src/app/store.js`:

```javascript
{
  cats: {
    random: CatEntity[],     // Random cat images
    favourites: CatEntity[], // User's saved favourites
    loading: {
      random: boolean,
      favourites: boolean,
      saving: boolean,
      deleting: boolean,
    },
    error: string | null,
  },
  theme: {
    mode: "light" | "dark",  // Stored in LocalStorage
  },
  font: {
    family: string,          // CSS font family string
    list: Font[],            // Available font options
  },
}
```

---

## 5. Data Flow Diagram

```
TheCatAPI
    ↓  HTTP  (Axios)
catApi.js
    ↓  raw JSON (RawApiCat | RawFavouriteCat)
catMapper.js
    ↓  normalized  CatEntity[]
catService.js
    ↓  returns entity array
catsSlice.js  (Thunks)
    ↓  dispatches to Redux store
useCats.js  (Facade)
    ↓  typed UseCatsFacade
RandomCatList.jsx / FavouriteCatList.jsx  (Smart Container)
    ↓  props { cats: CatEntity[] }
CatList.jsx / CatCard.jsx  (Dumb Presentation)
```

---

## 6. Design Patterns

### A. Facade Pattern (Custom Hooks)

**Why:** Components connected directly to Redux are hard to test and tightly coupled.
**How:** `useCats()`, `useTheme()`, `useFont()` act as typed facades. UI only calls `loadRandomCats()` — it has no knowledge of `dispatch`, `createAsyncThunk`, or slice names.

### B. Container / Presentational Split

| Category            | Component          | Responsibility                        |
| ------------------- | ------------------ | ------------------------------------- |
| Smart (Container)   | `RandomCatList`    | Fetches data, tracks side-effects     |
| Smart (Container)   | `FavouriteCatList` | Fetches data, tracks side-effects     |
| Dumb (Presentation) | `CatList`          | Renders a typed list of `CatEntity[]` |
| Dumb (Presentation) | `CatCard`          | Renders a single `CatEntity`          |

### C. Adapter / Anti-Corruption Layer

`catMapper.js` is the only place in the codebase that "knows" about TheCatAPI's raw response format. If the API changes its schema, only `catMapper.js` needs to change.

```javascript
// Input from API — shape varies by endpoint
RawApiCat     = { id, url, width, height }
RawFavourite  = { id, image: { id, url }, user_id, ... }

// Output — always the same shape for the app
CatEntity     = { id: string, url: string, favouriteId: number | null }
```

### D. Strict JSDoc Typing

All entities, facades, thunks, and component props are documented via `@typedef`. This provides IDE autocompletion and enforces contracts without requiring TypeScript.
