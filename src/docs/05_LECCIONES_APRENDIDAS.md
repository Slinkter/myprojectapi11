# Lecciones Aprendidas (Lessons Learned)

## Identificación de la Lección

**ID:** LL-001
**Fecha:** 06/12/2025
**Categoría:** Gestión de Dependencias / Mantenimiento

## 1. Descripción de la Situación

Durante una tarea rutinaria de actualización de dependencias, se ejecutó el comando `pnpm update --latest` con la intención de tener "lo último y mejor". Esto provocó la actualización no intencionada de `tailwindcss` de la versión 3.x a la 4.x (versión alpha/beta con cambios disruptivos).

## 2. Impacto (Qué salió mal)

1.  **Ruptura Total del Build:** La aplicación dejó de compilar debido a cambios estructurales en el ecosistema (PostCSS plugin separado).
2.  **Incompatibilidad en Cascada:** La librería `@material-tailwind/react`, que depende de la configuración interna de Tailwind v3, dejó de funcionar, rompiendo toda la UI.
3.  **Pérdida de Tiempo:** Se invirtió tiempo significativo diagnosticando el error y luego reescribiendo componentes que funcionaban perfectamente antes de la actualización.

## 3. Causa Raíz

-   **Falta de revisión de Changelogs:** Se asumió que `update --latest` era seguro sin verificar si había saltos de versión mayor (Major Version Bump) en paquetes críticos.
-   **Uso de Versiones inestables/nuevas:** Tailwind v4 introduce cambios de paradigma muy grandes que quizás no estaban listos para un entorno de producción con dependencias heredadas.

## 4. Acciones Correctivas Tomadas

-   Se migró la arquitectura a la nueva versión (acción de "fail forward" en lugar de rollback) para aprovechar las mejoras de rendimiento.
-   Se eliminaron las dependencias de terceros conflictivas (`@material-tailwind`) favoreciendo el desarrollo nativo.

## 5. Recomendaciones para el Futuro (Best Practices)

1.  **Evitar `--latest` a ciegas:** Utilizar `pnpm update` (interactivo) o `pnpm up` que respeta el SemVer del `package.json`.
2.  **Pinning de Dependencias:** Considerar quitar el prefijo `^` en dependencias críticas en producción para evitar actualizaciones automáticas a versiones con cambios disruptivos.
3.  **Ambiente de Pruebas:** Ejecutar actualizaciones grandes en una rama separada (`chore/deps-update`) y verificar el build antes de fusionar a `main`.
4.  **Vendor Independence:** Reducir el acoplamiento con librerías de componentes UI que envuelvan demasiado la lógica de estilos, ya que tienden a quedarse atrás en actualizaciones del framework base.

---

**Registrado por:** AI Project Lead
