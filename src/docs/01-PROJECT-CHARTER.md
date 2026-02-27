# Acta del Proyecto: Galería de Gatos

## 1. Resumen del Proyecto

| Campo            | Valor                                      |
| ---------------- | ------------------------------------------ |
| **Nombre del Proyecto** | Galería de Gatos                                |
| **Versión**      | 0.0.0                                      |
| **Tipo**         | Aplicación de Página Única (SPA)              |
| **Arquitectura** | Feature-Sliced Design + Arquitectura Limpia |
| **URL en Vivo**     | https://slinkter.github.io/myprojectapi11  |
| **Repositorio**   | https://github.com/slinkter/myprojectapi11 |

**Descripción:** Una SPA de demostración construida con React 19, Vite 7, Redux Toolkit y Tailwind CSS v4 que permite a los usuarios explorar imágenes aleatorias de gatos, gestionar favoritos y personalizar el tema/tipografía. Diseñada para servir como una **referencia de arquitectura insignia** para desarrolladores de nivel junior y medio.

---

## 2. Objetivos de Negocio

| Objetivo             | Descripción                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Demo de Arquitectura** | Demostrar Feature-Sliced Design, Patrón Fachada, Adaptador/Mapper y tipado estricto de JSDoc en JS de producción |
| **Compromiso del Usuario**   | Proporcionar una UI premium con animaciones aceleradas por hardware (Framer Motion) y cero saltos de diseño (CLS)                  |
| **Recurso para Estudiantes**  | Servir como una referencia guiada para desarrolladores que aprenden patrones modernos de arquitectura en React                           |

---

## 3. Partes Interesadas (Stakeholders)

| Rol                   | Persona                                        |
| ---------------------- | --------------------------------------------- |
| Product Owner / Cliente | Desarrollador (Usuario)                              |
| Arquitecto Principal         | Agente de IA                                      |
| Usuarios Finales              | Estudiantes y desarrolladores que estudian el código fuente |

---

## 4. Stack Tecnológico

| Capa            | Tecnología                  | Versión        |
| ---------------- | --------------------------- | -------------- |
| Framework de UI     | React                       | 19.2.3         |
| Herramienta de Construcción       | Vite                        | 7.3.0          |
| Gestión de Estado | Redux Toolkit + react-redux | 2.11.2 / 9.2.0 |
| Cliente API       | Axios                       | 1.13.2         |
| Animaciones       | Framer Motion               | 12.34.3        |
| Estilos          | Tailwind CSS v4             | 4.1.18         |
| Gestión de Clases | clsx + tailwind-merge       | 2.1.1 / 3.5.0  |
| Notificaciones    | react-hot-toast             | 2.6.0          |
| Iconos            | react-icons                 | 5.5.0          |
| Despliegue       | GitHub Pages (gh-pages)     | 6.3.0          |

---

## 5. Alcance

### Dentro del Alcance

- Obtención de imágenes aleatorias de gatos desde TheCatAPI a través de una capa de Mapeo Anti-Corrupción.
- Gestión de favoritos (Guardar / Eliminar) persistidos a través de TheCatAPI.
- Cambio de tema Oscuro / Claro persistido en LocalStorage.
- Selección dinámica de tipografía persistida en LocalStorage.
- Cuadrícula de tarjetas animada con transiciones de entrada, salida y diseño (layout).
- Cargadores Skeleton de alta precisión que evitan saltos de diseño (layout shift).

### Fuera del Alcance

- Autenticación de usuarios (Login / Registro).
- Funcionalidades sociales (compartir, comentarios).
- Renderizado del lado del servidor (SSR).
- Infraestructura de backend (depende de TheCatAPI).

---

## 6. Indicadores Clave de Éxito (KPIs)

| KPI                           | Objetivo                                |
| ----------------------------- | ------------------------------------- |
| Rendimiento en Lighthouse        | > 90                                  |
| Cumulative Layout Shift (CLS) | 0.0                                   |
| Advertencias de ESLint               | 0                                     |
| Cobertura de JSDoc                | 100% de los miembros exportados              |
| Acoplamiento de componentes            | 0 llamadas directas a Redux en componentes de UI |
