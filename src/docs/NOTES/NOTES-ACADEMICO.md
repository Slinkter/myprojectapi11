# Fundamentos de Arquitectura Frontend - Cat Gallery

> **Nota:** Este documento es una guía académica sobre los conceptos de arquitectura utilizados en el proyecto Cat Gallery.

---

## 1. Introducción

### 1.1 ¿Qué es Feature-Sliced Design (FSD)?

**Feature-Sliced Design (FSD)** es una metodología de arquitectura para proyectos frontend que organiza el código por **características de negocio** en lugar de por tipo de archivo (components, hooks, utils, etc.).

**Principios fundamentales:**

| Principio | Descripción |
|-----------|-------------|
| **Separación de responsabilidades** | Cada módulo tiene una tarea específica |
| **Acoplamiento mínimo** | Los módulos de nivel inferior no conocen los superiores |
| **Reutilización** | El código genérico vive en `shared` |
| **Escalabilidad** | Nuevas features se agregan sin romper existentes |

### 1.2 Beneficios sobre arquitecturas tradicionales

| Tradicional (por tipo) | FSD (por característica) |
|------------------------|-------------------------|
| `components/`, `hooks/`, `utils/` | `features/cats/`, `features/theme/` |
| Difícil encontrar código relacionado | Todo junto por dominio |
| Conflictos en equipos grandes | Trabajo paralelo en features |
| Acoplamiento accidental | Dependencias explícitas |

---

## 2. Capas de FSD

### 2.1 Estructura de Capas

```
src/
├── app/           → Configuración global (Redux Store)
├── features/      → Módulos de dominio (negocio)
├── shared/        → Código genérico (reutilizable)
```

### 2.2 Reglas de Dependencia

```
    app
     ↓
  shared ← features
```

**Reglas clave:**

1. `shared` **NUNCA** puede importar de `features`
2. `features` puede importar de `shared`
3. `app` importa todo

### 2.3 Cada Capa Explicada

| Capa | Propósito | Ejemplo |
|------|-----------|---------|
| **App** | Configuración global, store de Redux | `store.js` |
| **Features** | Lógica de negocio específica | `cats`, `theme`, `font` |
| **Shared** | Utilidades, componentes genéricos | `ErrorBoundary`, `cn()` |

---

## 3. Patrones de Diseño Implementados

### 3.1 Facade Pattern (Patrón Fachada)

**Definición:** Proporciona una interfaz simplificada para acceder a sistemas complejos.

**En este proyecto:**

```javascript
// ❌ NO: Componente accede directamente a Redux
const dispatch = useDispatch();
const cats = useSelector(state => state.cats.random);
dispatch(fetchRandomCats());

// ✅ SÍ: Usa el hook fachada
const { randomCats, loadRandomCats } = useCats();
```

**Beneficio:** Los componentes no necesitan conocer la estructura de Redux.

### 3.2 Adapter/Mapper Pattern

**Definición:** Transforma datos de un formato a otro para mantener limpio el dominio.

**En este proyecto:**

```javascript
// La API externa devuelve estructuras complejas
// { image: { id: "abc", url: "..." }, id: 123 }

// El mapper la convierte a nuestro dominio
const mapToCatEntity = (rawCat) => ({
  id: rawCat.image?.id || rawCat.id,
  url: rawCat.image?.url || rawCat.url,
  favouriteId: rawCat.image ? rawCat.id : null
});
```

**Beneficio:** Si la API cambia, solo modificas el mapper, no los componentes.

### 3.3 Container/Presentational Pattern

**Definición:** Separa la lógica (Container) de la visualización (Presentational).

**En este proyecto:**

```
RandomCatList (Container)
├── Usa useCats() para datos
├── Calcula estados derivados
└── Pasa datos por props
    ↓
CatList (Presentational)
├── Recibe datos por props
├── Solo renderiza UI
└── No conoce Redux
    ↓
CatCard (Presentational)
└── Renderiza tarjeta individual
```

---

## 4. Gestión de Estado con Redux Toolkit

### 4.1 Conceptos Básicos

| Concepto | Descripción |
|----------|-------------|
| **Store** | Único fuente de datos global |
| **Slice** | Parte del estado con su lógica |
| **Action** | Objeto que describe un cambio |
| **Reducer** | Función que calcula el nuevo estado |
| **Thunk** | Función asíncrona que despacha actions |

### 4.2 Estructura de un Slice

```javascript
const catsSlice = createSlice({
  name: 'cats',
  initialState: { random: [], favourites: [], loading: {}, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomCats.pending, (state) => {
        state.loading.random = true;
      })
      .addCase(fetchRandomCats.fulfilled, (state, action) => {
        state.random = action.payload;
        state.loading.random = false;
      });
  }
});
```

### 4.3 Thunks para Operaciones Asíncronas

```javascript
export const fetchRandomCats = createAsyncThunk(
  'cats/fetchRandom',
  async (_, { rejectWithValue }) => {
    try {
      return await catService.getRandomCats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

---

## 5. Tipado en JavaScript con JSDoc

### 5.1 ¿Por qué JSDoc en lugar de TypeScript?

| Aspecto | TypeScript | JSDoc |
|---------|------------|-------|
| **Compilación** | Requiere transpilación | No requiere |
| **Migración** | Invasiva | Incremental |
| **Flexibilidad** | Estricta | Flexible |
| **Proyectos existentes** | Requiere migración | Puede añadirse gradualmente |

### 5.2 Ejemplo de Tipado con JSDoc

```javascript
/**
 * @typedef {Object} CatEntity
 * @property {string} id - ID único de la imagen
 * @property {string} url - URL de la imagen
 * @property {number|null} favouriteId - ID del favorito
 */

/**
 * Hook fachada para gestionar gatos.
 * @returns {Object}
 * @property {CatEntity[]} randomCats
 * @property {CatEntity[]} favouriteCats
 * @property {function(): void} loadRandomCats
 * @property {function(CatEntity): Promise<void>} saveFavouriteCat
 */
export const useCats = () => { ... };
```

---

## 6. Accesibilidad Web (WCAG)

### 6.1 Principio WCAG 2.3.3

> "Las animaciones de movimiento activadas por la interacción se pueden deshabilitar, a menos que la animación sea esencial."

### 6.2 Implementación con useReducedMotion

```javascript
import { useReducedMotion } from "framer-motion";

const CatCard = ({ cat }) => {
  const shouldReduceMotion = useReducedMotion();

  const imageClasses = shouldReduceMotion
    ? "object-cover w-full h-full"
    : "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105";

  return <img src={cat.url} className={imageClasses} />;
};
```

---

## 7. Métricas de Calidad del Proyecto

| Métrica | Valor |
|---------|-------|
| **react-doctor score** | 100/100 |
| **ESLint warnings** | 0 |
| **Bundle framer-motion** | ~6kb (vs ~30kb sin LazyMotion) |
| **Accesibilidad** | WCAG 2.3.3 cumplida |

---

## 8. Referencias

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold)
- [JSDoc Reference](https://jsdoc.app/)

---

*Documento generado para estudio de arquitectura frontend*
