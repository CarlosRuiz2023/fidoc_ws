"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCarteraVencida = void 0;
const generarArchivoLog_1 = require("../helpers/generarArchivoLog");
const connection_1 = require("../db/connection");
/**
 * La función `actualizarCarteraVencida` actualiza los saldos de una cuenta predial.
 */
const actualizarCarteraVencida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saldosin, saldocon, incremento, cta_predial } = req.body;
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('SALDOSIN', connection_1.sql.Float, parseFloat(saldosin));
        request.input('SALDOCON', connection_1.sql.Float, parseFloat(saldocon));
        request.input('INCREMENTO_OBRA', connection_1.sql.Float, parseFloat(incremento));
        request.input('CTA_PREDIAL', connection_1.sql.VarChar, cta_predial);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
      UPDATE [dbo].[CARTERA_VENCIDA]
        SET [SALDOSIN] = @SALDOSIN + @INCREMENTO_OBRA,
            [SALDOCON] = @SALDOCON + @INCREMENTO_OBRA,
            [INCREMENTO_OBRA] = @INCREMENTO_OBRA
        WHERE [CTA_PREDIAL] = @CTA_PREDIAL
    `);
        if (result.rowsAffected[0] > 0) {
            // Ejecutar consulta con parámetros
            const cartera_vencida = yield request.query(`SELECT * FROM [pFidoc].[dbo].[CARTERA_VENCIDA] WHERE [CTA_PREDIAL] = @CTA_PREDIAL`);
            res.status(200).json({
                success: true,
                result: { cartera_vencida: cartera_vencida.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se actualizo la cartera vencida correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.actualizarCarteraVencida = actualizarCarteraVencida;
//# sourceMappingURL=carteraVencida.controller.js.map