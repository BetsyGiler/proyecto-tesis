CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "Roles" AS ENUM (
  'admin',
  'cliente'
);

CREATE TABLE "Usuarios" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "nombre" varchar(255) NOT NULL,
  "rol" "Roles" DEFAULT 'cliente',
  "imagenPerfil" text,
  "email" varchar(255) UNIQUE NOT NULL,
  "ciudad" varchar(200),
  "barrio" varchar(200),
  "numeroTelefono" text,
  "provincia" varchar(200),
  "password" varchar(64) NOT NULL
);

CREATE TABLE "Sesiones" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "refreshToken" text NOT NULL,
  "usuarioId" uuid NOT NULL
);

CREATE TABLE "Proveedor" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "nombre" varchar(300) NOT NULL,
  "descripcion" text,
  "imagenUrl" text
);

CREATE TABLE "Productos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "nombre" varchar(300) NOT NULL,
  "pvp" decimal(6, 2) NOT NULL,
  "imagenPrincipalUrl" text,
  "descripcion" text,
  "proveedorId" uuid NOT NULL
);

CREATE TABLE "Imagenes" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "url" text NOT NULL,
  "productoId" uuid NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Pedidos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "usuarioId" uuid NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "PedidosProductos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "pedidoId" uuid NOT NULL,
  "productoId" uuid NOT NULL,
  "valorCompra" decimal(10, 3) NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Servicios" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "usuarioId" uuid NOT NULL,
  "nombre" varchar(300) NOT NULL,
  "descripcion" text,
  "costo" decimal(10, 2) NOT NULL
);

CREATE TABLE "Notificaciones" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "titulo" varchar(100) NOT NULL,
  "descripcion" text,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "usuarioId" uuid NOT NULL
);

CREATE TABLE "Citas" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "usuarioId" uuid NOT NULL,
  "servicioId" uuid NOT NULL,
  "fecha" timestamptz NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "fechaActualizacion" timestamptz DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "Sesiones" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Productos" ADD FOREIGN KEY ("proveedorId") REFERENCES "Proveedor" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Imagenes" ADD FOREIGN KEY ("productoId") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Pedidos" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "PedidosProductos" ADD FOREIGN KEY ("productoId") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "PedidosProductos" ADD FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Servicios" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Notificaciones" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Citas" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Citas" ADD FOREIGN KEY ("servicioId") REFERENCES "Servicios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
