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
exports.reactivarTipo = exports.eliminarTipo = exports.obtenerTipo = exports.obtenerTipos = exports.agregarTipo = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var tipoVehiculo_model_1 = require("../models/tipoVehiculo.model");
/**
 * La función `agregarTipo` registra un nuevo tipo de vehículo en la BD
 */
var agregarTipo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tipo, tonelada, altura, ancho, largo, tipo_vehiculo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, tipo = _a.tipo, tonelada = _a.tonelada, altura = _a.altura, ancho = _a.ancho, largo = _a.largo;
                return [4 /*yield*/, tipoVehiculo_model_1.default.create({
                        tipo: tipo,
                        tonelada: tonelada,
                        altura: altura,
                        ancho: ancho,
                        largo: largo,
                    })];
            case 1:
                tipo_vehiculo = _b.sent();
                res.status(200).json({
                    success: true,
                    result: { tipo_vehiculo: tipo_vehiculo },
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
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
exports.agregarTipo = agregarTipo;
/**
 * La función `obtenerTipos` recupera aquellos tipos de vehículos registrados y activos en la BD
 */
var obtenerTipos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tipos, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tipoVehiculo_model_1.default.findAll({
                        where: { estatus: 1 },
                    })];
            case 1:
                tipos = _a.sent();
                res.status(200).json({
                    success: true,
                    result: tipos,
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
exports.obtenerTipos = obtenerTipos;
/**
 * La función `obtenerTipo` recupera el tipo de vehículos registrado y activo en la BD mediante su Id
 */
var obtenerTipo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_tipo_vehiculo, tipo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_tipo_vehiculo = req.params.id_tipo_vehiculo;
                return [4 /*yield*/, tipoVehiculo_model_1.default.findAll({
                        where: { id_tipo_vehiculo: id_tipo_vehiculo, estatus: 1 },
                    })];
            case 1:
                tipo = _a.sent();
                res.status(200).json({
                    success: true,
                    result: tipo,
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
exports.obtenerTipo = obtenerTipo;
/**
 * La función `eliminarTipo` elimina de forma lógica un tipo de vehículo en BD
 */
var eliminarTipo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_tipo_vehiculo, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_tipo_vehiculo = req.params.id_tipo_vehiculo;
                return [4 /*yield*/, tipoVehiculo_model_1.default.update({ estatus: 0 }, { where: { id_tipo_vehiculo: id_tipo_vehiculo } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Tipo de vehículo eliminado correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al eliminar el tipo de vehículo" },
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
exports.eliminarTipo = eliminarTipo;
/**
 * La función `reactivarTipo` reactiva de forma lógica un tipo de vehículo en BD
 */
var reactivarTipo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_tipo_vehiculo, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_tipo_vehiculo = req.params.id_tipo_vehiculo;
                return [4 /*yield*/, tipoVehiculo_model_1.default.update({ estatus: 1 }, { where: { id_tipo_vehiculo: id_tipo_vehiculo } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Tipo de vehículo reactivado correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al reactivar el tipo de vehículo" },
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
exports.reactivarTipo = reactivarTipo;
