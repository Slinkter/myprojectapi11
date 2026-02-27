# Requisitos del Sistema

## 1. Requisitos Funcionales (FR)

### FR-01: Explorar Gatos Aleatorios

**Descripción:** Mostrar una cuadrícula de imágenes aleatorias de gatos obtenidas de TheCatAPI.

| Criterios de Aceptación | Detalle                                                                            |
| ------------------- | --------------------------------------------------------------------------------- |
| Mostrar estado de carga  | Debe aparecer `SkeletonGrid` — mismas columnas y tamaño de tarjeta que el contenido final |
| Animar al llegar  | Las tarjetas entran con escala + desvanecimiento vía Framer Motion                                   |
| Manejar errores de API   | Mostrar `CatErrorHandler` con botón de reintento                                          |
| Sin lógica duplicada  | Las llamadas a la API pasan solo por `catApi.js → catMapper.js → catService.js`              |

### FR-02: Gestión de Favoritos

**Descripción:** Los usuarios guardan y eliminan gatos favoritos a través del endpoint `/favourites` de TheCatAPI.

| Criterios de Aceptación  | Detalle                                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Icono de corazón guarda     | Thunk `saveCat`: POST `/favourites` con `image_id`                           |
| Icono de papelera elimina   | Thunk `deleteCat`: DELETE `/favourites/{favouriteId}`                         |
| Prevención de duplicados | Búsqueda en `Set` memoizada (`O(1)`) en `RandomCatList`                             |
| Estado deshabilitado       | Botón de corazón deshabilitado (lleno, rojo) tras guardar — se rehabilita solo si se elimina |
| Feedback con Toast       | react-hot-toast en éxito y error                                        |

### FR-03: Personalización del Tema

| Criterios de Aceptación  | Detalle                                        |
| -------------------- | --------------------------------------------- |
| Interruptor de cambio        | `IconButton` de Sol/Luna en el encabezado               |
| Persistencia en LocalStorage | `useAppearance` lee la preferencia al montar     |
| Actualización del DOM           | Añade/elimina la clase `dark` en el elemento `<html>` |

### FR-04: Personalización de Tipografía

| Criterios de Aceptación  | Detalle                                                  |
| -------------------- | ------------------------------------------------------- |
| Desplegable de fuentes        | Componente `Select` en el encabezado poblado desde la lista (`list`) de fuentes |
| Aplicación instantánea        | Actualiza la variable CSS `--font-family` en el `<body>`        |
| Persistencia en LocalStorage | Persistido por `useAppearance`                            |

---

## 2. Requisitos No Funcionales (NFR)

### NFR-01: Rendimiento

| Métrica                        | Objetivo                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- |
| FCP (First Contentful Paint)  | < 1.5s en 4G                                                                  |
| CLS (Cumulative Layout Shift) | `0.0` — Los Skeletons deben coincidir exactamente con las dimensiones finales de la tarjeta                    |
| División de código (Code splitting)                | `RandomCatList` y `FavouriteCatList` cargados perezosamente vía `React.lazy`           |
| Memoización                   | `CatCard` envuelto en `React.memo`; `useCats` usa `useMemo` y `useCallback` |

### NFR-02: Usabilidad

| Requisito   | Detalle                                                      |
| ------------- | ----------------------------------------------------------- |
| Responsivo    | Funciona desde 320px (móvil) hasta 1440px+ (escritorio)           |
| Accesibilidad | Todos los elementos interactivos tienen `aria-label`                  |
| Navegación por teclado  | Los botones son enfocables, con anillo de enfoque visible                   |
| Animaciones    | Entrada + salida suaves con `AnimatePresence` de Framer Motion |

### NFR-03: Arquitectura de Código

| Requisito                   | Detalle                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| Sin llamadas directas a API en UI     | Deben pasar por `catService.js`                                        |
| Sin datos crudos de API en componentes | Deben pasar por `catMapper.js`                                         |
| Sin Redux en UI                | Debe pasar por el hook de fachada (facade)                                            |
| 100% JSDoc                    | Todas las funciones, hooks y tipos exportados deben tener `@typedef` y `@param` |
| Tokens semánticos de Tailwind v4   | Usar `bg-muted`, `text-foreground` — nunca valores fijos como `bg-gray-200`       |

### NFR-04: Entorno

| Requisito               | Detalle                                                           |
| ------------------------- | ---------------------------------------------------------------- |
| Variables `.env` requeridas | `VITE_BASE_URL`, `VITE_API_KEY`                                  |
| Validación al iniciar        | `src/config/env.js` valida al cargar y registra errores si faltan |
