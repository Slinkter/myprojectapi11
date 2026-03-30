# Fase 2: Instalación de Paquetes

## 2.1 Dependencias del Proyecto Actual

Ejecutar en la raíz del proyecto:

```powershell
pnpm add @reduxjs/toolkit react-redux axios framer-motion react-hot-toast react-icons prop-types tailwind-merge clsx zod
```

### Dependencias Explicadas

| Paquete | Versión Actual | Propósito |
|---------|----------------|-----------|
| @reduxjs/toolkit | ^2.11.2 | Gestión de estado global |
| react-redux | ^9.2.0 | Conector React-Redux |
| axios | ^1.13.5 | Cliente HTTP |
| framer-motion | ^12.34.3 | Animaciones |
| react-hot-toast | ^2.6.0 | Notificaciones toast |
| react-icons | ^5.5.0 | Iconos (Bootstrap, etc.) |
| prop-types | ^15.8.1 | Validación de props |
| tailwind-merge | ^3.5.0 | Utility para clases Tailwind |
| clsx | ^2.1.1 | Conditional classes |
| zod | ^4.3.6 | Validación de esquemas |

---

## 2.2 Dependencias de Desarrollo

Las siguientes ya deberían estar instaladas por create-next-app:

```powershell
# Verificar package.json
pnpm list --depth=0
```

Si falta alguna:
```powershell
pnpm add -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

## 2.3 Estructura de Dependencies en package.json

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.11.2",
    "react-redux": "^9.2.0",
    "axios": "^1.13.5",
    "framer-motion": "^12.34.3",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "prop-types": "^15.8.1",
    "tailwind-merge": "^3.5.0",
    "clsx": "^2.1.1",
    "zod": "^4.3.6"
  }
}
```

---

## 2.4 Siguiente Paso

➡️ [Fase 3: Arquitectura FSD](./03-ARQUITECTURA-FSD.md)
