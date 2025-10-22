## Versión 2.1: Funcionalidad de Cambio de Fuente Dinámico

### Selector de Fuente en la Barra de Navegación

-   **Descripción:** Se añadió un selector de fuente (`Dropdown`) en la barra de navegación, permitiendo a los usuarios cambiar dinámicamente la tipografía de toda la aplicación. Esta funcionalidad mejora la personalización y accesibilidad del proyecto.

-   **Ubicación:** El selector se encuentra en el `navbar`, posicionado entre el título "Cat Gallery" y el botón de alternancia de tema (modo oscuro/claro).

-   **Opciones de Fuente:** El `Dropdown` ofrece 5 opciones de fuentes populares de Google Fonts: Inter, Lato, Roboto Mono, Playfair Display y Lora.

-   **Implementación Detallada:**

    1.  **`FontContext.jsx` (Gestión de Estado de la Fuente):**
        -   Se creó un nuevo contexto de React (`FontContext`) para gestionar el estado de la fuente seleccionada (`font`) y proporcionar una función (`changeFont`) para actualizarla.
        -   El `useEffect` dentro de `AppFontProvider` es el encargado de aplicar la fuente. En lugar de añadir clases CSS directamente al `<body>` (lo cual generaba conflictos de especificidad con Tailwind), se optó por un enfoque más robusto:
            -   Se define una variable CSS (`--font-family`) en el elemento `documentElement` (la etiqueta `<html>`).
            -   Cada vez que la fuente cambia, se actualiza el valor de esta variable CSS.
            -   La preferencia de la fuente se persiste en `localStorage` para mantener la selección del usuario entre sesiones.

    2.  **`tailwind.config.js` (Configuración de Fuentes):**
        -   Se extendió la sección `theme.extend.fontFamily` para definir las nuevas fuentes.
        -   Crucialmente, la fuente `sans` por defecto de Tailwind se configuró para usar la variable CSS `--font-family`:
            ```javascript
            fontFamily: {
                sans: ['var(--font-family)', 'sans-serif'],
            },
            ```
        -   Esto permite que cualquier elemento que use `font-sans` (o que herede de él) adopte dinámicamente la fuente seleccionada a través de la variable CSS.

    3.  **`index.html` (Importación de Google Fonts):**
        -   Se añadieron los enlaces `<link>` necesarios en la sección `<head>` para importar todas las fuentes de Google Fonts seleccionadas (`Inter`, `Lato`, `Roboto Mono`, `Playfair Display`, `Lora`). Esto asegura que las fuentes estén disponibles para el navegador.

    4.  **`FontDropdown.jsx` (Componente del Selector):**
        -   Se creó un nuevo componente `FontDropdown` que utiliza el componente `Select` de `@material-tailwind/react` para renderizar el selector.
        -   Este componente consume el `FontContext` a través del hook `useFont` para obtener la fuente actual y la función `changeFont`.
        -   Las opciones del `Dropdown` se mapean a partir de la lista de fuentes definida en `FontContext`, pasando el valor de `family` (que ahora es el valor CSS completo de `font-family`) a la función `changeFont`.

    5.  **`main.jsx` (Integración del Proveedor):**
        -   Se importó `AppFontProvider` y se envolvió el componente `<App />` con él. Esto asegura que el `FontContext` esté disponible para toda la aplicación.

    6.  **`index.css` (Aplicación de la Fuente Base):**
        -   Se modificó la regla `@layer base` para el `body` para aplicar la clase `font-sans`:
            ```css
            body {
              @apply bg-gray-50 dark:bg-gray-900 font-sans;
            }
            ```
        -   Esto garantiza que, por defecto, toda la aplicación utilice la fuente definida por la variable CSS `--font-family`.

    7.  **`App.jsx` (Integración en la Barra de Navegación):**
        -   Se importó el componente `FontDropdown`.
        -   Se insertó `FontDropdown` en el `div` del `header` de `App.jsx`, entre el `Typography` del título "Cat Gallery" y el `ThemeToggleButton`, utilizando las clases de flexbox para un posicionamiento adecuado.
        -   Se eliminó la clase `font-sans` del `div` principal de `App.jsx`, ya que la fuente ahora se aplica globalmente al `body` a través de `index.css`.

-   **Desafíos y Aprendizajes:**
    -   El principal desafío fue lograr que el cambio de fuente se aplicara globalmente y de manera dinámica, respetando la metodología de Tailwind CSS.
    -   El intento inicial de añadir y remover clases de fuente directamente al `<body>` resultó ineficaz debido a problemas de especificidad y la forma en que Tailwind genera sus utilidades.
    -   La solución óptima fue el uso de **variables CSS personalizadas** (`--font-family`) combinadas con la configuración `fontFamily` de Tailwind. Este enfoque permite una gestión centralizada y dinámica de la fuente base de la aplicación, manteniendo la flexibilidad de Tailwind.