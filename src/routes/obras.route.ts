const express = require("express");
import {
    actualizarCostoObra,
    actualizarEstatusObra,
    actualizarObra,
    agregarObra,
    eliminarObra,
    obtenerObra,
    obtenerObras
} from "../controllers/obras.controller";
import { validarCol_nom, validarFechaInicio_Vencimiento, validarObr_call, validarObr_clv, validarObr_clvNoExistente, validarObr_col, validarObr_cost, validarObr_fecha, validarObr_inc, validarObr_npago, validarObr_opergob, validarObr_programa, validarObr_sis, validarObr_stat, validarObr_tramo } from "../middlewares/validar-campos-obras";

const router_obra = express.Router();

// Define las rutas
router_obra.get("", obtenerObras);
router_obra.get("/:obr_clv", validarObr_clv, obtenerObra);
router_obra.post("", validarObr_clvNoExistente, validarObr_call, validarObr_col, validarObr_cost, validarObr_stat, validarObr_tramo, validarObr_fecha, validarObr_sis, validarCol_nom, validarObr_programa, validarFechaInicio_Vencimiento, validarObr_npago, validarObr_opergob, agregarObra);
router_obra.put("", validarObr_clv, validarObr_call, validarObr_col, validarObr_cost, validarObr_stat, validarObr_tramo, validarObr_fecha, validarObr_sis, validarCol_nom, validarObr_programa, validarFechaInicio_Vencimiento, validarObr_npago, validarObr_opergob, actualizarObra);
router_obra.put("/cambiarEstatus", validarObr_clv, validarObr_stat, validarObr_opergob, actualizarEstatusObra);
router_obra.put("/incrementarCosto", validarObr_clv, validarObr_inc, actualizarCostoObra);
router_obra.delete("/:obr_clv", validarObr_clv, eliminarObra);


// Exporta el router correctamente
export default router_obra;