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
exports.validarZonasPuntos = exports.validarCoordenadasInicioFin = exports.validarCoordenadas = exports.validarDireccion = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var zona_model_1 = require("../models/zona.model");
var puntoDeControl_model_1 = require("../models/puntoDeControl.model");
var validarDireccion = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var direccion;
    return __generator(this, function (_a) {
        try {
            direccion = req.body.direccion;
            if (direccion === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la direccion en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof direccion != "string") {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La direcccion proporcionado debe ser de tipo string",
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
exports.validarDireccion = validarDireccion;
var validarCoordenadas = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitud, longitud;
    return __generator(this, function (_b) {
        try {
            _a = req.body, latitud = _a.latitud, longitud = _a.longitud;
            if (latitud === undefined && longitud === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud y la longitud en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (latitud === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (longitud === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la longitud en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof latitud != "number" || !latitud.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La latitud proporcionado debe ser de tipo decimal",
                });
                return [2 /*return*/];
            }
            if (typeof longitud != "number" || !longitud.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La longitud proporcionado debe ser de tipo decimal",
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
exports.validarCoordenadas = validarCoordenadas;
var validarCoordenadasInicioFin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitud_inicio, longitud_inicio, latitud_fin, longitud_fin;
    return __generator(this, function (_b) {
        try {
            _a = req.body, latitud_inicio = _a.latitud_inicio, longitud_inicio = _a.longitud_inicio, latitud_fin = _a.latitud_fin, longitud_fin = _a.longitud_fin;
            if (latitud_inicio === undefined && longitud_inicio === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_inicio y la longitud_inicio en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (latitud_inicio === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_inicio en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (longitud_inicio === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la longitud_inicio en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof latitud_inicio != "number" ||
                !latitud_inicio.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La latitud_inicio proporcionada debe ser de tipo decimal",
                });
                return [2 /*return*/];
            }
            if (typeof longitud_inicio != "number" ||
                !longitud_inicio.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La longitud_inicio proporcionado debe ser de tipo decimal",
                });
                return [2 /*return*/];
            }
            if (latitud_fin === undefined && longitud_fin === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_fin y la longitud_fin en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (latitud_fin === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_fin en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (longitud_fin === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la longitud_fin en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof latitud_fin != "number" ||
                !latitud_fin.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La latitud_fin proporcionada debe ser de tipo decimal",
                });
                return [2 /*return*/];
            }
            if (typeof longitud_fin != "number" ||
                !longitud_fin.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La longitud_fin proporcionado debe ser de tipo decimal",
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
exports.validarCoordenadasInicioFin = validarCoordenadasInicioFin;
var validarZonasPuntos = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, zonas, _c, puntos, index, zona, index, punto, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 9, , 10]);
                _a = req.body, _b = _a.zonas, zonas = _b === void 0 ? [] : _b, _c = _a.puntos, puntos = _c === void 0 ? [] : _c;
                if (!Array.isArray(zonas)) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Las zonas deben ser un arreglo",
                    });
                    return [2 /*return*/];
                }
                index = 0;
                _d.label = 1;
            case 1:
                if (!(index < zonas.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, zona_model_1.default.findByPk(zonas[index])];
            case 2:
                zona = _d.sent();
                if (!zona) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_zona ".concat(zonas[index], " proporcionado dentro del arreglo no existe dentro de la base de datos"),
                    });
                    return [2 /*return*/];
                }
                _d.label = 3;
            case 3:
                index++;
                return [3 /*break*/, 1];
            case 4:
                if (!Array.isArray(puntos)) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Los puntos deben ser un arreglo",
                    });
                    return [2 /*return*/];
                }
                index = 0;
                _d.label = 5;
            case 5:
                if (!(index < puntos.length)) return [3 /*break*/, 8];
                return [4 /*yield*/, puntoDeControl_model_1.default.findByPk(puntos[index])];
            case 6:
                punto = _d.sent();
                if (!punto) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_punto_de_control ".concat(puntos[index], " proporcionado dentro del arreglo no existe dentro de la base de datos"),
                    });
                    return [2 /*return*/];
                }
                _d.label = 7;
            case 7:
                index++;
                return [3 /*break*/, 5];
            case 8:
                next();
                return [3 /*break*/, 10];
            case 9:
                error_1 = _d.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_1.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_1.message,
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.validarZonasPuntos = validarZonasPuntos;
