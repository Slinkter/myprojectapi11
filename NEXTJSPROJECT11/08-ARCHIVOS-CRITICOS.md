# Fase 8: Archivos Críticos - Código Completo

## 8.1 globals.css

### src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --primary: #4f46e5;
  --primary-foreground: #ffffff;
}

.dark {
  --background: #020617;
  --foreground: #f8fafc;
  --card: #0f172a;
  --card-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #1e293b;
  --primary: #6366f1;
  --primary-foreground: #ffffff;
}

@layer base {
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}

@layer utilities {
  .animate-fade-in-scale {
    animation: fade-in-scale 0.3s ease-out forwards;
  }

  @keyframes fade-in-scale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

---

## 8.2 Root Layout

### src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Inter, Lato, Lora, Playfair_Display } from 'next/font/google';
import { ReduxProvider } from './providers';
import { ToastContainer } from '@/widgets/toast/ui/ToastContainer';
import Navbar from '@/widgets/navbar/ui/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Cat Gallery',
  description: 'A beautiful cat image gallery with favorites and theme customization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${lato.variable} ${lora.variable} ${playfair.variable} font-sans`}>
        <ReduxProvider>
          <div className="min-h-dvh">
            <Navbar />
            {children}
            <ToastContainer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

---

## 8.3 Home Page

### src/app/page.tsx

```tsx
'use client';

import { LazyMotion } from 'framer-motion';
import { Suspense } from 'react';
import MainContent from '@/widgets/main-content/ui/MainContent';
import { motionFeatures } from '@/config/motionConfig';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { useAppearance } from '@/shared/hooks/useAppearance';

function HomeContent() {
  usePageTitle('Cat Gallery');
  useAppearance();

  return (
    <Suspense fallback={null}>
      <MainContent />
    </Suspense>
  );
}

export default function HomePage() {
  return (
    <LazyMotion features={motionFeatures}>
      <HomeContent />
    </LazyMotion>
  );
}
```

---

## 8.4 Redux Provider

### src/app/providers/index.tsx

```tsx
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

## 8.5 Redux Store

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

## 8.6 Typed Hooks

### src/app/hooks.ts

```typescript
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, RootState, AppStore } from '@/app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

---

## 8.7 Navbar Widget

### src/widgets/navbar/ui/Navbar.tsx

```tsx
'use client';

import ThemeToggleButton from '@/features/theme/components/ThemeToggleButton';
import FontDropdown from '@/features/font/components/FontDropdown';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Cat Gallery
        </h1>
        <div className="flex items-center gap-4">
          <FontDropdown />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
```

---

## 8.8 MainContent Widget

### src/widgets/main-content/ui/MainContent.tsx

```tsx
'use client';

import { Suspense } from 'react';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import InitialLoadSkeleton from '@/shared/components/InitialLoadSkeleton';
import RandomCatList from '@/features/cats/components/RandomCatList';
import FavoriteCatList from '@/features/cats/components/FavoriteCatList';
import { CatErrorHandler } from '@/features/cats';

export default function MainContent() {
  return (
    <main className="container mx-auto p-4">
      <ErrorBoundary>
        <Suspense fallback={<InitialLoadSkeleton />}>
          <RandomCatList />
          <FavoriteCatList />
        </Suspense>
      </ErrorBoundary>
      <CatErrorHandler />
    </main>
  );
}
```

---

## 8.9 CatCard Component

### src/features/cats/components/CatCard.tsx

```tsx
'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import CatCardFooter from './subcomponents/CatCardFooter';

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
  const shouldReduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAction = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && !loading) {
        onAction(cat);
      }
    },
    [disabled, loading, onAction, cat]
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const hoverClasses = shouldReduceMotion
    ? ''
    : 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1';

  const imageClasses = shouldReduceMotion
    ? 'object-cover w-full h-full'
    : 'object-cover w-full h-full transition-transform duration-700 group-hover:scale-105';

  return (
    <div className={cn('relative overflow-hidden bg-muted rounded-2xl shadow-sm group', hoverClasses)}>
      <div className="relative aspect-square w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
        )}
        <Image
          src={cat.url}
          alt={`Cat ${cat.id}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={handleImageLoad}
          className={cn(imageClasses, imageLoaded ? 'opacity-100' : 'opacity-0')}
          unoptimized={true}
        />
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 text-xs font-mono font-medium tracking-wider text-white bg-black/40 backdrop-blur-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ID: {cat.id}
      </div>
      <div className="absolute bottom-3 right-3 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <CatCardFooter
          actionType={actionType}
          onAction={handleAction}
          disabled={disabled}
          loading={loading}
        />
      </div>
    </div>
  );
}
```

---

## 8.10 Siguiente Paso

➡️ [Fase 9: Checklist de Verificación](./09-CHECKLIST.md)
