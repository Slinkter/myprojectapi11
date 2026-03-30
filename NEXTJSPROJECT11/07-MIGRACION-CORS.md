# Fase 7: Migración CORS e Imágenes

## 7.1 El Problema de CORS

El servidor de imágenes de TheCatAPI (`cdn2.thecatapi.com`) no envía headers CORS, lo que bloquea las imágenes en el navegador.

### Solución Actual (Vite)

```javascript
// vite.config.js
server: {
  proxy: {
    "/api/cors-proxy": {
      target: "https://cdn2.thecatapi.com",
      changeOrigin: true,
      rewrite: (path) => decodeURIComponent(path.replace(/^\/api\/cors-proxy\?url=/, "")),
    },
  },
}
```

### Solución Next.js 15

_next.js maneja esto de múltiples formas:_

---

## 7.2 Método 1: Rewrites (Desarrollo)

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/cors-proxy',
        destination: 'https://cdn2.thecatapi.com/:path*',
      },
    ];
  },
};

export default nextConfig;
```

---

## 7.3 Método 2: Next/Image (Producción Recomendado)

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

### Uso en Componente

```tsx
import Image from 'next/image';

<Image
  src="https://cdn2.thecatapi.com/images/abc123.jpg"
  alt="Cat"
  width={300}
  height={300}
  // O usando fill para responsive:
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

---

## 7.4 Actualizar catMapper.ts

### src/features/cats/adapters/catMapper.ts

```typescript
import { z } from 'zod';

const CAT_ENTITY_SCHEMA = z.object({
  id: z.string(),
  url: z.string(),
  favouriteId: z.number().nullable(),
});

/**
 * Entity type for Cat domain
 */
export interface CatEntity {
  id: string;
  url: string;
  favouriteId: number | null;
}

const CORS_PROXY = "/api/cors-proxy?url=";

const normalizeFavouriteResponse = (rawCat: RawFavouriteCat): NormalizedCat => ({
  id: rawCat.image.id,
  url: `${CORS_PROXY}${encodeURIComponent(rawCat.image.url)}`,
  favouriteId: rawCat.id,
});

const normalizeImageSearchResponse = (rawCat: RawSearchCat): NormalizedCat => ({
  id: rawCat.id,
  url: `${CORS_PROXY}${encodeURIComponent(rawCat.url)}`,
  favouriteId: null,
});

export const mapToCatEntity = (rawCat: RawFavouriteCat | RawSearchCat): CatEntity => {
  if ('image' in rawCat) {
    return CAT_ENTITY_SCHEMA.parse(normalizeFavouriteResponse(rawCat));
  }
  return CAT_ENTITY_SCHEMA.parse(normalizeImageSearchResponse(rawCat));
};

export const mapToCatEntities = (rawCats: (RawFavouriteCat | RawSearchCat)[]): CatEntity[] => {
  if (!Array.isArray(rawCats)) return [];
  return rawCats.map(mapToCatEntity);
};

export const validateCatEntity = (data: unknown) => CAT_ENTITY_SCHEMA.safeParse(data);

// Types helpers (normalmente en un archivo separado)
interface RawFavouriteCat {
  id: number;
  image: {
    id: string;
    url: string;
  };
}

interface RawSearchCat {
  id: string;
  url: string;
}

interface NormalizedCat {
  id: string;
  url: string;
  favouriteId: number | null;
}
```

---

## 7.5 Environment Variables

### .env.local

```
# API Configuration
NEXT_PUBLIC_API_URL=https://api.thecatapi.com/v1
NEXT_PUBLIC_API_KEY=tu_api_key_aqui
```

### src/config/env.ts

```typescript
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.thecatapi.com/v1',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
};
```

---

## 7.6 Siguiente Paso

➡️ [Fase 8: Archivos Críticos](./08-ARCHIVOS-CRITICOS.md)
