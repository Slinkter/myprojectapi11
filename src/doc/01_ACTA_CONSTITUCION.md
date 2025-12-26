# Acta de Constitución del Proyecto (Project Charter)

**Fecha:** 6 de Diciembre, 2025
**Proyecto:** Cat Gallery Modernization (v3.0)
**Patrocinador:** CLIENTE-01 (Usuario)
**Director del Proyecto:** Assistant AI (PMP, Lead Engineer)

## 1. Propósito y Justificación del Proyecto

El proyecto nace de la necesidad de modernizar la infraestructura tecnológica de la aplicación "Cat Gallery". La versión anterior presentaba deuda técnica, dependencias obsoletas y falta de flexibilidad en la personalización (temas y fuentes). La actualización accidental a Tailwind CSS v4 generó una ruptura crítica que justificó una reingeniería mayor para alinear el producto con los estándares modernos de desarrollo (CSS-First, mejor rendimiento).

## 2. Objetivos del Proyecto

-   **Técnico:** Migrar exitosamente a Tailwind CSS v4, eliminando la dependencia de `@material-tailwind/react` y reduciendo el tamaño del bundle en al menos un 15%.
-   **Funcional:** Implementar un sistema robusto de personalización que incluya Modo Oscuro nativo y Cambio de Tipografía dinámico.
-   **Calidad:** Asegurar que la aplicación obtenga una puntuación de Accesibilidad y Rendimiento >90 en Lighthouse.

## 3. Descripción de Alto Nivel (Alcance)

El proyecto abarca la refactorización del frontend desarrollado en React. Incluye:

-   Configuración de entorno Vite + Tailwind v4.
-   Refactorización de componentes UI (Botones, Dropdowns, Tarjetas) a HTML/CSS nativo.
-   Implementación de Context API para gestión de estado de UI (Tema y Fuentes).
-   Documentación técnica y de gestión.

**Fuera del Alcance:** Backend (se utiliza API pública), autenticación de usuarios y base de datos persistente (se usa LocalStorage).

## 4. Riesgos de Alto Nivel

-   **Inestabilidad de Dependencias:** Tailwind v4 está en fases recientes, posibles cambios en el API podrían romper estilos futuramente.
-   **Curva de Aprendizaje:** La nueva sintaxis de Tailwind v4 (CSS-First) requiere adaptación del equipo de desarrollo.

## 5. Resumen del Cronograma de Hitos

| Hito                         | Fecha Estimada | Entregable                           |
| :--------------------------- | :------------- | :----------------------------------- |
| Inicio del Proyecto          | 06/12/2025     | Acta de Constitución Aprobada        |
| Diagnóstico de Ruptura       | 06/12/2025     | Informe de Errores (Log)             |
| Migración de Infraestructura | 06/12/2025     | Configuración Vite/PostCSS funcional |
| Refactorización UI           | 06/12/2025     | Componentes visuales restaurados     |
| Pruebas y QA                 | 06/12/2025     | App funcional en Modo Oscuro/Claro   |
| Cierre del Proyecto          | 06/12/2025     | Documentación completa entregada     |

## 6. Presupuesto

El presupuesto se basa en esfuerzo horas-hombre (HH) del equipo de desarrollo (IA + Usuario). Se estima un total de 4 horas de trabajo intensivo de refactorización y documentación.

## 7. Lista de Interesados (Stakeholders)

-   **Sponsor/Product Owner:** Usuario final (Define requerimientos y aprueba cambios).
-   **Project Manager / Desarrollo:** Assistant AI (Ejecuta, documenta y gestiona).
-   **Usuarios Finales:** Visitantes de la galería de gatos (Público objetivo).

## 8. Criterios de Aprobación

El proyecto se considera exitoso cuando:

1.  La aplicación compila sin errores ni advertencias de dependencias.
2.  El cambio de tema y fuente funciona instantáneamente.
3.  La interfaz visual es consistente y estética ("Premium").
4.  Se entrega la documentación completa en la carpeta `doc/`.

---

**Firmado:**
_Director del Proyecto (AI)_
