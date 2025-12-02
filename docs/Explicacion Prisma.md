# Configuración y Uso de Prisma en el Proyecto

## ¿Por qué hay dos formas de importar PrismaClient?

```typescript
// lib/postgresDriver.ts
import { PrismaClient } from "@prisma/client"; // Importación estándar
import { PrismaClient } from "../lib/generated/prisma"; // Importación personalizada
```

### Explicación:

- **`@prisma/client`**: Es la importación estándar que busca automáticamente el cliente generado en `node_modules/@prisma/client`.
- **`../lib/generated/prisma`**: Es una ruta personalizada donde se genera el cliente de Prisma según nuestra configuración.

## Configuración del Schema

```prisma
// prisma/schema.prisma
generator client {
  provider      = "prisma-client-js"
  output        = "../lib/generated/prisma"
  binaryTargets = ["native", "windows", "rhel-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Parámetros:

- **`output`**: Define la ubicación del cliente generado (personalizada).
- **`binaryTargets`**: Especifica las plataformas donde se ejecutará la aplicación.
- **`provider`**: Define el tipo de base de datos (postgresql, mysql, sqlite, etc.).
- **`url`**: Variable de entorno con la cadena de conexión a la base de datos.

## Conexión a la Base de Datos

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos"
```

### 2. Inicializar PrismaClient

```typescript
// lib/postgresDriver.ts
import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

export default prisma;
```

### 3. Uso en la Aplicación

```typescript
import prisma from "../lib/postgresDriver";

// Ejemplo de consulta
const usuarios = await prisma.user.findMany();

// Ejemplo de inserción
const nuevoUsuario = await prisma.user.create({
  data: {
    email: "usuario@ejemplo.com",
    nombre: "Usuario"
  }
});
```

## Comandos Esenciales

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear y aplicar migraciones
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (interfaz visual)
npx prisma studio

# Sincronizar schema sin migraciones (desarrollo)
npx prisma db push
```

## Buenas Prácticas

1. **Singleton Pattern**: Crear una única instancia de PrismaClient para evitar múltiples conexiones.
2. **Manejo de Errores**: Siempre usar try-catch en operaciones de base de datos.
3. **Cerrar Conexión**: Llamar `prisma.$disconnect()` al finalizar la aplicación.
4. **Variables de Entorno**: Nunca commitear el archivo `.env` al repositorio.