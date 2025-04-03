"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var tipos_de_vehiculos_controller_1 = require("../controllers/tipos-de-vehiculos.controller");
var validar_campos_tipos_de_vehiculos_1 = require("../middlewares/validar-campos-tipos-de-vehiculos");
var router_tipo_vehiculo = express.Router();
// Define las rutas
router_tipo_vehiculo.post('/agregar', validar_campos_tipos_de_vehiculos_1.validarTipo, validar_campos_tipos_de_vehiculos_1.validarTonelada, validar_campos_tipos_de_vehiculos_1.validarAltura, validar_campos_tipos_de_vehiculos_1.validarAncho, validar_campos_tipos_de_vehiculos_1.validarLargo, tipos_de_vehiculos_controller_1.agregarTipo);
router_tipo_vehiculo.get('/obtener', tipos_de_vehiculos_controller_1.obtenerTipos);
router_tipo_vehiculo.get('/obtener/:id_tipo_vehiculo', validar_campos_tipos_de_vehiculos_1.validarIdTipo, tipos_de_vehiculos_controller_1.obtenerTipo);
router_tipo_vehiculo.delete('/eliminar/:id_tipo_vehiculo', validar_campos_tipos_de_vehiculos_1.validarIdTipo, tipos_de_vehiculos_controller_1.eliminarTipo);
router_tipo_vehiculo.post('/reactivar/:id_tipo_vehiculo', validar_campos_tipos_de_vehiculos_1.validarIdTipo, tipos_de_vehiculos_controller_1.reactivarTipo);
// Exporta el router correctamente
exports.default = router_tipo_vehiculo;
