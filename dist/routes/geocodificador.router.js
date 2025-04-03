"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var geocodificador_controller_1 = require("../controllers/geocodificador.controller");
var validar_campos_geocodificador_1 = require("../middlewares/validar-campos-geocodificador");
var router_geocodificador = express.Router();
// Define las rutas
router_geocodificador.post('/coordenadas', validar_campos_geocodificador_1.validarDireccion, geocodificador_controller_1.obtenerCoordenadas);
router_geocodificador.post('/direccion', validar_campos_geocodificador_1.validarCoordenadas, geocodificador_controller_1.obtenerDireccion);
router_geocodificador.post('/ruta', validar_campos_geocodificador_1.validarCoordenadasInicioFin, validar_campos_geocodificador_1.validarZonasPuntos, geocodificador_controller_1.obtenerPolilinea);
// Exporta el router correctamente
exports.default = router_geocodificador;
