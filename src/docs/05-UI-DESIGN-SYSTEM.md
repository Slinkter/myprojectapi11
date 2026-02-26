# UI Design System & Guidelines

## 1. Design Philosophy

**"Content First. Pixel-Perfect Minimalism."**

The design prioritizes the cat images as the primary visual element. All controls are either:

- **Contextual** — appear only on hover (action buttons, ID tag).
- **Unobtrusive** — persistently visible but compact (sticky header with dropdowns).

---

## 2. Color System — Tailwind CSS v4 Semantic Tokens

> ⚠️ **Rule:** Never use hardcoded Tailwind colors like `bg-gray-200` or `dark:bg-gray-800`. Always use semantic tokens that adapt to the active theme.

| Token                   | Light Mode        | Dark Mode         | Usage             |
| :---------------------- | :---------------- | :---------------- | :---------------- |
| `bg-background`         | Light neutral     | Near-black        | Page background   |
| `bg-card` / `bg-muted`  | White / off-white | Dark gray         | Card surfaces     |
| `text-foreground`       | Near-black        | Near-white        | Primary text      |
| `text-muted-foreground` | Medium gray       | Medium light gray | Secondary text    |
| `border-border`         | Light gray        | Dark gray         | Borders, dividers |

**Accent Colors (not semantic — use sparingly):**

- `text-red-500` — Heart button (saved state), delete hover.

---

## 3. Typography

- **Dynamic Font Family:** Controlled via CSS custom property `--font-family` on `<body>`, managed by the `useAppearance` hook which reads from Redux state (`font.family`).
- The list of available font families is managed in `src/features/font/redux/fontConstants.js` and reflected in the Redux state `font.list`.

| Scale         | Class                               | Usage                    |
| :------------ | :---------------------------------- | :----------------------- |
| App Title     | `text-2xl font-bold tracking-tight` | `<h1>` in header         |
| Section Title | `text-xl font-bold`                 | `<h3>` in `CatList`      |
| Labels        | `text-sm font-medium`               | Select dropdown, buttons |
| Micro text    | `text-[10px] font-mono`             | Cat ID tag on card       |

---

## 4. Component Specifications

### CatCard

| Property         | Value                                                          |
| :--------------- | :------------------------------------------------------------- |
| Shape            | `rounded-2xl`                                                  |
| Aspect ratio     | `aspect-square` (1:1)                                          |
| Hover shadow     | `shadow-sm` → `hover:shadow-xl`                                |
| Hover lift       | `hover:-translate-y-1`                                         |
| Image zoom       | `group-hover:scale-105` over `700ms`                           |
| Gradient overlay | Bottom-to-transparent, `opacity-0` → `group-hover:opacity-100` |

### Floating Action Button (CatCardFooter)

| State            | Appearance                                                                     |
| :--------------- | :----------------------------------------------------------------------------- |
| Default          | Semi-transparent white, outline heart icon                                     |
| Hover            | White, text turns `red-500`                                                    |
| Disabled (saved) | White background, solid filled heart (`BsFillHeartFill`), `cursor-not-allowed` |

**Visibility:** Button is `opacity-0 group-hover:opacity-100` unless `disabled=true` (then always visible).

### Header & Controls

| Component          | Class Highlights                                                             |
| :----------------- | :--------------------------------------------------------------------------- |
| Header             | `sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border` |
| Select (font)      | `rounded-full` native select with custom `BsChevronDown` overlay             |
| IconButton (theme) | `rounded-full p-2.5 border border-border bg-card hover:bg-muted`             |

### Skeleton Loaders (CLS Prevention)

> **Rule:** Skeletons must mirror the **exact** structural dimensions and styling of the content they replace to prevent Cumulative Layout Shift (CLS).

| Property       | `CatCard`              | `SkeletonCard`            |
| :------------- | :--------------------- | :------------------------ |
| Border radius  | `rounded-2xl`          | `rounded-2xl` ✅          |
| Aspect ratio   | `aspect-square`        | `aspect-square` ✅        |
| Shadow         | `shadow-sm`            | `shadow-sm` ✅            |
| Background     | `bg-muted`             | `bg-muted` ✅             |
| Inner elements | ID tag + action button | Placeholder rectangles ✅ |

**The grid structure must match exactly:**

- `CatList` grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- `SkeletonGrid` grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` ✅

---

## 5. Animation Specs (Framer Motion)

| Event              | Config                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| Card enter         | `initial={{ opacity:0, scale:0.8 }}` → `animate={{ opacity:1, scale:1 }}`, stagger `index * 0.05s` |
| Card exit          | `exit={{ opacity:0, scale:0.5 }}` over `0.2s`                                                      |
| Grid re-layout     | `<motion.div layout>` — cards slide smoothly into new positions                                    |
| Empty state appear | `initial={{ opacity:0 }}` → `animate={{ opacity:1 }}`                                              |

**Library:** `framer-motion` v12.34.3 — Utilizado para `motion`, `AnimatePresence`, y prop `layout`.

---

## 6. Methodology CSS

- **Framework:** Tailwind CSS v4 — utility-first.
- **Importación:** `@import "tailwindcss"` en `src/index.css`.
- **PostCSS:** Configurado con el plugin `@tailwindcss/postcss`.
- **Reglas Clave:**
  - Preferir tokens de diseño semánticos (ej. `bg-card`, `text-foreground`) sobre valores de color crudos para consistencia temática.
  - Usar clases `group` y `group-hover` para gestionar estados de interacción de componentes anidados (ej. `CatCard` y su `CatCardFooter`).
  - No se utilizan librerías CSS-in-JS.
  - Conditional classes are managed using the `@shared/utils/cn` utility (powered by `clsx` and `tailwind-merge`) for clean logic and style conflict resolution.

---

## 7. Hooks y Componentes Compartidos (`shared/`)

### A. Hooks Utilitarios

- **`useAppearance`:**
  - **Responsabilidad:** Sincroniza el estado global de Redux (`theme.mode`, `font.family`) con el DOM (`<html>` classes, CSS variables `--font-family`) y `localStorage` para persistencia. Centraliza efectos secundarios globales relacionados con la configuración de apariencia del usuario.
  - **Principios SOLID:** Cumple con SRP al enfocar su responsabilidad en la aplicación y persistencia de configuraciones de apariencia.
  - **Desacoplamiento:** Aísla la lógica de efectos globales de la aplicación.
- **`usePageTitle`:**
  - **Responsabilidad:** Gestiona de forma segura el título del documento del navegador. Establece el título proporcionado y lo restaura al valor anterior al desmontarse el componente.
  - **Principios SOLID:** Cumple SRP al dedicarse exclusivamente a la gestión del título del documento.

### B. Componentes UI Compartidos

- **`IconButton`:**
  - **Responsabilidad:** Botón circular optimizado para iconos. Proporciona estilo consistente (`rounded-full`, `p-2.5`, `border`, `bg-card`, `hover:bg-muted`, `focus:ring-primary/30`), manejo de eventos, `ariaLabel` para accesibilidad, y asegura un tamaño de icono consistente (`w-6 h-6`).
- **`Select`:**
  - **Responsabilidad:** Un dropdown nativo estilizado con Tailwind CSS, ofreciendo una apariencia uniforme.
- **Skeleton Loaders (`SkeletonCard`, `SkeletonGrid`, `CatListSkeleton`):**
  - **Responsabilidad:** Proveen placeholders visuales durante la carga de contenido para prevenir cambios de layout (CLS).
  - **Regla Crucial:** Replicán las dimensiones y estructura exactas del contenido que representan (ej. `CatCard`, la rejilla de `CatList`).
  - **Estándares:** Utilizan Tailwind CSS para espaciado (`gap-6`), formas (`rounded-2xl`, `aspect-square`), animaciones (`animate-pulse`) y colores semánticos (`bg-muted`).

---

Este documento se actualiza continuamente para reflejar las mejores prácticas y la evolución del diseño y la arquitectura del proyecto.
