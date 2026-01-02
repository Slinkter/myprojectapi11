# Contributing & Development Standards

## 1. Code Style
*   **Language:** JavaScript (ES6+).
*   **Formatting:** Prettier (default settings).
*   **Linting:** ESLint with `eslint-plugin-react-hooks`. No warnings allowed in production build.

## 2. Naming Conventions (**Strict**)

### Files & Directories
*   **Components:** `PascalCase.jsx` (e.g., `CatCard.jsx`).
*   **Hooks:** `camelCase.js` (prefix `use`, e.g., `useCats.js`).
*   **Utilities/Services:** `camelCase.js` (e.g., `catApi.js`).
*   **Directories:** `kebab-case` preferred (e.g., `saved-cats`) or `camelCase` (consistent with current project).

### Code
*   **Variables:** `camelCase` (e.g., `isLoading`).
*   **Booleans:** Prefix with `is`, `has`, `should` (e.g., `isVisible`).
*   **Constants:** `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`).
*   **Components:** `PascalCase`.

## 3. JSDoc Standard (Mandatory)
All exported members must be documented in **English**.

### Components
```jsx
/**
 * Short description of the component.
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Title to display.
 */
const Component = ({ title }) => { ... }
```

### Hooks
```javascript
/**
 * Description of what the hook does.
 *
 * @returns {object} The exposed API.
 */
const useHook = () => { ... }
```

## 4. Git Workflow
1.  **Main Branch:** `main` (Production ready).
2.  **Develop Branch:** `develop` (Integration).
3.  **Feature Branches:** `feature/feature-name`.
4.  **Commits:** Conventional Commits.
    *   `feat: add new font selector`
    *   `fix: resolve memory leak in gallery`
    *   `docs: update readme`
    *   `refactor: optimize rendering loop`
