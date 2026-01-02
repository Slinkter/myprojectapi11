# Cat Gallery - Clean Architecture

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white)](https://redux.js.org/)

A modern, scalable Single Page Application (SPA) demonstrating **Senior Frontend Architecture** principles.

## 📄 Description and Purpose

The **Cat Gallery** is a demonstration of a scalable frontend architecture using React, Redux Toolkit, and Tailwind CSS. It is designed to withstand complexity growth by decoupling business logic from UI components and organizing code by features (Feature-Sliced approach).

**Key Goals:**
*   **Separation of Concerns:** UI components focuses only on rendering; logic is delegated to Custom Hooks.
*   **Maintainability:** Feature-based folder structure ensures that code related to a specific domain (e.g., Cats, Fonts, Theme) stays together.
*   **Performance:** Implements `React.memo` for rendering optimization and `React.lazy`/`Suspense` for code splitting.

## 🚀 Installation and Setup

### Prerequisites
*   Node.js v18+
*   pnpm v8+ (Recommended) or npm

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/myprojectapi11.git
    cd myprojectapi11
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    pnpm run dev
    ```

4.  **Build for production**
    ```bash
    pnpm run build
    ```

## 🏗 Applied Architecture

This project adopts a **Feature-Based Architecture**, deviating from the traditional "layer-based" (components/actions/reducers) structure.

### 1. Folder Structure
```
src/
├── app/             # Global app setup (store configuration)
├── config/          # Environment variables and global config
├── features/        # Business domains (The Core)
│   ├── cats/        # Cats feature (components, hooks, redux, api)
│   ├── font/        # User font settings
│   └── theme/       # Dark/Light mode logic
├── shared/          # Generic, reusable code
│   ├── components/  # Loaders, generic layouts
│   └── hooks/       # useAppearance, etc.
└── App.jsx          # Main Layout Orchestrator
```

### 2. Key Design Patterns

*   **Facade Pattern (Custom Hooks):**
    Components do not access Redux `useSelector` or `useDispatch` directly. Instead, they use a custom hook (e.g., `useCats`) which exposes a simplified API (`{ randomCats, loadRandomCats, ... }`).
    *   *Benefit:* Extracts complexity from UI, makes testing easier, and allows swapping state management libraries without breaking the UI.

*   **Container/Presentation Separation:**
    *   `RandomCatList` (Container): Connects to data sources.
    *   `CatCard` (Presentation): Pure component, receives data via props.

*   **Repository/Service Pattern:**
    API calls are abstracted in `catApi.js`, isolating the HTTP client (Axios) from the rest of the application.

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
*Maintained by Senior Fullstack Web Architect Agent*