# Contributing & Development Standards

## 1. Tech Stack (Read Before Coding)

| Tool            | Version | Note                       |
| --------------- | ------- | -------------------------- |
| Node.js         | 18+     | Required                   |
| Package manager | pnpm    | **Not npm or yarn**        |
| React           | 19.2.3  | Uses automatic JSX runtime |
| Vite            | 7.3.0   | Dev server and bundler     |
| Tailwind        | v4.1.18 | Different config than v3   |

---

## 2. Code Style

- **Language:** JavaScript (ES6+). No TypeScript — but 100% JSDoc typing required.
- **Formatting:** Prettier (default settings).
- **Linting:** ESLint — **0 warnings allowed** in CI and production builds.

Run lint before pushing:

```bash
pnpm run lint
```

---

## 3. Naming Conventions (Strict)

### Files & Directories

| Type             | Convention                          | Example          |
| ---------------- | ----------------------------------- | ---------------- |
| Components       | `PascalCase.jsx`                    | `CatCard.jsx`    |
| Hooks            | `use` prefix, `camelCase.js`        | `useCats.js`     |
| Services         | `camelCase.js`                      | `catService.js`  |
| Mappers/Adapters | `camelCase.js` with `Mapper` suffix | `catMapper.js`   |
| Redux slices     | `camelCase.js` with `Slice` suffix  | `catsSlice.js`   |
| Directories      | `camelCase`                         | `subcomponents/` |

### Variables & Types

| Type                | Convention                     | Example                 |
| ------------------- | ------------------------------ | ----------------------- |
| Variables           | `camelCase`                    | `randomCats`            |
| Booleans            | `is`, `has`, `should` prefix   | `isLoading`, `hasError` |
| Domain entities     | `PascalCase` + `Entity` suffix | `CatEntity`             |
| Facade return types | `PascalCase` + `Facade` suffix | `UseCatsFacade`         |

---

## 4. JSDoc Standard (Mandatory)

All exported functions, hooks, types, and component props **must** be documented.

### Rule 1 — Never use generic `@param {object}` for domain data

❌ Wrong:

```jsx
/**  @param {object} props.cat */
```

✅ Correct:

```jsx
/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */
/**  @param {CatEntity} props.cat - The normalized cat domain entity. */
```

### Rule 2 — Type all Facade return values

```javascript
/**
 * @typedef {Object} UseCatsFacade
 * @property {CatEntity[]} randomCats
 * @property {CatEntity[]} favouriteCats
 * @property {Object} loading
 * @property {boolean} loading.random
 * @property {boolean} loading.saving
 * @property {string|null} error
 * @property {function(): void} loadRandomCats
 * @property {function(CatEntity): Promise<void>} saveFavouriteCat
 * @property {function(CatEntity): Promise<void>} deleteFavouriteCat
 */

/**
 * Facade hook for cat operations.
 * @returns {UseCatsFacade}
 */
export const useCats = () => { ... };
```

### Rule 3 — Type React event handlers explicitly

```jsx
/** @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onClick */
/** @param {import('react').ChangeEventHandler<HTMLSelectElement>} props.onChange */
```

---

## 5. Architecture Rules

| Rule                                         | Why                                                 |
| -------------------------------------------- | --------------------------------------------------- |
| No `fetch()` in components                   | Use `catApi.js` → `catService.js`                   |
| No raw API data in components                | Must pass through `catMapper.js` first              |
| No `useSelector`/`useDispatch` in components | Use facade hooks                                    |
| No cross-feature imports                     | `theme` must not import from `cats`                 |
| No hardcoded colors in Tailwind              | Use semantic tokens (`bg-muted`, not `bg-gray-200`) |

---

## 6. Git Workflow

```bash
# Branches
main        ← Production-ready, never push directly
develop     ← Integration branch
feature/... ← New features
fix/...     ← Bug fixes
refactor/...← Refactoring, no new features
docs/...    ← Documentation-only changes
```

### Commit Message Format (Conventional Commits)

```
feat: add cat tagging feature
fix: resolve double-save bug on heart click
refactor: extract catMapper to adapters layer
docs: update 04-ARCHITECTURE with data flow diagram
style: align button padding to design system
```

---

## 7. Deployment

```bash
# Deploys to GitHub Pages
pnpm run deploy
```

- Runs `vite build` → output in `./dist/`
- Then uses `gh-pages -d dist` to push to `gh-pages` branch.
- Live at: https://slinkter.github.io/myprojectapi11

**Before deploying:** Confirm `base` in `vite.config.js` matches your GitHub Pages URL.
