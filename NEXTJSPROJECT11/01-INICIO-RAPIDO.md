# Fase 1: Inicio Rápido - Crear Proyecto Next.js 15 TypeScript

## 1.1 Requisitos Previos

| Requisito | Versión Mínima |
|-----------|----------------|
| Node.js | v18+ (recomendado v20 LTS) |
| pnpm | v8+ |
| Windows | 10 x64 |

Verificar instalación:
```powershell
node --version
pnpm --version
```

---

## 1.2 Crear Proyecto Next.js 15 con TypeScript

### Paso 1: Ejecutar create-next-app

```powershell
npx create-next-app@15 nextjsproject11
```

### Paso 2: Configuración Interactiva

```
? Would you like to use TypeScript? → YES
? Would you like to use ESLint? → YES
? Would you like to use Tailwind CSS? → YES
? Would you like to use `src/` directory? → YES
? Would you like to use App Router? → YES
? Would you like to customize the default import alias? → YES
? What import alias would you like configured? → @/* (default)
```

### Paso 3: Navegar e Instalar

```powershell
cd nextjsproject11
pnpm install
```

### Paso 4: Verificar que Funciona

```powershell
pnpm dev
```

Abrir en navegador: `http://localhost:3000`

---

## 1.3 Estructura Inicial Generada

```
nextjsproject11/
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.module.css
│   │   └── page.tsx
│   └── ...
├── public/
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## 1.4 Limpiar Archivos Innecesarios

```powershell
# Eliminar CSS de ejemplo que no usaremos
Remove-Item -Path "src\app\page.module.css" -Force

# Limpiar globals.css
"" | Out-File -FilePath "src\app\globals.css" -Encoding utf8
```

---

## 1.5 Siguiente Paso

➡️ [Fase 2: Instalación de Paquetes](./02-INSTALACION-PACKAGES.md)
