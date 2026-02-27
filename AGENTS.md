# AGENTS.md - Development Guide for AI Agents

## Project Overview

**React 19 + Vite 7** single-page application displaying a cat gallery with favorites and theme customization. Uses **Feature-Sliced Design (FSD)** architecture and **Redux Toolkit** for state management.

---

## Package Manager

**Use pnpm exclusively** — do NOT use npm or yarn.

```bash
pnpm install     # Install dependencies
pnpm run dev    # Start dev server at http://localhost:5173
```

---

## Build / Lint / Test Commands

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Vite dev server with HMR |
| `pnpm run build` | Production build to `./dist` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint (0 warnings policy) |

**Note:** There are **no tests** in this project. Do not add test frameworks without consulting the user first.

---

## GitHub Actions (CI/CD)

- Push to `main` → Run lint + build → Deploy to GitHub Pages (requires `CAT_API_KEY` secret)
- Push to `develop` → Run lint + build (no deploy)
- Pull Request to `main` → Run lint + build (branch protection)

**Setup required:** Add `CAT_API_KEY` secret in GitHub Settings → Actions secrets

---

## Code Style Guidelines

### General Rules

- **Language:** JavaScript (ES6+) with **strict JSDoc typing** — no TypeScript
- **Formatting:** Prettier defaults
- **Linting:** ESLint — **0 warnings allowed** (always run `pnpm run lint` before committing)
- **CSS:** Tailwind CSS v4 — use semantic tokens, never hardcode colors

### Import Order

1. External libraries (React, Redux, axios)
2. Internal imports (features, shared, app aliases)

```javascript
// Path aliases (configured in vite.config.js)
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
| Redux Slices | `camelCaseSlice.js` | `catsSlice.js` |
| Domain Entities | `PascalCase` + `Entity` | `CatEntity` |
| Facade Return Types | `PascalCase` + `Facade` | `UseCatsFacade` |
| Booleans | `is/has/should` prefix | `isLoading`, `hasError` |

### JSDoc Requirements

All exported functions, hooks, and component props MUST be documented:

```javascript
/** @typedef {import('../adapters/catMapper').CatEntity} CatEntity */
/**
 * @param {CatEntity} props.cat - The normalized cat entity.
 */
export const CatCard = ({ cat }) => { ... };

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

## Architecture Rules (FSD)

| Rule | Enforcement |
|------|-------------|
| No `fetch()` in components | Use `catApi.js` → `catService.js` |
| No raw API data in components | Must pass through `catMapper.js` |
| No `useSelector`/`useDispatch` in components | Use facade hooks only |
| No cross-feature imports | `theme` must not import from `cats` |
| No hardcoded Tailwind colors | Use semantic tokens (`bg-muted`, not `bg-gray-200`) |
| Use `cn()` utility for className merging | Always use `@shared/utils/cn` |
| Use LazyMotion for animations | Use `@config/motionConfig.js` with `domAnimation` |
| Support reduced motion | Use `useReducedMotion()` from framer-motion |

### Shared Components

| Component | Purpose |
|-----------|---------|
| `EmptyState.jsx` | Reusable empty state message |
| `DataInitializer.jsx` | Separates data loading logic from App.jsx |
| `ErrorBoundary.jsx` | Catches React errors with retry |
| `SkeletonGrid.jsx` | Loading placeholder grid |

### Directory Structure

```
src/
├── app/              # Redux store configuration
├── config/           # Environment variables (env.js), motionConfig.js
├── features/         # Feature modules (cats, theme, font)
│   └── [feature]/
│       ├── api/           # Low-level HTTP client (axios)
│       ├── adapters/      # Mappers (API → Domain entity)
│       ├── services/      # API orchestration
│       ├── redux/         # Slices, thunks
│       ├── hooks/         # Facade hooks
│       └── components/    # Feature-specific UI
├── shared/
│   ├── ui/           # Reusable primitives (Button, Select)
│   ├── hooks/        # Shared hooks
│   ├── components/   # Shared (ErrorBoundary, EmptyState, DataInitializer, Skeletons)
│   └── utils/        # Utilities (cn.js)
└── App.jsx           # Root layout
```

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

- **ErrorBoundary**: Catches React errors with fallback UI and retry button
- **CatErrorHandler**: Displays API errors with retry functionality

---

## Git Workflow

```
main         # Production-ready
develop      # Integration branch
feature/...  # New features
fix/...      # Bug fixes
```

**Commit format (Conventional Commits):**
```
feat: add cat tagging functionality
fix: resolve double-save on heart click
refactor: extract catMapper to adapter layer
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
- Deployed: `https://slinkter.github.io/myprojectapi11`
