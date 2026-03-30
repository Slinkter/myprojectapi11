# Fase 3: Arquitectura Feature-Sliced Design (FSD)

## 3.1 Comparación de Estructuras

### Estructura Actual (Vite + React)

```
src/
├── app/
│   ├── App.jsx
│   ├── index.jsx
│   └── store.js
├── config/
│   ├── env.js
│   ├── motionConfig.js
│   └── ...
├── features/
│   ├── cats/
│   │   ├── api/
│   │   ├── adapters/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   └── services/
│   ├── theme/
│   └── font/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── widgets/
│   ├── navbar/
│   ├── main-content/
│   └── toast/
└── index.css
```

### Estructura Objetivo (Next.js 15 + FSD)

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Home Page
│   ├── providers/
│   │   └── index.tsx          # Redux Provider (Client Component)
│   └── store.ts               # Redux Store
│
├── features/                   # Capa de Features (FSD)
│   ├── cats/
│   │   ├── api/
│   │   │   └── catApi.ts
│   │   ├── adapters/
│   │   │   └── catMapper.ts
│   │   ├── components/
│   │   │   ├── CatCard.tsx
│   │   │   ├── CatList.tsx
│   │   │   ├── RandomCatList.tsx
│   │   │   ├── FavoriteCatList.tsx
│   │   │   ├── CatErrorHandler.tsx
│   │   │   └── subcomponents/
│   │   │       ├── CatCardFooter.tsx
│   │   │       └── CatCardHeader.tsx
│   │   ├── hooks/
│   │   │   ├── useCats.ts
│   │   │   └── usePreloadCats.ts
│   │   ├── redux/
│   │   │   └── catsSlice.ts
│   │   ├── services/
│   │   │   └── catService.ts
│   │   └── index.ts
│   ├── theme/
│   │   ├── components/
│   │   │   └── ThemeToggleButton.tsx
│   │   ├── hooks/
│   │   │   └── useTheme.ts
│   │   └── redux/
│   │       └── themeSlice.ts
│   └── font/
│       ├── components/
│       │   └── FontDropdown.tsx
│       ├── hooks/
│       │   └── useFont.ts
│       └── redux/
│           └── fontSlice.ts
│
├── widgets/                   # Capa de Widgets (FSD)
│   ├── navbar/
│   │   └── ui/
│   │       └── Navbar.tsx
│   ├── main-content/
│   │   └── ui/
│   │       └── MainContent.tsx
│   └── toast/
│       └── ui/
│           └── ToastContainer.tsx
│
├── shared/                     # Capa Shared (FSD)
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── InitialLoadSkeleton.tsx
│   │   └── skeletons/
│   │       ├── SkeletonGrid.tsx
│   │       └── SkeletonCard.tsx
│   ├── hooks/
│   │   ├── useAppearance.ts
│   │   └── usePageTitle.ts
│   └── utils/
│       ├── cn.ts
│       └── appLogger.ts
│
└── config/                     # Capa de Config
    ├── env.ts
    ├── motionConfig.ts
    ├── uiText.tsx
    ├── toastMessages.ts
    ├── storageKeys.ts
    └── apiConstants.ts
```

---

## 3.2 Crear Carpetas

```powershell
cd src

# Crear estructura de carpetas
New-Item -ItemType Directory -Force -Path "app/providers"
New-Item -ItemType Directory -Force -Path "features/cats/api"
New-Item -ItemType Directory -Force -Path "features/cats/adapters"
New-Item -ItemType Directory -Force -Path "features/cats/components/subcomponents"
New-Item -ItemType Directory -Force -Path "features/cats/hooks"
New-Item -ItemType Directory -Force -Path "features/cats/redux"
New-Item -ItemType Directory -Force -Path "features/cats/services"
New-Item -ItemType Directory -Force -Path "features/theme/components"
New-Item -ItemType Directory -Force -Path "features/theme/hooks"
New-Item -ItemType Directory -Force -Path "features/theme/redux"
New-Item -ItemType Directory -Force -Path "features/font/components"
New-Item -ItemType Directory -Force -Path "features/font/hooks"
New-Item -ItemType Directory -Force -Path "features/font/redux"
New-Item -ItemType Directory -Force -Path "widgets/navbar/ui"
New-Item -ItemType Directory -Force -Path "widgets/main-content/ui"
New-Item -ItemType Directory -Force -Path "widgets/toast/ui"
New-Item -ItemType Directory -Force -Path "shared/components/skeletons"
New-Item -ItemType Directory -Force -Path "shared/hooks"
New-Item -ItemType Directory -Force -Path "shared/utils"
```

---

## 3.3 Reglas de Importación FSD

```
┌─────────────────────────────────────────────────────────────┐
│                    JERARQUÍA FSD                           │
├─────────────────────────────────────────────────────────────┤
│  app/           → Puede importar de TODAS las capas       │
│  processes/     → Puede importar de features, widgets,     │
│                   shared, entities                         │
│  pages/         → Puede importar de widgets, features,    │
│                   shared, entities                         │
│  widgets/       → Puede importar de features, shared,     │
│                   entities                                 │
│  features/      → Puede importar de shared, entities      │
│  entities/      → Puede importar de shared                │
│  shared/        → Solo puede importar de shared           │
└─────────────────────────────────────────────────────────────┘
```

**Regla de Oro:** Las capas superiores pueden importar de inferiores, pero nunca al revés.

---

## 3.4 Siguiente Paso

➡️ [Fase 4: Configuración TypeScript](./04-CONFIG-TYPESCRIPT.md)
