"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var zonas_controller_1 = require("../controllers/zonas.controller");
var validar_campos_puntos_de_control_1 = require("../middlewares/validar-campos-puntos-de-control");
var validar_campos_zonas_1 = require("../middlewares/validar-campos-zonas");
var validar_campos_tipos_de_vehiculos_1 = require("../middlewares/validar-campos-tipos-de-vehiculos");
var router_zona = express.Router();
// Define las rutas
router_zona.post("/agregar", validar_campos_puntos_de_control_1.validarNombre, validar_campos_zonas_1.validarCoordenadasCentro, validar_campos_zonas_1.validarVertices, validar_campos_tipos_de_vehiculos_1.validarPeligrosa, zonas_controller_1.agregarZona);
router_zona.get("/obtener-zonas-peligrosas", zonas_controller_1.obtenerZonasPeligrosas);
router_zona.get("/obtener-zonas-prohibidas", zonas_controller_1.obtenerZonasProhibidas);
router_zona.get("/obtener/:id_zona", validar_campos_zonas_1.validarIdZona, zonas_controller_1.obtenerZona);
router_zona.get("/obtener-peligrosas-por-estado/:id_estado", validar_campos_puntos_de_control_1.validarIdEstado, zonas_controller_1.obtenerZonasPeligrosasPorEstado);
router_zona.get("/obtener-peligrosas-por-municipio/:id_municipio", validar_campos_puntos_de_control_1.validarIdMunicipio, zonas_controller_1.obtenerZonasPeligrosasPorMunicipio);
router_zona.get("/obtener-prohibidas-por-estado/:id_estado", validar_campos_puntos_de_control_1.validarIdEstado, zonas_controller_1.obtenerZonasProhibidasPorEstado);
router_zona.get("/obtener-prohibidas-por-municipio/:id_municipio", validar_campos_puntos_de_control_1.validarIdMunicipio, zonas_controller_1.obtenerZonasProhibidasPorMunicipio);
router_zona.delete("/eliminar/:id_zona", validar_campos_zonas_1.validarIdZona, zonas_controller_1.eliminarZona);
router_zona.post("/reactivar/:id_zona", validar_campos_zonas_1.validarIdZona, zonas_controller_1.reactivarZona);
router_zona.put("/editar/:id_zona", validar_campos_zonas_1.validarIdZona, validar_campos_puntos_de_control_1.validarNombre, validar_campos_zonas_1.validarCoordenadasCentro, validar_campos_zonas_1.validarVertices, validar_campos_tipos_de_vehiculos_1.validarPeligrosa, zonas_controller_1.editarZona);
// Exporta el router correctamente
exports.default = router_zona;
