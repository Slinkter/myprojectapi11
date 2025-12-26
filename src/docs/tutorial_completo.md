# Tutorial Completo: Creando una Galería de Gatos con React, Redux y Tailwind

**Nivel:** Intermedio a Avanzado
**Autor:** Arquitecto de Software Senior

## 1. Introducción y Configuración Inicial

En este tutorial, construiremos una aplicación "Cat Gallery" completa desde cero. Aprenderás a estructurar un proyecto de React de manera profesional, gestionar el estado con Redux y Context, y estilizar con Tailwind CSS siguiendo las mejores prácticas.

### 1.1. Prerrequisitos
-   Conocimientos sólidos de React (hooks, componentes).
-   Node.js v18+ y `pnpm` instalados.

### 1.2. Creación del Proyecto
Abre tu terminal y ejecuta:
```bash
pnpm create vite cat-gallery --template react
cd cat-gallery
```

### 1.3. Instalación de Dependencias
Instalaremos todas las dependencias necesarias:
```bash
# Dependencias de producción
pnpm add react-redux @reduxjs/toolkit axios prop-types react-hot-toast react-icons

# Dependencias de desarrollo
pnpm add -D tailwindcss postcss autoprefixer eslint eslint-plugin-react
```
*(Nota: Las versiones de los plugins de ESLint deben ser compatibles con tu versión de ESLint).*

### 1.4. Configuración de Tailwind CSS
1.  **Inicializa Tailwind:**
    ```bash
    pnpm exec tailwindcss init -p
    ```
    Esto creará `tailwind.config.js` y `postcss.config.js`.

2.  **Configura las rutas de contenido** en `tailwind.config.js`:
    ```javascript
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```
3.  **Añade las directivas de Tailwind** a tu archivo CSS principal (`src/index.css`):
    ```css
    @import "tailwindcss";
    /* Añadiremos más configuración aquí después */
    ```

---

## 2. Arquitectura del Proyecto y Alias de Ruta

Antes de escribir código, definimos nuestra arquitectura. Usaremos una **Arquitectura por Features**.

### 2.1. Creación de la Estructura de Carpetas
En la carpeta `src`, crea la siguiente estructura:
```bash
mkdir -p src/app src/features/cats src/features/font src/features/theme src/shared/components src/services
```

### 2.2. Configuración de Alias de Ruta
Para importaciones más limpias, configura alias en `vite.config.js`:
1.  Importa `path` y `url` al principio del archivo.
2.  Añade la sección `resolve.alias`.

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/app"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@services": path.resolve(__dirname, "./src/services"),
        },
    },
});
```
*No olvides crear también el archivo `jsconfig.json` para el soporte del editor, como se explica en la documentación técnica.*

---

## 3. Creando el Núcleo de la UI (Tema y Fuente)

Comenzaremos con las funcionalidades de personalización.

### 3.1. Contexto y Componente para el Tema
1.  **Crea `src/features/theme/context/ThemeContext.jsx`**: Este archivo exportará un `ThemeContext` y un `AppThemeProvider`. La lógica principal reside en un `useEffect` que añade o remueve la clase `dark` del elemento `<html>`.
2.  **Crea `src/features/theme/hooks/useTheme.js`**: Un simple hook para consumir el contexto: `export const useTheme = () => useContext(ThemeContext);`.
3.  **Crea `src/features/theme/components/ThemeToggleButton.jsx`**: Este componente usa el hook `useTheme`, y renderiza un icono de `BsSunFill` o `BsMoonFill` (`react-icons`) dependiendo del estado del tema.

### 3.2. Integración en `main.jsx`
Envuelve tu componente `<App />` con el `AppThemeProvider` para que toda la aplicación tenga acceso al contexto del tema.

```jsx
// src/main.jsx
import { AppThemeProvider } from '@features/theme/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
```
*Repite un proceso similar para `FontContext`, `useFont` y `FontDropdown` en la feature `/font`.*

---

## 4. Construyendo la Feature de "Gatos"

Esta es la lógica principal de la aplicación.

### 4.1. Servicio de API
**Crea `src/services/catApi.js`**:
Este archivo utiliza `axios` para crear una instancia pre-configurada que se comunica con `https://api.thecatapi.com`. Exporta funciones como `getRandomCats`, `getFavouriteCats`, etc.

### 4.2. Slice de Redux
**Crea `src/features/cats/redux/catsSlice.js`**:
-   Usa `createAsyncThunk` para cada operación de la API (`fetchRandomCats`, `saveCat`, etc.).
-   Define el estado inicial (`initialState`) con `random`, `favourites`, `loading` y `error`.
-   En `extraReducers`, maneja los estados `pending`, `fulfilled` y `rejected` de cada thunk.

### 4.3. Configuración del Store
**Crea `src/app/store.js`**:
Usa `configureStore` de Redux Toolkit para crear el store y combinar los reducers.
```javascript
import { configureStore } from '@reduxjs/toolkit';
import catsReducer from '@features/cats/redux/catsSlice';

export const store = configureStore({
  reducer: {
    cats: catsReducer,
  },
});
```
Luego, envuelve la aplicación con el `<Provider store={store}>` en `main.jsx`.

### 4.4. Componentes `CatCard` y `CatList`
-   **`CatCard.jsx`**: Crea un componente que recibe un objeto `cat` como prop. Renderiza la imagen (`<img loading="lazy" />`) y un overlay que aparece al hacer `hover`. Dentro del overlay, un botón con un icono de corazón (`BsFillHeartFill`) o papelera (`BsTrashFill`) ejecuta la acción correspondiente.
-   **`CatList.jsx`**: Un componente que recibe un `title` y un array de `cats`. Mapea el array y renderiza un `CatCard` por cada elemento. También es responsable de mostrar los esqueletos de carga (`SkeletonGrid`) o el mensaje de estado vacío.

---

## 5. Orquestación y Lógica Principal (`App.jsx`)

### 5.1. El Hook `useCats`
**Crea `src/features/cats/hooks/useCats.js`**: Este es el **patrón de fachada**.
-   Importa y utiliza los hooks `useSelector` y `useDispatch` de `react-redux`.
-   Selecciona los datos del store (`randomCats`, `favouriteCats`, `loading`, `error`).
-   Crea funciones `useCallback` para despachar las acciones (ej. `loadRandomCats`, `saveFavouriteCat`).
-   Devuelve un objeto simple con los datos y las funciones.

### 5.2. Poniéndolo todo junto en `App.jsx`
-   Importa y utiliza el hook `useCats()` para obtener todos los datos y acciones.
-   En un `useEffect`, llama a `loadRandomCats()` y `loadFavouriteCats()` al montar el componente.
-   Renderiza el `<header>` con los componentes `ThemeToggleButton` y `FontDropdown`.
-   Renderiza los componentes `CatList`, pasándoles los datos y funciones correspondientes.
-   Renderiza condicionalmente el componente de error.

---

## 6. Añadiendo Mejoras de UX

### 6.1. Notificaciones "Toast"
1.  **Añade el `<Toaster />`** de `react-hot-toast` en la parte superior del `return` de `App.jsx`.
2.  **Modifica el hook `useCats.js`**:
    -   Importa `toast` de `react-hot-toast`.
    -   Convierte las funciones `saveFavouriteCat` y `deleteFavouriteCat` en `async`.
    -   Dentro de un `try...catch`, espera el resultado del dispatch con `.unwrap()`.
    -   En el `try`, llama a `toast.success()`.
    -   En el `catch`, llama a `toast.error()`.

```javascript
// en useCats.js
export const saveFavouriteCat = useCallback(async (cat) => {
    try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success("Cat saved to favourites!");
    } catch (err) {
        toast.error(`Failed to save: ${err}`);
    }
}, [dispatch]);
```

### 6.2. Estado Vacío y de Error
-   **En `CatList.jsx`**: Añade una prop `emptyStateMessage`. Si `!loading` y `cats.length === 0`, renderiza este mensaje en lugar de `null`.
-   **En `App.jsx`**:
    -   Pasa la prop `emptyStateMessage` al `CatList` de favoritos.
    -   Crea una función `handleRetry` que llame de nuevo a las funciones de carga de datos.
    -   En el JSX del error, añade un botón "Retry" que ejecute `handleRetry`.

---

## 7. Conclusión

¡Felicidades! Has construido una aplicación React completa con una arquitectura profesional, un sistema de diseño robusto y una excelente experiencia de usuario.

### Próximos Pasos Recomendados:
-   **Añadir Pruebas:** Utiliza Vitest para añadir pruebas unitarias a los hooks y componentes.
-   **Implementar Paginación:** Para evitar cargar todos los gatos a la vez.
-   **Explorar Animaciones:** Usa `Framer Motion` para dar vida a la interfaz.
