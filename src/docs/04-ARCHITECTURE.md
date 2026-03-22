# Technical Blueprint & Architecture (Engineering Reverse)

> **Role:** Lead Software Architect
> **Metodología:** Feature-Sliced Design (FSD) + Facade Pattern
> **Estado:** Documentación Técnica de Alta Fidelidad
> **Última Actualización:** 2026-03-22

---

## 1. Análisis de Capas Traducido a FSD

El proyecto sigue una estructura de **Ingeniería Basada en Características (Feature-Based Architecture)**, optimizada para escalabilidad y desacoplamiento.

### Estructura de Capas (Top-Down):

1.  **App (`src/app/`)**: Inicialización de Redux Store, componentes de layout (Navbar, MainContent, ToastContainer).
2.  **Config (`src/config/`)**: Configuración centralizada (env, apiConstants, storageKeys, toastMessages, uiText, motionConfig).
3.  **Features (`src/features/`)**: Módulos de dominio con lógica de negocio aislada.
4.  **Shared (`src/shared/`)**: Utilidades genéricas, componentes UI básicos y hooks de infraestructura.

---

## 2. Ingeniería de Features (Análisis por Módulo)

### 🐾 A. Feature: `cats` (Gestión de Galería)

Es el núcleo de la aplicación. Maneja datos asíncronos de una API externa con transformaciones de dominio.

#### Diagrama Estructural (ASCII):

```text
[App.jsx] (Composición de Layout)
      |
[LazyMotion] -> motionFeatures (domAnimation)
      |
[Navbar] (Header sticky con branding + controles)
      |
[MainContent] (ErrorBoundary + Suspense)
      |                      |
[RandomCatList]    [FavoriteCatList]
      |                      |
[CatList] -> [CatCard] -> [CatCardFooter]
      |
[SectionHeader] (Títulos de sección)
      |
[Componentes Shared]
      EmptyState, SkeletonGrid, ErrorBoundary, ToastContainer
      |
[Lógica de Negocio (Facade)]
           useCats (Hook)
              |
[Estado/Persistencia]
      catsSlice (Redux) <-> API (catApi) <-> Mapper (catMapper)
```

#### Mapa de Dependencias:

- **`App.jsx`**: Componente raíz que composa el layout: `<Navbar>`, `<MainContent>`, `<ToastContainer>`. Usa `LazyMotion` para animaciones optimizadas.
- **`Navbar`**: Header sticky con branding, `FontDropdown` y `ThemeToggleButton`.
- **`MainContent`**: Área principal con `ErrorBoundary` + `Suspense` envolviendo las listas de gatos.
- **`ToastContainer`**: Contenedor de notificaciones toast.
- **`DataInitializer`**: Componente dedicado que ejecuta `usePreloadCats` al montar la app. Separa la lógica de datos del componente raíz.
- **`usePreloadCats`**: Hook centralizado que carga los datos al iniciar la app. Carga **Random Cats** primero, luego **Favorites** (orden secuencial para mejor UX).
- **`RandomCatList` / `FavoriteCatList`**: Componentes puros que solo renderizan datos del store. No disparan cargas.
- **`CatList` / `CatCard`**: Componentes presentacionales envueltos en `React.memo`. Reciben datos y callbacks vía `props`. No conocen Redux.
- **`SectionHeader`**: Componente compartido para títulos de sección con animaciones de entrada.
- **`CatCardFooter`**: Usa la utilidad `cn` para orquestar estados visuales basados en `disabled` y `actionType`.
- **`EmptyState`**: Componente reutilizable para mostrar mensajes cuando no hay contenido.
- **`LazyMotion`**: Configuración de framer-motion con `domAnimation` para reducir bundle size.
- **`appLogger`**: Utilidad de logging con timestamps para eventos de aplicación (reemplaza `debugLogger.js`).

#### Lógica de Hooks (SOLID):

- **`useCats`**: Actúa como una **Facade**. Su única responsabilidad es orquestar la comunicación entre los componentes y el Store de Redux. Expone una interfaz limpia ocultando la complejidad de `dispatch`, `useSelector` y `unwrap`.
- **`usePreloadCats`**: Hook de infraestructura que ejecuta el prefetching de datos. Implementa el patrón **data-on-mount** para evitar layout shift.
- **`useCallback`**: Utilizado en `useTheme` para mantener referencias estables de funciones.

---

### 🎨 B. Feature: `theme` (Gestión de Apariencia)

Maneja el estado visual global (Light/Dark).

#### Diagrama Estructural (ASCII):

```text
ThemeToggleButton
      |
  useTheme (Hook)
      |
 themeSlice (Redux)
```

#### Mapa de Dependencias:

- **`ThemeToggleButton`**: Único consumidor de `useTheme`. Al ejecutarse, dispara un cambio en Redux que es escuchado globalmente.

---

### 🔡 C. Feature: `font` (Gestión Tipográfica)

Controla la familia de fuentes activa de forma dinámica.

#### Diagrama Estructural (ASCII):

```text
FontDropdown
      |
  useFont (Hook)
      |
 fontSlice (Redux) <-> fontConstants (Config)
```

#### Mapa de Dependencias:

- **`FontDropdown`**: Usa `useFont` para obtener la lista de fuentes disponibles y la función de cambio.
- **`fontSlice`**: Centraliza la validación (asegurando que solo fuentes registradas en `fontConstants` sean aplicadas).

---

## 3. Capa Shared: Infraestructura y Efectos

### ⚓ Hooks de Infraestructura (Efectos Globales)

- **`useAppearance`**:
  - **Responsabilidad:** Sincronización del DOM. Escucha cambios en `theme` y `font` de Redux para inyectar clases en `<html>` y variables CSS (`--font-family`). Lee constantes de `storageKeys.js` para claves de localStorage.
  - **SOLID:** SRP (Single Responsibility Principle) al 100%. Solo se encarga de efectos secundarios visuales raíz.
- **`usePageTitle`**: Encapsula la gestión del `document.title` con limpieza automática (cleanup).

### 🛠 Utilidades de Arquitectura

- **`cn` (Utility Engine):**
  - Usa `clsx` + `tailwind-merge`.
  - **¿Por qué?:** En una arquitectura de componentes, necesitamos que los estilos base puedan ser sobreescritos por los padres de forma segura. `cn` resuelve los conflictos de cascada de Tailwind de forma determinista.
- **`appLogger` (antes `debugLogger.js`):**
  - Logging con timestamps para eventos de aplicación: `logStart`, `logEnd`, `logState`, `logAction`, `logApi`.

### ⚙️ Capa de Configuración (`src/config/`)

Centraliza configuración para evitar valores hardcodeados:

| Archivo | Propósito |
|---------|-----------|
| `env.js` | Variables de entorno (VITE_BASE_URL, VITE_API_KEY) |
| `apiConstants.js` | Constantes de API (API_TIMEOUT, DEFAULT_CAT_LIMIT) |
| `storageKeys.js` | Claves de localStorage centralizadas (STORAGE_KEY_THEME, STORAGE_KEY_FONT) |
| `toastMessages.js` | Mensajes de toast para feedback de usuario |
| `uiText.jsx` | Textos de UI centralizados |
| `motionConfig.js` | Configuración de LazyMotion (domAnimation) |

---

## 4. Capa Shared: Componentes Optimizados

### Componentes de Skeleton

- **`skeletonVariants.js`**: Define variantes de esqueletos reutilizables para consistencia visual.
- **`SkeletonCard`**: Marcador de posición para `CatCard` con dimensiones exactas (aspect-square, rounded-2xl).
- **`SkeletonGrid`**: Cuadrícula de skeletons que coincide con `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`.
- **`InitialLoadSkeleton`**: Skeleton compuesto para carga inicial de la app.

### Optimizaciones de Rendimiento

| Optimización | Implementación |
|--------------|----------------|
| `React.memo` | `CatCard`, `CatList` y componentes UI envueltos para evitar re-renders innecesarios |
| `LazyMotion` + `domAnimation` | Bundle reducido ~30kb vs import completo de framer-motion |
| `useCallback` | Funciones de callbacks memorizadas en hooks de fachada |
| `useMemo` | Valores derivados memoizados (Set de IDs de favoritos) |
| Suspense boundaries | Carga perezosa de listas de gatos con skeletons |

---

## 5. Cumplimiento de Estándares (Audit)

| Estándar            | Estado | Observación                                                                                                                     |
| :------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| **PascalCase**      | ✅     | Utilizado rigurosamente en Componentes (`CatCard.jsx`, `SectionHeader.jsx`).                                                       |
| **camelCase**       | ✅     | Utilizado en Hooks (`useCats.js`) y utilidades (`appLogger.js`).                                                                                 |
| **Desacoplamiento** | 💎     | **Excelente.** Ningún componente de la carpeta `shared` depende de `features`. Las features solo se comunican vía Redux/Facade. |
| **Clean Code**      | ✅     | Los componentes son pequeños (SFC - Stateless Functional Components) y la lógica pesada vive en Hooks.                          |
| **Early Return**    | ✅     | Patrón early return usado para mejor legibilidad en funciones y componentes |
| **Composición**      | ✅     | App.jsx descompuesto en componentes de layout (`Navbar`, `MainContent`, `ToastContainer`) |

---

## 6. Blueprint para Desarrolladores (Quick Guide)

1.  **¿Quieres crear una funcionalidad nueva?**
    - Crea una carpeta en `src/features/tu-funcionalidad`.
    - Define un `redux/slice` si hay estado global.
    - Crea un `hooks/use-funcionalidad.js` como fachada.
    - Solo entonces, crea tus componentes.
2.  **¿Quieres añadir un nuevo componente UI?**
    - Si es reutilizable globalmente → `src/shared/components/`
    - Si es específico de una feature → `src/features/nombre/components/`
3.  **¿Regla de Oro?**
    - Si usas un _template literal_ complejo para clases, usa `cn()`.
    - Si ves un componente con un `useEffect` complejo, extráelo a un Custom Hook.
    - Si necesitas constants de configuración → añádelas a `src/config/`
4.  **Nomenclatura de componentes de layout:**
    - `Navbar.jsx` → Header sticky con branding y controles
    - `MainContent.jsx` → Área principal con listas de gatos
    - `ToastContainer.jsx` → Contenedor de notificaciones

---

> _Este documento es el 'Libro de Leyes' técnico del proyecto. Cada cambio arquitectónico debe ser reflejado aquí._
