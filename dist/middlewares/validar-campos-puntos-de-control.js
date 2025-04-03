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
exports.validarIdMunicipio = exports.validarIdEstado = exports.validarHoras = exports.validarDiasActivo = exports.validarNombre = exports.validarIdPunto = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var puntoDeControl_model_1 = require("../models/puntoDeControl.model");
var estado_model_1 = require("../models/estado.model");
var municipio_model_1 = require("../models/municipio.model");
var validarIdPunto = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_punto_de_control, punto, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_punto_de_control = req.params.id_punto_de_control;
                if (id_punto_de_control === undefined) {
                    id_punto_de_control = req.body.id_punto_de_control;
                }
                if (id_punto_de_control === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_punto_de_control",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, puntoDeControl_model_1.default.findByPk(id_punto_de_control)];
            case 1:
                punto = _a.sent();
                if (!punto) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_punto_de_control proporcionado no existe dentro de la base de datos",
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
exports.validarIdPunto = validarIdPunto;
var validarNombre = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        try {
            nombre = req.body.nombre;
            if (nombre === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el nombre",
                });
                return [2 /*return*/];
            }
            if (typeof nombre != "string") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El nombre proporcionado debe ser de tipo string",
                });
                return [2 /*return*/];
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
        return [2 /*return*/];
    });
}); };
exports.validarNombre = validarNombre;
var validarDiasActivo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dias_activo, index;
    return __generator(this, function (_a) {
        try {
            dias_activo = req.body.dias_activo;
            if (dias_activo === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar los dias_activo en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (!Array.isArray(dias_activo)) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Los dias_activo deben ser un arreglo",
                });
                return [2 /*return*/];
            }
            for (index = 0; index < dias_activo.length; index++) {
                if (dias_activo[index] < 0 || dias_activo[index] > 6) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El dias_activo ".concat(dias_activo[index], " proporcionado dentro del arreglo no se encuentre entre el rango permitido 0-6"),
                    });
                    return [2 /*return*/];
                }
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
        return [2 /*return*/];
    });
}); };
exports.validarDiasActivo = validarDiasActivo;
var validarHoras = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hora_activacion, hora_desactivacion, horaRegex;
    return __generator(this, function (_b) {
        try {
            _a = req.body, hora_activacion = _a.hora_activacion, hora_desactivacion = _a.hora_desactivacion;
            if (hora_activacion === undefined && hora_desactivacion === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la hora_activacion y la hora_desactivacion en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (hora_activacion === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la hora_activacion en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (hora_desactivacion === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la hora_desactivacion en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            horaRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
            if (!horaRegex.test(hora_activacion)) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La hora_activacion no cumple el formato correcto debe ser HH:mm (24 horas)",
                });
                return [2 /*return*/];
            }
            if (!horaRegex.test(hora_desactivacion)) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La hora_desactivacions no cumple el formato correcto debe ser HH:mm (24 horas)",
                });
                return [2 /*return*/];
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
        return [2 /*return*/];
    });
}); };
exports.validarHoras = validarHoras;
var validarIdEstado = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_estado, estado, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_estado = req.params.id_estado;
                if (id_estado === undefined) {
                    id_estado = req.body.id_estado;
                }
                if (id_estado === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_estado",
                    });
                    return [2 /*return*/];
                }
                if (typeof Number(id_estado) != "number") {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_estado proporcionado debe ser de tipo number",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, estado_model_1.default.findByPk(id_estado)];
            case 1:
                estado = _a.sent();
                if (!estado) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_estado proporcionado no existe dentro de la base de datos",
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
exports.validarIdEstado = validarIdEstado;
var validarIdMunicipio = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_municipio, municipio, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_municipio = req.params.id_municipio;
                if (id_municipio === undefined) {
                    id_municipio = req.body.id_municipio;
                }
                if (id_municipio === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_municipio",
                    });
                    return [2 /*return*/];
                }
                if (typeof Number(id_municipio) != "number") {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_municipio proporcionado debe ser de tipo number",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, municipio_model_1.default.findByPk(id_municipio)];
            case 1:
                municipio = _a.sent();
                if (!municipio) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_municipio proporcionado no existe dentro de la base de datos",
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
exports.validarIdMunicipio = validarIdMunicipio;
