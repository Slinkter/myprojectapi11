# Especificaciones de Casos de Uso

Este documento detalla todos los flujos de interacción. Estos son la fuente de verdad para las pruebas de aceptación de funcionalidades.

## Actores

- **Usuario** — Un visitante que explora la aplicación en cualquier navegador.

---

## UC-01: Explorar Gatos Aleatorios

**Objetivo:** Ver imágenes aleatorias de gatos frescas al cargar.
**Activador:** Renderizado inicial de la aplicación.

**Flujo Principal:**

1. La aplicación renderiza `RandomCatList` (cargado perezosamente vía `React.lazy`).
2. `useEffect` llama a `loadRandomCats()` si la lista está vacía.
3. Aparece `SkeletonGrid` (8 tarjetas, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, `gap-6`).
4. Se dispara el thunk `fetchRandomCats` — GET `/images/search`.
5. La respuesta pasa por `catMapper.js` → `CatEntity[]`.
6. Se actualiza el array `random` en Redux.
7. `AnimatePresence` de Framer Motion renderiza cada tarjeta con una animación de escala + desvanecimiento (fade-in).

**Flujo Alternativo (Error de API):**

- El paso 4 falla → `rejectWithValue` → se establece `error` en el slice de Redux.
- El componente `CatErrorHandler` muestra un mensaje de error y un botón de reintento.
- El usuario hace clic en reintentar → vuelve al paso 2.

---

## UC-02: Guardar un Gato en Favoritos

**Objetivo:** Persistir una imagen de gato como favorita personal.
**Activador:** El usuario hace clic en el botón de Corazón en una `CatCard`.

**Precondición:** La lista de gatos aleatorios está cargada. El gato NO está ya en `favourites[]`.

**Flujo Principal:**

1. El usuario pasa el ratón sobre `CatCard` → aparece el overlay con `CatCardFooter`.
2. El botón de contorno de corazón (`BsHeart`) es visible y está habilitado.
3. El usuario hace clic en el botón de corazón.
4. `handleAction` en `CatCard` previene el comportamiento por defecto y llama a `onAction(cat)`.
5. `useCats.saveFavouriteCat(cat)` dispara el thunk `saveCat`.
6. Thunk: POST `/favourites` con `{ image_id: cat.id }`.
7. Respuesta: `{ id: <nuevo favouriteId>, message: "SUCCESS" }`.
8. Redux se desarrolla: el gato se añade a `favourites[]`, se asigna el `favouriteId`.
9. El botón de corazón se vuelve sólido (`BsFillHeartFill`, rojo, `disabled=true`).
10. `react-hot-toast` muestra "Cat saved to favourites!".

**Regla de Estado Deshabilitado:** Después de guardar, el botón de corazón permanece deshabilitado — solo se rehabilita cuando el usuario elimina el gato de `FavouriteCatList`.

---

## UC-03: Eliminar un Gato de Favoritos

**Objetivo:** Eliminar un gato de la lista de favoritos.
**Activador:** El usuario hace clic en el botón de Papelera en una tarjeta de `FavouriteCatList`.

**Flujo Principal:**

1. El usuario visualiza la sección `FavouriteCatList`.
2. El usuario pasa el ratón sobre una tarjeta → aparece el icono de Papelera (`BsTrash`).
3. El usuario hace clic en el icono de papelera.
4. `useCats.deleteFavouriteCat(cat)` dispara el thunk `deleteCat`.
5. Thunk: DELETE `/favourites/{cat.favouriteId}`.
6. Redux: la tarjeta se elimina de `favourites[]`.
7. `AnimatePresence` de Framer Motion reproduce la animación de salida (escala a 0.5 + desvanecimiento).
8. Las tarjetas restantes fluyen suavemente a sus nuevas posiciones vía la prop `layout`.
9. Toast: "Cat removed from favourites!".
10. Si la lista se vacía → aparece un mensaje animado de estado vacío.

---

## UC-04: Cambiar Tema Oscuro/Claro

**Objetivo:** Cambiar entre el esquema de colores oscuro y claro.
**Activador:** El usuario hace clic en el `IconButton` de Luna/Sol en el encabezado fijo.

**Flujo Principal:**

1. El usuario hace clic en el interruptor de tema.
2. Se dispara `useTheme.toggleTheme()`.
3. Redux alterna `theme.mode` entre `"light"` y `"dark"`.
4. `useAppearance` detecta el cambio → añade/elimina la clase CSS `dark` en `<html>`.
5. Todos los tokens semánticos de Tailwind CSS v4 (`bg-background`, `text-foreground`, etc.) reflejan instantáneamente el nuevo tema.
6. La preferencia se guarda en LocalStorage con la clave `theme`.

---

## UC-05: Cambiar Familia de Fuentes

**Objetivo:** Aplicar una tipografía diferente a la aplicación.
**Activador:** El usuario selecciona una fuente desde el `FontDropdown` en el encabezado.

**Flujo Principal:**

1. El usuario abre el desplegable `Select`.
2. Las fuentes disponibles se renderizan desde el estado `font.list` de Redux.
3. El usuario selecciona una fuente (ej., "Roboto").
4. Se dispara `useFont.changeFont("Roboto")`.
5. Redux actualiza `font.family`.
6. `useAppearance` detecta el cambio → establece `document.body.style.setProperty("--font-family", "Roboto, sans-serif")`.
7. Todo el texto de la aplicación cambia instantáneamente de tipografía.
8. La preferencia se guarda en LocalStorage con la clave `font`.
