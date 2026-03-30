# Fase 5: Migración de Componentes

## 5.1 Server Components vs Client Components

### Regla General

| Tipo | Cuándo Usar | Directiva |
|------|--------------|-----------|
| **Server Component** | Data fetching, SEO, renderizado inicial | (none - default) |
| **Client Component** | useState, useEffect, event handlers, Redux hooks | `'use client'` |

### Diagrama de Decisión

```
┌─────────────────────────────────────────────┐
│         ¿El componente necesita?            │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
    ¿State/Effect?           ¿Eventos?
        │                       │
   ┌───┴───┐               ┌───┴───┐
   ▼       ▼               ▼       ▼
  YES     NO               YES     NO
   │       │               │       │
   ▼       ▼               ▼       ▼
 CLIENT  SERVER          CLIENT  SERVER
```

---

## 5.2 Componentes del Proyecto: ¿Server o Client?

### CatCard.tsx → **Client Component**
```typescript
'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
// Usa: useState, useCallback, event handlers
```

### CatList.tsx → **Client Component**
```typescript
'use client';

import { useMemo, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
// Usa: useMemo, useCallback, animaciones
```

### RandomCatList.tsx → **Client Component**
```typescript
'use client';

import { useMemo, useCallback } from 'react';
import { useCats } from '@/features/cats/hooks/useCats';
// Usa: Redux hooks (useSelector, useDispatch)
```

### Navbar.tsx → **Client Component**
```typescript
'use client';

import ThemeToggleButton from '@/features/theme/components/ThemeToggleButton';
import FontDropdown from '@/features/font/components/FontDropdown';
// Usa: Theme/Font context
```

### MainContent.tsx → **Client Component**
```typescript
'use client';

import { Suspense } from 'react';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
// Usa: Suspense, ErrorBoundary
```

### CatErrorHandler.tsx → **Client Component**
```typescript
'use client';

import { useSelector } from 'react-redux';
// Usa: Redux hooks
```

---

## 5.3 Conversión de import.meta.env

### Antes (Vite)

```typescript
// src/config/env.ts
const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Después (Next.js)

```typescript
// src/config/env.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// En .env.local
NEXT_PUBLIC_API_URL=https://api.thecatapi.com/v1
NEXT_PUBLIC_API_KEY=tu_api_key_aqui
```

### Prefijos de Variables

| Prefijo | Disponible en |
|---------|---------------|
| `NEXT_PUBLIC_` | Cliente y Servidor |
| (sin prefijo) | Solo Servidor |

---

## 5.4 Migrar useEffect a Server Components

### Antes (Vite + useEffect)

```typescript
// RandomCatList.tsx (Client Component)
import { useEffect } from 'react';
import { useCats } from './hooks/useCats';

const RandomCatList = () => {
  const { randomCats, loadRandomCats } = useCats();

  useEffect(() => {
    loadRandomCats();
  }, [loadRandomCats]);

  return <CatList cats={randomCats} />;
};
```

### Después (Next.js)

```typescript
// Opción 1: Mantener Client Component (igual que antes)
'use client';

import { useEffect } from 'react';
import { useCats } from './hooks/useCats';

const RandomCatList = () => {
  const { randomCats, loadRandomCats } = useCats();

  useEffect(() => {
    loadRandomCats();
  }, [loadRandomCats]);

  return <CatList cats={randomCats} />;
};
```

```typescript
// Opción 2: Server Component con Server Actions (más avanzado)
import { getRandomCats } from '@/features/cats/services/catService';

async function RandomCatList() {
  const cats = await getRandomCats();
  return <CatList cats={cats} />;
}
```

---

## 5.5 Migrar Image de img a Next/Image

### Antes

```jsx
<img 
  src={cat.url} 
  alt={`Cat ${cat.id}`}
  loading="lazy"
  crossOrigin="anonymous"
  className="object-cover w-full h-full"
/>
```

### Después

```tsx
<Image
  src={cat.url}
  alt={`Cat ${cat.id}`}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  unoptimized={true} // Para imágenes externas sin configuración
/>
```

---

## 5.6 Tipos TypeScript para Componentes

### Antes (PropTypes)

```jsx
CatCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  disabled: PropTypes.bool.isRequired,
};
```

### Después (TypeScript Interfaces)

```typescript
interface CatEntity {
  id: string;
  url: string;
  favouriteId: number | null;
}

interface CatCardProps {
  cat: CatEntity;
  onAction: (cat: CatEntity) => void;
  actionType: 'save' | 'delete';
  disabled: boolean;
  loading?: boolean;
}

export default function CatCard({ cat, onAction, actionType, disabled, loading }: CatCardProps) {
  // ...
}
```

---

## 5.7 Siguiente Paso

➡️ [Fase 6: Migración Redux](./06-MIGRACION-REDUX.md)
