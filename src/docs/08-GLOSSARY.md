# Technical Glossary

## Architecture & Patterns

**Feature-Sliced Design (FSD)**
An architectural methodology where code is organized by **business domain** (e.g., cats, theme, font) rather than technical role (components, reducers, actions). Each feature is self-contained with its own API client, mapper, hooks, and UI.

**Facade Pattern**
A structural design pattern providing a simplified interface over complex subsystems. In this project, `useCats()`, `useTheme()`, and `useFont()` are Facades — components call `saveFavouriteCat(cat)` without knowing anything about Redux or Axios.

**Adapter / Anti-Corruption Layer**
Code that transforms data from an external format into the application's internal format. `catMapper.js` is the Adapter: it converts `RawApiCat` and `RawFavouriteCat` from TheCatAPI into `CatEntity` used throughout the app.

**Container Component (Smart)**
A React component responsible for data fetching and state connection. Example: `RandomCatList.jsx` — connects to `useCats`, handles `useEffect`, and passes data down.

**Presentational Component (Dumb)**
A React component that only renders UI based on props. Example: `CatList.jsx`, `CatCard.jsx` — no Redux, no Axios, no side effects.

**Thunk**
A Redux middleware function for async logic. Created with `createAsyncThunk` from Redux Toolkit. Examples: `fetchRandomCats`, `saveCat`, `deleteCat`. They handle pending/fulfilled/rejected states automatically.

**Memoization**
Caching an expensive computation result. Used in this project via:

- `React.memo(CatCard)` — prevents re-render if props unchanged.
- `useMemo(...)` — caches derived values (e.g., the favorite ID Set).
- `useCallback(...)` — caches function references for stable prop passing.

**Path Alias**
A Vite shortcut replacing long relative paths. `@features/cats/hooks/useCats` instead of `../../../../features/cats/hooks/useCats`.

---

## Domain Terms

**CatEntity**
The standardized internal representation of a cat. Properties:

- `id: string` — TheCatAPI image ID.
- `url: string` — Direct URL to the image.
- `favouriteId: number | null` — The remote favourite record ID, or `null` if not saved.

**TheCatAPI**
External REST API at `https://api.thecatapi.com/v1`. Used for fetching random images and managing favourites. Requires a free API key.

**`VITE_BASE_URL` / `VITE_API_KEY`**
Required environment variables stored in `.env`. The `VITE_` prefix is mandatory for Vite to expose them to browser code via `import.meta.env`.

**Favourite Record**
A server-side record in TheCatAPI linking a user to a cat image. Has its own unique `id` (`favouriteId`) separate from the image `id`. Must use `favouriteId` to delete a favourite.

---

## UI/UX Terms

**Skeleton Screen**
A placeholder UI that mimics the structural layout of content that is loading. Prevents layout shift (CLS) when the real content renders.

**CLS (Cumulative Layout Shift)**
A Core Web Vitals metric measuring visual instability. A score of `0.0` means content never jumps when loaded. This project achieves `0.0` by ensuring Skeleton dimensions exactly match real card dimensions.

**AnimatePresence (Framer Motion)**
A Framer Motion component that enables exit animations. Without it, React would remove DOM elements instantly — with it, items can animate out gracefully before being removed.

**`layout` prop (Framer Motion)**
When added to a `<motion.div>`, tells Framer Motion to animate the element's position and size changes automatically. Used on the card grid so cards smoothly fill gaps after one is deleted.

**Toast**
A brief, auto-dismissing notification. This project uses `react-hot-toast` for success and error feedback on API operations.

**Semantic Token**
A Tailwind CSS v4 variable name tied to a concept rather than a specific color (e.g., `bg-muted` rather than `bg-gray-100`). Semantic tokens automatically switch value when the app theme changes.

**`cn` Utility (clsx + tailwind-merge)**
A custom shared utility function located at `src/shared/utils/cn.js`. It uses `clsx` to construct CSS class strings conditionally and `tailwind-merge` to safely resolve Tailwind CSS conflicts (e.g., ensuring `p-4` overrides `p-2` instead of both being applied). Used extensively in this project to avoid complex template literals in JSX.

**Dark Mode**
A color scheme where backgrounds are dark and text is light. Implemented by toggling the `dark` CSS class on `<html>` via `useAppearance`.
