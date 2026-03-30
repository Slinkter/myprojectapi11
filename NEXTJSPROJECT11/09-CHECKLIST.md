# Fase 9: Checklist de Verificación

## 9.1 Pre-Migración

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Backup del proyecto actual (Vite) | ⬜ |
| 2 | Documentar API keys y variables de entorno | ⬜ |
| 3 | Listar todos los componentes y sus dependencias | ⬜ |
| 4 | Verificar versiones de Node.js y pnpm | ⬜ |

---

## 9.2 Instalación Inicial

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Ejecutar `npx create-next-app@15` con TypeScript | ⬜ |
| 2 | Instalar dependencias (`pnpm add ...`) | ⬜ |
| 3 | Configurar `tsconfig.json` con aliases FSD | ⬜ |
| 4 | Configurar `next.config.ts` (images, rewrites) | ⬜ |
| 5 | Configurar `tailwind.config.ts` | ⬜ |

---

## 9.3 Estructura de Carpetas

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Crear carpeta `app/providers/` | ⬜ |
| 2 | Crear carpeta `features/cats/*` | ⬜ |
| 3 | Crear carpeta `features/theme/*` | ⬜ |
| 4 | Crear carpeta `features/font/*` | ⬜ |
| 5 | Crear carpeta `widgets/*` | ⬜ |
| 6 | Crear carpeta `shared/*` | ⬜ |
| 7 | Crear carpeta `config/*` | ⬜ |

---

## 9.4 Archivos Core

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Crear `app/layout.tsx` | ⬜ |
| 2 | Crear `app/page.tsx` | ⬜ |
| 3 | Crear `app/providers/index.tsx` | ⬜ |
| 4 | Crear `app/store.ts` | ⬜ |
| 5 | Crear `app/hooks.ts` | ⬜ |
| 6 | Crear `app/globals.css` | ⬜ |

---

## 9.5 Features - Cats

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Migrar `catApi.ts` | ⬜ |
| 2 | Migrar `catMapper.ts` | ⬜ |
| 3 | Migrar `catService.ts` | ⬜ |
| 4 | Migrar `catsSlice.ts` | ⬜ |
| 5 | Migrar `useCats.ts` | ⬜ |
| 6 | Migrar `usePreloadCats.ts` | ⬜ |
| 7 | Migrar `CatCard.tsx` | ⬜ |
| 8 | Migrar `CatList.tsx` | ⬜ |
| 9 | Migrar `RandomCatList.tsx` | ⬜ |
| 10 | Migrar `FavoriteCatList.tsx` | ⬜ |
| 11 | Migrar `CatErrorHandler.tsx` | ⬜ |
| 12 | Migrar subcomponents | ⬜ |

---

## 9.6 Features - Theme & Font

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Migrar `themeSlice.ts` | ⬜ |
| 2 | Migrar `useTheme.ts` | ⬜ |
| 3 | Migrar `ThemeToggleButton.tsx` | ⬜ |
| 4 | Migrar `fontSlice.ts` | ⬜ |
| 5 | Migrar `useFont.ts` | ⬜ |
| 6 | Migrar `FontDropdown.tsx` | ⬜ |

---

## 9.7 Widgets

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Migrar `Navbar.tsx` | ⬜ |
| 2 | Migrar `MainContent.tsx` | ⬜ |
| 3 | Migrar `ToastContainer.tsx` | ⬜ |

---

## 9.8 Shared

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Migrar `ErrorBoundary.tsx` | ⬜ |
| 2 | Migrar `EmptyState.tsx` | ⬜ |
| 3 | Migrar `LoadingSpinner.tsx` | ⬜ |
| 4 | Migrar `SectionHeader.tsx` | ⬜ |
| 5 | Migrar `InitialLoadSkeleton.tsx` | ⬜ |
| 6 | Migrar skeleton components | ⬜ |
| 7 | Migrar `useAppearance.ts` | ⬜ |
| 8 | Migrar `usePageTitle.ts` | ⬜ |
| 9 | Migrar `cn.ts` utility | ⬜ |
| 10 | Migrar `appLogger.ts` | ⬜ |

---

## 9.9 Config

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Migrar `env.ts` | ⬜ |
| 2 | Migrar `motionConfig.ts` | ⬜ |
| 3 | Migrar `uiText.tsx` | ⬜ |
| 4 | Migrar `toastMessages.ts` | ⬜ |
| 5 | Migrar `storageKeys.ts` | ⬜ |
| 6 | Migrar `apiConstants.ts` | ⬜ |

---

## 9.10 Testing

| # | Tarea | Estado |
|---|-------|--------|
| 1 | `pnpm dev` funciona sin errores | ⬜ |
| 2 | `pnpm build` genera producción | ⬜ |
| 3 | `pnpm lint` pasa sin warnings | ⬜ |
| 4 | Las imágenes cargan correctamente | ⬜ |
| 5 | El tema light/dark funciona | ⬜ |
| 6 | Los favoritos se guardan/eliminan | ⬜ |
| 7 | Las animaciones funcionan | ⬜ |
| 8 | Error boundary captura errores | ⬜ |

---

## 9.11 Problemas Comunes y Soluciones

| Problema | Solución |
|----------|----------|
| Error `Module not found` | Verificar aliases en `tsconfig.json` |
| Error CORS en imágenes | Configurar `next.config.ts` con `remotePatterns` |
| Hydration error | Agregar `'use client'` al componente |
| Redux no funciona | Verificar que `ReduxProvider` envuelva la app |
| Tipos de TypeScript | Agregar interfaces explícitas |
| useRouter no funciona | Usar `use client` directive |

---

## 9.12 Comandos de Verificación

```powershell
# Desarrollo
pnpm dev

# Build producción
pnpm build

# Preview producción
pnpm start

# Linting
pnpm lint

# Análisis de dependencias
pnpm list --depth=0
```

---

## 9.13 Recursos Adicionales

- [Documentación Next.js 15](https://nextjs.org/docs)
- [Migración desde React](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Redux Toolkit + Next.js](https://redux.js.org/usage/nextjs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next/Image](https://nextjs.org/docs/app/api-reference/components/image)

---

## 9.14 Finalizado

Una vez completados todos los checklist, tu proyecto habrá sido migrado exitosamente a Next.js 15 TypeScript con:

✅ Server Components  
✅ Client Components  
✅ Redux Toolkit  
✅ FSD Architecture  
✅ TypeScript  
✅ Tailwind CSS  
✅ Image Optimization  
✅ CORS Handling  

---

**¡Felicitaciones! La migración está completa.**
