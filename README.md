# 🐱 CatCloud — React 19 Media Gallery & Cloud Platform

[![React](https://img.shields.io/badge/React-19.2-20232A?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.3-0055FF?style=flat&logo=framer)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Plataforma Single Page Application (SPA) para la exploración multimedia de razas felinas y gestión de favoritos en la nube. Construida con **React 19**, **Vite 7**, **Tailwind CSS v4** y arquitectura **Feature-Sliced Design (FSD)** con tipado estricto JSDoc y esquemas Zod.

---

## 🎯 Características Principales

- **Explorador Multimedia de Gatos**: Carga infinita y exploración interactiva de imágenes y razas de TheCatAPI.
- **Sistema de Favoritos en la Nube**: Gestión de likes y favoritos sincronizados con el backend de TheCatAPI.
- **Personalización de Tema & Tipografía**: Selector dinámico de temas de color y estilos de tipografía en tiempo real.
- **Arquitectura FSD & Patrón Facade**: Componentes desacoplados de Redux mediante Facade Hooks (`useCats`, `useTheme`, `useFont`).
- **Animaciones con LazyMotion**: Rendimiento superior cargando dinámicamente las funciones de animación de Framer Motion.
- **Blindaje con Zod**: Mapeo y validación de entidades asegurando que solo datos normalizados lleguen a la capa visual.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Rol |
| :--- | :--- | :--- |
| **Framework** | React 19.2 | Versión más reciente de React con compilador y mejoras de renderizado |
| **Bundler** | Vite 7.3 | Empaquetador de última generación con soporte para Tailwind v4 |
| **Estado Global** | Redux Toolkit | Gestión de colecciones, favoritos y preferencias de usuario |
| **Estilos** | Tailwind CSS v4.1 | Variables CSS nativas y diseño responsivo |
| **Animación** | Framer Motion 12 | Microinteracciones y transiciones con soporte para reducción de movimiento |
| **Validación** | Zod | Normalización de payloads de API |

---

## 🏗️ Arquitectura (FSD)

```text
src/
├── app/            # Store Redux, inicialización y Providers
├── config/         # Configuración centralizada de entorno, animaciones y constantes
├── features/cats/  # Api, adaptadores Zod, servicios, slice Redux, hooks y componentes de gatos
├── features/theme/ # Slice y hook de personalización de temas visuales
├── features/font/  # Slice y hook de personalización tipográfica
├── shared/         # Componentes atómicos UI, hooks genéricos y utilidades
└── widgets/        # Navbar, Main Content y Toast de notificaciones
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js**: v18.0 o superior
- **pnpm**: v9.0 o superior
- **API Key de TheCatAPI** (Gratuita)

### Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   *Consulta [.env.example](.env.example) para instrucciones detalladas paso a paso para obtener tu clave gratuita de TheCatAPI.*

3. **Iniciar en modo desarrollo:**
   ```bash
   pnpm run dev
   ```

4. **Compilar para producción:**
   ```bash
   pnpm run build
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.
