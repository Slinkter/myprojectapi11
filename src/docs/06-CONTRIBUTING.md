# Estándares de Contribución y Desarrollo

## 1. Stack Tecnológico (Leer Antes de Programar)

| Herramienta            | Versión | Nota                       |
| --------------- | ------- | -------------------------- |
| Node.js         | 18+     | Requerido                   |
| Gestor de paquetes | pnpm    | **Ni npm ni yarn**        |
| React           | 19.2.3  | Usa runtime automático de JSX |
| Vite            | 7.3.0   | Servidor de desarrollo y empaquetador     |
| Tailwind        | v4.1.18 | Configuración diferente a la v3   |

---

## 2. Estilo de Código

- **Lenguaje:** JavaScript (ES6+). Sin TypeScript — pero se requiere 100% de tipado con JSDoc.
- **Formateo:** Prettier (ajustes por defecto).
- **Linting:** ESLint — **0 advertencias permitidas** en compilaciones de CI y producción.

Ejecuta lint antes de subir cambios:

```bash
pnpm run lint
```

---

## 3. Convenciones de Nombres (Estricto)

### Archivos y Directorios

| Tipo             | Convención                          | Ejemplo          |
| ---------------- | ----------------------------------- | ---------------- |
| Componentes       | `PascalCase.jsx`                    | `CatCard.jsx`    |
| Hooks            | prefijo `use`, `camelCase.js`        | `useCats.js`     |
| Servicios         | `camelCase.js`                      | `catService.js`  |
| Mappers/Adapters | `camelCase.js` con sufijo `Mapper` | `catMapper.js`   |
| Slices de Redux     | `camelCase.js` con sufijo `Slice`  | `catsSlice.js`   |
| Directorios      | `camelCase`                         | `subcomponents/` |

### Variables y Tipos

| Tipo                | Convención                     | Ejemplo                 |
| ------------------- | ------------------------------ | ----------------------- |
| Variables           | `camelCase`                    | `randomCats`            |
| Booleanos            | prefijos `is`, `has`, `should`   | `isLoading`, `hasError` |
| Entidades de dominio     | `PascalCase` + sufijo `Entity` | `CatEntity`             |
| Tipos de retorno de Fachada | `PascalCase` + sufijo `Facade` | `UseCatsFacade`         |

---

## 4. Estándar JSDoc (Obligatorio)

Todas las funciones, hooks, tipos y props de componentes exportados **deben** estar documentados.

### Regla 1 — Nunca usar `@param {object}` genérico para datos de dominio

❌ Incorrecto:

```jsx
/**  @param {object} props.cat */
```

✅ Correcto:

```jsx
/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */
/**  @param {CatEntity} props.cat - La entidad de dominio de gato normalizada. */
```

### Regla 2 — Tipar todos los valores de retorno de la Fachada

```javascript
/**
 * @typedef {Object} UseCatsFacade
 * @property {CatEntity[]} randomCats
 * @property {CatEntity[]} favouriteCats
 * @property {Object} loading
 * @property {boolean} loading.random
 * @property {boolean} loading.saving
 * @property {string|null} error
 * @property {function(): void} loadRandomCats
 * @property {function(CatEntity): Promise<void>} saveFavouriteCat
 * @property {function(CatEntity): Promise<void>} deleteFavouriteCat
 */

/**
 * Hook de fachada para operaciones de gatos.
 * @returns {UseCatsFacade}
 */
export const useCats = () => { ... };
```

### Regla 3 — Tipar los manejadores de eventos de React explícitamente

```jsx
/** @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onClick */
/** @param {import('react').ChangeEventHandler<HTMLSelectElement>} props.onChange */
```

---

## 5. Reglas de Arquitectura

| Regla                                         | Por Qué                                                 |
| -------------------------------------------- | --------------------------------------------------- |
| Sin `fetch()` en componentes                   | Usar `catApi.js` → `catService.js`                   |
| Sin datos crudos de API en componentes                | Deben pasar primero por `catMapper.js`              |
| Sin `useSelector`/`useDispatch` en componentes | Usar hooks de fachada                                    |
| Sin importaciones cruzadas entre features                     | `theme` no debe importar desde `cats`                 |
| Sin colores fijos en Tailwind              | Usar tokens semánticos (`bg-muted`, no `bg-gray-200`) |
| Evitar lógica manual en `className`            | Usar la utilidad `@shared/utils/cn` para todas las clases  |

---

## 6. Flujo de Trabajo de Git

```bash
# Ramas
main        ← Lista para producción, nunca subir cambios directamente
develop     ← Rama de integración
feature/... ← Nuevas funcionalidades
fix/...     ← Corrección de errores
refactor/...← Refactorización, sin nuevas funcionalidades
docs/...    ← Cambios solo en documentación
```

### Formato de Mensaje de Commit (Commits Convencionales)

```
feat: añadir funcionalidad de etiquetado de gatos
fix: resolver error de guardado doble al hacer clic en el corazón
refactor: extraer catMapper a la capa de adaptadores
docs: actualizar 04-ARQUITECTURA con diagrama de flujo de datos
style: alinear el padding de los botones al sistema de diseño
```

---

## 7. Despliegue

```bash
# Despliega en GitHub Pages
pnpm run deploy
```

- Ejecuta `vite build` → salida en `./dist/`
- Luego usa `gh-pages -d dist` para subir a la rama `gh-pages`.
- En vivo en: https://slinkter.github.io/myprojectapi11

**Antes de desplegar:** Confirma que el `base` en `vite.config.js` coincida con tu URL de GitHub Pages.
