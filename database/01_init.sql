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
  "password" varchar(64) NOT NULL,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Sesiones" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "refreshToken" text NOT NULL,
  "usuarioId" uuid NOT NULL,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Productos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "nombre" varchar(300) NOT NULL,
  "pvp" decimal(6, 2) NOT NULL,
  "imagenPrincipalUrl" text,
  "descripcion" text,
  "proveedorId" uuid,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Imagenes" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "url" text NOT NULL,
  "productoId" uuid NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Pedidos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "usuarioId" uuid NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "isActive" boolean DEFAULT true
);

CREATE TABLE "PedidosProductos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "pedidoId" uuid NOT NULL,
  "productoId" uuid NOT NULL,
  "valorCompra" decimal(10, 3) NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "cantidad" integer NOT NULL,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Servicios" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "nombre" varchar(300) NOT NULL,
  "descripcion" text,
  "costo" decimal(10, 2) NOT NULL,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Notificaciones" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "titulo" varchar(100) NOT NULL,
  "descripcion" text,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "usuarioId" uuid NOT NULL,
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Citas" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "usuarioId" uuid NOT NULL,
  "servicioId" uuid NOT NULL,
  "fecha" timestamptz NOT NULL,
  "fechaCreacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "fechaActualizacion" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "isActive" boolean DEFAULT true
);

CREATE TABLE "Ofertas" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "isActive" boolean DEFAULT true,
  "precio" decimal(10, 2),
  "descripcion" text,
  "imagenUrl" text
);

CREATE TABLE "OfertasProductos" (
  "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v1()),
  "ofertaId" uuid NOT NULL,
  "productoId" uuid NOT NULL
);

ALTER TABLE "Sesiones" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Imagenes" ADD FOREIGN KEY ("productoId") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Pedidos" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "PedidosProductos" ADD FOREIGN KEY ("productoId") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "PedidosProductos" ADD FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Notificaciones" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Citas" ADD FOREIGN KEY ("usuarioId") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "Citas" ADD FOREIGN KEY ("servicioId") REFERENCES "Servicios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "OfertasProductos" ADD FOREIGN KEY ("ofertaId") REFERENCES "Ofertas" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE "OfertasProductos" ADD FOREIGN KEY ("productoId") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
