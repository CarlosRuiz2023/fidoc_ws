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
exports.editarRuta = exports.reactivarRuta = exports.eliminarRuta = exports.obtenerRuta = exports.obtenerRutas = exports.agregarRuta = void 0;
var axios_1 = require("axios");
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var flexpolyline_1 = require("@here/flexpolyline");
var ruta_model_1 = require("../models/ruta.model");
var diccionarios_1 = require("../helpers/diccionarios");
var concatenaciones_1 = require("../helpers/concatenaciones");
var concatenaciones_2 = require("../helpers/concatenaciones");
var detalleRuta_model_1 = require("../models/detalleRuta.model");
var zona_model_1 = require("../models/zona.model");
var puntoDeControl_model_1 = require("../models/puntoDeControl.model");
var apiKey = process.env.API_KEY_HERE || "P6QKk5DG8dfS7VifTp82_1Thj_Vv_l-TNPwRIiZ42PU";
/**
 * La función `agregarRuta` registra una nueva ruta en la BD
 */
var agregarRuta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id_usuario_creador, id_usuario_editor, id_ruta_previa, nombre, latitud_inicio, longitud_inicio, latitud_fin, longitud_fin, zonas, puntos, url_inicio, response_inicio, direccion_inicio, estado_inicio, municipio_inicio, _b, id_estado_inicio, id_municipio_inicio, url_fin, response_fin, direccion_fin, estado_fin, municipio_fin, _c, id_estado_fin, id_municipio_fin, cadena, url_polilinea, response_polilinea, polilinea, polilinea_final, distancia, tiempo, fecha_hora_creacion, nuevaRuta, id_ruta, puntosRecuperados, zonasRecuperadas, error_1;
    var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    return __generator(this, function (_t) {
        switch (_t.label) {
            case 0:
                _t.trys.push([0, 11, , 12]);
                _a = req.body, id_usuario_creador = _a.id_usuario_creador, id_usuario_editor = _a.id_usuario_editor, id_ruta_previa = _a.id_ruta_previa, nombre = _a.nombre, latitud_inicio = _a.latitud_inicio, longitud_inicio = _a.longitud_inicio, latitud_fin = _a.latitud_fin, longitud_fin = _a.longitud_fin, zonas = _a.zonas, puntos = _a.puntos;
                url_inicio = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_inicio, ",").concat(longitud_inicio, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_inicio)];
            case 1:
                response_inicio = _t.sent();
                direccion_inicio = (_d = response_inicio.data.items[0]) === null || _d === void 0 ? void 0 : _d.title;
                estado_inicio = (_e = response_inicio.data.items[0]) === null || _e === void 0 ? void 0 : _e.address.state;
                estado_inicio = estado_inicio === null || estado_inicio === void 0 ? void 0 : estado_inicio.toUpperCase();
                municipio_inicio = (_f = response_inicio.data.items[0]) === null || _f === void 0 ? void 0 : _f.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado_inicio, municipio_inicio)];
            case 2:
                _b = _t.sent(), id_estado_inicio = _b.id_estado, id_municipio_inicio = _b.id_municipio;
                url_fin = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_fin, ",").concat(longitud_fin, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_fin)];
            case 3:
                response_fin = _t.sent();
                direccion_fin = (_g = response_fin.data.items[0]) === null || _g === void 0 ? void 0 : _g.title;
                estado_fin = (_h = response_fin.data.items[0]) === null || _h === void 0 ? void 0 : _h.address.state;
                estado_fin = estado_fin === null || estado_fin === void 0 ? void 0 : estado_fin.toUpperCase();
                municipio_fin = (_j = response_fin.data.items[0]) === null || _j === void 0 ? void 0 : _j.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado_fin, municipio_fin)];
            case 4:
                _c = _t.sent(), id_estado_fin = _c.id_estado, id_municipio_fin = _c.id_municipio;
                return [4 /*yield*/, (0, concatenaciones_1.concatenateZonasAndPuntos)(zonas, puntos)];
            case 5:
                cadena = _t.sent();
                url_polilinea = "https://router.hereapi.com/v8/routes?transportMode=truck&origin=".concat(latitud_inicio, ",").concat(longitud_inicio, "&destination=").concat(latitud_fin, ",").concat(longitud_fin, "&return=polyline,summary&trailerType=trailer&height=4500&width=2500&length=12&weight=20000").concat(cadena, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_polilinea)];
            case 6:
                response_polilinea = _t.sent();
                polilinea = (0, flexpolyline_1.decode)((_l = (_k = response_polilinea.data.routes[0]) === null || _k === void 0 ? void 0 : _k.sections[0]) === null || _l === void 0 ? void 0 : _l.polyline);
                polilinea_final = polilinea.polyline;
                distancia = (_p = (_o = (_m = response_polilinea.data.routes[0]) === null || _m === void 0 ? void 0 : _m.sections[0]) === null || _o === void 0 ? void 0 : _o.summary) === null || _p === void 0 ? void 0 : _p.length;
                tiempo = (_s = (_r = (_q = response_polilinea.data.routes[0]) === null || _q === void 0 ? void 0 : _q.sections[0]) === null || _r === void 0 ? void 0 : _r.summary) === null || _s === void 0 ? void 0 : _s.duration;
                fecha_hora_creacion = new Date();
                return [4 /*yield*/, ruta_model_1.default.create({
                        id_usuario_creador: id_usuario_creador,
                        id_usuario_editor: id_usuario_editor,
                        id_ruta_previa: id_ruta_previa,
                        nombre: nombre,
                        direccion_inicio: direccion_inicio,
                        id_estado_inicio: id_estado_inicio,
                        id_municipio_inicio: id_municipio_inicio,
                        latitud_inicio: latitud_inicio,
                        longitud_inicio: longitud_inicio,
                        direccion_fin: direccion_fin,
                        id_estado_fin: id_estado_fin,
                        id_municipio_fin: id_municipio_fin,
                        latitud_fin: latitud_fin,
                        longitud_fin: longitud_fin,
                        polilinea: polilinea_final,
                        distancia: distancia,
                        tiempo: tiempo,
                        fecha_hora_creacion: fecha_hora_creacion
                    })];
            case 7:
                nuevaRuta = _t.sent();
                id_ruta = nuevaRuta.getDataValue("id_ruta");
                return [4 /*yield*/, (0, concatenaciones_2.SaveZonasAndPuntos)(zonas, puntos, id_ruta)];
            case 8:
                _t.sent();
                return [4 /*yield*/, detalleRuta_model_1.default.findAll({
                        where: { id_ruta: id_ruta, zona: false },
                        include: [
                            {
                                model: puntoDeControl_model_1.default,
                                as: "puntoDeControlDetalle",
                            },
                        ],
                    })];
            case 9:
                puntosRecuperados = _t.sent();
                return [4 /*yield*/, detalleRuta_model_1.default.findAll({
                        where: { id_ruta: id_ruta, zona: true },
                        include: [
                            {
                                model: zona_model_1.default,
                                as: "zonaDetalle",
                            },
                        ],
                    })];
            case 10:
                zonasRecuperadas = _t.sent();
                res.status(200).json({
                    success: true,
                    result: { nuevaRuta: nuevaRuta, puntosRecuperados: puntosRecuperados, zonasRecuperadas: zonasRecuperadas },
                    error: null,
                });
                return [3 /*break*/, 12];
            case 11:
                error_1 = _t.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_1.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_1.message,
                });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.agregarRuta = agregarRuta;
/**
 * La función `obtenerRutas` recupera aquellas rutas registradas y activas en la BD
 */
var obtenerRutas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rutas, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ruta_model_1.default.findAll({
                        where: { estatus: 1 },
                        /* include: [
                          {
                            model: DetalleRuta,
                            as: "detallesRuta",
                            where: { zona: true },
                            include: [
                              {
                                model: Zona,
                                as: "zonaDetalle",
                                required: false,
                              },
                            ],
                          },
                          {
                            model: DetalleRuta,
                            as: "detallesRuta",
                            where: { zona: false },
                            include: [
                              {
                                model: PuntoDeControl,
                                as: "puntoDeControlDetalle",
                                required: false,
                              },
                            ],
                          },
                        ], */
                    })];
            case 1:
                rutas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: rutas,
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
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
exports.obtenerRutas = obtenerRutas;
/**
 * La función `obtenerRuta` recupera la ruta registrada y activa en la BD mediante su Id
 */
var obtenerRuta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_ruta, ruta, puntos_de_control, zonas, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                id_ruta = req.params.id_ruta;
                return [4 /*yield*/, ruta_model_1.default.findAll({
                        where: { id_ruta: id_ruta, estatus: 1 },
                    })];
            case 1:
                ruta = _a.sent();
                puntos_de_control = void 0, zonas = void 0;
                if (!(ruta.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, detalleRuta_model_1.default.findAll({
                        where: { id_ruta: id_ruta, zona: false },
                        include: [
                            {
                                model: puntoDeControl_model_1.default,
                                as: "puntoDeControlDetalle",
                            },
                        ],
                    })];
            case 2:
                puntos_de_control = _a.sent();
                return [4 /*yield*/, detalleRuta_model_1.default.findAll({
                        where: { id_ruta: id_ruta, zona: true },
                        include: [
                            {
                                model: zona_model_1.default,
                                as: "zonaDetalle",
                            },
                        ],
                    })];
            case 3:
                zonas = _a.sent();
                res.status(200).json({
                    success: true,
                    result: { ruta: ruta, puntos_de_control: puntos_de_control, zonas: zonas },
                    error: null,
                });
                return [3 /*break*/, 5];
            case 4:
                res.status(200).json({
                    success: true,
                    result: { msj: "Probablemente la ruta se encuentra eliminada logicamente dentro de la BD" },
                    error: null,
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_3.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_3.message,
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.obtenerRuta = obtenerRuta;
/**
 * La función `eliminarRuta` elimina de forma lógica una ruta en BD
 */
var eliminarRuta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_ruta, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_ruta = req.params.id_ruta;
                return [4 /*yield*/, ruta_model_1.default.update({ estatus: 0 }, { where: { id_ruta: id_ruta } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Ruta eliminada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al eliminar la ruta" },
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
exports.eliminarRuta = eliminarRuta;
/**
 * La función `reactivarRuta` reactiva de forma lógica una ruta en BD
 */
var reactivarRuta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_ruta, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_ruta = req.params.id_ruta;
                return [4 /*yield*/, ruta_model_1.default.update({ estatus: 1 }, { where: { id_ruta: id_ruta } })];
            case 1:
                result = _a.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Ruta reactivada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al reactivar la ruta" },
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
exports.reactivarRuta = reactivarRuta;
/**
 * La función `editarRuta` actualiza los datos de una determinada ruta dentro de la BD
 */
var editarRuta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id_ruta, _a, id_usuario_editor, id_ruta_previa, nombre, latitud_inicio, longitud_inicio, latitud_fin, longitud_fin, zonas, puntos, url_inicio, response_inicio, direccion_inicio, estado_inicio, municipio_inicio, _b, id_estado_inicio, id_municipio_inicio, url_fin, response_fin, direccion_fin, estado_fin, municipio_fin, _c, id_estado_fin, id_municipio_fin, cadena, url_polilinea, response_polilinea, polilinea, polilinea_final, distancia, tiempo, fecha_hora_ultima_modificacion, result, error_6;
    var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    return __generator(this, function (_t) {
        switch (_t.label) {
            case 0:
                _t.trys.push([0, 9, , 10]);
                id_ruta = req.params.id_ruta;
                _a = req.body, id_usuario_editor = _a.id_usuario_editor, id_ruta_previa = _a.id_ruta_previa, nombre = _a.nombre, latitud_inicio = _a.latitud_inicio, longitud_inicio = _a.longitud_inicio, latitud_fin = _a.latitud_fin, longitud_fin = _a.longitud_fin, zonas = _a.zonas, puntos = _a.puntos;
                url_inicio = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_inicio, ",").concat(longitud_inicio, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_inicio)];
            case 1:
                response_inicio = _t.sent();
                direccion_inicio = (_d = response_inicio.data.items[0]) === null || _d === void 0 ? void 0 : _d.title;
                estado_inicio = (_e = response_inicio.data.items[0]) === null || _e === void 0 ? void 0 : _e.address.state;
                estado_inicio = estado_inicio === null || estado_inicio === void 0 ? void 0 : estado_inicio.toUpperCase();
                municipio_inicio = (_f = response_inicio.data.items[0]) === null || _f === void 0 ? void 0 : _f.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado_inicio, municipio_inicio)];
            case 2:
                _b = _t.sent(), id_estado_inicio = _b.id_estado, id_municipio_inicio = _b.id_municipio;
                url_fin = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud_fin, ",").concat(longitud_fin, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_fin)];
            case 3:
                response_fin = _t.sent();
                direccion_fin = (_g = response_fin.data.items[0]) === null || _g === void 0 ? void 0 : _g.title;
                estado_fin = (_h = response_fin.data.items[0]) === null || _h === void 0 ? void 0 : _h.address.state;
                estado_fin = estado_fin === null || estado_fin === void 0 ? void 0 : estado_fin.toUpperCase();
                municipio_fin = (_j = response_fin.data.items[0]) === null || _j === void 0 ? void 0 : _j.address.city;
                return [4 /*yield*/, (0, diccionarios_1.default)(estado_fin, municipio_fin)];
            case 4:
                _c = _t.sent(), id_estado_fin = _c.id_estado, id_municipio_fin = _c.id_municipio;
                return [4 /*yield*/, (0, concatenaciones_1.concatenateZonasAndPuntos)(zonas, puntos)];
            case 5:
                cadena = _t.sent();
                url_polilinea = "https://router.hereapi.com/v8/routes?transportMode=truck&origin=".concat(latitud_inicio, ",").concat(longitud_inicio, "&destination=").concat(latitud_fin, ",").concat(longitud_fin, "&return=polyline,summary&trailerType=trailer&height=4500&width=2500&length=12&weight=20000").concat(cadena, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url_polilinea)];
            case 6:
                response_polilinea = _t.sent();
                polilinea = (0, flexpolyline_1.decode)((_l = (_k = response_polilinea.data.routes[0]) === null || _k === void 0 ? void 0 : _k.sections[0]) === null || _l === void 0 ? void 0 : _l.polyline);
                polilinea_final = polilinea.polyline;
                distancia = (_p = (_o = (_m = response_polilinea.data.routes[0]) === null || _m === void 0 ? void 0 : _m.sections[0]) === null || _o === void 0 ? void 0 : _o.summary) === null || _p === void 0 ? void 0 : _p.length;
                tiempo = (_s = (_r = (_q = response_polilinea.data.routes[0]) === null || _q === void 0 ? void 0 : _q.sections[0]) === null || _r === void 0 ? void 0 : _r.summary) === null || _s === void 0 ? void 0 : _s.duration;
                fecha_hora_ultima_modificacion = new Date();
                return [4 /*yield*/, ruta_model_1.default.update({
                        id_usuario_editor: id_usuario_editor,
                        nombre: nombre,
                        direccion_inicio: direccion_inicio,
                        id_estado_inicio: id_estado_inicio,
                        id_municipio_inicio: id_municipio_inicio,
                        latitud_inicio: latitud_inicio,
                        longitud_inicio: longitud_inicio,
                        direccion_fin: direccion_fin,
                        id_estado_fin: id_estado_fin,
                        id_municipio_fin: id_municipio_fin,
                        latitud_fin: latitud_fin,
                        longitud_fin: longitud_fin,
                        polilinea: polilinea_final,
                        distancia: distancia,
                        tiempo: tiempo,
                        fecha_hora_ultima_modificacion: fecha_hora_ultima_modificacion,
                    }, { where: { id_ruta: id_ruta } })];
            case 7:
                result = _t.sent();
                return [4 /*yield*/, (0, concatenaciones_2.SaveZonasAndPuntos)(zonas, puntos, Number(id_ruta))];
            case 8:
                _t.sent();
                if (result[0] > 0) {
                    res.status(200).json({
                        success: true,
                        result: "Ruta actualizada correctamente",
                        error: null,
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        result: { msj: "Error al actualizar la ruta" },
                        error: null,
                    });
                }
                return [3 /*break*/, 10];
            case 9:
                error_6 = _t.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_6.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_6.message,
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.editarRuta = editarRuta;
