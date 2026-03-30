# Fase 4: Configuración TypeScript y Alias

## 4.1 Configurar tsconfig.json

El archivo `tsconfig.json` generado por create-next-app ya incluye la baseUrl. Solo necesitamos agregar los paths para FSD.

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@app/*": ["./src/app/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"],
      "@widgets/*": ["./src/widgets/*"],
      "@config/*": ["./src/config/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 4.2 Configurar next.config.ts

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: 'api.allorigins.win',
      },
    ],
  },
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

## 4.3 Alias Disponibles

| Alias | Ruta |
|-------|------|
| `@/*` | `./src/*` |
| `@app/*` | `./src/app/*` |
| `@features/*` | `./src/features/*` |
| `@shared/*` | `./src/shared/*` |
| `@widgets/*` | `./src/widgets/*` |
| `@config/*` | `./src/config/*` |

---

## 4.4 Ejemplo de Importación

```typescript
// Antes (Vite)
import CatCard from '@features/cats/components/CatCard';
import { cn } from '@shared/utils/cn';

// Después (Next.js TypeScript)
import CatCard from '@/features/cats/components/CatCard';
import { cn } from '@/shared/utils/cn';
```

---

## 4.5 Configurar tailwind.config.ts

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        card: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 4.6 Siguiente Paso

➡️ [Fase 5: Migración de Componentes](./05-MIGRACION-COMPONENTES.md)
