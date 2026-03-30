# Fase 6: Migración de Redux

## 6.1 Estructura Redux en Next.js

En Next.js 15 con App Router, Redux requiere un **Client Provider** para funcionar correctamente.

### Arquitectura

```
┌─────────────────────────────────────────────┐
│              Root Layout                     │
│  (layout.tsx - Server Component)            │
│                                              │
│  ┌───────────────────────────────────────┐  │
│  │         ReduxProvider                 │  │
│  │  (providers/index.tsx - Client)       │  │
│  │                                        │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │         children                 │ │  │
│  │  │  (page.tsx - Server/Client)      │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 6.2 Crear Redux Store

### src/app/store.ts

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { catsReducer } from '@/features/cats';
import themeReducer from '@/features/theme/redux/themeSlice';
import fontReducer from '@/features/font/redux/fontSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      cats: catsReducer,
      theme: themeReducer,
      font: fontReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

---

## 6.3 Crear Typed Hooks

### src/app/hooks.ts

```typescript
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, RootState, AppStore } from '@/app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

---

## 6.4 Crear Redux Provider (Client Component)

### src/app/providers/index.tsx

```typescript
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/app/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

---

## 6.5 Actualizar Hooks Existentes

### src/features/cats/hooks/useCats.ts

```typescript
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchRandomCats,
  fetchFavouriteCats,
  saveCat,
  deleteCat,
} from '@/features/cats/redux/catsSlice';
import { logState } from '@/shared/utils/appLogger';
import { TOAST_MESSAGES } from '@/config/toastMessages';

interface UseCatsFacade {
  randomCats: CatEntity[];
  favouriteCats: CatEntity[];
  loading: {
    random: boolean;
    favourites: boolean;
    saving: boolean;
    deleting: boolean;
  };
  error: string | null;
  loadRandomCats: () => void;
  loadFavouriteCats: () => void;
  saveFavouriteCat: (cat: CatEntity) => Promise<void>;
  deleteFavouriteCat: (cat: CatEntity) => Promise<void>;
}

interface CatEntity {
  id: string;
  url: string;
  favouriteId: number | null;
}

export function useCats(): UseCatsFacade {
  const dispatch = useAppDispatch();
  const { random, favourites, loading, error } = useAppSelector(
    (state) => state.cats
  );

  logState('useCats', {
    random: random.length,
    favourites: favourites.length,
    loading,
  });

  const loadRandomCats = useCallback(() => {
    dispatch(fetchRandomCats());
  }, [dispatch]);

  const loadFavouriteCats = useCallback(() => {
    dispatch(fetchFavouriteCats());
  }, [dispatch]);

  const saveFavouriteCat = useCallback(
    async (cat: CatEntity) => {
      try {
        await dispatch(saveCat(cat)).unwrap();
        toast.success(TOAST_MESSAGES.SAVE_SUCCESS);
      } catch (err) {
        toast.error(TOAST_MESSAGES.SAVE_ERROR(err));
      }
    },
    [dispatch]
  );

  const deleteFavouriteCat = useCallback(
    async (cat: CatEntity) => {
      try {
        await dispatch(deleteCat(cat)).unwrap();
        toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
      } catch (err) {
        toast.error(TOAST_MESSAGES.DELETE_ERROR(err));
      }
    },
    [dispatch]
  );

  return {
    randomCats: random,
    favouriteCats: favourites,
    loading,
    error,
    loadRandomCats,
    loadFavouriteCats,
    saveFavouriteCat,
    deleteFavouriteCat,
  };
}
```

---

## 6.6 Siguiente Paso

➡️ [Fase 7: Migración CORS e Imágenes](./07-MIGRACION-CORS.md)
