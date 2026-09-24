---
name: Story / Task
about: Historia de usuario con criterios funcionales, o tarea técnica derivada de una historia.
title: ''
labels: ''
assignees: ''

---

# STORY: [Nombre de la Funcionalidad]

> **Código:** `[PROYECTO]-[MODULO]-H[XX]`
> **Responsable:** @usuario
> **Prioridad:** CRÍTICA | ALTA | MEDIA
> **Dependencia:** [ID_STORY] — [Nombre de la dependencia]

---

## ▸ Contexto

[Propósito de esta funcionalidad, problema que resuelve y por qué es necesaria ahora.]

## ▸ Historia de usuario

**Como** [rol del usuario]
**necesito** [acción o funcionalidad]
**para** [beneficio o valor de negocio]

---

## ▸ Dependencias y bloqueos

- [ ] **Bloqueante:** [Descripción de qué impide el progreso]
- [ ] **Técnica:** [Requisito previo de infraestructura o BD]

---

## ▸ Criterios de aceptación

```gherkin
Feature: [Nombre de la funcionalidad]

  Scenario: [Nombre del escenario]
    Given [Contexto inicial]
    When [Acción realizada]
    Then [Resultado esperado]
    And [Validación adicional]

  Scenario: [Escenario alternativo o de error]
    Given ...
```

---

## ▸ Permisos por rol

| Ruta / Acción | admin | content_manager | project_lead | user |
|---|---|---|---|---|
| `/ruta/*` | ✅ | ❌ | ❌ | ❌ |

---

## ▸ Notas

- [ ] **Bug conocido:** [Descripción]
- [ ] **Out of scope:** [Lo que no se hará en este issue]

---
---
---

# TAREA: [Nombre de la Tarea Técnica]

> **Código:** `[PROYECTO]-[MODULO]-T[XX]`
> **Parent Story:** #[ID_STORY]
> **Responsable:** @usuario
> **Prioridad:** [Nivel]

---

## ▸ Descripción

[Problema técnico, conflicto de código o necesidad de infraestructura que esta tarea resuelve.]

---

## ▸ Archivos y rutas clave

- `ruta/al/archivo` — [Descripción del componente o endpoint]
- `ruta/al/directorio/` — [Propósito del módulo]

---

## ▸ Checklist de ejecución

- [ ] [Paso técnico 1]
- [ ] [Paso técnico 2]
- [ ] [Verificación en entorno local o staging]

---

## ▸ Criterio de aceptación técnico

```gherkin
Given [Situación técnica inicial]
When [Se ejecuta el cambio]
Then [El sistema se comporta de X manera]
And [No se rompe la funcionalidad Y]
```

---

## ▸ Notas técnicas

- **Variables de entorno:** [Variables necesarias, si aplica]
- **Impacto:** [Módulos que podrían verse afectados]
