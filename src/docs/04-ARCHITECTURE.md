# UI Design System & Guidelines

## 1. Filosofía de Diseño

**"Contenido Primero. Minimalismo Pixel-Perfect."**

El diseño prioriza las imágenes de gatos como el elemento visual principal. Todos los controles son:

-   **Contextuales**: Aparecen solo al pasar el ratón por encima (botones de acción, etiqueta de ID).
-   **Discretos**: Visibles persistentemente pero compactos (cabecera fija con menús desplegables).

---

## 2. Sistema de Colores — Tokens Semánticos de Tailwind CSS v4

> ⚠️ **Regla:** Nunca uses colores hardcodeados de Tailwind como `bg-gray-200` o `dark:bg-gray-800`. Usa siempre tokens semánticos que se adapten al tema activo.

| Token                   | Modo Claro        | Modo Oscuro       | Uso                 |
| :---------------------- | :---------------- | :---------------- | :------------------ |
| `bg-background`         | Neutral claro     | Negro cercano     | Fondo de página     |
| `bg-card` / `bg-muted`  | Blanco / blanquecino | Gris oscuro       | Superficies de tarjetas |
| `text-foreground`       | Negro cercano     | Blanco cercano    | Texto principal     |
| `text-muted-foreground` | Gris medio        | Gris claro oscuro | Texto secundario    |
| `border-border`         | Gris claro        | Gris oscuro       | Bordes, divisores   |

**Colores de Acento (no semánticos — usar con moderación):**

*   `text-red-500` — Botón de corazón (estado guardado), hover de eliminación.

---

## 3. Tipografía

*   **Familia de Fuentes Dinámica:** Controlada vía propiedad CSS custom `--font-family` en `<body>`.
*   La lista de fuentes se gestiona en `src/features/font/context/constants.js`.

| Escala         | Clase                               | Uso                    |
| :------------- | :---------------------------------- | :--------------------- |
| Título App     | `text-2xl font-bold tracking-tight` | `<h1>` en cabecera       |
| Título Sección | `text-xl font-bold`                 | `<h3>` en `CatList`      |
| Etiquetas      | `text-sm font-medium`               | Dropdown Select, botones |
| Texto Micro    | `text-[10px] font-mono`             | Etiqueta ID gato en tarjeta |

---

## 4. Especificaciones de Componentes

### CatCard

| Propiedad     | Valor                                                          |
| :------------ | :------------------------------------------------------------- |
| Forma         | `rounded-2xl`                                                  |
| Relación Asp. | `aspect-square` (1:1)                                          |
| Sombra Hover  | `shadow-sm` → `hover:shadow-xl`                                |
| Elevación Hover| `hover:-translate-y-1`                                         |
| Zoom Imagen   | `group-hover:scale-105` sobre `700ms`                          |
| Gradiente     | De abajo a transparente, `opacity-0` → `group-hover:opacity-100` |

### Floating Action Button (CatCardFooter)

| Estado            | Apariencia                                                                     |
| :---------------- | :----------------------------------------------------------------------------- |
| Por Defecto       | Blanco semitransparente, icono de corazónOutline                               |
| Hover             | Blanco, texto se vuelve `red-500`                                              |
| Deshabilitado (guardado) | Fondo blanco, corazón relleno sólido (`BsFillHeartFill`), `cursor-not-allowed` |

**Visibilidad:** El botón es `opacity-0 group-hover:opacity-100` a menos que `disabled=true` (entonces siempre visible).

### Cabecera y Controles

| Componente       | Clases Destacadas                                                            |
| :--------------- | :--------------------------------------------------------------------------- |
| Cabecera         | `sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border` |
| Select (fuente)  | `rounded-full` select nativo con overlay `BsChevronDown` custom              |
| IconButton (tema)| `rounded-full p-2.5 border border-border bg-card hover:bg-muted`             |

### Skeleton Loaders (Prevención de CLS)

> **Regla:** Los skeletons deben replicar las **dimensiones estructurales exactas** del contenido que reemplazan.

| Propiedad      | `CatCard`              | `SkeletonCard`            |
| :------------- | :--------------------- | :------------------------ |
| Borde Radio    | `rounded-2xl`          | `rounded-2xl` ✅          |
| Relación Asp.  | `aspect-square`        | `aspect-square` ✅        |
| Sombra         | `shadow-sm`            | `shadow-sm` ✅            |
| Fondo          | `bg-muted`             | `bg-muted` ✅             |
| Elementos Int. | Etiqueta ID + botón acción | Rectángulos placeholder ✅ |

**La rejilla debe coincidir exactamente:**

*   Rejilla `CatList`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
*   Rejilla `SkeletonGrid`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` ✅

---

## 5. Especificaciones de Animación (Framer Motion)

| Evento             | Config                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| Entrada Tarjeta    | `initial={{ opacity:0, scale:0.8 }}` → `animate={{ opacity:1, scale:1 }}`, stagger `index * 0.05s` |
| Salida Tarjeta     | `exit={{ opacity:0, scale:0.5 }}` sobre `0.2s`                                                     |
| Re-layout Rejilla  | `<motion.div layout>` — tarjetas se deslizan suavemente a nuevas posiciones                          |
| Aparición Estado Vacío | `initial={{ opacity:0 }}` → `animate={{ opacity:1 }}`                                              |

**Librería:** `framer-motion` v12.34.3 — `motion`, `AnimatePresence`, prop `layout`.

---

## 6. Metodología CSS

*   **Framework:** Tailwind CSS v4 — utility-first.
*   **Importación:** `@import "tailwindcss"` en `src/index.css`.
*   **PostCSS:** Plugin `@tailwindcss/postcss`.
*   **Reglas:**
    *   Preferir tokens de diseño semánticos sobre valores de color crudos.
    *   Usar `group` / `group-hover` para estados de interacción de tarjetas.
    *   No usar librerías CSS-in-JS.
    *   Clases condicionales mediante template literals en JSX.

---

## 7. Hooks y Componentes Compartidos (shared/)

### A. Hooks Utilitarios

*   **`useAppearance`:**
    *   **Responsabilidad:** Sincroniza el estado global de Redux (`theme.mode`, `font.family`) con el DOM (`<html>` classes, CSS variables) y `localStorage` para persistencia. Maneja efectos secundarios globales relacionados con la apariencia del usuario.
    *   **Principios SOLID:** Cumple SRP al centrarse en la aplicación y persistencia de configuraciones de apariencia.
    *   **Desacoplamiento:** Aísla la lógica de efectos globales del resto de la aplicación.
*   **`usePageTitle`:**
    *   **Responsabilidad:** Gestiona de forma segura el título del documento del navegador, estableciéndolo y restaurándolo al valor anterior al desmontarse.
    *   **Principios SOLID:** Cumple SRP al dedicarse exclusivamente a la gestión del título.
    *   **Desacoplamiento:** Es reutilizable y no tiene dependencias complejas.

### B. Componentes UI Compartidos

*   **`IconButton`:**
    *   **Responsabilidad:** Un botón circular optimizado para contener iconos. Proporciona estilo consistente, manejo de eventos, `ariaLabel` para accesibilidad y estados de hover/focus.
    *   **Estándares:** Usa `rounded-full`, `p-2.5`, `border`, `bg-card`, `hover:bg-muted`, y `focus:ring-primary/30`. Asegura tamaño de icono consistente (`w-6 h-6`).
*   **`Select`:**
    *   **Responsabilidad:** Un dropdown nativo estilizado usando Tailwind CSS, permitiendo una apariencia consistente.
*   **Skeleton Loaders (`SkeletonCard`, `SkeletonGrid`, `CatListSkeleton`):**
    *   **Responsabilidad:** Proveen placeholders visuales durante la carga de contenido para prevenir cambios de layout (CLS).
    *   **Regla Crucial:** Replicán las dimensiones y estructura exactas del contenido que representan, asegurando una experiencia de usuario fluida y predecible.
    *   **Estándares:** Usan Tailwind CSS para espaciado (`gap-6`) y formas (`rounded-2xl`, `aspect-square`), animaciones (`animate-pulse`), y colores semánticos (`bg-muted`).

---

## 8. Oportunidades de Refactorización y Desacoplamiento Adicional

Si bien la arquitectura es robusta, la mejora continua es clave. Aquí hay áreas para una posible refactorización futura:

### A. Estructura de la Feature `font` (`context` vs. `redux`)

*   **Observación:** La feature `font` incluye carpetas `redux` (`fontSlice.js`) y `context` (`constants.js`). El archivo `constants.js` contiene la lista de fuentes disponibles.
*   **Análisis:** La carpeta `context` parece contener principalmente datos estáticos. Si `constants.js` solo sirve como fuente de datos para `fontSlice.js` y no se usa para un Context API de React, podría simplificarse.
*   **Recomendación:** Aclarar el propósito de la carpeta `context`. Si es solo para constantes, considerar mover `constants.js` junto a `fontSlice.js` o importarlo directamente allí. Esto consolidaría la lógica de la feature y reduciría la complejidad de la estructura de carpetas si `context` no se usa para providers de runtime.

### B. Granularidad de Efectos Globales (`useAppearance`)

*   **Observación:** El hook `useAppearance` consolida la lógica de tema, fuente y persistencia en `localStorage`.
*   **Análisis:** Actualmente, esta consolidación es razonable para efectos globales relacionados con la apariencia.
*   **Recomendación:** Mantenerlo vigilado. Si se añaden más ajustes globales de apariencia o configuración del usuario, evaluar si separar la lógica en hooks más específicos (ej. `useThemePersistence`, `useFontPersistence`) podría mejorar el Principio de Única Responsabilidad (SRP), aunque la implementación actual es limpia.

### C. Granularidad de los Slices de Redux

*   **Observación:** Los slices actuales (`cats`, `theme`, `font`) parecen bien definidos.
*   **Recomendación:** A medida que la aplicación crezca, evaluar continuamente si algún slice se vuelve demasiado grande y podría beneficiarse de una división.

---

Este documento busca servir como un "Blueprint" técnico detallado, explicando las decisiones arquitectónicas y de diseño tomadas, y proporcionando una guía clara para el desarrollo futuro.
