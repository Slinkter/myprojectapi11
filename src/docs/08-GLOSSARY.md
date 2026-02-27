# Glosario Técnico

## Arquitectura y Patrones

**Feature-Sliced Design (FSD)**
Una metodología arquitectónica donde el código se organiza por **dominio de negocio** (ej., gatos, tema, fuente) en lugar de por rol técnico (componentes, reductores, acciones). Cada característica es autónoma con su propio cliente API, mapper, hooks y UI.

**Patrón Fachada (Facade Pattern)**
Un patrón de diseño estructural que proporciona una interfaz simplificada sobre subsistemas complejos. En este proyecto, `useCats()`, `useTheme()` y `useFont()` son Fachadas — los componentes llaman a `saveFavouriteCat(cat)` sin saber nada sobre Redux o Axios.

**Adaptador / Capa Anti-Corrupción (Adapter / Anti-Corruption Layer)**
Código que transforma datos de un formato externo al formato interno de la aplicación. `catMapper.js` es el Adaptador: convierte `RawApiCat` y `RawFavouriteCat` de TheCatAPI en la `CatEntity` utilizada en toda la aplicación.

**Componente Contenedor (Smart Component)**
Un componente de React responsable de la obtención de datos y la conexión del estado. Ejemplo: `RandomCatList.jsx` — se conecta a `useCats`, maneja `useEffect` y pasa los datos hacia abajo.

**Componente Presentacional (Dumb Component)**
Un componente de React que solo renderiza UI basado en props. Ejemplo: `CatList.jsx`, `CatCard.jsx` — sin Redux, sin Axios, sin efectos secundarios.

**Thunk**
Una función middleware de Redux para lógica asíncrona. Creada con `createAsyncThunk` de Redux Toolkit. Ejemplos: `fetchRandomCats`, `saveCat`, `deleteCat`. Manejan automáticamente los estados pending/fulfilled/rejected.

**Memoización**
Almacenamiento en caché del resultado de un cálculo costoso. Utilizado en este proyecto a través de:

- `React.memo(CatCard)` — evita el re-renderizado si las props no cambian.
- `useMemo(...)` — almacena en caché valores derivados (ej., el Set de IDs de favoritos).
- `useCallback(...)` — almacena en caché referencias de funciones para un paso de props estable.

**Alias de Ruta (Path Alias)**
Un atajo de Vite que reemplaza rutas relativas largas. `@features/cats/hooks/useCats` en lugar de `../../../../features/cats/hooks/useCats`.

---

## Términos de Dominio

**CatEntity**
La representación interna estandarizada de un gato. Propiedades:

- `id: string` — ID de imagen de TheCatAPI.
- `url: string` — URL directa a la imagen.
- `favouriteId: number | null` — El ID del registro favorito remoto, o `null` si no está guardado.

**TheCatAPI**
API REST externa en `https://api.thecatapi.com/v1`. Utilizada para obtener imágenes aleatorias y gestionar favoritos. Requiere una clave API gratuita.

**`VITE_BASE_URL` / `VITE_API_KEY`**
Variables de entorno requeridas almacenadas en `.env`. El prefijo `VITE_` es obligatorio para que Vite las exponga al código del navegador a través de `import.meta.env`.

**Registro de Favorito (Favourite Record)**
Un registro del lado del servidor en TheCatAPI que vincula a un usuario con una imagen de gato. Tiene su propio `id` único (`favouriteId`) separado del `id` de la imagen. Se debe usar el `favouriteId` para eliminar un favorito.

---

## Términos de UI/UX

**Pantalla Skeleton (Skeleton Screen)**
Una interfaz de usuario de marcador de posición que imita el diseño estructural del contenido que se está cargando. Previene el salto de diseño (CLS) cuando el contenido real se renderiza.

**CLS (Cumulative Layout Shift)**
Una métrica de Core Web Vitals que mide la inestabilidad visual. Una puntuación de `0.0` significa que el contenido nunca salta cuando se carga. Este proyecto logra un `0.0` asegurando que las dimensiones del Skeleton coincidan exactamente con las dimensiones reales de la tarjeta.

**AnimatePresence (Framer Motion)**
Un componente de Framer Motion que permite animaciones de salida. Sin él, React eliminaría los elementos del DOM instantáneamente — con él, los elementos pueden animarse hacia afuera elegantemente antes de ser eliminados.

**Prop `layout` (Framer Motion)**
Cuando se añade a un `<motion.div>`, le indica a Framer Motion que anime automáticamente los cambios de posición y tamaño del elemento. Se usa en la cuadrícula de tarjetas para que estas se deslicen suavemente y llenen los huecos después de eliminar una.

**Toast**
Una notificación breve que se descarta automáticamente. Este proyecto utiliza `react-hot-toast` para el feedback de éxito y error en las operaciones de la API.

**Token Semántico**
Un nombre de variable de Tailwind CSS v4 vinculado a un concepto en lugar de a un color específico (ej., `bg-muted` en lugar de `bg-gray-100`). Los tokens semánticos cambian automáticamente su valor cuando cambia el tema de la aplicación.

**Utilidad `cn` (clsx + tailwind-merge)**
Una función de utilidad compartida personalizada ubicada en `src/shared/utils/cn.js`. Utiliza `clsx` para construir cadenas de clases CSS condicionalmente y `tailwind-merge` para resolver de forma segura los conflictos de Tailwind CSS (ej., asegurando que `p-4` anule a `p-2` en lugar de que ambos se apliquen). Se usa extensamente en este proyecto para evitar plantillas literales complejas en JSX.

**Modo Oscuro**
Un esquema de colores donde los fondos son oscuros y el texto es claro. Implementado alternando la clase CSS `dark` en `<html>` a través de `useAppearance`.
