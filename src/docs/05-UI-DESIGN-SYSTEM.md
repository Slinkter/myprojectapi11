# Sistema de Diseño UI y Guías

## 1. Filosofía de Diseño

**"El Contenido Primero. Minimalismo de Alta Precisión."**

El diseño prioriza las imágenes de gatos como el elemento visual principal. Todos los controles son:

- **Contextuales** — aparecen solo al pasar el ratón (botones de acción, etiqueta de ID).
- **No intrusivos** — persistentemente visibles pero compactos (encabezado fijo con desplegables).

---

## 2. Sistema de Color — Tokens Semánticos de Tailwind CSS v4

> ⚠️ **Regla:** Nunca uses colores de Tailwind fijos como `bg-gray-200` o `dark:bg-gray-800`. Usa siempre tokens semánticos que se adapten al tema activo.

| Token                   | Modo Claro        | Modo Oscuro         | Uso             |
| :---------------------- | :---------------- | :---------------- | :---------------- |
| `bg-background`         | Neutral claro     | Casi negro        | Fondo de página   |
| `bg-card` / `bg-muted`  | Blanco / hueso    | Gris oscuro         | Superficies de tarjetas |
| `text-foreground`       | Casi negro        | Casi blanco        | Texto primario      |
| `text-muted-foreground` | Gris medio       | Gris claro medio | Texto secundario    |
| `border-border`         | Gris claro        | Gris oscuro         | Bordes, divisores |

**Colores de Acento (no semánticos — usar con moderación):**

- `text-red-500` — Botón de corazón (estado guardado), hover de eliminar.

---

## 3. Tipografía

- **Familia de Fuentes Dinámica:** Controlada a través de la propiedad personalizada CSS `--font-family` en el `<body>`, gestionada por el hook `useAppearance` que lee del estado de Redux (`font.family`).
- La lista de familias de fuentes disponibles se gestiona en `src/features/font/redux/fontConstants.js` y se refleja en el estado de Redux `font.list`.

| Escala         | Clase                               | Uso                    |
| :------------ | :---------------------------------- | :----------------------- |
| Título App     | `text-2xl font-bold tracking-tight` | `<h1>` en el encabezado         |
| Título Sección | `text-xl font-bold`                 | `<h3>` en `CatList`      |
| Etiquetas        | `text-sm font-medium`               | Desplegable Select, botones |
| Micro texto    | `text-[10px] font-mono`             | Etiqueta ID de gato en tarjeta |

---

## 4. Especificaciones de Componentes

### CatCard (Tarjeta de Gato)

| Propiedad         | Valor                                                          |
| :--------------- | :------------------------------------------------------------- |
| Forma            | `rounded-2xl`                                                  |
| Relación de aspecto     | `aspect-square` (1:1)                                          |
| Sombra al pasar el ratón     | `shadow-sm` → `hover:shadow-xl`                                |
| Elevación al pasar el ratón       | `hover:-translate-y-1`                                         |
| Zoom de imagen       | `group-hover:scale-105` durante `700ms`                           |
| Overlay degradado | De abajo a transparente, `opacity-0` → `group-hover:opacity-100` |

### Botón de Acción Flotante (CatCardFooter)

| Estado            | Apariencia                                                                     |
| :--------------- | :----------------------------------------------------------------------------- |
| Defecto          | Blanco semitransparente, icono de contorno de corazón                                     |
| Hover            | Blanco, el texto se vuelve `red-500`                                                    |
| Deshabilitado (guardado) | Fondo blanco, corazón sólido relleno (`BsFillHeartFill`), `cursor-not-allowed` |

**Visibilidad:** El botón tiene `opacity-0 group-hover:opacity-100` a menos que `disabled=true` (entonces siempre visible).

### Encabezado y Controles

| Componente          | Clase Destacada                                                             |
| :----------------- | :--------------------------------------------------------------------------- |
| Encabezado             | `sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border` |
| Select (fuente)      | Select nativo `rounded-full` con overlay personalizado `BsChevronDown`             |
| IconButton (tema) | `rounded-full p-2.5 border border-border bg-card hover:bg-muted`             |

### Cargadores Skeleton (Prevención de CLS)

> **Regla:** Los Skeletons deben reflejar las dimensiones estructurales **exactas** y el estilo del contenido que reemplazan para prevenir el Salto de Diseño Acumulado (CLS).

| Propiedad       | `CatCard`              | `SkeletonCard`            |
| :------------- | :--------------------- | :------------------------ |
| Radio de borde  | `rounded-2xl`          | `rounded-2xl` ✅          |
| Relación de aspecto   | `aspect-square`        | `aspect-square` ✅        |
| Sombra         | `shadow-sm`            | `shadow-sm` ✅            |
| Fondo     | `bg-muted`             | `bg-muted` ✅             |
| Elementos internos | Etiqueta ID + botón de acción | Rectángulos de posición ✅ |

**La estructura de la cuadrícula debe coincidir exactamente:**

- Cuadrícula de `CatList`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Cuadrícula de `SkeletonGrid`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` ✅

---

## 5. Especificaciones de Animación (Framer Motion)

| Evento              | Configuración                                                                                             |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| Entrada de tarjeta         | `initial={{ opacity:0, scale:0.8 }}` → `animate={{ opacity:1, scale:1 }}`, escalonado `index * 0.05s` |
| Salida de tarjeta          | `exit={{ opacity:0, scale:0.5 }}` durante `0.2s`                                                      |
| Re-layout de cuadrícula     | `<motion.div layout>` — las tarjetas se deslizan suavemente a sus nuevas posiciones                                    |
| Aparición de estado vacío | `initial={{ opacity:0 }}` → `animate={{ opacity:1 }}`                                              |

**Librería:** `framer-motion` v12.34.3 — Utilizada para `motion`, `AnimatePresence`, y la prop `layout`.

---

## 6. Metodología CSS

- **Framework:** Tailwind CSS v4 — orientado a utilidades.
- **Importación:** `@import "tailwindcss"` en `src/index.css`.
- **PostCSS:** Configurado con el plugin `@tailwindcss/postcss`.
- **Reglas Clave:**
  - Preferir tokens de diseño semánticos (ej. `bg-card`, `text-foreground`) sobre valores de color crudos para consistencia temática.
  - Usar clases `group` y `group-hover` para gestionar estados de interacción de componentes anidados (ej. `CatCard` y su `CatCardFooter`).
  - No se utilizan librerías CSS-in-JS.
  - Las clases condicionales se gestionan utilizando la utilidad `@shared/utils/cn` (impulsada por `clsx` y `tailwind-merge`) para una lógica limpia y resolución de conflictos de estilo.

---

## 7. Hooks y Componentes Compartidos (`shared/`)

### A. Hooks Utilitarios

- **`useAppearance`:**
  - **Responsabilidad:** Sincroniza el estado global de Redux (`theme.mode`, `font.family`) con el DOM (clases `<html>`, variables CSS `--font-family`) y `localStorage` para persistencia. Centraliza los efectos secundarios globales relacionados con la configuración de apariencia del usuario.
  - **Principios SOLID:** Cumple con SRP al enfocar su responsabilidad en la aplicación y persistencia de las configuraciones de apariencia.
  - **Desacoplamiento:** Aísla la lógica de efectos globales de la aplicación.
- **`usePageTitle`:**
  - **Responsabilidad:** Gestiona de forma segura el título del documento del navegador. Establece el título proporcionado y lo restaura al valor anterior al desmontarse el componente.
  - **Principios SOLID:** Cumple SRP al dedicarse exclusivamente a la gestión del título del documento.

### B. Componentes UI Compartidos

- **`IconButton`:**
  - **Responsabilidad:** Botón circular optimizado para iconos. Proporciona un estilo consistente (`rounded-full`, `p-2.5`, `border`, `bg-card`, `hover:bg-muted`, `focus:ring-primary/30`), manejo de eventos, `ariaLabel` para accesibilidad, y asegura un tamaño de icono consistente (`w-6 h-6`).
- **`Select`:**
  - **Responsabilidad:** Un desplegable nativo estilizado con Tailwind CSS, ofreciendo una apariencia uniforme.
- **Skeleton Loaders (`SkeletonCard`, `SkeletonGrid`, `CatListSkeleton`):**
  - **Responsabilidad:** Proporcionan marcadores de posición visuales durante la carga de contenido para prevenir cambios de diseño (CLS).
  - **Regla Crucial:** Replican las dimensiones y estructura exactas del contenido que representan (ej. `CatCard`, la cuadrícula de `CatList`).
  - **Estándares:** Utilizan Tailwind CSS para espaciado (`gap-6`), formas (`rounded-2xl`, `aspect-square`), animaciones (`animate-pulse`) y colores semánticos (`bg-muted`).

---

Este documento se actualiza continuamente para reflejar las mejores prácticas y la evolución del diseño y la arquitectura del proyecto.
