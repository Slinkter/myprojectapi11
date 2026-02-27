# Proceso y Flujo de Trabajo SCRUM

## 1. Roles

| Rol              | Responsabilidad                                                          |
| ----------------- | ----------------------------------------------------------------------- |
| **Product Owner** | Define funcionalidades, escribe criterios de aceptación (ver `02-REQUISITOS.md`) |
| **Scrum Master**  | Elimina impedimentos técnicos (errores de compilación, bloqueos arquitectónicos)       |
| **Desarrollador**     | Implementación, pruebas, documentación JSDoc                            |

---

## 2. Definición de Hecho (Definition of Done - DoD)

Una funcionalidad o tarea solo está "Hecha" cuando **todo** lo siguiente es cierto:

| #   | Criterio                                                           | Herramienta / Evidencia |
| --- | ------------------------------------------------------------------ | --------------- |
| 1   | Código escrito y formateado                                         | Prettier        |
| 2   | ESLint pasa con **0 advertencias**                                  | `pnpm run lint` |
| 3   | La funcionalidad cumple todos los Criterios de Aceptación de `02-REQUISITOS.md`    | QA Manual       |
| 4   | Todos los miembros exportados tienen JSDoc con `@param` y `@returns` tipados | Revisión de código     |
| 5   | Datos de dominio tipados vía `@typedef` de entidad de dominio (ej., `CatEntity`) | Revisión de código     |
| 6   | Los cargadores skeleton coinciden con las dimensiones finales del componente                  | Prueba visual     |
| 7   | Compila sin errores: `pnpm run build`                             | CI              |
| 8   | Código fusionado a `develop` sin conflictos                         | Git             |

---

## 3. Estructura de Eventos

### Planificación del Sprint (Sprint Planning)

- Seleccionar elementos del Product Backlog, estimar complejidad.
- Confirmar que los elementos cumplen con los **Criterios de Entrada**: criterios de aceptación escritos en `02-REQUISITOS.md`.

### Stand-up Diaria (Daily Stand-up)

1. ¿Qué completé?
2. ¿En qué trabajaré a continuación?
3. ¿Algún impedimento?

### Revisión del Sprint y Demo (Sprint Review & Demo)

- Demostración del software funcional en el navegador.
- Verificar puntuación Lighthouse > 90 en la compilación de demostración.

### Retrospectiva del Sprint (Sprint Retrospective)

- ¿Qué salió bien?
- ¿Qué debería mejorar?
- Acciones asignadas al próximo sprint.

---

## 4. Etiquetas de Issues (GitHub Issues)

| Etiqueta      | Significado                              |
| ---------- | ------------------------------------ |
| `feat`     | Nueva funcionalidad                    |
| `fix`      | Corrección de error                              |
| `refactor` | Mejora de código, sin cambio de comportamiento |
| `docs`     | Actualización de documentación                 |
| `chore`    | Configuración de compilación, dependencias           |
| `blocked`  | No se puede proceder, necesita entrada externa |

---

## 5. Flujo de Ramas y PR

```
feature/cat-tagging
    ↓ PR a
develop
    ↓ PR a (tras revisión)
main
    ↓ auto-despliegue
GitHub Pages
```

Checklist de PR:

- [ ] El linting pasa.
- [ ] JSDoc completo en los archivos modificados.
- [ ] Documentación actualizada si cambió la API o la arquitectura.
- [ ] Prueba de CLS: el skeleton coincide visualmente con el contenido cargado.
