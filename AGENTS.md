# AGENTS.md - Development Guide for AI Agents

## Project Overview

This is a **React 19 + Vite 7** single-page application that displays a cat gallery with favorites and theme customization. It uses **Feature-Sliced Design (FSD)** architecture and **Redux Toolkit** for state management.

---

## Package Manager

**Use pnpm exclusively** - do NOT use npm or yarn.

```bash
pnpm install    # Install dependencies
pnpm run dev   # Start dev server at http://localhost:5173
```

---

## Build / Lint / Test Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Vite dev server with HMR |
| `pnpm run build` | Production build to `./dist` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint with 0 warnings policy |
| `pnpm run deploy` | ~~DEPRECATED~~ Use GitHub Actions instead |

**Note:** There are currently **no tests** configured in this project. Do not add test frameworks without consulting the user first.

---

## GitHub Actions (CI/CD)

The project uses GitHub Actions for continuous integration and deployment.

### Workflow: `.github/workflows/ci-cd.yml`

| Trigger | Action |
|---------|--------|
| Push to `main` | Run lint + build → Deploy to GitHub Pages |
| Push to `develop` | Run lint + build (no deploy) |
| Pull Request to `main` | Run lint + build (branch protection) |

### Deployment Rules

- **Only `main` branch triggers deployment**
- **Lint must pass** before build runs
- **Build must pass** before deployment
- **Pull Requests** run CI but never deploy

---

## Code Style Guidelines

### General Rules

- **Language:** JavaScript (ES6+) with **strict JSDoc typing** — no TypeScript
- **Formatting:** Prettier defaults
- **Linting:** ESLint — **0 warnings allowed** (always run `pnpm run lint` before committing)
- **CSS:** Tailwind CSS v4 — use semantic tokens, never hardcode colors

### Import Conventions

1. **External libraries** first (React, Redux, axios, etc.)
2. **Internal imports** after (features, shared, app aliases)
3. Use path aliases for cleaner imports:

```javascript
// Allowed aliases (configured in vite.config.js)
@import "react"
@import "@reduxjs/toolkit"
@import "@features/cats/..."
@import "@shared/ui/..."
@import "@app/store"
@import "@config/env"
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | `PascalCase.jsx` | `CatCard.jsx` |
| Hooks | `useCamelCase.js` | `useCats.js` |
| Services | `camelCase.js` | `catService.js` |
| Mappers/Adapters | `camelCaseMapper.js` | `catMapper.js` |
| Redux Slices | `camelCaseSlice.js` | `catsSlice.js` |
| Directories | `camelCase` | `components/` |
| Variables | `camelCase` | `randomCats` |
| Booleans | `is/has/should` prefix | `isLoading`, `hasError` |
| Domain Entities | `PascalCase` + `Entity` suffix | `CatEntity` |
| Facade Return Types | `PascalCase` + `Facade` suffix | `UseCatsFacade` |

### JSDoc Typing Requirements

**All exported functions, hooks, and component props MUST be documented with JSDoc.**

```javascript
// ✅ Correct - Use domain types
/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */
/**
 * @param {CatEntity} props.cat - The normalized cat entity.
 */

// ❌ Wrong - Never use generic 'object'
/** @param {object} props.cat */
```

**Facade return types must be fully typed:**

```javascript
/**
 * @typedef {Object} UseCatsFacade
 * @property {CatEntity[]} randomCats
 * @property {boolean} isLoading
 * @property {function(): void} loadRandomCats
 */

/**
 * @returns {UseCatsFacade}
 */
export const useCats = () => { ... };
```

---

## Architecture Rules (Feature-Sliced Design)

| Rule | Enforcement |
|------|-------------|
| No `fetch()` in components | Use `catApi.js` → `catService.js` |
| No raw API data in components | Must pass through `catMapper.js` |
| No `useSelector`/`useDispatch` in components | Use facade hooks only |
| No cross-feature imports | `theme` must not import from `cats` |
| No hardcoded Tailwind colors | Use semantic tokens (`bg-muted`, not `bg-gray-200`) |
| Use `cn()` utility for className merging | Always use `@shared/utils/cn` |

### Directory Structure

```
src/
├── app/           # Redux store configuration
├── config/        # Environment variables (env.js)
├── features/      # Feature modules (cats, theme, font)
│   └── [feature]/
│       ├── api/           # Low-level HTTP client (axios)
│       ├── adapters/       # Mappers (API → Domain entity)
│       ├── services/       # API orchestration
│       ├── redux/          # Slices, thunks
│       ├── hooks/          # Facade hooks
│       └── components/     # Feature-specific UI
├── shared/
│   ├── ui/        # Reusable primitives (Button, Select)
│   ├── hooks/     # Shared hooks (useAppearance, usePageTitle)
│   ├── components/# Shared components (ErrorBoundary, Skeletons)
│   └── utils/     # Utilities (cn.js)
└── App.jsx        # Root layout component
```

---

## Key Features Implemented

### Error Handling
- **ErrorBoundary**: Catches React errors with fallback UI and retry button
- **CatErrorHandler**: Displays API errors with retry functionality

### Performance Optimizations
- **Data Prefetching**: `usePreloadCats` loads data before components mount
- **Lazy Loading**: Components loaded via `React.lazy()` + `Suspense`
- **Separate Skeletons**: `RandomCatListSkeleton` (6 items) and `FavouriteCatListSkeleton` (4 items)
- **Memoization**: `useMemo`, `useCallback`, `React.memo` where appropriate

### UI/UX Improvements
- **Favicon**: Custom cat SVG icon (`/public/cat.svg`)
- **Consistent Buttons**: Round black buttons with white icons for favorites

---

## Error Handling

- Use `try/catch` with `dispatch().unwrap()` for async Redux thunks
- Display errors via `react-hot-toast`:
  ```javascript
  try {
    await dispatch(saveCat(cat)).unwrap();
    toast.success("Cat saved!");
  } catch (err) {
    toast.error(`Failed: ${err}`);
  }
  ```

---

## Git Workflow

```bash
# Branch types
main         # Production-ready
develop      # Integration branch
feature/...  # New features
fix/...      # Bug fixes
refactor/... # Refactoring only
docs/...     # Documentation
```

**Commit message format (Conventional Commits):**
```
feat: add cat tagging functionality
fix: resolve double-save on heart click
refactor: extract catMapper to adapter layer
docs: update architecture diagram
style: align button padding to design system
```

---

## Environment Variables

Create `.env` in root (see `.env.example`):

```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=your_api_key_here
```

---

## Useful Paths

- Dev server: `http://localhost:5173`
- Production build: `./dist`
- Deployed URL: `https://slinkter.github.io/myprojectapi11`

---

## Recent Changes (2026)

| Date | Change |
|------|--------|
| Feb 2026 | Added ErrorBoundary component |
| Feb 2026 | Implemented usePreloadCats for data prefetching |
| Feb 2026 | Added separate skeletons for each list |
| Feb 2026 | Updated button styles (round black buttons) |
| Feb 2026 | Added custom cat favicon |
| Feb 2026 | Updated all JSDoc comments with examples |
