# Changelog

---

## Versión 4.0: Arquitectura por Features y Mejoras UI/UX

**Fecha:** 26 de Diciembre, 2025

### Resumen Ejecutivo

Esta versión representa una maduración significativa de la arquitectura del proyecto y una mejora sustancial en la experiencia de usuario (UX) y la consistencia de la interfaz (UI). Se refactorizó la base de código a una **arquitectura por features**, se implementaron **alias de ruta** para mejorar la mantenibilidad y se resolvieron múltiples inconsistencias y oportunidades de mejora identificadas en el diagnóstico de UI/UX.

### 1. Cambios Arquitectónicos

-   **Refactorización a Arquitectura por Features:**
    -   Se abandonó la organización de carpetas por tipo de archivo (`/components`, `/hooks`, `/redux`) en favor de una estructura por funcionalidad (`/features/cats`, `/features/theme`, `/features/font`).
    -   Cada feature ahora contiene sus propios componentes, hooks y lógica de estado, mejorando la encapsulación y la escalabilidad.
    -   Se creó una carpeta `/shared` para componentes reutilizables no específicos de una feature (ej. `skeletons`).

-   **Implementación de Alias de Ruta (`@`):**
    -   Se configuró `vite.config.js` y `jsconfig.json` para introducir alias de ruta (`@features`, `@shared`, `@app`).
    -   Todas las rutas de importación relativas largas (`../../../`) fueron reemplazadas por rutas absolutas limpias (ej. `import Component from '@shared/components/Component'`), mejorando drásticamente la legibilidad y facilitando futuras refactorizaciones.

-   **Reorganización de Archivos Core:**
    -   El archivo `store.js` de Redux fue movido a una nueva carpeta `src/app`, que representa el núcleo de la aplicación.
    -   Se eliminaron las carpetas `src/redux`, `src/context`, `src/hooks` y `src/services` después de la migración.

### 2. Mejoras de UI/UX

-   **Unificación del Sistema de Iconos (UI):**
    -   Se eliminaron los iconos SVG hardcodeados en `ThemeToggleButton.jsx`.
    -   Se reemplazaron con iconos (`BsSunFill`, `BsMoonFill`) de la librería `react-icons`, unificando el sistema de iconos del proyecto y mejorando la mantenibilidad.

-   **Implementación de Notificaciones "Toast" (UX):**
    -   Se añadió la librería `react-hot-toast`.
    -   Ahora, al guardar o eliminar un gato de favoritos, el usuario recibe una notificación emergente de éxito o error, proporcionando un feedback inmediato y claro.

-   **Mejora de Estado Vacío (UX):**
    -   La sección de "Favourite Kittens" ya no desaparece si está vacía. En su lugar, muestra un mensaje amigable ("You have no favourite kittens yet...") que guía al usuario sobre cómo utilizar la funcionalidad.

-   **Mejora en el Manejo de Errores (UX):**
    -   El componente de error que aparece al fallar la API fue mejorado. Ahora incluye un icono de alerta y un **botón "Reintentar"**, permitiendo al usuario volver a ejecutar la petición de datos sin necesidad de recargar la página.

-   **Rediseño del `FontDropdown` (UI):**
    -   Se aplicaron estilos de Tailwind CSS personalizados al componente `<select>` para eliminar la apariencia nativa del navegador.
    -   Se añadió un icono de chevron y se ajustaron los estilos para que la apariencia del dropdown sea consistente con la estética "premium" del resto de la aplicación.

### 3. Correcciones y Mantenimiento

-   **Resolución de Problemas de Build:** Se diagnosticaron y corrigieron varios errores de build que surgieron debido a la eliminación accidental de archivos (`store.js`, `constants.js`) durante la refactorización.
-   **Arreglo de Configuración de ESLint:** Se resolvió un conflicto de incompatibilidad con ESLint v9, realizando un downgrade a una versión estable de ESLint v8 y sus plugins correspondientes para asegurar que el proceso de `linting` funcione correctamente.

---

## Versión 3.0: Migración a Tailwind CSS v4 y Refactorización Core

### Resumen Ejecutivo

Se realizó una actualización crítica y agresiva de la infraestructura de estilos, migrando de Tailwind CSS v3 a la versión v4 alpha/beta (version `4.x`). Esta actualización rompió la compatibilidad con varios componentes heredados y librerías de terceros (específicamente `@material-tailwind/react`), lo que obligó a una refactorización de los componentes de UI y a un cambio en la estrategia de configuración.

### 1. Diagnóstico del Problema (The Breakage)

#### Causa Raíz

La ejecución de `pnpm update --latest` actualizó `tailwindcss` a la versión `4.1.17`, introduciendo cambios drásticos (breaking changes) que no son retrocompatibles con la configuración de la versión 3.

#### Síntomas Detectados

1.  **Fallo en Build/Dev Server:** Error de PostCSS indicando que el plugin `tailwindcss` ya no existe en el paquete principal y requiere `@tailwindcss/postcss`.
2.  **Sintaxis CSS Inválida:** Las directivas `@tailwind base`, `@tailwind components`, etc., fueron rechazadas.
3.  **Incompatibilidad con Material Tailwind:** La librería de componentes externos falló al intentar interactuar con el nuevo motor de Tailwind, rompiendo `ThemeProvider` y componentes como `Typography`, `Alert`, etc.
4.  **Estilos Rotos:** El modo oscuro dejó de funcionar y la funcionalidad de cambio de fuente dinámico se perdió debido a que la configuración JS `theme.extend.fontFamily` ya no se comportaba igual.

### 2. Plan de Solución y Ejecución

#### Fase 1: Infraestructura (Tailwind v4 Setup)

-   **Adaptador PostCSS:** Se instaló `@tailwindcss/postcss` y se actualizó `postcss.config.js`.
-   **CSS Nativo:** Se reemplazaron las directivas de Tailwind antiguas en `src/index.css` por la nueva importación única:
    ```css
    @import "tailwindcss";
    ```

#### Fase 2: Eliminación de Dependencias Conflictivas

-   Se eliminó completamente `@material-tailwind/react` del proyecto.
-   Se removió el `MaterialThemeProvider` de `main.jsx`, simplificando el árbol de proveedores de la aplicación.
-   Se limpió `tailwind.config.js` eliminando la función `withMT()` y configuraciones de tema obsoletas.

#### Fase 3: Refactorización de Componentes (UI)

Se reescribieron los componentes afectados para usar HTML nativo y clases de utilidad de Tailwind v4, mejorando el rendimiento y eliminando bloatware.

| Componente          | Antes (Material Tailwind)              | Ahora (Tailwind v4 Nativo + HTML)                                    |
| :------------------ | :------------------------------------- | :------------------------------------------------------------------- |
| `App.jsx`           | `<Typography variant="h1">`, `<Alert>` | `<h1>`, `<div>` con estilos `bg-red-50`, etc.                        |
| `ThemeToggleButton` | `<IconButton>`                         | `<button>` nativo con estados hover/focus refinados.                 |
| `CatList`           | `<Typography variant="h3">`            | `<h3>` con bordes y tipografía responsiva.                           |
| `FontDropdown`      | `<Select>` complejo                    | `<select>` nativo estilizado, totalmente compatible con modo oscuro. |

#### Fase 4: Restauración de Funcionalidades Complejas

**A. Reparación del Modo Oscuro**
Tailwind v4 cambia la detección de modo oscuro.

-   **Solución:** Se añadió una variante personalizada en CSS para activar el modo oscuro cuando la clase `.dark` está presente en el HTML.
    ```css
    @custom-variant dark (&:where(.dark, .dark *));
    ```

**B. Reparación del Cambio de Fuente Dinámico**
La configuración de fuentes via JS (`tailwind.config.js`) dejó de sincronizarse reactivamente con las variables CSS.

-   **Solución (CSS-First):** Se migró la configuración del tema directamente a CSS usando la directiva `@theme`.
    ```css
    @theme {
        --font-sans: var(--font-family), ui-sans-serif, system-ui, ...;
    }
    ```
    Esto conecta la variable CSS `--font-family` (controlada por React) directamente con la utilidad interna `font-sans` de Tailwind.

### 3. Resultado Final (Antes vs. Después)

| Característica         | Antes (v3 + Material)                  | Después (v4 Core)                                                  |
| :--------------------- | :------------------------------------- | :----------------------------------------------------------------- |
| **Tiempo de Arranque** | Lento (por pre-procesamiento complejo) | **Instantáneo** (Motor v4 optimizado)                              |
| **Dependencias**       | Pesadas (`@material-tailwind`)         | **Ligeras** (Solo Tailwind Core)                                   |
| **Componentes UI**     | Cajas negras difíciles de personalizar | **Código transparente HTML/CSS**                                   |
| **Configuración**      | Dispersa entre JS y CSS                | **Centralizada en CSS (CSS-First)**                                |
| **Estética**           | Estilos genéricos por defecto          | **Estilos Premium** personalizados (bordes sutiles, glassmorphism) |

El proyecto ahora corre sobre una arquitectura moderna, sin dependencias innecesarias y con una base de código más mantenible y estándar.

---

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
        -   Esto permite que cualquier elemento que use `font-sans` (o que lo herede de él) adopte dinámicamente la fuente seleccionada a través de la variable CSS.

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