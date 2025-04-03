"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var puntos_de_control_controller_1 = require("../controllers/puntos-de-control.controller");
var validar_campos_puntos_de_control_1 = require("../middlewares/validar-campos-puntos-de-control");
var validar_campos_geocodificador_1 = require("../middlewares/validar-campos-geocodificador");
var router_punto_control = express.Router();
// Define las rutas
router_punto_control.post("/agregar", validar_campos_puntos_de_control_1.validarNombre, validar_campos_puntos_de_control_1.validarDiasActivo, validar_campos_puntos_de_control_1.validarHoras, validar_campos_geocodificador_1.validarCoordenadas, puntos_de_control_controller_1.agregarPunto);
router_punto_control.get("/obtener", puntos_de_control_controller_1.obtenerPuntos);
router_punto_control.get("/obtener/:id_punto_de_control", puntos_de_control_controller_1.obtenerPunto);
router_punto_control.get("/obtener-por-estado/:id_estado", validar_campos_puntos_de_control_1.validarIdEstado, puntos_de_control_controller_1.obtenerPuntosPorEstado);
router_punto_control.get("/obtener-por-municipio/:id_municipio", validar_campos_puntos_de_control_1.validarIdMunicipio, puntos_de_control_controller_1.obtenerPuntosPorMunicipio);
router_punto_control.delete("/eliminar/:id_punto_de_control", validar_campos_puntos_de_control_1.validarIdPunto, puntos_de_control_controller_1.eliminarPunto);
router_punto_control.post("/reactivar/:id_punto_de_control", validar_campos_puntos_de_control_1.validarIdPunto, puntos_de_control_controller_1.reactivarPunto);
router_punto_control.put("/editar/:id_punto_de_control", validar_campos_puntos_de_control_1.validarIdPunto, validar_campos_puntos_de_control_1.validarNombre, validar_campos_puntos_de_control_1.validarDiasActivo, validar_campos_puntos_de_control_1.validarHoras, validar_campos_geocodificador_1.validarCoordenadas, puntos_de_control_controller_1.editarPunto);
// Exporta el router correctamente
exports.default = router_punto_control;
