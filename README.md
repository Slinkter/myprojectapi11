# Galería de Gatos — Arquitectura Limpia ✨

[![Demostración en Vivo](https://img.shields.io/badge/demo-live-brightgreen)](https://slinkter.github.io/myprojectapi11)
[![CI/CD](https://github.com/Slinkter/myprojectapi11/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Slinkter/myprojectapi11/actions/workflows/ci-cd.yml)
[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-19.2.3-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-7.3.0-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.1.18-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/redux--toolkit-2.11.2-%23593d88.svg?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Framer Motion](https://img.shields.io/badge/framer--motion-12.34.3-black?style=flat&logo=framer)](https://www.framer.com/motion/)

Una aplicación de página única (SPA) moderna y escalable que demuestra una **Arquitectura Frontend Senior** utilizando Feature-Sliced Design (FSD), tipado estricto con JSDoc y una interfaz de usuario (UI/UX) de alta precisión.

---

## 🎯 ¿Qué es este proyecto?

Cat Gallery permite a los usuarios **explorar imágenes aleatorias de gatos**, **guardar favoritos** y personalizar el **tema de color y la tipografía**. Está construido principalmente como una **referencia de aprendizaje** para patrones de arquitectura frontend utilizados en proyectos empresariales del mundo real.

---

## 🛠 Stack Tecnológico

### Dependencias de Ejecución

| Librería           | Versión  | Rol                                                           |
| ------------------ | -------- | ------------------------------------------------------------- |
| `react`            | ^19.2.3  | Framework principal de renderizado de UI                      |
| `react-dom`        | ^19.2.3  | Renderizador React DOM para el navegador                      |
| `@reduxjs/toolkit` | ^2.11.2  | Gestión de estado global — thunks asíncronos, slices          |
| `react-redux`      | ^9.2.0   | Conecta el árbol de componentes React al store de Redux       |
| `axios`            | ^1.13.2  | Cliente HTTP para llamadas a TheCatAPI                        |
| `framer-motion`    | ^12.34.3 | Animaciones aceleradas por hardware (entrada, salida, layout) |
| `react-hot-toast`  | ^2.6.0   | Notificaciones toast para feedback del usuario                |
| `react-icons`      | ^5.5.0   | Componentes de iconos (subconjunto de Bootstrap Icons)        |
| `prop-types`       | ^15.8.1  | Validación de props en ejecución y contrato de componentes    |

### Dependencias de Desarrollo

| Librería               | Versión | Rol                                     |
| ---------------------- | ------- | --------------------------------------- |
| `vite`                 | ^7.3.0  | Servidor de desarrollo y empaquetador   |
| `@vitejs/plugin-react` | ^5.1.2  | Soporte JSX y HMR para Vite             |
| `tailwindcss`          | ^4.1.18 | Framework de CSS orientado a utilidades |
| `@tailwindcss/postcss` | ^4.1.18 | Integración PostCSS para Tailwind v4    |
| `eslint` + plugins     | ^8.57.1 | Análisis estático (0 advertencias)      |
| `gh-pages`             | ^6.3.0  | Despliegue a GitHub Pages               |

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js v18+
- pnpm v8+

### 1. Clonar e instalar

```bash
git clone https://github.com/slinkter/myprojectapi11.git
cd myprojectapi11
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=tu_api_key_aqui
```

Obtén una clave API gratuita en [thecatapi.com](https://thecatapi.com).

### 3. Ejecutar servidor de desarrollo

```bash
pnpm run dev      # → http://localhost:5173
```

### Scripts disponibles

| Comando            | Descripción                           |
| ------------------ | ------------------------------------- |
| `pnpm run dev`     | Servidor de desarrollo                |
| `pnpm run build`   | Construcción de producción → `./dist` |
| `pnpm run preview` | Previsualizar build local             |
| `pnpm run lint`    | ESLint (0 advertencias permitidas)    |
| `pnpm run deploy`  | Construir + desplegar a GitHub Pages  |

---

## 🏗 Arquitectura (Feature-Sliced Design)

```
src/
├── app/             # Configuración del store de Redux
├── config/          # Variables de entorno (env.js), motionConfig.js
├── docs/            # Documentación técnica
├── features/
│   ├── cats/        # Dominio principal (gatos)
│   │   ├── adapters/    # catMapper.js — normaliza API → CatEntity
│   │   ├── api/         # catApi.js — cliente HTTP Axios
│   │   ├── components/  # CatCard, CatList, RandomCatList, FavouriteCatList
│   │   │   └── subcomponents/ # CatCardHeader, CatCardFooter
│   │   ├── hooks/       # useCats.js, usePreloadCats.js
│   │   ├── redux/       # catsSlice.js — estado + thunks
│   │   └── services/   # catService.js — orquestación API
│   ├── font/        # Selección de fuentes
│   └── theme/       # Modo Oscuro/Claro
├── shared/
│   ├── components/  # ErrorBoundary, Skeletons, EmptyState, DataInitializer
│   ├── hooks/       # useAppearance, usePageTitle
│   └── ui/         # IconButton, Select
└── App.jsx          # Componente raíz
```

### Patrones Implementados

| Patrón                       | Dónde                                   | Beneficio                               |
| ---------------------------- | --------------------------------------- | --------------------------------------- |
| **Fachada (Hook)**           | `useCats`, `useTheme`, `useFont`        | UI no accede a Redux directamente       |
| **Adaptador / Mapper**       | `catMapper.js`                          | API no se filtra a componentes          |
| **Error Boundary**           | `ErrorBoundary.jsx`                     | Captura errores de React con retry      |
| **Prefetching**              | `usePreloadCats.js` + `DataInitializer` | Carga datos antes de montar componentes |
| **Lazy Loading**             | `React.lazy()` + `Suspense`             | Code splitting automático               |
| **LazyMotion**               | `motionConfig.js` + `domAnimation`      | Bundle size reducido (~30kb)            |
| **Reduced Motion**           | `useReducedMotion()` en CatCard         | Accesibilidad para animaciones          |
| **Tipado con JSDoc**         | Todos los hooks, mappers, props         | Seguridad de tipos en JS plano          |
| **Container/Presentational** | `RandomCatList` → `CatList` → `CatCard` | Separación de lógica y presentación     |

---

## ✨ Mejoras Recientes

| Feature                        | Descripción                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| **CORS Proxy**                 | Solución con proxy de Vite para cargar imágenes en desarrollo            |
| **Score 100/100 react-doctor** | Validación completa de código React                                       |
| **LazyMotion + domAnimation**  | Bundle optimizado (~30kb ahorro en framer-motion)                         |
| **prefers-reduced-motion**     | Accesibilidad para usuarios sensibles a animaciones                       |
| **DataInitializer**            | Componente separado para carga inicial de datos                           |
| **EmptyState**                 | Componente reutilizable para estados vacíos                               |
| **useCallback en useTheme**    | Optimización de referencias en toggles                                    |
| **Error Boundary**             | Captura errores de React con UI de fallback y retry                       |
| **usePreloadCats**             | Carga datos al iniciar la app (evita layout shift)                        |
| **Skeletons separados**        | `RandomCatListSkeleton` (6 items) vs `FavouriteCatListSkeleton` (4 items) |
| **Botones consistentes**       | Fondo negro redondeado con ícono blanco                                   |
| **Favicon personalizado**      | Ícono de gato en `/public/cat.svg`                                        |
| **JSDoc mejorado**             | Tipados completos con ejemplos en todos los hooks                         |

---

## 🔐 Proxy CORS (Desarrollo)

El proyecto usa un proxy de Vite para evitar problemas de CORS al cargar imágenes del CDN de TheCatAPI.

### Problema Original

El navegador bloquea solicitudes a `cdn2.thecatapi.com` porque el servidor no envía headers CORS correctos.

### Solución

```
┌─────────────┐     /api/cors-proxy?url=...     ┌─────────────┐
│  Navegador  │  ──────────────────────────→   │  Vite Dev   │
│  (localhost)│     (mismo origen = OK)         │   Proxy     │
└─────────────┘                                 └─────────────┘
                                                      │
                                                      ↓
                                            https://cdn2.thecatapi.com
                                            (servidor a servidor)
```

### Configuración

**vite.config.js:**
```javascript
server: {
  proxy: {
    "/api/cors-proxy": {
      target: "https://cdn2.thecatapi.com",
      changeOrigin: true,
      rewrite: (path) => decodeURIComponent(path.replace(/^\/api\/cors-proxy\?url=/, "")),
    },
  },
}
```

**catMapper.js:**
```javascript
const CORS_PROXY = "/api/cors-proxy?url=";

// Transforma: https://cdn2.thecatapi.com/images/abc.jpg
// En: /api/cors-proxy?url=https%3A%2F%2Fcdn2.thecatapi.com%2Fimages%2Fabc.jpg
```

### ⚠️ Nota

Esta solución funciona en **desarrollo** (`pnpm run dev`). Para **producción** (GitHub Pages), las imágenes pueden no cargar correctamente debido a las restricciones CORS del navegador.

---

## 📚 Documentación

| Documento                                                              | Contenido                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------ |
| [`AGENTS.md`](./AGENTS.md)                                             | Guía para agentes IA (build, lint, arquitectura) |
| [`src/docs/00-SETUP-GUIDE.md`](./src/docs/00-SETUP-GUIDE.md)           | Instalación desde cero                           |
| [`src/docs/04-ARCHITECTURE.md`](./src/docs/04-ARCHITECTURE.md)         | Patrones FSD, flujo de datos                     |
| [`src/docs/05-UI-DESIGN-SYSTEM.md`](./src/docs/05-UI-DESIGN-SYSTEM.md) | Tokens de Tailwind, animaciones                  |
| [`src/docs/06-CONTRIBUTING.md`](./src/docs/06-CONTRIBUTING.md)         | Convenciones, JSDoc, flujo Git                   |

---

## 🌐 Despliegue

Desplegado en **GitHub Pages**: https://slinkter.github.io/myprojectapi11

```bash
pnpm run deploy
```

---

## 🔧 Alias de Rutas

| Alias       | Ruta Real       |
| ----------- | --------------- |
| `@features` | `src/features/` |
| `@shared`   | `src/shared/`   |
| `@app`      | `src/app/`      |
| `@config`   | `src/config/`   |

---

## 📖 Resumen de Estudio

### Conceptos Clave del Proyecto

#### 1. Feature-Sliced Design (FSD)

```
features/          → Módulos de negocio independientes
  ├── cats/        → Dominio principal (gatos)
  ├── theme/       → Funcionalidad de tema
  └── font/        → Funcionalidad de fuentes

shared/            → Código reutilizable (sin dependencias de features)
  ├── components/  → Componentes UI genéricos
  ├── hooks/       → Hooks utilitarios
  └── ui/          → Primitivas de UI
```

**Regla de oro:** `shared` NO puede importar de `features`.

---

#### 2. Flujo de Datos (Top-Down)

```
API Externa (TheCatAPI)
    ↓
catApi.js (cliente HTTP con Axios)
    ↓
catService.js (orquestación de llamadas)
    ↓
catsSlice.js (Redux thunk + estado)
    ↓
useCats.js (Hook FACADE - conecta componentes al store)
    ↓
Componentes (RandomCatList, CatList, CatCard)
```

**Punto clave:** Los componentes NUNCA acceden a Redux directamente. Usan el hook `useCats()`.

---

#### 3. Patrón Fachada (Facade Pattern)

```javascript
// ❌ NO hagas esto en componentes
const dispatch = useDispatch();
const cats = useSelector((state) => state.cats.random);

// ✅ USA el hook fachada
const { randomCats, saveFavouriteCat } = useCats();
```

El hook fachada:

- Oculta la complejidad de Redux
- Proporciona una API limpia
- Mantiene los componentes simples

---

#### 4. Separación Container / Presentational

```
RandomCatList (CONTAINER)     → Lógica, usa useCats, calcula estados
    ↓ props
CatList (PRESENTATIONAL)      → Solo renderiza, recibe datos por props
    ↓ props
CatCard (PRESENTATIONAL)      → Solo renderiza la tarjeta individual
```

**Beneficio:** El componente presentacional puede reutilizarse en cualquier contexto.

---

#### 5. Mapper / Adaptador

```javascript
// API externa devuelve: { id: "abc", image: { id: "abc", url: "..." } }
// Nosotros convertimos a: { id: "abc", url: "...", favouriteId: 123 }

export const mapToCatEntity = (rawCat) => {
  if (rawCat.image) {
    return {
      id: rawCat.image.id,
      url: rawCat.image.url,
      favouriteId: rawCat.id,
    };
  }
  return { id: rawCat.id, url: rawCat.url, favouriteId: null };
};
```

**Beneficio:** Si la API cambia, solo modificas el mapper, no los componentes.

---

#### 6. Optimizaciones de Performance

| Técnica          | Implementación              | Beneficio                       |
| ---------------- | --------------------------- | ------------------------------- |
| **Lazy Loading** | `React.lazy()` + `Suspense` | Code splitting automático       |
| **Prefetching**  | `usePreloadCats`            | Carga datos antes de mostrar UI |
| **Skeleton**     | `SkeletonGrid`              | Evita CLS (layout shift)        |
| **LazyMotion**   | `domAnimation`              | Bundle ~30kb menor              |
| **useCallback**  | `toggleTheme`               | Evita re-renderizados           |
| **React.memo**   | `CatCard`                   | Evita re-render innecesarios    |

---

#### 7. Accesibilidad

```javascript
// Detecta preferencia del usuario
const shouldReduceMotion = useReducedMotion();

// Aplica clases condicionalmente
const imageClasses = shouldReduceMotion
  ? "object-cover w-full h-full"
  : "object-cover w-full h-full transition-transform...";
```

---

#### 8. Estructura de un Feature

```
features/cats/
├── api/           → cliente HTTP bajo nivel (Axios)
├── adapters/       → transformadores (API → Domain)
├── services/       → orquestación de API
├── redux/          → slices + thunks
├── hooks/          → facades (useCats, usePreloadCats)
└── components/     → UI del feature
```

---

#### 9. JSDoc en JavaScript

```javascript
/** @typedef {import('../adapters/catMapper').CatEntity} CatEntity */

/**
 * Hook fachada para gestionar gatos.
 * @returns {Object} Facade con cats y acciones
 * @property {CatEntity[]} randomCats
 * @property {function(CatEntity): Promise<void>} saveFavouriteCat
 */
export const useCats = () => { ... };
```

---

#### 10. Errores y Estados

- **ErrorBoundary:** Captura errores de React (crashes)
- **CatErrorHandler:** Muestra errores de API con retry
- **EmptyState:** Mensaje cuando no hay contenido
- **Skeleton:** Loading state visual

---

### Comandos Importantes

```bash
pnpm run dev        # Desarrollo
pnpm run build      # Producción
pnpm run lint       # Verificar código (0 warnings)
pnpm run preview    # Probar build local
```
