"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cooperadores_controller_1 = require("../controllers/cooperadores.controller");
const validar_campos_cooperadores_1 = require("../middlewares/validar-campos-cooperadores");
const router_cooperador = express.Router();
// Define las rutas
router_cooperador.get("/:coo_clv", validar_campos_cooperadores_1.validarCoop_clv, cooperadores_controller_1.obtenerCooperador);
router_cooperador.post("/", validar_campos_cooperadores_1.validarCoop_clvNoExistente, validar_campos_cooperadores_1.validarCoop_pat, validar_campos_cooperadores_1.validarCoop_mat, validar_campos_cooperadores_1.validarCoop_nom, validar_campos_cooperadores_1.validarCoop_num, validar_campos_cooperadores_1.validarCoop_call, validar_campos_cooperadores_1.validarCoop_col, validar_campos_cooperadores_1.validarCoop_cp, validar_campos_cooperadores_1.validarCoop_tel, validar_campos_cooperadores_1.validarCoop_npag, validar_campos_cooperadores_1.validarCoop_venc1, validar_campos_cooperadores_1.validarCoop_mts, validar_campos_cooperadores_1.validarCoop_pred, cooperadores_controller_1.agregarCooperador);
router_cooperador.put("/", validar_campos_cooperadores_1.validarCoop_clv, validar_campos_cooperadores_1.validarCoop_pat, validar_campos_cooperadores_1.validarCoop_mat, validar_campos_cooperadores_1.validarCoop_nom, validar_campos_cooperadores_1.validarCoop_num, validar_campos_cooperadores_1.validarCoop_call, validar_campos_cooperadores_1.validarCoop_col, validar_campos_cooperadores_1.validarCoop_cp, validar_campos_cooperadores_1.validarCoop_tel, validar_campos_cooperadores_1.validarCoop_npag, validar_campos_cooperadores_1.validarCoop_venc1, validar_campos_cooperadores_1.validarCoop_mts, validar_campos_cooperadores_1.validarCoop_pred, cooperadores_controller_1.actualizarCooperador);
router_cooperador.delete("/:coo_clv", validar_campos_cooperadores_1.validarCoop_clv, cooperadores_controller_1.eliminarCooperador);
// Exporta el router correctamente
exports.default = router_cooperador;
//# sourceMappingURL=cooperadores.route.js.map