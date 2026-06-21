<!-- 
INSTRUCCIONES:
Selecciona la plantilla que mejor se adapte a tus cambios.
- Usa la VERSIÓN COMPLETA para PRs grandes, nuevas features o cambios arquitectónicos.
- Usa la VERSIÓN ABREVIADA para fixes rápidos, typos o cambios menores.
Borra la versión que no vayas a utilizar antes de abrir el Pull Request.
-->

<!-- ======================================================================= -->
<!-- VERSIÓN COMPLETA                                                        -->
<!-- ======================================================================= -->

### 1. Información General
| Campo | Detalle |
|---|---|
| **Título** | `tipo:` [descripción] (ej. `feature: autenticación JWT`, `fix: error en login`) |
| **Rama Origen** | `feature/`, `bugfix/`, `hotfix/`, `release/` (Respetando Gitflow) |
| **Rama Destino** | `develop` (features/bugfixes) / `main` (releases/hotfixes) |
| **Epic Principal** | DVW-XXX |
| **Historia** | DVW-XXX [Nombre de la historia] |
| **Prioridad** | `[!!] ALTA` / `MEDIA` / `BAJA` |
| **Autor** | @usuario |
| **Fecha** | DD/MM/YYYY |

---

### 2. Descripción
[Escribe aquí un resumen general del cambio, el problema que resuelve y el enfoque utilizado para abordarlo.]

**Funcionalidades:**
- [Resume el cambio relevante 1]
- [Resume el cambio relevante 2]

---

### 3. Criterios de Aceptación
| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | [Descripción del criterio] | [ ] / [x] | `archivo_o_link.png` / [Descripción] |
| 2 | [Descripción del criterio] | [ ] / [x] | `archivo_o_link.png` / [Descripción] |

---

### 4. Tareas Incluidas
### DVW-XX: <nombre de la tarea>
> **Archivo:** `ruta/al/archivo.js`
> **Prioridad:** Highest / High / Medium

[Descripción breve de la tarea implementada]

**<Categoría> (p. ej. Frontend / Backend):**
- [x] caso testeado / implementado
- [ ] caso pendiente

---

### 5. Cambios Introducidos
**Archivos Nuevos**:
```text
ruta/
└── al/
    └── archivo_nuevo.js     # Propósito del archivo (tamaño aprox / líneas)
```

**Archivos Modificados**:
| Archivo | Cambio |
|---|---|
| `ruta/al/archivo.js` | [Breve descripción de lo modificado] |

---

### 6. Testing
**Resumen de Cobertura**:
| Componente | Tests | Estado |
|---|---|---|
| [Nombre componente] | [Unitarios / E2E / Integración] | [Pass / Fail] |

**Scripts de Testing**:
```bash
pnpm test
pnpm run test:e2e
```

**Escenarios Validados**:
| Escenario | Resultado Esperado | Estado |
|---|---|---|
| [Flujo a validar] | [El comportamiento esperado] | [Pass / Fail] |

---

### 7. Arquitectura de Testing *(cuando aplica)*
```text
tests/
└── unit/
    └── feature/             # Pattern: Setup → Act → Assert → Teardown
```

---

### 8. Commits Incluidos
| # | SHA | Tipo | Descripción |
|---|---|---|---|
| 1 | `abcdef1` | `feature` | Agrega endpoint de autenticación |
| 2 | `a1b2c3d` | `test` | Agrega coverage para auth |

---

### 9. Impacto en Código Existente
**Antes**:
```javascript
// Código preexistente
```

**Después**:
```javascript
// Código nuevo o refactorizado
```
> **Nota de compatibilidad:** ¿Este cambio es retrocompatible? Sí / No. (Si no lo es, explicar impacto en BD o API).

---

### 10. Checklist Pre-Merge
- [ ] Tests pasando (`pnpm test`).
- [ ] Documentación actualizada (README, Swagger, etc.).
- [ ] Code Review aprobado por al menos 1 reviewer.
- [ ] QA / Validación manual completada.
- [ ] Sincronizado con `develop` (branch actualizada sin conflictos).


<br><br><br>


<!-- ======================================================================= -->
<!-- VERSIÓN ABREVIADA / COMPACTA                                            -->
<!-- ======================================================================= -->

### Resumen (Versión Corta)

**Objetivo:** [Explicación concisa y directa de la mejora o arreglo]
**Issue / Tarea:** DVW-XXX
**Ramas (Gitflow):** `origen` ➔ `destino` (`develop` o `main`)

**Cambios Clave:**

- **[Componente/Archivo]:** [Descripción del cambio realizado].
- **[Componente/Archivo]:** [Descripción del cambio realizado].
- **[Componente/Archivo]:** [Descripción del cambio realizado].

**Testing y Verificación:**
- [ ] Funcionalidad validada localmente.
- [ ] Tests automáticos pasando correctamente.
- [ ] Sin impacto negativo (Retrocompatible).

**Checklist:**
- [ ] El código pasa el linter localmente (`lint-staged`).
- [ ] El type-check de TypeScript es exitoso (`npx tsc --noEmit`).
- [ ] Los cambios han sido probados en el entorno local.

> [!NOTE]
> [Inserta aquí observaciones importantes, dependencias externas o tareas pendientes relacionadas con este PR]