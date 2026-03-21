# GEMINI.md - Project Context & Instructions

This file serves as the foundational mandate for all AI agent interactions within the `myprojectapi11` repository. These instructions take absolute precedence over general workflows.

## 🎯 Project Overview

**Cat Gallery** is a high-precision React 19 single-page application (SPA) built with Vite 7. It demonstrates a senior-level frontend architecture focused on scalability, maintainability, and clean code.

- **Framework:** React 19 (Functional Components, Hooks)
- **Bundler:** Vite 7
- **Architecture:** Feature-Sliced Design (FSD)
- **State Management:** Redux Toolkit (using the **Facade Pattern**)
- **Styling:** Tailwind CSS v4 + Framer Motion (with `LazyMotion` optimization)
- **Typing:** Strict **JSDoc** (No TypeScript)
- **Data Fetching:** Axios (isolated in API/Service layers)
- **Validation:** Zod + Prop-Types

## 🚀 Building and Running

| Task | Command |
| :--- | :--- |
| **Install** | `pnpm install` |
| **Development** | `pnpm run dev` |
| **Build** | `pnpm run build` |
| **Lint** | `pnpm run lint` (Must have 0 warnings) |
| **Preview** | `pnpm run preview` |
| **Deploy** | `pnpm run deploy` (to GitHub Pages) |

**Note:** There is no testing framework configured. Do not add one without explicit instruction.

## 🏗 Architectural Mandates (Feature-Sliced Design)

The project follows a strict **Feature-Sliced Design (FSD)** structure. Cross-layer boundaries must never be violated.

### Layer Hierarchy
1.  **app/**: Global configuration (Redux store).
2.  **config/**: Env variables, global motion config.
3.  **features/**: Business logic modules (e.g., `cats`, `theme`, `font`).
    - *Internal Structure:* `api/`, `adapters/` (mappers), `services/`, `redux/`, `hooks/` (facades), `components/`.
4.  **shared/**: Reusable, logic-free primitives and utilities.
    - *Internal Structure:* `ui/`, `hooks/`, `components/`, `utils/`.

### Critical Rules
- **No Cross-Feature Imports:** A feature (e.g., `theme`) must never import from another feature (e.g., `cats`).
- **Shared Layer Purity:** Components in `shared/` must never import from `features/` or `app/`.
- **Facade Pattern:** Components must **NEVER** use `useSelector` or `useDispatch` directly. They must use facade hooks (e.g., `useCats`, `useTheme`) located in the feature's `hooks/` directory.
- **Data Normalization:** Raw API data must pass through an **adapter/mapper** (e.g., `catMapper.js`) before reaching the UI.
- **Service Isolation:** Components must never perform network requests (`fetch`, `axios`). All logic must reside in `services/` or `redux/` thunks.

## 🛠 Coding Standards

### 1. Strict JSDoc Typing
As this is a JavaScript project without TypeScript, **comprehensive JSDoc is mandatory** for all exported functions, hooks, and component props.
```javascript
/**
 * @typedef {Object} CatEntity
 * @property {string} id
 * @property {string} url
 */

/**
 * @param {Object} props
 * @param {CatEntity} props.cat
 */
export const CatCard = ({ cat }) => { ... };
```

### 2. UI & Styling
- **Tailwind CSS v4:** Use semantic tokens. Do not hardcode hex colors.
- **Class Merging:** Always use the `@shared/lib/cn` utility.
- **Animations:** Use `Framer Motion`'s `LazyMotion` with `domAnimation` to minimize bundle size.
- **Reduced Motion:** Always support accessibility via `useReducedMotion()`.

### 3. State & Errors
- **Redux Slices:** Use `createSlice` and `createAsyncThunk`.
- **Error Handling:** Use `try/catch` with `unwrap()` for thunks. Display feedback via `react-hot-toast`.
- **Error Boundaries:** Use the `ErrorBoundary` component in `shared/` to wrap critical UI segments.

### 4. Path Aliases
Always use the configured path aliases:
- `@features/*` -> `src/features/*`
- `@shared/*` -> `src/shared/*`
- `@app/*` -> `src/app/*`
- `@config/*` -> `src/config/*`

### 5. AI Agent Performance (Sub-Agents)
To maintain context efficiency and high-signal output, agents **MUST** proactively delegate complex analysis, architectural mapping, or high-volume batch tasks to specialized sub-agents (`codebase_investigator`, `generalist`). Refer to `AGENTS.md` for specific delegation guidelines.

## 📝 Git Workflow
- **Commit Messages:** Follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`).
- **Linting Policy:** The `pnpm run lint` command must pass with **0 warnings** before any change is considered complete.
