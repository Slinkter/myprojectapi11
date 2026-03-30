# AGENTS.md - Development Guide for AI Agents

**React 19 + Vite 7** cat gallery with favorites and theme customization. Uses **Feature-Sliced Design (FSD)** and **Redux Toolkit**.

**Use pnpm exclusively** — do NOT use npm or yarn.

## Build / Lint / Test Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server at http://localhost:5173 |
| `pnpm run build` | Production build to `./dist` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint with 0 warnings policy |
| `pnpm run test` | Echoes error - no tests configured |

**Note:** There are **no tests** in this project. Do not add test frameworks without consulting the user first.

## CI/CD (GitHub Actions)

- Push to `main` → lint + build → deploy to GitHub Pages (requires `CAT_API_KEY`)
- Push to `develop` → lint + build only
- PR to `main` → lint + build (branch protection)

---

## Code Style Guidelines

### General Rules

- **Language:** JavaScript (ES6+) with **strict JSDoc typing** — no TypeScript
- **Formatting:** Prettier defaults
- **Linting:** ESLint with 0 warnings policy — **always run `pnpm run lint` before committing**
- **CSS:** Tailwind CSS v4 — use semantic tokens (`bg-muted`, not `bg-gray-200`)

### Path Aliases

| Alias | Resolution |
|-------|------------|
| `@features` | `./src/features` |
| `@shared` | `./src/shared` |
| `@app` | `./src/app` |
| `@config` | `./src/config` |
| `@widgets` | `./src/widgets` |

Import order: External libs → Internal aliases (@features, @shared, @app, @config, @widgets)

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

### JSDoc & PropTypes Requirements

All exported functions, hooks, and components MUST be documented with JSDoc and define PropTypes:

```javascript
/** @typedef {import('../adapters/catMapper').CatEntity} CatEntity */

/**
 * @param {Object} props - Component properties.
 * @param {CatEntity} props.cat - The normalized cat entity.
 * @param {function(CatEntity): void} props.onAction - Action callback.
 * @param {'save'|'delete'} props.actionType - Action type.
 * @param {boolean} props.disabled - Whether action is disabled.
 * @returns {JSX.Element}
 */
const CatCard = ({ cat, onAction, actionType, disabled }) => { ... };

CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  disabled: PropTypes.bool.isRequired,
};
```

### Performance

- Use `React.memo()` for components that re-render often
- Use `useCallback()` for event handlers passed as props
- Use `useReducedMotion()` from framer-motion

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
├── widgets/               # Page-level components (navbar, main-content, toast)
└── App.jsx                # Root layout
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

---

## Environment Variables

Create `.env` in root (see `.env.example`):

```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=your_api_key_here
```

---

## Git Workflow

```
main         # Production-ready
develop      # Integration branch
feature/...  # New features
fix/...      # Bug fixes
```

**Commit format:** `feat: add feature`, `fix: resolve bug`, `refactor: extract mapper`
