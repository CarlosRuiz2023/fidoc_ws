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
exports.validarCV_pred = exports.validarCV_incremento = exports.validarCV_saldocon = exports.validarCV_saldosin = void 0;
const generarArchivoLog_1 = require("../helpers/generarArchivoLog");
const connection_1 = require("../db/connection");
const validarCV_saldosin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saldosin } = req.body;
        if (saldosin === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el saldosin",
            });
            return;
        }
        if (typeof saldosin != "number") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El saldosin proporcionado debe ser de tipo numerico",
            });
            return;
        }
        if (saldosin < 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El saldosin debe de ser un numero positivo mayor o igual a 0",
            });
            return;
        }
        next();
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
exports.validarCV_saldosin = validarCV_saldosin;
const validarCV_saldocon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saldocon } = req.body;
        if (saldocon === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el saldocon",
            });
            return;
        }
        if (typeof saldocon != "number") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El saldocon proporcionado debe ser de tipo numerico",
            });
            return;
        }
        if (saldocon < 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El saldocon debe de ser un numero positivo mayor o igual a 0",
            });
            return;
        }
        next();
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
exports.validarCV_saldocon = validarCV_saldocon;
const validarCV_incremento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { incremento } = req.body;
        if (incremento === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el incremento de la obra",
            });
            return;
        }
        if (typeof incremento != "number") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El incremento de la obra proporcionado debe ser de tipo numerico",
            });
            return;
        }
        if (incremento < 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El incremento de la obra debe de ser un numero positivo mayor o igual a 0",
            });
            return;
        }
        next();
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
exports.validarCV_incremento = validarCV_incremento;
const validarCV_pred = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cta_predial } = req.body;
        if (cta_predial === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar la cta_predial",
            });
            return;
        }
        if (typeof cta_predial != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "La cta_predial proporcionada debe ser de tipo string",
            });
            return;
        }
        if (cta_predial.length > 12) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La cta_predial debe de ser menor a 13 caracteres",
            });
            return;
        }
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('CTA_PREDIAL', connection_1.sql.VarChar, cta_predial);
        // Ejecutar consulta con parámetros
        const predial = yield request.query(`SELECT * FROM [dbo].[CARTERA_VENCIDA] WHERE [CTA_PREDIAL] = @CTA_PREDIAL`);
        if (predial.recordset.length == 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La cta_predial no se encuentra registrada en pFidoc",
            });
            return;
        }
        yield connection_1.sql.close();
        next();
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
exports.validarCV_pred = validarCV_pred;
//# sourceMappingURL=validar-campos-cartera-vencida.js.map