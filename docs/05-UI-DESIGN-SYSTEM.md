# UI Design System & Guidelines

## 1. Design Philosophy
**"Content First, Minimal Interface."**
The design focuses on displaying high-quality images with minimal distraction. Controls are contextual (hover effects) or unobtrusive (sticky header).

## 2. Color Palette (Tailwind CSS)

### Light Mode
*   **Background:** `bg-gray-100` (#F3F4F6)
*   **Surface:** `bg-white` (#FFFFFF)
*   **Text Primary:** `text-gray-900` (#111827)
*   **Accent:** `text-red-500` (Favorites)

### Dark Mode
*   **Background:** `dark:bg-gray-900` (#111827)
*   **Surface:** `dark:bg-gray-800` (#1F2937)
*   **Text Primary:** `dark:text-white` (#FFFFFF)
*   **Text Secondary:** `dark:text-gray-400` (#9CA3AF)

## 3. Typography
*   **Dynamic Font Family:** Controlled via CSS variable `--font-family`.
*   **Scale:**
    *   H1: `text-2xl font-bold` (Header)
    *   H3: `text-xl font-semibold` (Section Titles)
    *   Body: `text-base` / `text-sm`

## 4. Component Guidelines

### Buttons
*   **Icon Buttons:** Circular `rounded-full`, `p-2`.
*   **States:** `hover:bg-gray-100` (Light) / `dark:hover:bg-gray-700` (Dark).
*   **Accessibility:** All buttons must have `aria-label`.

### Cards (`CatCard`)
*   **Shape:** `rounded-xl`.
*   **Shadow:** `shadow-md`.
*   **Interaction:**
    *   Zoom interaction on `group-hover`.
    *   Overlay appears with `opacity-100`.

### Loading States (`Skeletons`)
*   Use `animate-pulse`.
*   Match the exact dimensions of the content they replace (`aspect-square`).

## 5. CSS Methodology
We use **Utility-First CSS** (Tailwind).
*   **Constraints:** Avoid arbitrary values (e.g., `w-[357px]`) unless absolutely necessary. Stick to the design tokens (`w-64`, `p-4`).
*   **Grouping:** Use `classnames` or template literals for conditional styling, but prefer keeping logic in JS/JSX.
