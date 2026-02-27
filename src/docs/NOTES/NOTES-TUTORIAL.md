# Guía Paso a Paso - Cat Gallery

> **Nota:** Este documento te guía desde cero para entender y modificar el proyecto.

---

## 1. Setup del Proyecto

### 1.1 Requisitos Previos

| Requisito | Versión mínima |
|-----------|----------------|
| Node.js | v18+ |
| pnpm | v8+ |

### 1.2 Instalación

```bash
# Clonar repositorio
git clone https://github.com/Slinkter/myprojectapi11.git
cd myprojectapi11

# Instalar dependencias
pnpm install
```

### 1.3 Configurar Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=tu_api_key_aqui
```

Obtener API key gratuita en [thecatapi.com](https://thecatapi.com).

### 1.4 Ejecutar Desarrollo

```bash
pnpm run dev
# → http://localhost:5173
```

---

## 2. Recorrido del Código

### 2.1 Entry Point: main.jsx

```javascript
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2.2 App.jsx - Componente Raíz

```javascript
// src/App.jsx
import { Suspense, LazyMotion } from "framer-motion";
import { motionFeatures } from "@config/motionConfig";

const App = () => {
  usePageTitle("Cat Gallery");
  useAppearance();

  return (
    <LazyMotion features={motionFeatures}>
      <div className="min-h-dvh">
        <DataInitializer />
        <header>...</header>
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Skeleton />}>
              <RandomCatList />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </LazyMotion>
  );
};
```

### 2.3 Flujo de Carga de Datos

```
App.jsx
  └── DataInitializer (ejecuta usePreloadCats)
          └── usePreloadCats
                  ├── dispatch(fetchRandomCats())
                  └── dispatch(fetchFavouriteCats())
```

### 2.4 Listas de Gatos

**RandomCatList (Container):**
```javascript
const RandomCatList = () => {
  const { randomCats, favouriteCats, loading, saveFavouriteCat } = useCats();

  const isCatInFavourites = useCallback(
    (cat) => favouriteContext.has(cat.id),
    [favouriteContext]
  );

  return (
    <CatList
      title="Random Kittens"
      cats={randomCats}
      onAction={saveFavouriteCat}
      actionType="save"
      isActionDisabled={isCatInFavourites}
      loading={loading.random}
    />
  );
};
```

**CatList (Presentational):**
```javascript
const CatList = ({ title, cats, onAction, actionType, isActionDisabled, loading }) => {
  if (loading && cats.length === 0) {
    return <SkeletonGrid />;
  }

  return (
    <section>
      <h3>{title}</h3>
      <m.div className="grid...">
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onAction={onAction}
            actionType={actionType}
            disabled={isActionDisabled(cat)}
          />
        ))}
      </m.div>
    </section>
  );
};
```

### 2.5 Tarjeta Individual

```javascript
const CatCard = ({ cat, onAction, actionType, disabled }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative...group">
      <img src={cat.url} alt={cat.id} loading="lazy" />
      <div className="absolute bottom-3 right-3">
        <CatCardFooter actionType={actionType} onAction={handleAction} disabled={disabled} />
      </div>
    </div>
  );
};
```

---

## 3. Cómo Agregar una Feature

### Paso 1: Crear Carpeta

```
features/nueva-feature/
├── api/
├── adapters/
├── services/
├── redux/
├── hooks/
└── components/
```

### Paso 2: Definir Slice de Redux

```javascript
// features/nueva-feature/redux/featureSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("feature/fetch", async () => {
  const response = await fetch("/api/data");
  return response.json();
});

const featureSlice = createSlice({
  name: "feature",
  initialState: { data: null, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => { state.loading = true; })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default featureSlice.reducer;
```

### Paso 3: Crear Hook Fachada

```javascript
// features/nueva-feature/hooks/useFeature.js
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/featureSlice";

export const useFeature = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.feature);

  const loadData = () => dispatch(fetchData());

  return { data, loading, loadData };
};
```

### Paso 4: Crear Componentes

```javascript
// FeatureComponent.jsx
import { useFeature } from "../hooks/useFeature";

const FeatureComponent = () => {
  const { data, loading, loadData } = useFeature();

  if (loading) return <Skeleton />;

  return <div>{data}</div>;
};
```

### Paso 5: Integrar en App.jsx

```javascript
import FeatureComponent from "./features/nueva-feature/components/FeatureComponent";

const App = () => (
  <main>
    <FeatureComponent />
  </main>
);
```

---

## 4. Comandos del Proyecto

### Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Iniciar servidor de desarrollo (http://localhost:5173) |
| `pnpm run build` | Construir para producción (genera `./dist`) |
| `pnpm run preview` | Previsualizar build local |
| `pnpm run lint` | Verificar código (0 warnings obligatorios) |

### Comandos Adicionales

| Comando | Descripción |
|---------|-------------|
| `pnpm install` | Instalar dependencias |
| `pnpm run deploy` | Deploy manual a GitHub Pages |

---

## 5. CI/CD con GitHub Actions

### Workflow: ci-cd.yml

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "pnpm"

      # Crear .env con secrets
      - run: |
          echo "VITE_BASE_URL=..." > .env
          echo "VITE_API_KEY=${{ secrets.CAT_API_KEY }}" >> .env

      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run build

  deploy:
    needs: lint-and-build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install && pnpm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Configurar Secrets

1. Ir a: `Settings → Secrets and variables → Actions`
2. Crear secret: `CAT_API_KEY`
3. Pegar tu API key de TheCatAPI

### Resultado

| Evento | Acción |
|--------|--------|
| Push a `main` | Lint → Build → Deploy a GitHub Pages |
| Push a `develop` | Lint → Build (sin deploy) |
| Pull Request | Lint → Build |

---

## 6. Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `AGENTS.md` | Guía para agentes IA |
| `README.md` | Documentación principal |
| `src/docs/04-ARCHITECTURE.md` | Arquitectura técnica |
| `src/docs/05-UI-DESIGN-SYSTEM.md` | Sistema de diseño |

---

## 7. URLs Útiles

| Recurso | URL |
|---------|-----|
| Demo | https://slinkter.github.io/myprojectapi11 |
| Repo | https://github.com/Slinkter/myprojectapi11 |
| API | https://thecatapi.com |

---

*Documento generado como guía tutorial*
