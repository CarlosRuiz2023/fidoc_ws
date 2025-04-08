import { actualizarCarteraVencida } from "../controllers/carteraVencida.controller";
import { validarCV_incremento, validarCV_pred, validarCV_saldocon, validarCV_saldosin } from "../middlewares/validar-campos-cartera-vencida";

const express = require("express");

const router_cartera_vencida = express.Router();

// Define las rutas
router_cartera_vencida.put("/", validarCV_saldosin, validarCV_saldocon, validarCV_incremento, validarCV_pred ,actualizarCarteraVencida);

// Exporta el router correctamente
export default router_cartera_vencida;