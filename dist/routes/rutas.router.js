"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var rutas_controller_1 = require("../controllers/rutas.controller");
var validar_campos_rutas_1 = require("../middlewares/validar-campos-rutas");
var validar_campos_puntos_de_control_1 = require("../middlewares/validar-campos-puntos-de-control");
var validar_campos_geocodificador_1 = require("../middlewares/validar-campos-geocodificador");
var validar_campos_asignaciones_1 = require("../middlewares/validar-campos-asignaciones");
var router_ruta = express.Router();
// Define las rutas
router_ruta.post("/agregar", validar_campos_rutas_1.validarIdUsuarioCreador, validar_campos_rutas_1.validarIdRutaPrevia, validar_campos_puntos_de_control_1.validarNombre, validar_campos_geocodificador_1.validarCoordenadasInicioFin, validar_campos_geocodificador_1.validarZonasPuntos, rutas_controller_1.agregarRuta);
router_ruta.get("/obtener", rutas_controller_1.obtenerRutas);
router_ruta.get("/obtener/:id_ruta", validar_campos_asignaciones_1.validarIdRuta, rutas_controller_1.obtenerRuta);
router_ruta.delete("/eliminar/:id_ruta", validar_campos_asignaciones_1.validarIdRuta, rutas_controller_1.eliminarRuta);
router_ruta.post("/reactivar/:id_ruta", validar_campos_asignaciones_1.validarIdRuta, rutas_controller_1.reactivarRuta);
router_ruta.put("/editar/:id_ruta", validar_campos_asignaciones_1.validarIdRuta, validar_campos_rutas_1.validarIdUsuarioEditor, validar_campos_rutas_1.validarIdRutaPrevia, validar_campos_puntos_de_control_1.validarNombre, validar_campos_geocodificador_1.validarCoordenadasInicioFin, validar_campos_geocodificador_1.validarZonasPuntos, rutas_controller_1.editarRuta);
// Exporta el router correctamente
exports.default = router_ruta;
