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
exports.obtenerZonasPeligrosasPorMunicipio = exports.obtenerZonasPeligrosasPorEstado = exports.obtenerZonasProhibidasPorMunicipio = exports.obtenerZonasProhibidasPorEstado = exports.editarZona = exports.reactivarZona = exports.eliminarZona = exports.obtenerZona = exports.obtenerZonasPeligrosas = exports.obtenerZonasProhibidas = exports.agregarZona = void 0;
var axios_1 = require("axios");
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var zona_model_1 = require("../models/zona.model");
var diccionarios_1 = require("../helpers/diccionarios");
var apiKey = process.env.API_KEY_HERE || "P6QKk5DG8dfS7VifTp82_1Thj_Vv_l-TNPwRIiZ42PU";
/**
 * La función `agregarZona` registra una nueva zona en la BD
 */
var agregarZona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, latitud_centro, longitud_centro, vertices, peligrosa, url, response, estado, municipio, _b, id_estado, id_municipio, zona, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                _a = req.body, nombre = _a.nombre, latitud_centro = _a.latitud_centro, longitud_centro = _a.longitud_centro, vertices = _a.vertices, peligrosa = _a.peligrosa;
                url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_centro, ",").concat(longitud_centro, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _e.sent();
                estado = (_c = response.data.items[0]) === null || _c === void 0 ? void 0 : _c.address.state;
                estado = estado === null || estado === void 0 ? void 0 : estado.toUpperCase();
                municipio = (_d = response.data.items[0]) === null || _d === void 0 ? void 0 : _d.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado, municipio)];
            case 2:
                _b = _e.sent(), id_estado = _b.id_estado, id_municipio = _b.id_municipio;
                return [4 /*yield*/, zona_model_1.default.create({
                        nombre: nombre,
                        id_estado: id_estado,
                        id_municipio: id_municipio,
                        vertices: vertices,
                        peligrosa: peligrosa,
                    })];
            case 3:
                zona = _e.sent();
                res.status(200).json({
                    success: true,
                    result: { zona: zona },
                    error: null,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _e.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_1.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_1.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.agregarZona = agregarZona;
/**
 * La función `obtenerZonasProhibidas` recupera aquellas zonas prohibidas registradas y activas en la BD
 */
var obtenerZonasProhibidas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zonas, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, peligrosa: false },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
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
exports.obtenerZonasProhibidas = obtenerZonasProhibidas;
/**
 * La función `obtenerZonasPeligrosas` recupera aquellas zonas peligrosas registradas y activas en la BD
 */
var obtenerZonasPeligrosas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zonas, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, peligrosa: true },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
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
exports.obtenerZonasPeligrosas = obtenerZonasPeligrosas;
/**
 * La función `obtenerZona` recupera la zona registrada y activa en la BD mediante su Id
 */
var obtenerZona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_zona, zona, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_zona = req.params.id_zona;
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { id_zona: id_zona, estatus: 1 },
                    })];
            case 1:
                zona = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zona,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_4.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_4.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerZona = obtenerZona;
/**
 * La función `eliminarZona` elimina de forma lógica una zona en BD
 */
var eliminarZona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_zona, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_zona = req.params.id_zona;
                return [4 /*yield*/, zona_model_1.default.update({ estatus: 0 }, { where: { id_zona: id_zona } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Zona eliminada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al eliminar la zona" },
                        error: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_5.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_5.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.eliminarZona = eliminarZona;
/**
 * La función `reactivarZona` reactiva de forma lógica una zona en BD
 */
var reactivarZona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_zona, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_zona = req.params.id_zona;
                return [4 /*yield*/, zona_model_1.default.update({ estatus: 1 }, { where: { id_zona: id_zona } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Zona reactivada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al reactivar la zona" },
                        error: null,
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_6.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_6.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.reactivarZona = reactivarZona;
/**
 * La función `editarZona` actualiza los datos de una determinada zona dentro de la BD
 */
var editarZona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_zona, _a, nombre, latitud_centro, longitud_centro, vertices, peligrosa, url, response, estado, municipio, _b, id_estado, id_municipio, result, error_7;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                id_zona = req.params.id_zona;
                _a = req.body, nombre = _a.nombre, latitud_centro = _a.latitud_centro, longitud_centro = _a.longitud_centro, vertices = _a.vertices, peligrosa = _a.peligrosa;
                url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_centro, ",").concat(longitud_centro, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _e.sent();
                estado = (_c = response.data.items[0]) === null || _c === void 0 ? void 0 : _c.address.state;
                estado = estado === null || estado === void 0 ? void 0 : estado.toUpperCase();
                municipio = (_d = response.data.items[0]) === null || _d === void 0 ? void 0 : _d.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado, municipio)];
            case 2:
                _b = _e.sent(), id_estado = _b.id_estado, id_municipio = _b.id_municipio;
                return [4 /*yield*/, zona_model_1.default.update({
                        nombre: nombre,
                        id_estado: id_estado,
                        id_municipio: id_municipio,
                        vertices: vertices,
                        peligrosa: peligrosa,
                    }, { where: { id_zona: id_zona } })];
            case 3:
                result = _e.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Zona actualizada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al actualizar la zona" },
                        error: null,
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                error_7 = _e.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_7.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_7.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editarZona = editarZona;
/**
 * La función `obtenerZonasProhibidasPorEstado` recupera aquellas zonas registradas y activas en la BD que pertenecen a determinado id_estado
 */
var obtenerZonasProhibidasPorEstado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_estado, zonas, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_estado = req.params.id_estado;
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, id_estado: id_estado, peligrosa: false },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_8.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_8.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerZonasProhibidasPorEstado = obtenerZonasProhibidasPorEstado;
/**
 * La función `obtenerZonasPeligrosasPorEstado` recupera aquellas zonas registradas y activas en la BD que pertenecen a determinado id_estado
 */
var obtenerZonasPeligrosasPorEstado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_estado, zonas, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_estado = req.params.id_estado;
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, id_estado: id_estado, peligrosa: true },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_9.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_9.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerZonasPeligrosasPorEstado = obtenerZonasPeligrosasPorEstado;
/**
 * La función `obtenerZonasProhibidasPorMunicipio` recupera aquellas zonas registradas y activas en la BD que pertenecen a determinado id_municipio
 */
var obtenerZonasProhibidasPorMunicipio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_municipio, zonas, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_municipio = req.params.id_municipio;
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, id_municipio: id_municipio, peligrosa: false },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_10.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_10.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerZonasProhibidasPorMunicipio = obtenerZonasProhibidasPorMunicipio;
/**
 * La función `obtenerZonasPeligrosasPorMunicipio` recupera aquellas zonas registradas y activas en la BD que pertenecen a determinado id_municipio
 */
var obtenerZonasPeligrosasPorMunicipio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_municipio, zonas, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_municipio = req.params.id_municipio;
                return [4 /*yield*/, zona_model_1.default.findAll({
                        where: { estatus: 1, id_municipio: id_municipio, peligrosa: true },
                    })];
            case 1:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: zonas,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_11.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_11.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerZonasPeligrosasPorMunicipio = obtenerZonasPeligrosasPorMunicipio;
