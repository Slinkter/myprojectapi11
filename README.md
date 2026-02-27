# Galería de Gatos — Arquitectura Limpia ✨

[![Demostración en Vivo](https://img.shields.io/badge/demo-live-brightgreen)](https://slinkter.github.io/myprojectapi11)
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

| Librería            | Versión  | Rol                                                         |
| ------------------ | -------- | ------------------------------------------------------------ |
| `react`            | ^19.2.3  | Framework principal de renderizado de UI                     |
| `react-dom`        | ^19.2.3  | Renderizador React DOM para el navegador                     |
| `@reduxjs/toolkit` | ^2.11.2  | Gestión de estado global — thunks asíncronos, slices         |
| `react-redux`      | ^9.2.0   | Conecta el árbol de componentes React al store de Redux     |
| `axios`            | ^1.13.2  | Cliente HTTP para llamadas a TheCatAPI                        |
| `framer-motion`    | ^12.34.3 | Animaciones aceleradas por hardware (entrada, salida, layout) |
| `react-hot-toast`  | ^2.6.0   | Notificaciones toast para feedback del usuario              |
| `react-icons`      | ^5.5.0   | Componentes de iconos (subconjunto de Bootstrap Icons)      |
| `prop-types`       | ^15.8.1  | Validación de props en ejecución y contrato de componentes   |

### Dependencias de Desarrollo

| Librería                | Versión | Rol                                      |
| ---------------------- | ------- | ---------------------------------------- |
| `vite`                 | ^7.3.0  | Servidor de desarrollo y empaquetador    |
| `@vitejs/plugin-react` | ^5.1.2  | Soporte JSX y HMR para Vite              |
| `tailwindcss`          | ^4.1.18 | Framework de CSS orientado a utilidades  |
| `@tailwindcss/postcss` | ^4.1.18 | Integración PostCSS para Tailwind v4     |
| `eslint` + plugins     | ^8.57.1 | Análisis estático (0 advertencias)       |
| `gh-pages`             | ^6.3.0  | Despliegue a GitHub Pages                |

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

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `pnpm run dev`   | Servidor de desarrollo                   |
| `pnpm run build` | Construcción de producción → `./dist`   |
| `pnpm run preview` | Previsualizar build local              |
| `pnpm run lint`  | ESLint (0 advertencias permitidas)       |
| `pnpm run deploy` | Construir + desplegar a GitHub Pages   |

---

## 🏗 Arquitectura (Feature-Sliced Design)

```
src/
├── app/             # Configuración del store de Redux
├── config/          # Variables de entorno (env.js)
├── docs/            # Documentación técnica
├── features/
│   ├── cats/        # Dominio principal (gatos)
│   │   ├── adapters/    # catMapper.js — normaliza API → CatEntity
│   │   ├── api/         # catApi.js — cliente HTTP Axios
│   │   ├── components/  # CatCard, CatList, RandomCatList, FavouriteCatList
│   │   ├── hooks/       # useCats.js, usePreloadCats.js
│   │   ├── redux/       # catsSlice.js — estado + thunks
│   │   └── services/   # catService.js — orquestación API
│   ├── font/        # Selección de fuentes
│   └── theme/       # Modo Oscuro/Claro
├── shared/
│   ├── components/  # ErrorBoundary, Skeletons
│   ├── hooks/       # useAppearance, usePageTitle
│   └── ui/          # IconButton, Select
└── App.jsx          # Componente raíz
```

### Patrones Implementados

| Patrón                    | Dónde                              | Beneficio                              |
| ------------------------- | ---------------------------------- | -------------------------------------- |
| **Fachada (Hook)**        | `useCats`, `useTheme`, `useFont`   | UI no accede a Redux directamente       |
| **Adaptador / Mapper**    | `catMapper.js`                      | API no se filtra a componentes         |
| **Error Boundary**        | `ErrorBoundary.jsx`                 | Captura errores de React con retry    |
| **Prefetching**           | `usePreloadCats.js`                 | Carga datos antes de montar componentes|
| **Lazy Loading**          | `React.lazy()` + `Suspense`         | Code splitting automático              |
| **Tipado con JSDoc**      | Todos los hooks, mappers, props     | Seguridad de tipos en JS plano        |

---

## ✨ Mejoras Recientes

| Feature                      | Descripción                                          |
| ---------------------------- | ---------------------------------------------------- |
| **Error Boundary**           | Captura errores de React con UI de fallback y retry |
| **usePreloadCats**           | Carga datos al iniciar la app (evita layout shift) |
| **Skeletons separados**     | `RandomCatListSkeleton` (6 items) vs `FavouriteCatListSkeleton` (4 items) |
| **Botones consistentes**    | Fondo negro redondeado con ícono blanco              |
| **Favicon personalizado**    | Ícono de gato en `/public/cat.svg`                  |
| **JSDoc mejorado**           | Tipados completos con ejemplos en todos los hooks   |

---

## 📚 Documentación

| Documento                                                           | Contenido                                     |
| ------------------------------------------------------------------ | -------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md)                                        | Guía para agentes IA (build, lint, arquitectura) |
| [`src/docs/00-SETUP-GUIDE.md`](./src/docs/00-SETUP-GUIDE.md)     | Instalación desde cero                        |
| [`src/docs/04-ARCHITECTURE.md`](./src/docs/04-ARCHITECTURE.md)   | Patrones FSD, flujo de datos                 |
| [`src/docs/05-UI-DESIGN-SYSTEM.md`](./src/docs/05-UI-DESIGN-SYSTEM.md) | Tokens de Tailwind, animaciones        |
| [`src/docs/06-CONTRIBUTING.md`](./src/docs/06-CONTRIBUTING.md)   | Convenciones, JSDoc, flujo Git               |

---

## 🌐 Despliegue

Desplegado en **GitHub Pages**: https://slinkter.github.io/myprojectapi11

```bash
pnpm run deploy
```

---

## 🔧 Alias de Rutas

| Alias      | Ruta Real           |
| ---------- | ------------------- |
| `@features` | `src/features/`     |
| `@shared`  | `src/shared/`       |
| `@app`     | `src/app/`          |
| `@config`  | `src/config/`       |

---

_Construido con ❤️ como proyecto de referencia para Arquitectura Frontend_
