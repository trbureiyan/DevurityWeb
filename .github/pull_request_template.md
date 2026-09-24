<!-- 
INSTRUCCIONES:
Usa la VERSIÓN COMPLETA para features, refactors, cambios arquitectónicos o PRs con múltiples áreas de impacto.
Usa la VERSIÓN ABREVIADA para hotfixes, typos, ajustes de configuración o cambios de una sola línea de razonamiento.
Borra la versión que no vayas a utilizar antes de abrir el Pull Request.
-->

<!-- ======================================================================= -->
<!-- VERSIÓN COMPLETA                                                         -->
<!-- ======================================================================= -->

[Una o dos oraciones que expliquen qué hace este PR y por qué era necesario. Sin listas aquí.]

**Ramas:** `origen` → `dev` / `main` &nbsp;|&nbsp; **Issue:** #[número]

---

## [Área o componente afectado]

> [!IMPORTANT]
> [Contexto del problema que motivó este cambio: qué estaba mal, qué faltaba, o por qué era necesario ahora.]

Cambios concretos:

- **`ruta/al/archivo.ts`**. [Descripción del cambio y su razón.]
- **`ruta/al/otro.ts`**. [Descripción del cambio.]

---

## [Otra área de impacto, si aplica]

> [!NOTE]
> [Contexto cuando el cambio no es evidente por sí solo. Omitir si no es necesario.]

[Descripción en prosa o lista de cambios, según lo que sea más claro.]

---

## Screenshots

[Capturas de pantalla cuando el PR toca UI. Omitir si no aplica.]

---

## Checklist

- [ ] Build limpio (`pnpm build`)
- [ ] Tests pasan (`pnpm test`)
- [ ] Typecheck sin errores (`pnpm exec tsc --noEmit`)
- [ ] Lint limpio (`pnpm lint`)
- [ ] [Validación manual relevante para este PR — ser específico]


<br><br><br>


<!-- ======================================================================= -->
<!-- VERSIÓN ABREVIADA                                                        -->
<!-- ======================================================================= -->

[Una oración que describa el cambio.]

**Ramas:** `origen` → `dev` / `main` &nbsp;|&nbsp; **Issue:** #[número]

Cambios:

- **`ruta/al/archivo.ts`**. [Qué cambió y por qué.]

## Checklist

- [ ] Build limpio (`pnpm build`)
- [ ] Tests pasan (`pnpm test`)
- [ ] Typecheck sin errores (`pnpm exec tsc --noEmit`)
- [ ] Lint limpio (`pnpm lint`)
