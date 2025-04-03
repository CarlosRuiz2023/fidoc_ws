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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarDisponibilidad = exports.validarRangoFechas = exports.validarEstatusNullAsignacion = exports.validarIdAsignacion = exports.validarEstatusAsignacion = exports.validarIdUsuario = exports.validarIdRuta = void 0;
var ruta_model_1 = require("../models/ruta.model");
var usuario_model_1 = require("../models/usuario.model");
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var asignacion_model_1 = require("../models/asignacion.model");
var validarIdRuta = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_ruta, ruta, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_ruta = req.params.id_ruta;
                if (id_ruta === undefined) {
                    id_ruta = req.body.id_ruta;
                }
                if (id_ruta === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_ruta",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, ruta_model_1.default.findByPk(id_ruta)];
            case 1:
                ruta = _a.sent();
                if (!ruta) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_ruta proporcionado no existe dentro de la base de datos",
                    });
                    return [2 /*return*/];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_1.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validarIdRuta = validarIdRuta;
var validarIdUsuario = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_usuario, usuario, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_usuario = req.params.id_usuario;
                if (id_usuario === undefined) {
                    id_usuario = req.body.id_usuario;
                }
                if (id_usuario === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_usuario",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usuario_model_1.default.findByPk(id_usuario)];
            case 1:
                usuario = _a.sent();
                if (!usuario) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_usuario proporcionado no existe dentro de la base de datos",
                    });
                    return [2 /*return*/];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_2.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_2.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validarIdUsuario = validarIdUsuario;
var validarIdAsignacion = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_asignacion, asignacion, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_asignacion = req.params.id_asignacion;
                if (id_asignacion === undefined) {
                    id_asignacion = req.body.id_asignacion;
                }
                if (id_asignacion === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_asignacion",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, asignacion_model_1.default.findByPk(id_asignacion)];
            case 1:
                asignacion = _a.sent();
                if (!asignacion) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_asignacion proporcionado no existe dentro de la base de datos",
                    });
                    return [2 /*return*/];
                }
                next();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_3.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_3.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validarIdAsignacion = validarIdAsignacion;
var validarEstatusAsignacion = function (req, res, next) {
    try {
        var estatus = req.body.estatus;
        if (estatus === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el estatus en el cuerpo de la peticion",
            });
            return;
        }
        if (estatus < 0 || estatus > 3) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El estatus proporcionado para una Asignacion solo puede estar en el rango de 0-3",
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
exports.validarEstatusAsignacion = validarEstatusAsignacion;
var validarEstatusNullAsignacion = function (req, res, next) {
    try {
        var _a = req.body.estatus, estatus = _a === void 0 ? 1 : _a;
        if (estatus < 0 || estatus > 3) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El estatus proporcionado para una Asignacion solo puede estar en el rango de 0-3",
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
exports.validarEstatusNullAsignacion = validarEstatusNullAsignacion;
var validarRangoFechas = function (req, res, next) {
    try {
        var _a = req.body, _b = _a.fecha_inicio, fecha_inicio = _b === void 0 ? "2024-01-01" : _b, _c = _a.fecha_fin, fecha_fin = _c === void 0 ? new Date() : _c;
        // Expresión regular para validar el formato YYYY-MM-DD
        var fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!fechaRegex.test(fecha_inicio) || !fechaRegex.test(fecha_fin)) {
            res.status(400).json({
                success: false,
                result: null,
                error: "El formato de las fechas debe ser YYYY-MM-DD",
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
exports.validarRangoFechas = validarRangoFechas;
var validarDisponibilidad = function (req, res, next) {
    try {
        var disponibilidad = req.params.disponibilidad;
        if (disponibilidad !== "true" && disponibilidad !== "false") {
            res.status(400).json({
                success: false,
                result: null,
                error: "La disponibilidad debe ser true o false",
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
exports.validarDisponibilidad = validarDisponibilidad;
