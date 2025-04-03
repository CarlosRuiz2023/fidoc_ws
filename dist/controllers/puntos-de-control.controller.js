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
exports.obtenerPuntosPorMunicipio = exports.obtenerPuntosPorEstado = exports.editarPunto = exports.reactivarPunto = exports.eliminarPunto = exports.obtenerPunto = exports.obtenerPuntos = exports.agregarPunto = void 0;
var axios_1 = require("axios");
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var puntoDeControl_model_1 = require("../models/puntoDeControl.model");
var diccionarios_1 = require("../helpers/diccionarios");
var apiKey = process.env.API_KEY_HERE || "P6QKk5DG8dfS7VifTp82_1Thj_Vv_l-TNPwRIiZ42PU";
/**
 * La función `agregarPunto` registra un nuevo punto de control en la BD
 */
var agregarPunto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, dias_activo, hora_activacion, hora_desactivacion, latitud, longitud, url, response, estado, municipio, _b, id_estado, id_municipio, nuevoPunto, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                _a = req.body, nombre = _a.nombre, dias_activo = _a.dias_activo, hora_activacion = _a.hora_activacion, hora_desactivacion = _a.hora_desactivacion, latitud = _a.latitud, longitud = _a.longitud;
                url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud, ",").concat(longitud, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _e.sent();
                estado = (_c = response.data.items[0]) === null || _c === void 0 ? void 0 : _c.address.state;
                estado = estado === null || estado === void 0 ? void 0 : estado.toUpperCase();
                municipio = (_d = response.data.items[0]) === null || _d === void 0 ? void 0 : _d.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado, municipio)];
            case 2:
                _b = _e.sent(), id_estado = _b.id_estado, id_municipio = _b.id_municipio;
                return [4 /*yield*/, puntoDeControl_model_1.default.create({
                        nombre: nombre,
                        id_estado: id_estado,
                        id_municipio: id_municipio,
                        dias_activo: dias_activo,
                        hora_activacion: hora_activacion,
                        hora_desactivacion: hora_desactivacion,
                        latitud: latitud,
                        longitud: longitud,
                    })];
            case 3:
                nuevoPunto = _e.sent();
                res.status(200).json({
                    success: true,
                    result: { nuevoPunto: nuevoPunto },
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
exports.agregarPunto = agregarPunto;
/**
 * La función `obtenerPuntos` recupera aquellos puntos de control registrados y activos en la BD
 */
var obtenerPuntos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var puntos, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, puntoDeControl_model_1.default.findAll({
                        where: { estatus: 1 },
                    })];
            case 1:
                puntos = _a.sent();
                res.status(200).json({
                    success: true,
                    result: puntos,
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
exports.obtenerPuntos = obtenerPuntos;
/**
 * La función `obtenerPunto` recupera el punto de control registrado y activo en la BD mediante su Id
 */
var obtenerPunto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_punto_de_control, punto, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_punto_de_control = req.params.id_punto_de_control;
                return [4 /*yield*/, puntoDeControl_model_1.default.findAll({
                        where: { id_punto_de_control: id_punto_de_control, estatus: 1 },
                    })];
            case 1:
                punto = _a.sent();
                res.status(200).json({
                    success: true,
                    result: punto,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
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
exports.obtenerPunto = obtenerPunto;
/**
 * La función `eliminarPunto` elimina de forma lógica un punto de control en BD
 */
var eliminarPunto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_punto_de_control, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_punto_de_control = req.params.id_punto_de_control;
                return [4 /*yield*/, puntoDeControl_model_1.default.update({ estatus: 0 }, { where: { id_punto_de_control: id_punto_de_control } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Punto de control eliminado correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al eliminar el punto de control" },
                        error: null,
                    });
                }
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
exports.eliminarPunto = eliminarPunto;
/**
 * La función `reactivarPunto` reactiva de forma lógica un punto de control en BD
 */
var reactivarPunto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_punto_de_control, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_punto_de_control = req.params.id_punto_de_control;
                return [4 /*yield*/, puntoDeControl_model_1.default.update({ estatus: 1 }, { where: { id_punto_de_control: id_punto_de_control } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Punto de control reactivado correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al reactivar el punto de control" },
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
exports.reactivarPunto = reactivarPunto;
/**
 * La función `editarPunto` actualiza los datos de determinado punto de control dentro de la BD
 */
var editarPunto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_punto_de_control, _a, nombre, dias_activo, hora_activacion, hora_desactivacion, latitud, longitud, url, response, estado, municipio, _b, id_estado, id_municipio, result, error_6;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 4, , 5]);
                id_punto_de_control = req.params.id_punto_de_control;
                _a = req.body, nombre = _a.nombre, dias_activo = _a.dias_activo, hora_activacion = _a.hora_activacion, hora_desactivacion = _a.hora_desactivacion, latitud = _a.latitud, longitud = _a.longitud;
                url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud, ",").concat(longitud, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _e.sent();
                estado = (_c = response.data.items[0]) === null || _c === void 0 ? void 0 : _c.address.state;
                estado = estado === null || estado === void 0 ? void 0 : estado.toUpperCase();
                municipio = (_d = response.data.items[0]) === null || _d === void 0 ? void 0 : _d.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado, municipio)];
            case 2:
                _b = _e.sent(), id_estado = _b.id_estado, id_municipio = _b.id_municipio;
                return [4 /*yield*/, puntoDeControl_model_1.default.update({
                        nombre: nombre,
                        id_estado: id_estado,
                        id_municipio: id_municipio,
                        dias_activo: dias_activo,
                        hora_activacion: hora_activacion,
                        hora_desactivacion: hora_desactivacion,
                        latitud: latitud,
                        longitud: longitud,
                    }, { where: { id_punto_de_control: id_punto_de_control } })];
            case 3:
                result = _e.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Punto de control actualizado correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al actualizar el punto de control" },
                        error: null,
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                error_6 = _e.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_6.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_6.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editarPunto = editarPunto;
/**
 * La función `obtenerPuntosPorEstado` recupera aquellos puntos de control registrados y activos en la BD que pertenecen a determinado id_estado
 */
var obtenerPuntosPorEstado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_estado, puntos, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_estado = req.params.id_estado;
                return [4 /*yield*/, puntoDeControl_model_1.default.findAll({
                        where: { estatus: 1, id_estado: id_estado },
                    })];
            case 1:
                puntos = _a.sent();
                res.status(200).json({
                    success: true,
                    result: puntos,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_7.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_7.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.obtenerPuntosPorEstado = obtenerPuntosPorEstado;
/**
 * La función `obtenerPuntosPorMunicipio` recupera aquellos puntos de control registrados y activos en la BD que pertenecen a determinado id_municipio
 */
var obtenerPuntosPorMunicipio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_municipio, puntos, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_municipio = req.params.id_municipio;
                return [4 /*yield*/, puntoDeControl_model_1.default.findAll({
                        where: { estatus: 1, id_municipio: id_municipio },
                    })];
            case 1:
                puntos = _a.sent();
                res.status(200).json({
                    success: true,
                    result: puntos,
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
exports.obtenerPuntosPorMunicipio = obtenerPuntosPorMunicipio;
