# 🗺️ Mapa de Documentación: Cat Gallery Reference

Bienvenido a la documentación técnica de **Cat Gallery**. Este repositorio está diseñado como un recurso de aprendizaje para arquitecturas modernas de React.

---

## 🧭 Ruta de Aprendizaje (Pedagógica)

Si eres nuevo en el proyecto, te recomendamos seguir este orden:

### 1. El Concepto y los Fundamentos
- **[00-INTRODUCCION.md](./00-INTRODUCCION.md)**: ¿Por qué usamos esta arquitectura? (Problema vs Solución).
- **[08-GLOSARIO.md](./08-GLOSARY.md)**: Términos técnicos usados en este proyecto.
- **[learning/REACT_CONCEPTS.md](./learning/REACT_CONCEPTS.md)**: Cómo aplicamos los hooks de React aquí.

### 2. Puesta en Marcha
- **[00-SETUP-GUIDE.md](./00-SETUP-GUIDE.md)**: Guía paso a paso para recrear este proyecto desde cero.
- **[01-PROJECT-CHARTER.md](./01-PROJECT-CHARTER.md)**: Objetivos, stack tecnológico y KPIs.

### 3. Profundizando en la Arquitectura
- **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)**: Diagramas estructurales y flujos de datos.
- **[guides/DATA_FLOW.md](./guides/DATA_FLOW.md)**: Explicación visual de cómo fluyen los datos desde la API hasta la pantalla.
- **[architecture/PATTERNS.md](./architecture/PATTERNS.md)**: Patrones específicos (Facade, Mapper, Service).

### 4. Guías de Desarrollo (Cómo Contribuir)
- **[06-CONTRIBUTING.md](./06-CONTRIBUTING.md)**: Reglas de oro, convenciones de nombres y Git.
- **[guides/COMPONENT_GUIDE.md](./guides/COMPONENT_GUIDE.md)**: Cómo crear nuevos componentes siguiendo FSD.
- **[05-UI-DESIGN-SYSTEM.md](./05-UI-DESIGN-SYSTEM.md)**: Sistema de diseño, tokens y animaciones.

---

## 📚 Referencia Técnica Completa

| Categoría | Documentos |
| :--- | :--- |
| **Negocio / Producto** | [Requisitos](./02-REQUIREMENTS.md) · [Casos de Uso](./03-USE-CASES.md) · [Proceso Scrum](./07-SCRUM-PROCESS.md) |
| **API & Datos** | [Cliente API](./api/API_CLIENT.md) · [Endpoints](./api/ENDPOINTS.md) |
| **Componentes** | [Índice UI](./components/INDEX.md) · [Button](./components/Button.md) · [Select](./components/Select.md) |
| **Refactorización** | [Plan](./PLAN_REFACTOR.md) · [Naming Guide](./refactoring/NAMING_GUIDE.md) |

---

## 🛠️ Regla de Oro del Mantenimiento

> **"Si el código cambia, la documentación cambia".**

Cada cambio en la lógica de negocio o en la estructura de archivos debe reflejarse en estos documentos. Consulta el `DoD` (Definition of Done) en [07-SCRUM-PROCESS.md](./07-SCRUM-PROCESS.md).
