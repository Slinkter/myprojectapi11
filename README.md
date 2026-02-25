# Cat Gallery — Clean Architecture ✨

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://slinkter.github.io/myprojectapi11)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-19.2.3-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-7.3.0-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.1.18-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/redux--toolkit-2.11.2-%23593d88.svg?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/framer--motion-12.34.3-black?style=flat&logo=framer)](https://www.framer.com/motion/)

A modern, scalable Single Page Application (SPA) that demonstrates **Senior Frontend Architecture** using Feature-Sliced Design, strict JSDoc typing, and Pixel-Perfect UI/UX.

---

## 🎯 What Is This Project?

Cat Gallery lets users **browse random cat images**, **save favorites**, and customize the **color theme and typography**. It is built primarily as a **learning reference** for frontend architecture patterns used in real-world enterprise projects.

---

## 🛠 Technology Stack

### Runtime Dependencies

| Library            | Version  | Role                                                         |
| ------------------ | -------- | ------------------------------------------------------------ |
| `react`            | ^19.2.3  | Core UI rendering framework                                  |
| `react-dom`        | ^19.2.3  | React DOM renderer for the browser                           |
| `@reduxjs/toolkit` | ^2.11.2  | Global state management — async thunks, slices               |
| `react-redux`      | ^9.2.0   | Connects React component tree to the Redux store             |
| `axios`            | ^1.13.2  | HTTP client for TheCatAPI calls                              |
| `framer-motion`    | ^12.34.3 | Hardware-accelerated animations (entrance, exit, layout)     |
| `react-hot-toast`  | ^2.6.0   | Toast notifications for user feedback                        |
| `react-icons`      | ^5.5.0   | Icon components (Bootstrap Icons subset)                     |
| `prop-types`       | ^15.8.1  | Runtime prop validation and component contract documentation |

### Dev Dependencies

| Library                | Version | Role                                    |
| ---------------------- | ------- | --------------------------------------- |
| `vite`                 | ^7.3.0  | Dev server and production bundler       |
| `@vitejs/plugin-react` | ^5.1.2  | JSX support and HMR for Vite            |
| `tailwindcss`          | ^4.1.18 | Utility-first CSS framework             |
| `@tailwindcss/postcss` | ^4.1.18 | PostCSS integration for Tailwind v4     |
| `eslint` + plugins     | ^8.57.1 | Static code analysis (0-warning policy) |
| `gh-pages`             | ^6.3.0  | One-command deployment to GitHub Pages  |

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- pnpm v8+

### 1. Clone and install

```bash
git clone https://github.com/slinkter/myprojectapi11.git
cd myprojectapi11
pnpm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=your_api_key_here
```

Get a free API key at [thecatapi.com](https://thecatapi.com).

### 3. Run development server

```bash
pnpm run dev      # → http://localhost:5173
```

### Available scripts

```bash
pnpm run dev      # Development server
pnpm run build    # Production build → ./dist
pnpm run preview  # Preview production build
pnpm run lint     # ESLint (0 warnings allowed)
pnpm run deploy   # Build + deploy to GitHub Pages
```

---

## 🏗 Architecture Overview

This project uses **Feature-Sliced Design (FSD)**.

```text
src/
├── app/             # Redux store configuration
├── config/          # Environment variables (env.js)
├── docs/            # All technical documentation
├── features/
│   ├── cats/        # Core domain
│   │   ├── adapters/    # catMapper.js — normalizes API → CatEntity
│   │   ├── api/         # catApi.js — low-level Axios HTTP client
│   │   ├── components/  # CatCard, CatList, RandomCatList, FavouriteCatList
│   │   ├── hooks/       # useCats.js — facade hiding Redux from UI
│   │   ├── redux/       # catsSlice.js — state + async thunks
│   │   └── services/    # catService.js — orchestrates API → Mapper
│   ├── font/        # Font family selection feature
│   └── theme/       # Dark/Light mode toggle feature
├── shared/
│   ├── components/  # SkeletonCard, SkeletonGrid, CatListSkeleton
│   ├── hooks/       # useAppearance, usePageTitle
│   └── ui/          # IconButton, Select (reusable primitives)
└── App.jsx          # Root layout component
```

### Key Patterns Used

| Pattern                      | Where                            | Benefit                                        |
| ---------------------------- | -------------------------------- | ---------------------------------------------- |
| **Facade (Custom Hook)**     | `useCats`, `useTheme`, `useFont` | UI never touches Redux directly                |
| **Adapter / Mapper**         | `catMapper.js`                   | API response shape never leaks into components |
| **Container / Presentation** | `RandomCatList` vs `CatList`     | Separation of data and rendering               |
| **Strict JSDoc Typing**      | All hooks, mappers, props        | Enterprise-level type safety in plain JS       |

### Vite Path Aliases

| Alias       | Real Path       |
| ----------- | --------------- |
| `@features` | `src/features/` |
| `@shared`   | `src/shared/`   |
| `@app`      | `src/app/`      |
| `@config`   | `src/config/`   |

---

## 📚 Documentation

Detailed technical documentation lives inside the project:

| Document                                                               | Contents                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------- |
| [`src/docs/00-SETUP-GUIDE.md`](./src/docs/00-SETUP-GUIDE.md)           | **Start here** — project from zero, all install steps |
| [`src/docs/DOCUMENTATION.md`](./src/docs/DOCUMENTATION.md)             | Full documentation index                              |
| [`src/docs/04-ARCHITECTURE.md`](./src/docs/04-ARCHITECTURE.md)         | FSD patterns, data flow, Redux shape                  |
| [`src/docs/05-UI-DESIGN-SYSTEM.md`](./src/docs/05-UI-DESIGN-SYSTEM.md) | Tailwind tokens, animations, skeleton rules           |
| [`src/docs/06-CONTRIBUTING.md`](./src/docs/06-CONTRIBUTING.md)         | Naming conventions, JSDoc standard, Git workflow      |

---

## 🌐 Deployment

Deployed to **GitHub Pages** at: https://slinkter.github.io/myprojectapi11

```bash
pnpm run deploy
```

---

_Built with ❤️ as a reference project for Frontend Architecture_
