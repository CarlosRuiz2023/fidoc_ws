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
exports.obtenerOperadores = exports.editarAsignacion = exports.obtenerAsignacion = exports.obtenerAsignaciones = exports.agregarAsignacion = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var asignacion_model_1 = require("../models/asignacion.model");
var usuario_model_1 = require("../models/usuario.model");
var sequelize_1 = require("sequelize");
var fechas_1 = require("../helpers/fechas");
/**
 * La función `agregarAsignacion` registra una asignacion para determinado usuario en la BD medinate una ruta
 */
var agregarAsignacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_ruta, id_usuario, fecha_hora_asignacion, nuevaAsignacion, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id_ruta = _a.id_ruta, id_usuario = _a.id_usuario;
                fecha_hora_asignacion = new Date();
                return [4 /*yield*/, asignacion_model_1.default.create({
                        id_ruta: id_ruta,
                        id_usuario: id_usuario,
                        fecha_hora_asignacion: fecha_hora_asignacion,
                    })];
            case 1:
                nuevaAsignacion = _b.sent();
                res.status(200).json({
                    success: true,
                    result: { nuevaAsignacion: nuevaAsignacion },
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
exports.agregarAsignacion = agregarAsignacion;
/**
 * La función `obtenerAsignaciones` recupera aquellas asignaciones registradas en la BD por determinado estatus
 */
var obtenerAsignaciones = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, fecha_inicio, _c, fecha_fin, estatus, _d, fechaInicioISO, fechaFinISO, asignaciones, _e, error_2;
    var _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 13, , 14]);
                _a = req.body, _b = _a.fecha_inicio, fecha_inicio = _b === void 0 ? "2024-01-01" : _b, _c = _a.fecha_fin, fecha_fin = _c === void 0 ? new Date() : _c, estatus = _a.estatus;
                return [4 /*yield*/, (0, fechas_1.default)(fecha_inicio, fecha_fin)];
            case 1:
                _d = _l.sent(), fechaInicioISO = _d.fechaInicioISO, fechaFinISO = _d.fechaFinISO;
                asignaciones = void 0;
                _e = Number(estatus);
                switch (_e) {
                    case 0: return [3 /*break*/, 2];
                    case 1: return [3 /*break*/, 4];
                    case 2: return [3 /*break*/, 6];
                    case 3: return [3 /*break*/, 8];
                }
                return [3 /*break*/, 10];
            case 2: return [4 /*yield*/, asignacion_model_1.default.findAndCountAll({
                    where: {
                        estatus: 0,
                        fecha_hora_asignacion: (_f = {},
                            _f[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                            _f),
                    },
                })];
            case 3:
                asignaciones = _l.sent();
                return [3 /*break*/, 12];
            case 4: return [4 /*yield*/, asignacion_model_1.default.findAndCountAll({
                    where: {
                        estatus: 1,
                        fecha_hora_asignacion: (_g = {},
                            _g[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                            _g),
                    },
                })];
            case 5:
                asignaciones = _l.sent();
                return [3 /*break*/, 12];
            case 6: return [4 /*yield*/, asignacion_model_1.default.findAndCountAll({
                    where: {
                        estatus: 2,
                        fecha_hora_asignacion: (_h = {},
                            _h[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                            _h),
                    },
                })];
            case 7:
                asignaciones = _l.sent();
                return [3 /*break*/, 12];
            case 8: return [4 /*yield*/, asignacion_model_1.default.findAndCountAll({
                    where: {
                        estatus: 3,
                        fecha_hora_asignacion: (_j = {},
                            _j[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                            _j),
                    },
                })];
            case 9:
                asignaciones = _l.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, asignacion_model_1.default.findAndCountAll({
                    where: {
                        fecha_hora_asignacion: (_k = {},
                            _k[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                            _k),
                    },
                })];
            case 11:
                asignaciones = _l.sent();
                return [3 /*break*/, 12];
            case 12:
                res.status(200).json({
                    success: true,
                    result: asignaciones,
                    error: null,
                });
                return [3 /*break*/, 14];
            case 13:
                error_2 = _l.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_2.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_2.message,
                });
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.obtenerAsignaciones = obtenerAsignaciones;
/**
 * La función `obtenerAsignacion` recupera una asignacion registrada en la BD mediante su Id
 */
var obtenerAsignacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_asignacion, asignacion, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_asignacion = req.params.id_asignacion;
                return [4 /*yield*/, asignacion_model_1.default.findAll({
                        where: { id_asignacion: id_asignacion },
                    })];
            case 1:
                asignacion = _a.sent();
                res.status(200).json({
                    success: true,
                    result: asignacion,
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
exports.obtenerAsignacion = obtenerAsignacion;
/**
 * La función `actualizarEstatusAsignacion` actualiza el estatus de una asignacion en BD
 */
var editarAsignacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_asignacion, estatus, fecha_hora_termino, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id_asignacion = req.params.id_asignacion;
                estatus = req.body.estatus;
                fecha_hora_termino = new Date();
                result = void 0;
                if (!(estatus === 3)) return [3 /*break*/, 2];
                return [4 /*yield*/, asignacion_model_1.default.update({ estatus: estatus, fecha_hora_termino: fecha_hora_termino }, { where: { id_asignacion: id_asignacion } })];
            case 1:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, asignacion_model_1.default.update({ estatus: estatus }, { where: { id_asignacion: id_asignacion } })];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Asignacion actualizada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al actualizar la asignacion" },
                        error: null,
                    });
                }
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_4.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_4.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.editarAsignacion = editarAsignacion;
/**
 * La función `obtenerOperadores` recupera aquellos operadores registrados en la BD mediante un booleano de disponibilidad
 */
var obtenerOperadores = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var disponibilidad, _a, _b, fecha_inicio, _c, fecha_fin, _d, fechaInicioISO, fechaFinISO, usuarios, asignaciones, usuariosOcupados_1, usuariosFinales, count, error_5;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 4, , 5]);
                disponibilidad = req.params.disponibilidad;
                _a = req.body, _b = _a.fecha_inicio, fecha_inicio = _b === void 0 ? "2024-01-01" : _b, _c = _a.fecha_fin, fecha_fin = _c === void 0 ? new Date() : _c;
                return [4 /*yield*/, (0, fechas_1.default)(fecha_inicio, fecha_fin)];
            case 1:
                _d = _g.sent(), fechaInicioISO = _d.fechaInicioISO, fechaFinISO = _d.fechaFinISO;
                return [4 /*yield*/, usuario_model_1.default.findAll({
                        where: { id_rol: 6, estatus: 1 },
                    })];
            case 2:
                usuarios = _g.sent();
                return [4 /*yield*/, asignacion_model_1.default.findAll({
                        where: {
                            estatus: (_e = {},
                                _e[sequelize_1.Op.or] = [1, 2],
                                _e),
                            fecha_hora_asignacion: (_f = {},
                                _f[sequelize_1.Op.between] = [fechaInicioISO, fechaFinISO],
                                _f),
                        },
                    })];
            case 3:
                asignaciones = _g.sent();
                usuariosOcupados_1 = asignaciones.map(function (asignacion) { return asignacion.id_usuario; });
                usuariosFinales = void 0;
                if (disponibilidad === "true") {
                    usuariosFinales = usuarios.filter(function (usuario) { return !usuariosOcupados_1.includes(usuario.id_usuario); });
                }
                else {
                    usuariosFinales = usuarios.filter(function (usuario) {
                        return usuariosOcupados_1.includes(usuario.id_usuario);
                    });
                }
                count = usuariosFinales.length;
                res.status(200).json({
                    success: true,
                    result: { count: count, rows: usuariosFinales },
                    error: null,
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _g.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_5.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_5.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.obtenerOperadores = obtenerOperadores;
