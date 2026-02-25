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
| ----------------------- | ----------------- | ----------------- | ----------------- |
| `bg-background`         | Light neutral     | Near-black        | Page background   |
| `bg-card` / `bg-muted`  | White / off-white | Dark gray         | Card surfaces     |
| `text-foreground`       | Near-black        | Near-white        | Primary text      |
| `text-muted-foreground` | Medium gray       | Medium light gray | Secondary text    |
| `border-border`         | Light gray        | Dark gray         | Borders, dividers |

**Accent Colors (not semantic — use sparingly):**

- `text-red-500` — Heart button (saved state), delete hover

---

## 3. Typography

- **Dynamic Font Family:** Controlled via CSS custom property `--font-family` on `<body>`.
- The font list is managed in `src/features/font/context/constants.js`.

| Scale         | Class                               | Usage                    |
| ------------- | ----------------------------------- | ------------------------ |
| App Title     | `text-2xl font-bold tracking-tight` | `<h1>` in header         |
| Section Title | `text-xl font-bold`                 | `<h3>` in `CatList`      |
| Labels        | `text-sm font-medium`               | Select dropdown, buttons |
| Micro text    | `text-[10px] font-mono`             | Cat ID tag on card       |

---

## 4. Component Specifications

### CatCard

| Property         | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| Shape            | `rounded-2xl`                                                  |
| Aspect ratio     | `aspect-square` (1:1)                                          |
| Hover shadow     | `shadow-sm` → `hover:shadow-xl`                                |
| Hover lift       | `hover:-translate-y-1`                                         |
| Image zoom       | `group-hover:scale-105` over `700ms`                           |
| Gradient overlay | Bottom-to-transparent, `opacity-0` → `group-hover:opacity-100` |

### Floating Action Button (CatCardFooter)

| State            | Appearance                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| Default          | Semi-transparent white, outline heart icon                                     |
| Hover            | White, text turns `red-500`                                                    |
| Disabled (saved) | White background, solid filled heart (`BsFillHeartFill`), `cursor-not-allowed` |

**Visibility:** Button is `opacity-0 group-hover:opacity-100` unless `disabled=true` (then always visible).

### Header & Controls

| Component          | Class Highlights                                                             |
| ------------------ | ---------------------------------------------------------------------------- |
| Header             | `sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border` |
| Select (font)      | `rounded-full` native select with custom `BsChevronDown` overlay             |
| IconButton (theme) | `rounded-full p-2.5 border border-border bg-card hover:bg-muted`             |

### Skeleton Loaders (CLS Prevention)

> **Rule:** Skeletons must mirror the **exact** structural dimensions of the content they replace.

| Property       | `CatCard`              | `SkeletonCard`            |
| -------------- | ---------------------- | ------------------------- |
| Border radius  | `rounded-2xl`          | `rounded-2xl` ✅          |
| Aspect ratio   | `aspect-square`        | `aspect-square` ✅        |
| Shadow         | `shadow-sm`            | `shadow-sm` ✅            |
| Background     | `bg-muted`             | `bg-muted` ✅             |
| Inner elements | ID tag + action button | Placeholder rectangles ✅ |

**Grid must match exactly:**

- `CatList` grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- `SkeletonGrid` grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` ✅

---

## 5. Animation Specs (Framer Motion)

| Event              | Config                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Card enter         | `initial={{ opacity:0, scale:0.8 }}` → `animate={{ opacity:1, scale:1 }}`, stagger `index * 0.05s` |
| Card exit          | `exit={{ opacity:0, scale:0.5 }}` over `0.2s`                                                      |
| Grid re-layout     | `<motion.div layout>` — cards slide smoothly into new positions                                    |
| Empty state appear | `initial={{ opacity:0 }}` → `animate={{ opacity:1 }}`                                              |

**Library:** `framer-motion` v12.34.3 — `motion`, `AnimatePresence`, `layout` prop.

---

## 6. CSS Methodology

- **Framework:** Tailwind CSS v4 — utility-first.
- **Import:** `@import "tailwindcss"` in `src/index.css`.
- **PostCSS:** `@tailwindcss/postcss` plugin.
- **Rules:**
  - Prefer semantic design tokens over raw color values.
  - Use `group` / `group-hover` for card interaction states.
  - No CSS-in-JS libraries.
  - Conditional classes via template literals in JSX.
