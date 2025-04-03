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
exports.validarPeligrosa = exports.validarLargo = exports.validarAncho = exports.validarAltura = exports.validarTonelada = exports.validarTipo = exports.validarIdTipo = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var tipoVehiculo_model_1 = require("../models/tipoVehiculo.model");
var validarIdTipo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_tipo_vehiculo, tipo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_tipo_vehiculo = req.params.id_tipo_vehiculo;
                if (id_tipo_vehiculo === undefined) {
                    id_tipo_vehiculo = req.body.id_tipo_vehiculo;
                }
                if (id_tipo_vehiculo === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_tipo_de_vehiculo",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, tipoVehiculo_model_1.default.findByPk(id_tipo_vehiculo)];
            case 1:
                tipo = _a.sent();
                if (!tipo) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_tipo_de_vehiculo proporcionado no existe dentro de la base de datos",
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
exports.validarIdTipo = validarIdTipo;
var validarTipo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tipo;
    return __generator(this, function (_a) {
        try {
            tipo = req.body.tipo;
            if (tipo === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el tipo dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof tipo != "string") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El tipo proporcionado debe ser de tipo string",
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
exports.validarTipo = validarTipo;
var validarTonelada = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tonelada;
    return __generator(this, function (_a) {
        try {
            tonelada = req.body.tonelada;
            if (tonelada === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la tonelada dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof tonelada != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La tonelada proporcionada debe ser de tipo number",
                });
                return [2 /*return*/];
            }
            if (tonelada < 0 || tonelada > 4250) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La tonelada proporcionada debe estar entre el rango de 0-4250 kg.",
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
exports.validarTonelada = validarTonelada;
var validarAltura = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var altura;
    return __generator(this, function (_a) {
        try {
            altura = req.body.altura;
            if (altura === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la altura dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof altura != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La altura proporcionada debe ser de tipo number",
                });
                return [2 /*return*/];
            }
            if (altura < 0 || altura > 5000) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La altura proporcionada debe estar entre el rango de 0-5000 cm.",
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
exports.validarAltura = validarAltura;
var validarAncho = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ancho;
    return __generator(this, function (_a) {
        try {
            ancho = req.body.ancho;
            if (ancho === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el ancho dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof ancho != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El ancho proporcionado debe ser de tipo number",
                });
                return [2 /*return*/];
            }
            if (ancho < 0 || ancho > 5000) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El ancho proporcionado debe estar entre el rango de 0-5000 cm.",
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
exports.validarAncho = validarAncho;
var validarLargo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var largo;
    return __generator(this, function (_a) {
        try {
            largo = req.body.largo;
            if (largo === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar el largo dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof largo != "number") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El largo proporcionado debe ser de tipo number",
                });
                return [2 /*return*/];
            }
            if (largo < 0 || largo > 30000) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "El largo proporcionado debe estar entre el rango de 0-30000 cm.",
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
exports.validarLargo = validarLargo;
var validarPeligrosa = function (req, res, next) {
    try {
        var peligrosa = req.body.peligrosa;
        if (peligrosa === undefined) {
            res.status(400).json({
                success: false,
                result: null,
                error: "Falto proporcionar el atributo de peligrosa dentro del cuerpo de la peticion",
            });
            return;
        }
        if (peligrosa !== true && peligrosa !== false) {
            res.status(400).json({
                success: false,
                result: null,
                error: "La peligrosa debe ser true o false",
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
exports.validarPeligrosa = validarPeligrosa;
