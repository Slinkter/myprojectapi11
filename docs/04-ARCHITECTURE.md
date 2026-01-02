# Software Architecture & Patterns

## 1. Architectural Style: Feature-Sliced Design (Simplified)

This project adopts a domain-driven structure inspired by FSD, prioritizing coherence and scalability.

### Layers

1.  **App Layer (`src/app`)**:
    *   **Responsibility:** Global entry point, providers, and store configuration.
    *   **Key Files:** `store.js`, `main.jsx`.

2.  **Features Layer (`src/features`)**:
    *   **Responsibility:** Vertical slices of business logic. Each feature contains its own UI, State, and API logic.
    *   **Modules:**
        *   `cats`: Core domain (images, favorites).
        *   `theme`: Visual theme management.
        *   `font`: Typography management.

3.  **Shared Layer (`src/shared`)**:
    *   **Responsibility:** Reusable code decoupled from specific business logic.
    *   **Modules:**
        *   `ui`: Generic components (Buttons, Cards, Loaders).
        *   `hooks`: Utility hooks (`useAppearance`).

## 2. Design Patterns

### A. Facade Pattern (Custom Hooks)
**Problem:** Connecting UI components directly to Redux (`useSelector`, `useDispatch`) creates tight coupling and boilerplates.
**Solution:** Custom Hooks act as Facades.
*   **Example:** `useCats()`
*   **Benefit:** Components like `RandomCatList` only know about `loadRandomCats()` and `cats[]`. They don't know *how* the data is fetched or stored.

### B. Container / Presentational Pattern
**Problem:** Mixing data fetching logic with rendering logic makes components hard to test and reuse.
**Solution:** Split components.
*   **Container (Smart):** `RandomCatList.jsx` (Connects to `useCats`, handles effects).
*   **Presentational (Dumb):** `CatList.jsx` (Receives props, renders HTML).

### C. Adapter / Service Pattern
**Problem:** API responses might change format, breaking the frontend application.
**Solution:** `catApiService` with normalization.
*   **Implementation:** `normalizeCatData` function transforms raw API JSON into a consistent application Domain Entity (`Cat` object).

## 3. State Management (Redux Toolkit)
The state is normalized and divided into slices:
*   `catsSlice`: Handles data lists and async thunk statuses (`loading`, `error`).
*   `themeSlice` & `fontSlice`: Handle UI preferences.

## 4. Directory Structure (Proposed Standard)

```
src/
├── app/                  # Application Layer
├── features/             # Business Features
│   └── cats/
│       ├── api/          # DTOs & Axios Services
│       ├── components/   # Feature-specific UI
│       ├── hooks/        # Facade Hooks
│       └── store/        # Redux Slices
├── shared/               # Shared Kernel
│   ├── hooks/            # Generic Hooks
│   └── ui/               # Design System Components
└── main.jsx
```
