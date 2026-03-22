# AGENTS.md - Development Guide for AI Agents

**React 19 + Vite 7** cat gallery with favorites and theme customization. Uses **Feature-Sliced Design (FSD)** and **Redux Toolkit**.

## Package Manager

**Use pnpm exclusively** — do NOT use npm or yarn.

## Build / Lint / Test Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server at http://localhost:5173 |
| `pnpm run build` | Production build to `./dist` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint (**0 warnings policy**) |

**Note:** There are **no tests** in this project. Do not add test frameworks without consulting the user first.

## CI/CD (GitHub Actions)

- Push to `main` → lint + build → deploy to GitHub Pages (requires `CAT_API_KEY` secret)
- Push to `develop` → lint + build only
- PR to `main` → lint + build (branch protection)

---

## Code Style Guidelines

### General Rules

- **Language:** JavaScript (ES6+) with **strict JSDoc typing** — no TypeScript
- **Formatting:** Prettier defaults
- **Linting:** ESLint with 0 warnings policy — **always run `pnpm run lint` before committing**
- **CSS:** Tailwind CSS v4 — use semantic tokens, never hardcode colors (`bg-muted`, not `bg-gray-200`)
- Use `cn()` utility for className merging: `import { cn } from '@shared/utils/cn'`

### Import Order (path aliases in vite.config.js)

```javascript
// 1. External libraries
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// 2. Internal imports (aliases)
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
| No hardcoded Tailwind colors | Use semantic tokens |
| Use `LazyMotion` for animations | Use `@config/motionConfig.js` with `domAnimation` |
| Support reduced motion | Use `useReducedMotion()` from framer-motion |

### Directory Structure

```
src/
├── app/store.js           # Redux store
├── config/                # env.js, motionConfig.js
├── features/[feature]/    # api, adapters, services, redux, hooks, components
├── shared/                # ui, hooks, components, utils (cn.js)
└── App.jsx                # Root layout
```

### Key Shared Components

`EmptyState.jsx` | `DataInitializer.jsx` | `ErrorBoundary.jsx` | `SkeletonGrid.jsx`

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
