# TESLO - SHOP

- Next App Router | Prisma | PostgreSQL | Docker

## Levantar Proyecto

1. Clonar el repositorio
2. Instalacion de paquetes :`pnpm i  o npm i`
3. Personaliza el archivo env.template
4. Levantar base de datos : `docker-compose up - d`
   .generar la base de datos

5. Correr en desarrollo : `pnpm run dev`

## Generar base de datos

1. Personaliza la cadena de conexion en env.template
2. Correr las migraciones de Prisma `npx prisma migrate dev`
3. Correr el script de seed de datos `npm prisma db seed o pnpm prisma db seed`
