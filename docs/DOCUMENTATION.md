# Centro de Documentación Técnica

> **Proyecto:** Galería de Gatos — Referencia de Arquitectura Limpia
> **Stack:** React 19 · Vite 7 · Redux Toolkit 2 · Tailwind CSS v4 · Framer Motion 12
> **Última Actualización:** 2026-03-22

Este es el índice central para toda la documentación técnica. Comienza aquí.

---

## 🚀 Ruta de Inicio Rápido (Para Estudiantes)

1. **[00-SETUP-GUIDE.md](./00-SETUP-GUIDE.md)** ← **Empieza aquí** si estás configurando el proyecto desde cero.
2. **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)** — Comprende dónde vive cada archivo y por qué.
3. **[06-CONTRIBUTING.md](./06-CONTRIBUTING.md)** — Entiende cómo escribir código que encaje en este proyecto.

---

## 📚 Índice Completo de Documentación

### 0. Primeros Pasos

| Archivo                               | Descripción                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [00-SETUP-GUIDE.md](./00-SETUP-GUIDE.md) | Instalación de Node, pnpm, creación del proyecto Vite, obtención de clave API, configuración de `.env`, configuración de Redux, Tailwind y componentes de layout |

### 1. Visión General del Proyecto

| Archivo                               | Descripción                                                                |
| ------------------------------------ | -------------------------------------------------------------------------- |
| [01-PROJECT-CHARTER.md](./01-PROJECT-CHARTER.md) | Objetivos del proyecto, equipo, tabla completa del stack tecnológico y KPIs |
| [02-REQUIREMENTS.md](./02-REQUIREMENTS.md)     | Requisitos Funcionales y No Funcionales con tablas de criterios de aceptación |
| [03-USE-CASES.md](./03-USE-CASES.md)           | Flujos detallados de interacción del usuario para los 5 casos de uso                        |

### 2. Arquitectura y Diseño

| Archivo                               | Descripción                                                            |
| ------------------------------------ | ---------------------------------------------------------------------- |
| [04-ARCHITECTURE.md](./04-ARCHITECTURE.md)     | Capas FSD, árbol de archivos real, flujo de datos, forma del estado de Redux, alias de rutas, componentes de layout |
| [05-UI-DESIGN-SYSTEM.md](./05-UI-DESIGN-SYSTEM.md) | Tokens de Tailwind, especificaciones de animación, reglas de skeletons, guías de componentes |

### 3. Flujo de Trabajo de Desarrollo

| Archivo                               | Descripción                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| [06-CONTRIBUTING.md](./06-CONTRIBUTING.md) | Convenciones de nombres, reglas de JSDoc (con ejemplos reales), reglas de arquitectura, flujo de Git |
| [07-SCRUM-PROCESS.md](./07-SCRUM-PROCESS.md) | Checklist de DoD, eventos de sprint, etiquetas de issues, flujo de PR                                    |
| [08-GLOSSARY.md](./08-GLOSSARY.md)       | Definiciones de todos los términos de arquitectura, dominio y UI/UX utilizados en este proyecto         |

### 4. Notas y Guías de Estudio

| Archivo                               | Descripción                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| [NOTES/NOTES-TUTORIAL.md](./NOTES/NOTES-TUTORIAL.md) | Guía paso a paso para entender y modificar el proyecto |
| [NOTES/NOTES-PRACTICO.md](./NOTES/NOTES-PRACTICO.md) | Código real del proyecto con explicaciones prácticas |
| [NOTES/NOTES-ACADEMICO.md](./NOTES/NOTES-ACADEMICO.md) | Fundamentos académicos de arquitectura frontend |

---

## 🛠 Regla de Mantenimiento

Esta documentación es un **artefacto vivo**. Cada Pull Request que:

- Añada una nueva dependencia → actualizar `00-SETUP-GUIDE.md` y `01-PROJECT-CHARTER.md`.
- Cambie la estructura de carpetas → actualizar el árbol de directorios en `04-ARCHITECTURE.md`.
- Cambie la forma de un componente → actualizar `05-UI-DESIGN-SYSTEM.md`.
- Cambie un slice de Redux → actualizar la forma del estado en `04-ARCHITECTURE.md`.
- Añada nuevos componentes de layout → actualizar `04-ARCHITECTURE.md` y `05-UI-DESIGN-SYSTEM.md`.
- Añada nuevos archivos de configuración → actualizar `04-ARCHITECTURE.md`.

**Los PRs sin actualizaciones de documentación serán rechazados según la regla #8 del DoD.**
