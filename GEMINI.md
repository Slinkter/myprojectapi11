# GEMINI.md - Contexto e Instrucciones del Proyecto

## 🐱 Descripción del Proyecto
**Cat Gallery** es una aplicación moderna y escalable de React 19 (SPA) construida con Vite 7. Permite a los usuarios explorar imágenes aleatorias de gatos, guardar favoritos y personalizar el tema y la tipografía de la aplicación. El proyecto sirve como referencia para una **Arquitectura Frontend Senior**, implementando específicamente **Feature-Sliced Design (FSD)** con tipado estricto de JSDoc y el patrón Fachada (Facade).

### 🛠 Stack Tecnológico Principal
- **Framework:** React 19.2.x (Runtime de JSX automático)
- **Herramienta de Construcción:** Vite 7.3.x (pnpm para gestión de paquetes)
- **Gestión de Estado:** Redux Toolkit 2.11.x (Async thunks, slices)
- **Estilos:** Tailwind CSS v4.x (Orientado a utilidades, tokens semánticos)
- **Redes:** Axios 1.13.x (Centralizado en `catApi.js`)
- **Animaciones:** Framer Motion 12.34.x
- **Utilidades:** `clsx`, `tailwind-merge` (vía `@shared/utils/cn`)

---

## 🏗 Arquitectura y Patrones
El proyecto sigue los principios de **Feature-Sliced Design (FSD)** para asegurar la separación de responsabilidades y la escalabilidad.

### Estructura de Directorios
- `src/app/`: Configuración global del store de Redux (`store.js`).
- `src/config/`: Validación centralizada de variables de entorno y configuración (`env.js`).
- `src/docs/`: Documentación técnica completa (Configuración, Arquitectura, Sistema de Diseño, Contribución).
- `src/features/`: Lógica específica del dominio, dividida por características (ej. `cats`, `theme`, `font`).
  - `adapters/`: Normaliza datos crudos de la API en entidades de dominio limpias (`CatEntity`).
  - `api/`: Clientes HTTP de bajo nivel.
  - `components/`: Componentes de UI específicos de la característica.
  - `hooks/`: Hooks de fachada (ej. `useCats`) que abstraen Redux de la UI.
  - `redux/`: Slices de Redux y thunks asíncronos.
  - `services/`: Lógica de negocio que orquesta llamadas a la API y mapeo.
- `src/shared/`: Lógica reutilizable y genérica (primitivas de UI, hooks globales, utilidades transversales).

### Reglas Arquitectónicas Clave
1.  **Patrón Fachada:** Los componentes **no deben** usar `useSelector` o `useDispatch` directamente. Usa hooks de fachada (ej. `@features/cats/hooks/useCats.js`).
2.  **Patrón Mapper/Adapter:** Las respuestas crudas de la API **no deben** filtrarse a los componentes. Todos los datos deben pasar por mappers (ej. `catMapper.js`) para convertirse en una `CatEntity`.
3.  **Tipado Estricto:** Se requiere una cobertura del 100% de JSDoc para todas las funciones, hooks y tipos exportados. Usa `@typedef` para entidades de dominio.
4.  **Sin Importaciones Cruzadas entre Features:** Las características (ej. `theme`) no deben importar de otras características (ej. `cats`). Usa `shared` o `app` para la integración.
5.  **Alias de Rutas:** Usa siempre los alias: `@features`, `@shared`, `@app`, `@config`.

---

## 🚀 Flujo de Trabajo de Desarrollo

### Comandos
| Tarea | Comando |
| :--- | :--- |
| **Instalar** | `pnpm install` |
| **Desarrollo** | `pnpm run dev` |
| **Construir** | `pnpm run build` |
| **Lint** | `pnpm run lint` (0 advertencias permitidas) |
| **Previsualizar** | `pnpm run preview` |
| **Desplegar** | `pnpm run deploy` (Despliega en GitHub Pages) |

### Configuración de Entorno
Crea un archivo `.env` con:
```env
VITE_BASE_URL=https://api.thecatapi.com/v1
VITE_API_KEY=tu_clave_api_aqui
```

---

## 📏 Estándares de Codificación

### Convenciones de Nombres
- **Componentes:** `PascalCase.jsx` (ej. `CatCard.jsx`)
- **Hooks:** prefijo `use`, `camelCase.js` (ej. `useCats.js`)
- **Mappers:** `camelCase.js` con sufijo `Mapper` (ej. `catMapper.js`)
- **Slices de Redux:** `camelCase.js` con sufijo `Slice` (ej. `catsSlice.js`)
- **Variables/Booleanos:** `camelCase` (ej. `isLoading`, `hasError`)

### Plantilla Obligatoria de JSDoc
Cada export debe estar documentado. Los tipos genéricos `{object}` están prohibidos para datos de dominio.
```javascript
/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Describe el propósito de la función.
 * @param {CatEntity} cat - El objeto de dominio normalizado.
 * @returns {Promise<void>}
 */
export const miAccion = (cat) => { ... };
```

### Git y Commits
- Usa **Commits Convencionales** (ej. `feat:`, `fix:`, `refactor:`, `docs:`, `style:`).
- Ramas: `main` (prod), `develop` (integración), `feature/`, `fix/`.

---

## 📚 Índice de Documentación
Consulta `src/docs/` para profundizar:
- `04-ARQUITECTURA.md`: Flujo de datos y forma del estado de Redux.
- `05-SISTEMA-DISENO-UI.md`: Tokens de Tailwind y reglas de animación.
- `06-CONTRIBUCION.md`: Guía de estilo completa y reglas de nombres.
