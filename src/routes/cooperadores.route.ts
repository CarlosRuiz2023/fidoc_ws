const express = require("express");
import { actualizarCooperador, agregarCooperador, eliminarCooperador, obtenerCooperador } from "../controllers/cooperadores.controller";
import { validarCoop_call, validarCoop_clv, validarCoop_clvNoExistente, validarCoop_col, validarCoop_cp, validarCoop_mat, validarCoop_mts, validarCoop_nom, validarCoop_npag, validarCoop_num, validarCoop_pat, validarCoop_pred, validarCoop_tel, validarCoop_venc1 } from "../middlewares/validar-campos-cooperadores";

const router_cooperador = express.Router();

// Define las rutas
router_cooperador.get("/:coo_clv", validarCoop_clv, obtenerCooperador);
router_cooperador.post("/", validarCoop_clvNoExistente, validarCoop_pat, validarCoop_mat, validarCoop_nom, validarCoop_num, validarCoop_call, validarCoop_col, validarCoop_cp, validarCoop_tel, validarCoop_npag, validarCoop_venc1, validarCoop_mts, validarCoop_pred, agregarCooperador);
router_cooperador.put("/",  validarCoop_clv, validarCoop_pat, validarCoop_mat, validarCoop_nom, validarCoop_num, validarCoop_call, validarCoop_col, validarCoop_cp, validarCoop_tel, validarCoop_npag, validarCoop_venc1, validarCoop_mts, validarCoop_pred, actualizarCooperador);
router_cooperador.delete("/:coo_clv", validarCoop_clv, eliminarCooperador);

// Exporta el router correctamente
export default router_cooperador;