# 00 — Setup Guide: Building Cat Gallery from Scratch

> This guide is for students and developers who want to understand **how this project was built from zero**. Follow every step in order.

---

## Prerequisites

Before starting, install these tools on your machine:

| Tool    | Minimum Version | Download              |
| ------- | --------------- | --------------------- |
| Node.js | v18+            | https://nodejs.org    |
| pnpm    | v8+             | `npm install -g pnpm` |
| Git     | Any             | https://git-scm.com   |

> **Why pnpm?** It is faster than npm and more disk-efficient because it uses a shared package store. This project was built with pnpm.

---

## Step 1 — Create the Vite Project

```bash
# Create a new Vite project using the React template
pnpm create vite@latest cat-gallery -- --template react

cd cat-gallery

# Install base dependencies
pnpm install
```

This creates a minimal React 19 SPA structure. Verify by running:

```bash
pnpm run dev
# → Open http://localhost:5173
```

---

## Step 2 — Install All Dependencies

Every library has a specific role. Install them one group at a time.

### Runtime Dependencies

```bash
pnpm add @reduxjs/toolkit react-redux axios framer-motion react-hot-toast react-icons prop-types clsx tailwind-merge
```

| Library            | Version  | Why We Use It                                                            |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| `react`            | ^19.2.3  | Core UI rendering framework                                              |
| `react-dom`        | ^19.2.3  | React DOM renderer for browser                                           |
| `@reduxjs/toolkit` | ^2.11.2  | Simplified Redux — handles async thunks, slices, and immutable state     |
| `react-redux`      | ^9.2.0   | Connects the React component tree to the Redux store                     |
| `axios`            | ^1.13.2  | HTTP client for API calls (more ergonomic than `fetch`)                  |
| `framer-motion`    | ^12.34.3 | Hardware-accelerated animations — entrance, exit, and layout transitions |
| `react-hot-toast`  | ^2.6.0   | Non-intrusive toast notifications for user feedback                      |
| `react-icons`      | ^5.5.0   | Icon library (we use `BsHeart`, `BsTrash` from Bootstrap Icons)          |
| `prop-types`       | ^15.8.1  | Runtime prop validation (documents component contracts)                  |
| `clsx`             | ^2.1.1   | Utility for constructing className strings conditionally                 |
| `tailwind-merge`   | ^3.5.0   | Utility to safely merge Tailwind CSS classes without style conflicts     |

### Dev Dependencies

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss autoprefixer @vitejs/plugin-react @types/react @types/react-dom eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh gh-pages
```

| Library                | Why We Use It                                    |
| ---------------------- | ------------------------------------------------ |
| `tailwindcss` v4.1.18  | Utility-first CSS — no custom CSS files needed   |
| `@tailwindcss/postcss` | Integrates Tailwind v4 into the PostCSS pipeline |
| `vite` v7.3.0          | Lightning-fast dev server and production bundler |
| `@vitejs/plugin-react` | Enables JSX and Fast Refresh in Vite             |
| `gh-pages`             | Deploys the `dist/` folder to GitHub Pages       |
| `eslint` + plugins     | Code quality — catches bugs before runtime       |

---

## Step 3 — Get a TheCatAPI Key

This project uses [TheCatAPI](https://thecatapi.com) as the external data source.

1. Go to **https://thecatapi.com** and create a **free account**.
2. Go to your dashboard → **API Keys** → copy your API key.
3. In the project root, create the `.env` file:

```bash
# .env (project root — never commit this file!)
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=your_actual_api_key_here
```

> **Why `VITE_` prefix?** Vite only exposes variables to the browser if they have the `VITE_` prefix. Without it, `import.meta.env.MY_VAR` returns `undefined`.

Also make sure `.env` is in `.gitignore`:

```gitignore
.env
.env.local
```

---

## Step 4 — Configure Vite Path Aliases

Instead of writing `import { useCats } from '../../../../features/cats/...'`, we configure short aliases.

Edit `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  // For GitHub Pages deployment — change to your repo name
  base: "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME",
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
});
```

| Alias       | Resolves To     |
| ----------- | --------------- |
| `@features` | `src/features/` |
| `@shared`   | `src/shared/`   |
| `@app`      | `src/app/`      |
| `@config`   | `src/config/`   |

---

## Step 5 — Set Up Tailwind CSS v4

Tailwind v4 uses a different setup than v3. There is no `tailwind.config.js` in the traditional sense.

Add to `src/index.css`:

```css
@import "tailwindcss";
```

Add to `postcss.config.js` (or `postcss.config.cjs`):

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## Step 6 — Create the Redux Store

Create `src/app/store.js`:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "@features/cats/redux/catsSlice";
import themeReducer from "@features/theme/redux/themeSlice";
import fontReducer from "@features/font/redux/fontSlice";

const store = configureStore({
  reducer: {
    cats: catsReducer, // Manages random + favourite cat lists
    theme: themeReducer, // Manages "dark" | "light" mode
    font: fontReducer, // Manages selected font family
  },
});

export default store;
```

Wrap your app in `src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

---

## Step 7 — Build the Feature Structure

Follow the **Feature-Sliced Design** pattern. Each domain (cats, theme, font) is fully self-contained:

```text
src/features/cats/
├── adapters/       ← catMapper.js  (normalizes API data → CatEntity)
├── api/            ← catApi.js     (Axios HTTP calls)
├── components/     ← CatCard.jsx, CatList.jsx, etc.
├── hooks/          ← useCats.js    (Facade: hides Redux from UI)
├── redux/          ← catsSlice.js  (Thunks + Reducers)
├── services/       ← catService.js (Orchestrates API → Mapper)
└── index.js        ← Public API (only export what others need)
```

> **Rule:** A component in `features/theme/` should **never** import from `features/cats/`. Features are isolated. They communicate only through the Redux store.

---

## Step 8 — Deploy to GitHub Pages

```bash
# Build and deploy to GitHub Pages
pnpm run deploy
```

This runs `npm run build` → then `gh-pages -d dist`, publishing the `dist/` folder to the `gh-pages` branch.

**Before deploying:**

1. Update `base` in `vite.config.js` to match your exact GitHub Pages URL.
2. Push all commits to `main` first.

---

## Quick Reference Commands

```bash
pnpm run dev      # Start development server  → http://localhost:5173
pnpm run build    # Create production bundle  → ./dist/
pnpm run preview  # Preview production build locally
pnpm run lint     # Run ESLint (0 warnings rule)
pnpm run deploy   # Build + push to GitHub Pages
```
