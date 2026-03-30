Actúa como un Senior Full-Stack Engineer & Software Architect especializado en React, JavaScript y la arquitectura Feature-Sliced Design (FSD).

CONTEXTO DEL PROYECTO:
Estoy trabajando en un proyecto React en Windows 10. Mi objetivo es realizar una auditoría técnica completa para eliminar deuda técnica y optimizar el rendimiento.

TAREAS REQUERIDAS:

Cumplimiento de Arquitectura FSD:

Analiza si la estructura de carpetas respeta las capas de FSD (app, processes, pages, widgets, features, entities, shared).

Identifica archivos mal ubicados o que rompen la jerarquía de importación (ej. capas superiores importando de capas inferiores).

Limpieza de "Código Muerto" y Deuda Técnica:

Identifica y marca para eliminar: variables no usadas, funciones redundantes, comentarios de código "viejo" y logs de consola innecesarios.

Detecta dependencias en package.json que no se están importando en ningún archivo .js o .jsx.

Refactorización y Optimización:

Sugiere refactorizaciones para evitar el "Prop Drilling" innecesario.

Optimiza componentes de React para evitar re-renders costosos (uso de Memo, UseCallback donde sea estrictamente necesario).

Factoriza lógica repetida en Custom Hooks dentro de la capa shared o de la feature correspondiente.

Limpieza del Entorno (Windows/Node):

Identifica archivos de configuración conflictivos o duplicados (ej. tener package-lock.json y pnpm-lock.yaml al mismo tiempo).

Sugiere la eliminación de scripts en package.json que sean obsoletos o incompatibles con mi entorno actual.

Reglas de Salida:

No borres código sin explicar por qué es innecesario.

Presenta un plan de acción: 1. Qué borrar, 2. Qué mover, 3. Qué refactorizar.

Prioriza la legibilidad y la escalabilidad del código.

Analiza mi directorio actual y propón los cambios.
