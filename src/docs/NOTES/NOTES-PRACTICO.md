# Implementación Práctica - Cat Gallery

> **Nota:** Este documento muestra el código real del proyecto con explicaciones prácticas.

---

## 1. Estructura del Proyecto

```
src/
├── app/
│   └── store.js                 # Configuración de Redux
├── config/
│   ├── env.js                   # Variables de entorno
│   └── motionConfig.js          # LazyMotion config
├── features/
│   ├── cats/
│   │   ├── api/
│   │   │   └── catApi.js       # Cliente HTTP (Axios)
│   │   ├── adapters/
│   │   │   └── catMapper.js    # Transformador API → Domain
│   │   ├── services/
│   │   │   └── catService.js   # Orquestación de llamadas
│   │   ├── redux/
│   │   │   └── catsSlice.js    # Estado + Thunks
│   │   ├── hooks/
│   │   │   ├── useCats.js      # Hook fachada
│   │   │   └── usePreloadCats.js
│   │   └── components/
│   │       ├── RandomCatList.jsx   # Container
│   │       ├── FavouriteCatList.jsx
│   │       ├── CatList.jsx        # Presentational
│   │       └── CatCard.jsx        # Presentational
│   ├── theme/
│   │   ├── redux/themeSlice.js
│   │   └── hooks/useTheme.js
│   └── font/
├── shared/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── EmptyState.jsx
│   │   ├── DataInitializer.jsx
│   │   └── skeletons/
│   ├── hooks/
│   │   ├── useAppearance.js
│   │   └── usePageTitle.js
│   └── utils/
│       └── cn.js               # clsx + tailwind-merge
└── App.jsx
```

---

## 2. Flujo de Datos Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                      TheCatAPI (Externo)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  catApi.js (Cliente HTTP)                                       │
│  - Axios con baseURL y headers                                  │
│  - Métodos: fetchImages, fetchFavourites, postFavourite        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  catService.js (Orquestación)                                   │
│  - Llama a catApi                                              │
│  - Pasa datos por mapper                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  catMapper.js (Adaptador)                                      │
│  - Transforma { image: { id, url }, id } → { id, url }        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  catsSlice.js (Redux)                                           │
│  - Thunks: fetchRandomCats, saveCat, deleteCat                │
│  - Estado: random[], favourites[], loading{}, error            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  useCats.js (Hook Fachada)                                      │
│  - useSelector + useDispatch                                    │
│  - Expone: randomCats, favouriteCats, loadRandomCats, etc      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Componentes (UI)                                               │
│  RandomCatList → CatList → CatCard                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Código Clave

### 3.1 catApi.js - Cliente HTTP

```javascript
/**
 * @file Infrastructure layer: TheCatAPI Client.
 */
import axios from "axios";
import { config } from "@config/env";

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: { "x-api-key": config.api.apiKey },
  timeout: 5000,
});

export const catApiService = {
  fetchImages: async (limit = 10) => {
    const { data } = await api.get("/images/search", { params: { limit } });
    return data;
  },

  fetchFavourites: async () => {
    const { data } = await api.get("/favourites");
    return data;
  },

  postFavourite: async (image_id) => {
    const { data } = await api.post("/favourites", { image_id });
    return data;
  },

  deleteFavourite: async (favouriteId) => {
    const { data } = await api.delete(`/favourites/${favouriteId}`);
    return data;
  },
};
```

### 3.2 catMapper.js - Transformador

```javascript
/**
 * @typedef {Object} CatEntity
 * @property {string} id
 * @property {string} url
 * @property {number|null} favouriteId
 */

export const mapToCatEntity = (rawCat) => {
  if (rawCat.image) {
    return {
      id: rawCat.image.id,
      url: rawCat.image.url,
      favouriteId: rawCat.id,
    };
  }
  return {
    id: rawCat.id,
    url: rawCat.url,
    favouriteId: null,
  };
};

export const mapToCatEntities = (rawCats) => {
  if (!Array.isArray(rawCats)) return [];
  return rawCats.map(mapToCatEntity);
};
```

### 3.3 catsSlice.js - Redux

```javascript
export const fetchRandomCats = createAsyncThunk(
  "cats/fetchRandom",
  async (_, { rejectWithValue }) => {
    try {
      return await catService.getRandomCats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  random: [],
  favourites: [],
  loading: { random: false, favourites: false, saving: false, deleting: false },
  error: null,
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomCats.pending, (state) => {
        state.loading.random = true;
        state.error = null;
      })
      .addCase(fetchRandomCats.fulfilled, (state, action) => {
        state.loading.random = false;
        state.random = action.payload;
      })
      .addCase(fetchRandomCats.rejected, (state, action) => {
        state.loading.random = false;
        state.error = action.payload;
      });
  },
});
```

### 3.4 useCats.js - Hook Fachada

```javascript
/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

export const useCats = () => {
  const dispatch = useDispatch();
  const catsState = useSelector((state) => state.cats);

  const { randomCats, favouriteCats, loading, error } = useMemo(
    () => ({
      randomCats: catsState.random,
      favouriteCats: catsState.favourites,
      loading: catsState.loading,
      error: catsState.error,
    }),
    [catsState]
  );

  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  const saveFavouriteCat = useCallback(
    async (cat) => {
      try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success("Cat saved to favourites!");
      } catch (err) {
        toast.error(`Failed to save: ${err}`);
      }
    },
    [dispatch]
  );

  return {
    randomCats,
    favouriteCats,
    loading,
    error,
    loadRandomCats,
    saveFavouriteCat,
    deleteFavouriteCat,
  };
};
```

### 3.5 CatCard.jsx - Componente

```javascript
import { useReducedMotion } from "framer-motion";

const CatCard = ({ cat, onAction, actionType, disabled }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleAction = useCallback(
    (e) => {
      e.preventDefault();
      if (!disabled) onAction(cat);
    },
    [disabled, onAction, cat]
  );

  const imageClasses = shouldReduceMotion
    ? "object-cover w-full h-full"
    : "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105";

  return (
    <div className="relative overflow-hidden bg-muted rounded-2xl shadow-sm group">
      <div className="relative aspect-square w-full">
        <img src={cat.url} alt={cat.id} loading="lazy" className={imageClasses} />
      </div>
      <div className="absolute bottom-3 right-3">
        <CatCardFooter actionType={actionType} onAction={handleAction} disabled={disabled} />
      </div>
    </div>
  );
};
```

### 3.6 motionConfig.js - Optimización

```javascript
import { domAnimation } from "framer-motion";

export const motionFeatures = domAnimation;
```

---

## 4. Optimizaciones Implementadas

### 4.1 LazyMotion (~30kb ahorro)

```javascript
// App.jsx
import { LazyMotion } from "framer-motion";
import { motionFeatures } from "@config/motionConfig";

<LazyMotion features={motionFeatures}>
  <AppContent />
</LazyMotion>
```

### 4.2 useCallback en useTheme

```javascript
const toggleTheme = useCallback(() => {
  dispatch(toggleThemeAction());
}, [dispatch]);
```

### 4.3 React.memo en CatCard

```javascript
export default React.memo(CatCard);
```

### 4.4 Prefetching con DataInitializer

```javascript
// DataInitializer.jsx
const DataInitializer = () => {
  usePreloadCats();
  return null;
};

// App.jsx
<LazyMotion features={motionFeatures}>
  <div>
    <DataInitializer />
    {/* rest of app */}
  </div>
</LazyMotion>;
```

---

## 5. Manejo de Errores

### 5.1 ErrorBoundary

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 5.2 try/catch con unwrap

```javascript
try {
  await dispatch(saveCat(cat)).unwrap();
  toast.success("Cat saved!");
} catch (err) {
  toast.error(`Failed: ${err}`);
}
```

---

## 6. Comandos del Proyecto

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Servidor de desarrollo |
| `pnpm run build` | Build de producción |
| `pnpm run lint` | ESLint (0 warnings) |
| `pnpm run preview` | Preview del build |

---

*Documento generado para estudio práctico de código*
