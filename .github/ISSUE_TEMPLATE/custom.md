---
name: Custom issue template
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

# 📖 STORY: [Nombre de la Funcionalidad]

> **Código:** `[PROYECTO]-[MODULO]-H[XX]`
> **Sprint:** [Nombre/Número del Sprint]
> **Responsable:** @usuario
> **Prioridad:** 🔴 CRÍTICA | 🟡 ALTA | 🔵 MEDIA
> **Dependencia:** [ID_STORY] — [Nombre de la dependencia]

---

## 📋 Contexto
[Explicación del propósito de esta funcionalidad, qué problema resuelve y por qué es necesaria ahora.]

## 👤 Historia de Usuario
**Como** [Rol del usuario]  
**Necesito** [Acción o funcionalidad]  
**Para** [Beneficio o valor de negocio]

---

## ⚠️ Dependencias / Bloqueos
- [ ] **Bloqueante:** [Descripción de qué impide el progreso]
- [ ] **Técnica:** [Requisito previo de infraestructura o BD]

---

## ✅ Criterios de Aceptación (Gherkin)
```gherkin
Feature: [Nombre de la funcionalidad]

  Scenario: [Nombre del escenario 1]
    Given [Contexto inicial]
    When [Acción realizada]
    Then [Resultado esperado]
    And [Validación adicional]

  Scenario: [Nombre del escenario 2 (Error/Alternativo)]
    Given ...
```

---

## 🔒 Seguridad y Permisos
| Ruta/Acción | Rol A | Rol B | Rol C |
|------|-------|-------|-------| 
| `/ruta/*` | ✅ | ❌ | ❌ |

---

## 📌 Notas / Bugs Conocidos
- [ ] **Bug:** [Descripción del error a corregir]
- [ ] **Out of Scope:** [Lo que NO se hará en este sprint]

# 🔧 Tarea: [Nombre de la Tarea Técnica]

> **Código:** `[PROYECTO]-[MODULO]-T[XX]`
> **Parent Story:** #[ID_STORY]
> **Responsable:** @usuario
> **Prioridad:** [Nivel]

---

## 📋 Descripción
[Explicación detallada del problema técnico, conflicto de código o necesidad de infraestructura.]

---

## 📂 Archivos / Rutas Clave
- `ruta/al/archivo` — [Descripción del componente o API]
- `ruta/al/directorio/` — [Propósito del módulo]

---

## 📊 Resumen Técnico
| Métrica | Valor |
|---------|-------|
| Patrón Arquitectónico | [Ej: SSR, Server Actions, Client Component] |
| Seguridad/Protección | [Ej: RBAC, CSRF, JWT-Middleware] |
| Dependencias Críticas | [Listado de librerías o servicios] |

---

## ✅ Checklist de Ejecución
- [ ] [Paso técnico 1]
- [ ] [Paso técnico 2]
- [ ] [Verificación en entorno de producción/staging]

---

## 🧪 Criterio de Aceptación Técnico
```gherkin
Dado que [Situación técnica inicial]
Cuando [Se ejecuta el cambio/script/merge]
Entonces [El sistema se comporta de X manera]
Y [No se rompe la funcionalidad Y]
```

---

## 📌 Notas Técnicas
- **Variables de Entorno:** [Listado de variables necesarias]
- **Impacto:** [Módulos que podrían verse afectados]
