CREATE TABLE "tbl_usuarios" (
  "id_usuario" SERIAL PRIMARY KEY,
  "clave_empleado" varchar(255),
  "id_rol" integer,
  "nombre" varchar(255),
  "usuario" varchar(255),
  "correo" varchar(255) UNIQUE,
  "contrasenia" text,
  "plataforma" boolean,
  "telefono" bigint,
  "token" text,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_roles" (
  "id_rol" SERIAL PRIMARY KEY,
  "rol" varchar(255),
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_modulos" (
  "id_modulo" SERIAL PRIMARY KEY,
  "modulo" varchar(255),
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_submodulos" (
  "id_submodulo" SERIAL PRIMARY KEY,
  "id_modulo" integer,
  "submodulo" varchar(255),
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_submodulos_roles" (
  "id_submodulo_rol" SERIAL PRIMARY KEY,
  "id_submodulo" integer,
  "id_rol" integer
);

CREATE TABLE "tbl_accesos" (
  "id_acceso" SERIAL PRIMARY KEY,
  "id_usuario" integer,
  "fecha_hora" timestamp DEFAULT 'now()',
  "exitoso" boolean
);

CREATE TABLE "tbl_tipos_de_vehiculos" (
  "id_tipo_vehiculo" SERIAL PRIMARY KEY,
  "tipo" varchar(255),
  "tonelada" integer,
  "altura" integer,
  "ancho" integer,
  "largo" integer,
  "imagen" text,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_rutas" (
  "id_ruta" SERIAL PRIMARY KEY,
  "id_usuario_creador" integer,
  "id_usuario_editor" integer,
  "id_ruta_previa" integer,
  "nombre" varchar(255),
  "direccion_inicio" varchar(255),
  "id_estado_inicio" integer,
  "id_municipio_inicio" integer,
  "latitud_inicio" decimal,
  "longitud_inicio" decimal,
  "direccion_fin" varchar(255),
  "id_estado_fin" integer,
  "id_municipio_fin" integer,
  "latitud_fin" decimal,
  "longitud_fin" decimal,
  "polilinea" decimal[][],
  "distancia" integer,
  "tiempo" integer,
  "fecha_hora_creacion" timestamp DEFAULT 'now()',
  "fecha_hora_ultima_modificacion" timestamp,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_detalle_ruta" (
  "id_detalle_ruta" SERIAL PRIMARY KEY,
  "id_ruta" integer,
  "zona" boolean,
  "id_detalle" integer
);

CREATE TABLE "tbl_tipos_de_vehiculos_asignaciones" (
  "id_tipo_vehiculo_asignacion" SERIAL PRIMARY KEY,
  "id_tipo_vehiculo" integer,
  "tipo_asigacion" integer,
  "id_asignacion" integer
);

CREATE TABLE "tbl_puntos_de_control" (
  "id_punto_de_control" SERIAL PRIMARY KEY,
  "nombre" varchar(255),
  "id_estado" integer,
  "id_municipio" integer,
  "dias_activo" integer[],
  "hora_activacion" time,
  "hora_desactivacion" time,
  "latitud" decimal,
  "longitud" decimal,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_paraderos_oficiales" (
  "id_paradero_oficial" SERIAL PRIMARY KEY,
  "nombre" varchar(255),
  "id_estado" integer,
  "id_municipio" integer,
  "disponibilidad" integer,
  "detalles" varchar(255),
  "latitud" decimal,
  "longitud" decimal,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_zonas" (
  "id_zona" SERIAL PRIMARY KEY,
  "nombre" varchar(255),
  "id_estado" integer,
  "id_municipio" integer,
  "vertices" decimal[][],
  "peligrosa" boolean,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_asignaciones" (
  "id_asignacion" SERIAL PRIMARY KEY,
  "id_ruta" integer,
  "id_usuario" integer,
  "fecha_hora_asignacion" timestamp DEFAULT 'now()',
  "fecha_hora_termino" timestamp,
  "estatus" integer DEFAULT 1
);

CREATE TABLE "tbl_estados" (
  "id_estado" SERIAL PRIMARY KEY,
  "estado" varchar(255)
);

CREATE TABLE "tbl_municipios" (
  "id_municipio" SERIAL PRIMARY KEY,
  "municipio" varchar(255),
  "id_estado" integer
);

ALTER TABLE "tbl_usuarios" ADD FOREIGN KEY ("id_rol") REFERENCES "tbl_roles" ("id_rol");

ALTER TABLE "tbl_submodulos_roles" ADD FOREIGN KEY ("id_rol") REFERENCES "tbl_roles" ("id_rol");

ALTER TABLE "tbl_submodulos" ADD FOREIGN KEY ("id_modulo") REFERENCES "tbl_modulos" ("id_modulo");

ALTER TABLE "tbl_submodulos_roles" ADD FOREIGN KEY ("id_submodulo") REFERENCES "tbl_submodulos" ("id_submodulo");

ALTER TABLE "tbl_accesos" ADD FOREIGN KEY ("id_usuario") REFERENCES "tbl_usuarios" ("id_usuario");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_ruta_previa") REFERENCES "tbl_rutas" ("id_ruta");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_usuario_creador") REFERENCES "tbl_usuarios" ("id_usuario");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_usuario_editor") REFERENCES "tbl_usuarios" ("id_usuario");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_estado_inicio") REFERENCES "tbl_estados" ("id_estado");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_estado_fin") REFERENCES "tbl_estados" ("id_estado");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_municipio_inicio") REFERENCES "tbl_municipios" ("id_municipio");

ALTER TABLE "tbl_rutas" ADD FOREIGN KEY ("id_municipio_fin") REFERENCES "tbl_municipios" ("id_municipio");

ALTER TABLE "tbl_tipos_de_vehiculos_asignaciones" ADD FOREIGN KEY ("id_asignacion") REFERENCES "tbl_rutas" ("id_ruta");

ALTER TABLE "tbl_tipos_de_vehiculos_asignaciones" ADD FOREIGN KEY ("id_tipo_vehiculo") REFERENCES "tbl_tipos_de_vehiculos" ("id_tipo_vehiculo");

ALTER TABLE "tbl_tipos_de_vehiculos_asignaciones" ADD FOREIGN KEY ("id_asignacion") REFERENCES "tbl_usuarios" ("id_usuario");

ALTER TABLE "tbl_tipos_de_vehiculos_asignaciones" ADD FOREIGN KEY ("id_asignacion") REFERENCES "tbl_puntos_de_control" ("id_punto_de_control");

ALTER TABLE "tbl_tipos_de_vehiculos_asignaciones" ADD FOREIGN KEY ("id_asignacion") REFERENCES "tbl_zonas" ("id_zona");

ALTER TABLE "tbl_asignaciones" ADD FOREIGN KEY ("id_ruta") REFERENCES "tbl_rutas" ("id_ruta");

ALTER TABLE "tbl_asignaciones" ADD FOREIGN KEY ("id_usuario") REFERENCES "tbl_usuarios" ("id_usuario");

ALTER TABLE "tbl_detalle_ruta" ADD FOREIGN KEY ("id_ruta") REFERENCES "tbl_rutas" ("id_ruta");

ALTER TABLE "tbl_zonas" ADD FOREIGN KEY ("id_estado") REFERENCES "tbl_estados" ("id_estado");

ALTER TABLE "tbl_zonas" ADD FOREIGN KEY ("id_municipio") REFERENCES "tbl_municipios" ("id_municipio");

ALTER TABLE "tbl_puntos_de_control" ADD FOREIGN KEY ("id_estado") REFERENCES "tbl_estados" ("id_estado");

ALTER TABLE "tbl_puntos_de_control" ADD FOREIGN KEY ("id_municipio") REFERENCES "tbl_municipios" ("id_municipio");

ALTER TABLE "tbl_paraderos_oficiales" ADD FOREIGN KEY ("id_estado") REFERENCES "tbl_estados" ("id_estado");

ALTER TABLE "tbl_paraderos_oficiales" ADD FOREIGN KEY ("id_municipio") REFERENCES "tbl_municipios" ("id_municipio");

ALTER TABLE "tbl_municipios" ADD FOREIGN KEY ("id_estado") REFERENCES "tbl_estados" ("id_estado");
