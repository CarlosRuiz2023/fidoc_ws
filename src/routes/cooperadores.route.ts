const express = require("express");
import { agregarCooperador, obtenerCooperador, obtenerCooperadores } from "../controllers/cooperadores.controller";

const router_cooperador = express.Router();

// Define las rutas
router_cooperador.get("", obtenerCooperadores);
router_cooperador.get("/:coo_clv", obtenerCooperador);
router_cooperador.post("", agregarCooperador);

// Exporta el router correctamente
export default router_cooperador;