# 00 — Guía de Configuración: Construyendo Cat Gallery desde Cero

> Esta guía es para estudiantes y desarrolladores que quieren entender **cómo se construyó este proyecto desde cero**. Sigue cada paso en orden.

---

## Requisitos Previos

Antes de comenzar, instala estas herramientas en tu máquina:

| Herramienta | Versión Mínima | Descarga              |
| ------- | --------------- | --------------------- |
| Node.js | v18+            | https://nodejs.org    |
| pnpm    | v8+             | `npm install -g pnpm` |
| Git     | Cualquiera      | https://git-scm.com   |

> **¿Por qué pnpm?** Es más rápido que npm y más eficiente con el disco porque usa un almacén de paquetes compartido. Este proyecto fue construido con pnpm.

---

## Paso 1 — Crear el Proyecto Vite

```bash
# Crear un nuevo proyecto Vite usando la plantilla de React
pnpm create vite@latest cat-gallery -- --template react

cd cat-gallery

# Instalar dependencias base
pnpm install
```

Esto crea una estructura mínima de SPA con React 19. Verifica ejecutando:

```bash
pnpm run dev
# → Abre http://localhost:5173
```

---

## Paso 2 — Instalar Todas las Dependencias

Cada librería tiene un rol específico. Instálalas grupo por grupo.

### Dependencias de Ejecución (Runtime)

```bash
pnpm add @reduxjs/toolkit react-redux axios framer-motion react-hot-toast react-icons prop-types clsx tailwind-merge
```

| Librería            | Versión  | Por Qué la Usamos                                                            |
| ------------------ | -------- | ------------------------------------------------------------------------ |
| `react`            | ^19.2.3  | Framework principal de renderizado de UI                                              |
| `react-dom`        | ^19.2.3  | Renderizador React DOM para el navegador                                           |
| `@reduxjs/toolkit` | ^2.11.2  | Redux simplificado — maneja thunks asíncronos, slices y estado inmutable     |
| `react-redux`      | ^9.2.0   | Conecta el árbol de componentes React al store de Redux                     |
| `axios`            | ^1.13.2  | Cliente HTTP para llamadas a la API (más ergonómico que `fetch`)                  |
| `framer-motion`    | ^12.34.3 | Animaciones aceleradas por hardware — transiciones de entrada, salida y layout |
| `react-hot-toast`  | ^2.6.0   | Notificaciones toast no intrusivas para feedback del usuario                      |
| `react-icons`      | ^5.5.0   | Librería de iconos (usamos `BsHeart`, `BsTrash` de Bootstrap Icons)          |
| `prop-types`       | ^15.8.1  | Validación de props en ejecución (documenta los contratos de componentes)                  |
| `clsx`             | ^2.1.1   | Utilidad para construir cadenas de className condicionalmente                 |
| `tailwind-merge`   | ^3.5.0   | Utilidad para fusionar clases de Tailwind CSS de forma segura sin conflictos     |

### Dependencias de Desarrollo (Dev)

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss autoprefixer @vitejs/plugin-react @types/react @types/react-dom eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh gh-pages
```

| Librería                | Por Qué la Usamos                                    |
| ---------------------- | ------------------------------------------------ |
| `tailwindcss` v4.1.18  | CSS orientado a utilidades — no se necesitan archivos CSS personalizados   |
| `@tailwindcss/postcss` | Integra Tailwind v4 en el pipeline de PostCSS |
| `vite` v7.3.0          | Servidor de desarrollo ultrarrápido y empaquetador de producción |
| `@vitejs/plugin-react` | Habilita JSX y Fast Refresh en Vite             |
| `gh-pages`             | Despliega la carpeta `dist/` en GitHub Pages       |
| `eslint` + plugins     | Calidad de código — detecta errores antes de la ejecución       |

---

## Paso 3 — Obtener una Clave de TheCatAPI

Este proyecto usa [TheCatAPI](https://thecatapi.com) como fuente de datos externa.

1. Ve a **https://thecatapi.com** y crea una **cuenta gratuita**.
2. Ve a tu panel de control → **API Keys** → copia tu clave API.
3. En la raíz del proyecto, crea el archivo `.env`:

```bash
# .env (raíz del proyecto — ¡nunca subas este archivo al repositorio!)
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=tu_clave_api_real_aqui
```

> **¿Por qué el prefijo `VITE_`?** Vite solo expone variables al navegador si tienen el prefijo `VITE_`. Sin él, `import.meta.env.MY_VAR` devuelve `undefined`.

Asegúrate también de que `.env` esté en `.gitignore`:

```gitignore
.env
.env.local
```

---

## Paso 4 — Configurar Alias de Rutas en Vite

En lugar de escribir `import { useCats } from '../../../../features/cats/...'`, configuramos alias cortos.

Edita `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  // Para despliegue en GitHub Pages — cámbialo por el nombre de tu repositorio
  base: "https://TU-USUARIO.github.io/NOMBRE-TU-REPO",
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

| Alias       | Resuelve a     |
| ----------- | --------------- |
| `@features` | `src/features/` |
| `@shared`   | `src/shared/`   |
| `@app`      | `src/app/`      |
| `@config`   | `src/config/`   |

---

## Paso 5 — Configurar Tailwind CSS v4

Tailwind v4 utiliza una configuración diferente a la v3. No existe un `tailwind.config.js` en el sentido tradicional.

Añade a `src/index.css`:

```css
@import "tailwindcss";
```

Añade a `postcss.config.js` (o `postcss.config.cjs`):

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## Paso 6 — Crear el Store de Redux

Crea `src/app/store.js`:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "@features/cats/redux/catsSlice";
import themeReducer from "@features/theme/redux/themeSlice";
import fontReducer from "@features/font/redux/fontSlice";

const store = configureStore({
  reducer: {
    cats: catsReducer, // Gestiona listas de gatos aleatorios y favoritos
    theme: themeReducer, // Gestiona modo "dark" | "light"
    font: fontReducer, // Gestiona la familia de fuentes seleccionada
  },
});

export default store;
```

Envuelve tu aplicación en `src/main.jsx`:

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

## Paso 7 — Construir la Estructura de Features

Sigue el patrón **Feature-Sliced Design**. Cada dominio (cats, theme, font) es totalmente autónomo:

```text
src/features/cats/
├── adapters/       ← catMapper.js  (normaliza datos API → CatEntity)
├── api/            ← catApi.js     (llamadas HTTP Axios)
├── components/     ← CatCard.jsx, CatList.jsx, etc.
├── hooks/          ← useCats.js    (Fachada: oculta Redux de la UI)
├── redux/          ← catsSlice.js  (Thunks + Reducers)
├── services/       ← catService.js (Orquestación API → Mapper)
└── index.js        ← API Pública (solo exporta lo que otros necesitan)
```

> **Regla:** Un componente en `features/theme/` **nunca** debe importar desde `features/cats/`. Las características están aisladas. Solo se comunican a través del store de Redux.

---

## Paso 8 — Desplegar en GitHub Pages

```bash
# Construir y desplegar en GitHub Pages
pnpm run deploy
```

Esto ejecuta `npm run build` → luego `gh-pages -d dist`, publicando la carpeta `dist/` en la rama `gh-pages`.

**Antes de desplegar:**

1. Actualiza `base` en `vite.config.js` para que coincida con tu URL exacta de GitHub Pages.
2. Sube todos los cambios a `main` primero.

---

## Comandos de Referencia Rápida

```bash
pnpm run dev      # Iniciar servidor de desarrollo → http://localhost:5173
pnpm run build    # Crear paquete de producción → ./dist/
pnpm run preview  # Previsualizar paquete de producción localmente
pnpm run lint     # Ejecutar ESLint (regla de 0 advertencias)
pnpm run deploy   # Construir + subir a GitHub Pages
```
