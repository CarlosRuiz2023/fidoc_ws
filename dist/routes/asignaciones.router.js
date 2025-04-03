"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var asignaciones_controller_1 = require("../controllers/asignaciones.controller");
var validar_campos_asignaciones_1 = require("../middlewares/validar-campos-asignaciones");
var router_asignacion = express.Router();
// Define las rutas
router_asignacion.post("/agregar", validar_campos_asignaciones_1.validarIdRuta, validar_campos_asignaciones_1.validarIdUsuario, asignaciones_controller_1.agregarAsignacion);
router_asignacion.get("/obtener", validar_campos_asignaciones_1.validarEstatusNullAsignacion, validar_campos_asignaciones_1.validarRangoFechas, asignaciones_controller_1.obtenerAsignaciones);
router_asignacion.get("/obtener/:id_asignacion", validar_campos_asignaciones_1.validarIdAsignacion, asignaciones_controller_1.obtenerAsignacion);
router_asignacion.put("/editar/:id_asignacion", validar_campos_asignaciones_1.validarIdAsignacion, validar_campos_asignaciones_1.validarEstatusAsignacion, asignaciones_controller_1.editarAsignacion);
router_asignacion.post("/obtener-operadores/:disponibilidad", validar_campos_asignaciones_1.validarDisponibilidad, validar_campos_asignaciones_1.validarRangoFechas, asignaciones_controller_1.obtenerOperadores);
// Exporta el router correctamente
exports.default = router_asignacion;
