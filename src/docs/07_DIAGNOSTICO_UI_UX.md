# Diagnóstico y Plan de Mejora de UI/UX

Este documento analiza la interfaz (UI) y la experiencia de usuario (UX) de la aplicación "Cat Gallery", identifica áreas de mejora y propone un plan de acción concreto.

## 1. Diferencia entre UI y UX (con ejemplos del proyecto)

Es crucial entender que aunque están relacionados, UI y UX no son lo mismo.

### UI (User Interface / Interfaz de Usuario)

La UI se refiere a **la apariencia visual y la presentación** de la aplicación. Es el conjunto de elementos gráficos con los que el usuario interactúa. Es el "qué".

-   **Ejemplos en este proyecto:**
    -   Los colores del modo oscuro (fondo `#111827`, texto `#e5e7eb`).
    -   La tipografía `Roboto Mono` cuando es seleccionada.
    -   La forma y sombra del botón de cambio de tema (`rounded-full`, `shadow-sm`).
    -   El icono de corazón (`<BsFillHeartFill />`) en las tarjetas de gato.
    -   El desenfoque de fondo (`backdrop-blur-sm`) en el overlay de la `CatCard`.

### UX (User Experience / Experiencia de Usuario)

La UX se refiere a **la experiencia completa y la sensación** que tiene el usuario al interactuar con la aplicación. Abarca la facilidad de uso, la lógica de la interacción y la eficiencia. Es el "cómo".

-   **Ejemplos en este proyecto:**
    -   La decisión de mostrar un **esqueleto de carga** (`SkeletonGrid`) mientras se obtienen los datos, lo que gestiona la percepción del tiempo de espera.
    -   El **flujo de guardar un favorito**: el usuario pasa el cursor, ve un corazón, hace clic, y el gato aparece en la lista de favoritos.
    -   La **persistencia del tema y la fuente** en `localStorage`, que recuerda las preferencias del usuario para futuras visitas.
    -   La **rapidez de la actualización** de la lista de favoritos gracias a la "actualización optimista" en Redux, que no requiere volver a cargar los datos desde la API.

---

## 2. Diagnóstico de la Aplicación

### UI - Problemas Encontrados

1.  **Inconsistencia en el Sistema de Iconos:**
    -   **Problema:** El componente `CatCard` utiliza correctamente la librería `react-icons` para los iconos de corazón y papelera. Sin embargo, `ThemeToggleButton` tiene el código de los iconos de sol y luna (SVG) "hardcodeado" directamente en el archivo.
    -   **Impacto:** Esto crea una deuda técnica. Dificulta el mantenimiento (si se quisiera cambiar el estilo de todos los iconos, habría que editar en múltiples lugares) y puede llevar a inconsistencias visuales (diferentes grosores de línea, tamaños, etc.).

2.  **Estilos de Componentes Nativos:**
    -   **Problema:** El `FontDropdown` se implementó con una etiqueta `<select>` nativa. Aunque es accesible, su apariencia visual no es consistente entre diferentes navegadores y sistemas operativos (Windows, macOS, etc.).
    -   **Impacto:** Rompe con la estética "premium" y controlada del resto de la aplicación, que utiliza componentes con estilos personalizados.

### UX - Oportunidades de Mejora

1.  **Falta de Feedback Inmediato (Toast Notifications):**
    -   **Oportunidad:** Cuando un usuario guarda o elimina un favorito, el único feedback es que la lista se actualiza. La acción puede pasar desapercibida si el usuario no está prestando atención a la sección de favoritos.
    -   **Impacto:** El usuario puede dudar si su acción fue exitosa. Una pequeña notificación emergente ("toast") que confirme "Gato guardado en favoritos" mejoraría enormemente la comunicación.

2.  **Manejo de Estados Vacíos:**
    -   **Oportunidad:** Cuando la sección "Favourite Kittens" está vacía, simplemente no se renderiza. Esto deja un espacio en blanco sin explicación.
    -   **Impacto:** Un nuevo usuario podría no entender cómo funciona la sección de favoritos. Un mensaje como "Aún no tienes favoritos. ¡Haz clic en el corazón de un gatito para guardarlo!" sería una guía mucho más efectiva.

3.  **Manejo de Errores Simplista:**
    -   **Oportunidad:** El mensaje de error actual es un texto simple. Si el error se debe a un fallo de red temporal, el usuario no tiene más opción que recargar la página completa.
    -   **Impacto:** La experiencia de recuperación ante fallos es pobre. Añadir un botón "Reintentar" junto al mensaje de error permitiría al usuario volver a ejecutar la llamada a la API de forma sencilla.

---

## 3. Plan de Mejoras

### Tarea 1 (UI): Unificar el Sistema de Iconos

-   **Acción:** Refactorizar `ThemeToggleButton.jsx`.
-   **Detalle:** Reemplazar los SVGs hardcodeados con los iconos `BsSunFill` y `BsMoonFill` de la librería `react-icons/bs`, que ya es una dependencia del proyecto.
-   **Beneficio:** Consistencia en el sistema de iconos, código más limpio y mantenibilidad centralizada.

### Tarea 2 (UX): Implementar Notificaciones "Toast"

-   **Acción:** Añadir un sistema de notificaciones.
-   **Detalle:** Proponer la instalación de una librería ligera como `react-hot-toast` y su `Toaster` en `App.jsx`. Luego, en las funciones `saveFavouriteCat` y `deleteFavouriteCat`, llamar a `toast.success()` para mostrar un mensaje de confirmación.
-   **Beneficio:** Proporciona feedback inmediato y claro al usuario, mejorando la sensación de control y confianza.

### Tarea 3 (UX): Mejorar Estado Vacío de Favoritos

-   **Acción:** Modificar el componente `CatList.jsx`.
-   **Detalle:** En lugar de renderizar `null` cuando `cats.length === 0`, mostrar un componente de "estado vacío" con un mensaje amigable y una llamada a la acción. Se puede añadir una nueva `prop` para pasar este componente personalizado.
-   **Beneficio:** Educa al usuario sobre cómo usar la funcionalidad y elimina la ambigüedad de un espacio en blanco.

### Tarea 4 (UX): Enriquecer el Mensaje de Error

-   **Acción:** Modificar el componente `App.jsx`.
-   **Detalle:** Convertir el `div` del error en un componente más robusto que incluya un icono de alerta y un botón "Reintentar". El `onClick` de este botón llamaría a las funciones `loadRandomCats` y `loadFavouriteCats`.
-   **Beneficio:** Mejora la resiliencia de la aplicación y permite al usuario solucionar problemas de conexión sin una recarga forzada.
