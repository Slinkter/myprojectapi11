# Centro de Documentación Técnica

> **Proyecto:** Galería de Gatos — Referencia de Arquitectura Limpia
> **Stack:** React 19 · Vite 7 · Redux Toolkit 2 · Tailwind CSS v4 · Framer Motion 12

Este es el índice central para toda la documentación técnica. Comienza aquí.

---

## 🚀 Ruta de Inicio Rápido (Para Estudiantes)

1. **[00-GUIA-CONFIGURACION.md](./00-SETUP-GUIDE.md)** ← **Empieza aquí** si estás configurando el proyecto desde cero.
2. **[04-ARQUITECTURA.md](./04-ARCHITECTURE.md)** — Comprende dónde vive cada archivo y por qué.
3. **[06-CONTRIBUCION.md](./06-CONTRIBUTING.md)** — Entiende cómo escribir código que encaje en este proyecto.

---

## 📚 Índice Completo de Documentación

### 0. Primeros Pasos

| Archivo                                     | Descripción                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [00-GUIA-CONFIGURACION.md](./00-SETUP-GUIDE.md) | Instalación de Node, pnpm, creación del proyecto Vite, obtención de clave API, configuración de `.env`, configuración de Redux y Tailwind |

### 1. Visión General del Proyecto

| Archivo                                             | Descripción                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| [01-ACTA-PROYECTO.md](./01-PROJECT-CHARTER.md) | Objetivos del proyecto, equipo, tabla completa del stack tecnológico y KPIs                       |
| [02-REQUISITOS.md](./02-REQUIREMENTS.md)       | Requisitos Funcionales y No Funcionales con tablas de criterios de aceptación |
| [03-CASOS-USO.md](./03-USE-CASES.md)             | Flujos detallados de interacción del usuario para los 5 casos de uso                        |

### 2. Arquitectura y Diseño

| Archivo                                               | Descripción                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| [04-ARQUITECTURA.md](./04-ARCHITECTURE.md)         | Capas FSD, árbol de archivos real, flujo de datos, forma del estado de Redux, alias de rutas |
| [05-SISTEMA-DISENO-UI.md](./05-UI-DESIGN-SYSTEM.md) | Tokens de Tailwind, especificaciones de animación, reglas de skeletons, guías de componentes |

### 3. Flujo de Trabajo de Desarrollo

| Archivo                                         | Descripción                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| [06-CONTRIBUCION.md](./06-CONTRIBUTING.md)   | Convenciones de nombres, reglas de JSDoc (con ejemplos reales), reglas de arquitectura, flujo de Git |
| [07-PROCESO-SCRUM.md](./07-SCRUM-PROCESS.md) | Checklist de DoD, eventos de sprint, etiquetas de issues, flujo de PR                                    |
| [08-GLOSARIO.md](./08-GLOSSARY.md)           | Definiciones de todos los términos de arquitectura, dominio y UI/UX utilizados en este proyecto         |

---

## 🛠 Regla de Mantenimiento

Esta documentación es un **artefacto vivo**. Cada Pull Request que:

- Añada una nueva dependencia → actualizar `00-GUIA-CONFIGURACION.md` y `01-ACTA-PROYECTO.md`.
- Cambie la estructura de carpetas → actualizar el árbol de directorios en `04-ARQUITECTURA.md`.
- Cambie la forma de un componente → actualizar `05-SISTEMA-DISENO-UI.md`.
- Cambie un slice de Redux → actualizar la forma del estado en `04-ARQUITECTURA.md`.

**Los PRs sin actualizaciones de documentación serán rechazados según la regla #8 del DoD.**
