const express = require("express");
import { agregarCooperador, obtenerCooperador } from "../controllers/cooperadores.controller";

const router_cooperador = express.Router();

// Define las rutas
router_cooperador.get("/:coo_clv", obtenerCooperador);
router_cooperador.post("/", agregarCooperador);

// Exporta el router correctamente
export default router_cooperador;