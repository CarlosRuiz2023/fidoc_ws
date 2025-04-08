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
exports.validarCoop_pred = exports.validarCoop_mts = exports.validarCoop_venc1 = exports.validarCoop_npag = exports.validarCoop_tel = exports.validarCoop_cp = exports.validarCoop_col = exports.validarCoop_call = exports.validarCoop_num = exports.validarCoop_nom = exports.validarCoop_mat = exports.validarCoop_pat = exports.validarCoop_clvNoExistente = exports.validarCoop_clv = void 0;
const generarArchivoLog_1 = require("../helpers/generarArchivoLog");
const connection_1 = require("../db/connection");
const validarCoop_clv = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { coo_clv } = req.params;
        if (coo_clv === undefined) {
            coo_clv = req.body.coo_clv;
        }
        if (coo_clv === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar la coo_clv",
            });
            return;
        }
        if (coo_clv.length < 10) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_clv debe de tener al menos 10 digitos",
            });
            return;
        }
        if (coo_clv.length > 13) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_clv debe de tener por mucho 13 digitos",
            });
            return;
        }
        if (coo_clv.length != 10) {
            if (coo_clv.length != 13) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La coo_clv debe tener 10 o 13 digitos dependiendo del tipo de busqueda",
                });
                return;
            }
        }
        if (coo_clv.length == 10) {
            const cooperador = yield connection_1.dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
            if (cooperador.length == 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La coo_clv proporcionada no existe en la bd de Access",
                });
                return;
            }
            // Conectar a la base de datos
            yield connection_1.sql.connect(connection_1.configSQLServer);
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
            // Ejecutar consulta con parámetros
            const predial = yield request.query(`SELECT * FROM [dbo].[cooperador] WHERE [coo_obr] = @coo_clv`);
            if (predial.recordset.length == 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El coo_clv proporcionado no existe dentro de la base de datos de SQL Server",
                });
                return;
            }
            yield connection_1.sql.close();
        }
        else {
            const cooperador = yield connection_1.dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
            if (cooperador.length == 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La coo_clv proporcionada no existe en la bd de Access",
                });
                return;
            }
            // Conectar a la base de datos
            yield connection_1.sql.connect(connection_1.configSQLServer);
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
            // Ejecutar consulta con parámetros
            const predial = yield request.query(`SELECT * FROM [dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
            if (predial.recordset.length == 0) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El coo_clv proporcionado no existe dentro de la base de datos de SQL Server",
                });
                return;
            }
            yield connection_1.sql.close();
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
exports.validarCoop_clv = validarCoop_clv;
const validarCoop_clvNoExistente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { coo_clv } = req.params;
        if (coo_clv === undefined) {
            coo_clv = req.body.coo_clv;
        }
        if (coo_clv === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar la coo_clv",
            });
            return;
        }
        if (coo_clv.length != 13) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_clv debe de tener 13 digitos",
            });
            return;
        }
        const cooperador = yield connection_1.dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        if (cooperador.length != 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_clv proporcionado ya existe dentro de la base de datos",
            });
            return;
        }
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
        // Ejecutar consulta con parámetros
        const predial = yield request.query(`SELECT * FROM [dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
        if (predial.recordset.length == 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_clv proporcionado no existe dentro de la base de datos de SQL Server",
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
exports.validarCoop_clvNoExistente = validarCoop_clvNoExistente;
const validarCoop_pat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_pat } = req.body;
        if (coo_pat === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_pat",
            });
            return;
        }
        if (typeof coo_pat != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_pat proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_pat.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_pat debe de ser menor a 51 caracteres",
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
exports.validarCoop_pat = validarCoop_pat;
const validarCoop_mat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_mat } = req.body;
        if (coo_mat === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_mat",
            });
            return;
        }
        if (typeof coo_mat != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_mat proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_mat.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_mat debe de ser menor a 4 caracteres",
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
exports.validarCoop_mat = validarCoop_mat;
const validarCoop_nom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_nom } = req.body;
        if (coo_nom === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_nom",
            });
            return;
        }
        if (typeof coo_nom != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_nom proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_nom.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_nom debe de ser menor a 4 caracteres",
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
exports.validarCoop_nom = validarCoop_nom;
const validarCoop_num = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_num } = req.body;
        if (coo_num === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_num",
            });
            return;
        }
        if (typeof coo_num != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_num proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_num.length > 10) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_num debe de ser menor a 11 caracteres",
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
exports.validarCoop_num = validarCoop_num;
const validarCoop_call = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_call } = req.body;
        if (coo_call === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar la coo_call",
            });
            return;
        }
        if (typeof coo_call != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_call proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_call.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_call debe de ser menor a 51 caracteres",
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
exports.validarCoop_call = validarCoop_call;
const validarCoop_col = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_col } = req.body;
        if (coo_col === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar la coo_col",
            });
            return;
        }
        if (typeof coo_col != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_col proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_col.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La coo_col debe de ser menor a 51 caracteres",
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
exports.validarCoop_col = validarCoop_col;
const validarCoop_cp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_cp } = req.body;
        if (coo_cp === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_cp",
            });
            return;
        }
        if (typeof coo_cp != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_cp proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_cp.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_cp debe de ser menor a 51 caracteres",
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
exports.validarCoop_cp = validarCoop_cp;
const validarCoop_tel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_tel } = req.body;
        if (coo_tel === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_tel",
            });
            return;
        }
        if (typeof coo_tel != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_tel proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_tel.length > 50) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_tel debe de ser menor a 51 caracteres",
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
exports.validarCoop_tel = validarCoop_tel;
const validarCoop_npag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_npag } = req.body;
        if (coo_npag === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_npag",
            });
            return;
        }
        if (typeof coo_npag != "number") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_npag proporcionado debe ser de tipo numerico",
            });
            return;
        }
        if (coo_npag <= 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_npag debe de ser un numero positivo mayor a 0",
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
exports.validarCoop_npag = validarCoop_npag;
const validarCoop_venc1 = (req, res, next) => {
    try {
        const { coo_venc1 } = req.body;
        // Expresión regular para validar el formato DD/MM/YYYY
        const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!coo_venc1 || !fechaRegex.test(coo_venc1)) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El formato del coo_venc1 debe ser DD/MM/YYYY",
            });
            return;
        }
        // Validar si la fecha es real
        const [diaStr, mesStr, anioStr] = coo_venc1.split("/");
        const dia = parseInt(diaStr, 10);
        const mes = parseInt(mesStr, 10) - 1; // En JS: enero = 0
        const anio = parseInt(anioStr, 10);
        const fecha = new Date(anio, mes, dia);
        if (fecha.getFullYear() !== anio ||
            fecha.getMonth() !== mes ||
            fecha.getDate() !== dia) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La fecha coo_venc1 no es una fecha válida.",
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
};
exports.validarCoop_venc1 = validarCoop_venc1;
const validarCoop_mts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_mts } = req.body;
        if (coo_mts === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar los coo_mts",
            });
            return;
        }
        // Verifica que sea tipo número y no NaN
        if (typeof coo_mts !== "number" || isNaN(coo_mts)) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Los coo_mts proporcionado debe ser de tipo numérico",
            });
            return;
        }
        if (coo_mts <= 0) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Los coo_mts deben de ser un numero positivo mayor a 0",
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
exports.validarCoop_mts = validarCoop_mts;
const validarCoop_pred = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_pred } = req.body;
        if (coo_pred === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el coo_pred",
            });
            return;
        }
        if (typeof coo_pred != "string") {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_pred proporcionado debe ser de tipo string",
            });
            return;
        }
        if (coo_pred.length > 12) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El coo_pred debe de ser menor a 13 caracteres",
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
exports.validarCoop_pred = validarCoop_pred;
//# sourceMappingURL=validar-campos-cooperadores.js.map