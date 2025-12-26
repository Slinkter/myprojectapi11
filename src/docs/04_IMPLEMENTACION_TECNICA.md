# Implementación Técnica (Versión 4.0)

## 1. Arquitectura del Sistema

La aplicación ha evolucionado hacia una **Arquitectura por Features (Feature-Based Architecture)**, un enfoque moderno que mejora la escalabilidad, mantenibilidad y encapsulación del código.

### 1.1. Estructura de Directorios

La estructura de `src/` se organiza de la siguiente manera, abandonando la agrupación por tipo de archivo (ej. `/components`, `/hooks`) en favor de la agrupación por funcionalidad:

```
src/
├── app/
│   └── store.js         # Configuración central del store de Redux
├── features/
│   ├── cats/            # Feature para la lógica de los gatos
│   ├── font/            # Feature para la selección de fuente
│   └── theme/           # Feature para el cambio de tema
├── shared/
│   └── components/      # Componentes reutilizables y agnósticos
└── ...                  # Archivos de entrada (main.jsx, etc.)
```

-   **`/app`**: Contiene la configuración y la lógica central de la aplicación, como el store de Redux, que es transversal a todas las features.
-   **`/features`**: Es el núcleo de la arquitectura. Cada subdirectorio es una "porción vertical" de la aplicación que encapsula toda su lógica: componentes, hooks, estado, etc.
-   **`/shared`**: Contiene elementos verdaderamente reutilizables que no pertenecen a ninguna feature en particular, como componentes de UI genéricos (esqueletos, botones, etc.).

### 1.2. Alias de Ruta (`@`)

Para mantener las importaciones limpias y robustas, se han configurado alias de ruta en `vite.config.js` y `jsconfig.json`. Esto previene las rutas relativas frágiles (`../../../`) y mejora la legibilidad.

-   **`@app`**: Apunta a `src/app/`
-   **`@features`**: Apunta a `src/features/`
-   **`@shared`**: Apunta a `src/shared/`

**Ejemplo de uso:**
```javascript
import { useCats } from '@features/cats/hooks/useCats';
import store from '@app/store';
```

## 2. Stack Tecnológico y Filosofía de Estilos

-   **Core:** React 19
-   **Build Tool:** Vite
-   **Gestión de Estado:**
    -   **Redux Toolkit:** Para el estado global de la aplicación y la gestión de datos asíncronos (API de gatos).
    -   **React Context:** Para estado de UI simple y localizado (tema y fuente).
-   **Notificaciones:** React Hot Toast
-   **Iconos:** React Icons
-   **Estilos:** **Utility-First** con **Tailwind CSS**. La filosofía es aplicar estilos directamente en el marcado JSX a través de clases de utilidad, y abstraer la reutilización a nivel de **componentes de React**, no de clases CSS.

## 3. Detalle de Implementación de Módulos Clave

### 3.1. Gestión de Estado

La estrategia de estado híbrida es una decisión de diseño clave:

-   **Redux (`@app/store.js`, `@features/cats/redux/catsSlice.js`):**
    -   Maneja la lógica compleja y asíncrona. Los `createAsyncThunk` en `catsSlice` gestionan las llamadas a la API, incluyendo los estados de `pending`, `fulfilled` y `rejected`.
    -   El hook **`useCats`** actúa como una **Fachada (Facade Pattern)**, proporcionando una API simple y limpia para que los componentes interactúen con el estado de los gatos sin necesidad de conocer la implementación de Redux.

-   **Context (`@features/theme`, `@features/font`):**
    -   Se utiliza para estado de UI que es síncrono y de alcance más global pero simple. Es más ligero que Redux para casos de uso como el cambio de tema.

### 3.2. Mejoras de Experiencia de Usuario (UX)

-   **Notificaciones Toast:**
    -   Se ha integrado `react-hot-toast`. El componente `<Toaster />` se renderiza en `App.jsx`.
    -   El hook `useCats` ahora contiene funciones `async` que utilizan `.unwrap()` sobre el `dispatch` del thunk. Esto permite manejar la promesa y despachar una notificación de éxito o error de forma centralizada.
    ```javascript
    // en useCats.js
    await dispatch(saveCat(cat)).unwrap();
    toast.success("Cat saved to favourites!");
    ```

-   **Manejo de Errores con Reintento:**
    -   El mensaje de error en `App.jsx` ya no es estático. Ahora incluye un icono de `MdErrorOutline` y un botón **"Retry"**.
    -   Este botón invoca la función `handleRetry`, que vuelve a despachar las acciones `loadRandomCats` y `loadFavouriteCats`, permitiendo al usuario recuperarse de fallos de red sin recargar la página.

-   **Estado Vacío para Favoritos:**
    -   El componente `CatList` ahora acepta una prop `emptyStateMessage`.
    -   En lugar de renderizar `null`, si la lista de gatos está vacía y no está cargando, muestra un mensaje amigable y estilizado, mejorando la experiencia del primer uso.

### 3.3. Consistencia de Interfaz de Usuario (UI)

-   **Sistema de Iconos Unificado:**
    -   Todos los iconos de la aplicación (corazón, papelera, sol, luna, chevron) ahora provienen de la librería `react-icons`.
    -   Esto asegura consistencia visual y facilita el mantenimiento y la actualización de los iconos en el futuro.

-   **Estilización de Componentes Nativos (`FontDropdown`):**
    -   El componente `<select>` ha sido rediseñado para que su apariencia sea consistente con el resto de la UI.
    -   Se utilizó la clase `appearance-none` de Tailwind para eliminar el estilo por defecto del navegador y se añadió un icono de chevron (`BsChevronDown`) superpuesto para indicar su funcionalidad de dropdown.

## 4. Guía de Despliegue

La guía de despliegue no ha cambiado. El proceso de `pnpm install` y `pnpm run build` genera los archivos estáticos en el directorio `dist/` de la misma manera.