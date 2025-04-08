"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carteraVencida_controller_1 = require("../controllers/carteraVencida.controller");
const validar_campos_cartera_vencida_1 = require("../middlewares/validar-campos-cartera-vencida");
const express = require("express");
const router_cartera_vencida = express.Router();
// Define las rutas
router_cartera_vencida.put("/", validar_campos_cartera_vencida_1.validarCV_saldosin, validar_campos_cartera_vencida_1.validarCV_saldocon, validar_campos_cartera_vencida_1.validarCV_incremento, validar_campos_cartera_vencida_1.validarCV_pred, carteraVencida_controller_1.actualizarCarteraVencida);
// Exporta el router correctamente
exports.default = router_cartera_vencida;
//# sourceMappingURL=carteraVencida.route.js.map