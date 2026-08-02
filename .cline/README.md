# Cline project configuration

Esta carpeta contiene la configuración **compartida del proyecto** para Cline.

## Estructura

- `skills/`: habilidades específicas de DevurityWeb versionadas con el repositorio.

## Herramientas de Desarrollo

- **Fixtures de Base de Datos:** Para pruebas en local, usar `pnpm run db:fixture`. Esto poblará datos dinámicos base (`users`, `attendances`, `user_projects`) de manera interactiva sin tocar tablas base.


## Criterios de uso

- La configuración aquí debe ser **del proyecto**, no preferencias personales.
- Los cambios deben ser revisables por Git junto con el código.
- Si una automatización aplica solo a tu máquina, va en tu configuración global de Cline, no aquí.
