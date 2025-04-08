"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const obras_controller_1 = require("../controllers/obras.controller");
const validar_campos_obras_1 = require("../middlewares/validar-campos-obras");
const router_obra = express.Router();
// Define las rutas
router_obra.get("", obras_controller_1.obtenerObras);
router_obra.get("/:obr_clv", validar_campos_obras_1.validarObr_clv, obras_controller_1.obtenerObra);
router_obra.post("", validar_campos_obras_1.validarObr_clvNoExistente, validar_campos_obras_1.validarObr_call, validar_campos_obras_1.validarObr_col, validar_campos_obras_1.validarObr_cost, validar_campos_obras_1.validarObr_stat, validar_campos_obras_1.validarObr_tramo, validar_campos_obras_1.validarObr_fecha, validar_campos_obras_1.validarObr_sis, validar_campos_obras_1.validarCol_nom, validar_campos_obras_1.validarObr_programa, validar_campos_obras_1.validarFechaInicio_Vencimiento, validar_campos_obras_1.validarObr_npago, validar_campos_obras_1.validarObr_opergob, obras_controller_1.agregarObra);
router_obra.put("", validar_campos_obras_1.validarObr_clv, validar_campos_obras_1.validarObr_call, validar_campos_obras_1.validarObr_col, validar_campos_obras_1.validarObr_cost, validar_campos_obras_1.validarObr_stat, validar_campos_obras_1.validarObr_tramo, validar_campos_obras_1.validarObr_fecha, validar_campos_obras_1.validarObr_sis, validar_campos_obras_1.validarCol_nom, validar_campos_obras_1.validarObr_programa, validar_campos_obras_1.validarFechaInicio_Vencimiento, validar_campos_obras_1.validarObr_npago, validar_campos_obras_1.validarObr_opergob, obras_controller_1.actualizarObra);
router_obra.put("/cambiarEstatus", validar_campos_obras_1.validarObr_clv, validar_campos_obras_1.validarObr_stat, validar_campos_obras_1.validarObr_opergob, obras_controller_1.actualizarEstatusObra);
router_obra.put("/incrementarCosto", validar_campos_obras_1.validarObr_clv, validar_campos_obras_1.validarObr_inc, obras_controller_1.actualizarCostoObra);
router_obra.delete("/:obr_clv", validar_campos_obras_1.validarObr_clv, obras_controller_1.eliminarObra);
// Exporta el router correctamente
exports.default = router_obra;
//# sourceMappingURL=obras.route.js.map