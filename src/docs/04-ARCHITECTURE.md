# Technical Blueprint & Architecture (Engineering Reverse)

> **Role:** Lead Software Architect
> **Metodología:** Feature-Sliced Design (FSD) + Facade Pattern
> **Estado:** Documentación Técnica de Alta Fidelidad

---

## 1. Análisis de Capas Traducido a FSD

El proyecto sigue una estructura de **Ingeniería Basada en Características (Feature-Based Architecture)**, optimizada para escalabilidad y desacoplamiento.

### Estructura de Capas (Top-Down):

1.  **App (`src/app/`)**: Inicialización de Redux Store y configuración global.
2.  **Features (`src/features/`)**: Módulos de dominio con lógica de negocio aislada.
3.  **Shared (`src/shared/`)**: Utilidades genéricas, componentes UI básicos y hooks de infraestructura.

---

## 2. Ingeniería de Features (Análisis por Módulo)

### 🐾 A. Feature: `cats` (Gestión de Galería)

Es el núcleo de la aplicación. Maneja datos asíncronos de una API externa con transformaciones de dominio.

#### Diagrama Estructural (ASCII):

```text
[App.jsx]
      |
[DataInitializer] -> usePreloadCats (data-on-mount)
      |
[Vistas/Contenedores]
      RandomCatList / FavouriteCatList
              |
[Presentacionales]
      CatList -> CatCard -> CatCardFooter
              |
[Componentes Shared]
      EmptyState, SkeletonGrid, ErrorBoundary
              |
[Lógica de Negocio (Facade)]
           useCats (Hook)
              |
[Estado/Persistencia]
      catsSlice (Redux) <-> API (catApi) <-> Mapper (catMapper)
```

#### Mapa de Dependencias:

- **`DataInitializer`**: Componente dedicado que ejecuta `usePreloadCats` al montar la app. Separa la lógica de datos del componente raíz `App.jsx`.
- **`usePreloadCats`**: Hook centralizado que carga los datos al iniciar la app. Carga **Random Cats** primero, luego **Favourites** (orden secuencial para mejor UX).
- **`RandomCatList` / `FavouriteCatList`**: Componentes puros que solo renderizan datos del store. No disparan cargas.
- **`CatList` / `CatCard`**: Componentes presentacionales. Reciben datos y callbacks vía `props`. No conocen Redux.
- **`CatCardFooter`**: Usa la utilidad `cn` para orquestar estados visuales basados en `disabled` y `actionType`.
- **`EmptyState`**: Componente reutilizable para mostrar mensajes cuando no hay contenido.
- **`LazyMotion`**: Configuración de framer-motion con `domAnimation` para reducir bundle size.

#### Lógica de Hooks (SOLID):

- **`useCats`**: Actúa como una **Facade**. Su única responsabilidad es orquestar la comunicación entre los componentes y el Store de Redux. Expone una interfaz limpia ocultando la complejidad de `dispatch`, `useSelector` y `unwrap`.
- **`usePreloadCats`**: Hook de infraestructura que ejecuta el prefetching de datos. Implementa el patrón **data-on-mount** para evitar layout shift.
- **`useCallback`**: Utilizado en `useTheme` para mantener referencias estables de funciones.

---

### 🎨 B. Feature: `theme` (Gestión de Apariencia)

Maneja el estado visual global (Light/Dark).

#### Diagrama Estructural (ASCII):

```text
ThemeToggleButton
      |
  useTheme (Hook)
      |
 themeSlice (Redux)
```

#### Mapa de Dependencias:

- **`ThemeToggleButton`**: Único consumidor de `useTheme`. Al ejecutarse, dispara un cambio en Redux que es escuchado globalmente.

---

### 🔡 C. Feature: `font` (Gestión Tipográfica)

Controla la familia de fuentes activa de forma dinámica.

#### Diagrama Estructural (ASCII):

```text
FontDropdown
      |
  useFont (Hook)
      |
 fontSlice (Redux) <-> fontConstants (Config)
```

#### Mapa de Dependencias:

- **`FontDropdown`**: Usa `useFont` para obtener la lista de fuentes disponibles y la función de cambio.
- **`fontSlice`**: Centraliza la validación (asegurando que solo fuentes registradas en `fontConstants` sean aplicadas).

---

## 3. Capa Shared: Infraestructura y Efectos

### ⚓ Hooks de Infraestructura (Efectos Globales)

- **`useAppearance`**:
  - **Responsabilidad:** Sincronización del DOM. Escucha cambios en `theme` y `font` de Redux para inyectar clases en `<html>` y variables CSS (`--font-family`).
  - **SOLID:** SRP (Single Responsibility Principle) al 100%. Solo se encarga de efectos secundarios visuales raíz.
- **`usePageTitle`**: Encapsula la gestión del `document.title` con limpieza automática (cleanup).

### 🛠 Utilidades de Arquitectura

- **`cn` (Utility Engine):**
  - Usa `clsx` + `tailwind-merge`.
  - **¿Por qué?:** En una arquitectura de componentes, necesitamos que los estilos base puedan ser sobreescritos por los padres de forma segura. `cn` resuelve los conflictos de cascada de Tailwind de forma determinista.

---

## 4. Cumplimiento de Estándares (Audit)

| Estándar            | Estado | Observación                                                                                                                     |
| :------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| **PascalCase**      | ✅     | Utilizado rigurosamente en Componentes (`CatCard.jsx`, `IconButton.jsx`).                                                       |
| **camelCase**       | ✅     | Utilizado en Hooks (`useCats.js`) y utilidades.                                                                                 |
| **Desacoplamiento** | 💎     | **Excelente.** Ningún componente de la carpeta `shared` depende de `features`. Las features solo se comunican vía Redux/Facade. |
| **Clean Code**      | ✅     | Los componentes son pequeños (SFC - Stateless Functional Components) y la lógica pesada vive en Hooks.                          |

---

## 5. Blueprint para Desarrolladores (Quick Guide)

1.  **¿Quieres crear una funcionalidad nueva?**
    - Crea una carpeta en `src/features/tu-funcionalidad`.
    - Define un `redux/slice` si hay estado global.
    - Crea un `hooks/use-funcionalidad.js` como fachada.
    - Solo entonces, crea tus componentes.
2.  **¿Regla de Oro?**
    - Si usas un _template literal_ complejo para clases, usa `cn()`.
    - Si ves un componente con un `useEffect` complejo, extráelo a un Custom Hook.

---

> _Este documento es el 'Libro de Leyes' técnico del proyecto. Cada cambio arquitectónico debe ser reflejado aquí._
