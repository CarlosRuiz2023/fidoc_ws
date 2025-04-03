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
exports.obtenerPolilinea = exports.obtenerDireccion = exports.obtenerCoordenadas = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var axios_1 = require("axios");
var flexpolyline_1 = require("@here/flexpolyline");
var concatenaciones_1 = require("../helpers/concatenaciones");
var apiKey = process.env.API_KEY_HERE || 'P6QKk5DG8dfS7VifTp82_1Thj_Vv_l-TNPwRIiZ42PU';
/**
 * La función `obtenerCoordenadas` recupera la latitud y longitud de una dirección dada
 */
var obtenerCoordenadas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var direccion, url, response, latitud, longitud, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                direccion = req.body.direccion;
                url = "https://geocode.search.hereapi.com/v1/geocode?q=".concat(direccion, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _c.sent();
                latitud = (_a = response.data.items[0]) === null || _a === void 0 ? void 0 : _a.position.lat;
                longitud = (_b = response.data.items[0]) === null || _b === void 0 ? void 0 : _b.position.lng;
                res.status(200).json({
                    success: true,
                    result: { latitud: latitud, longitud: longitud },
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
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
exports.obtenerCoordenadas = obtenerCoordenadas;
/**
 * La función `obtenerDireccion` recupera la dirección mediante unas coordenadas dadas
 */
var obtenerDireccion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitud, longitud, url, response, direccion, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, latitud = _a.latitud, longitud = _a.longitud;
                url = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(latitud, ",").concat(longitud, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _c.sent();
                direccion = (_b = response.data.items[0]) === null || _b === void 0 ? void 0 : _b.title;
                res.status(200).json({
                    success: true,
                    result: { direccion: direccion },
                    error: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
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
exports.obtenerDireccion = obtenerDireccion;
/**
 * La función `obtenerPolilinea` recupera la polilínea final de una ruta dada
 */
var obtenerPolilinea = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitud_inicio, longitud_inicio, latitud_fin, longitud_fin, _b, zonas, _c, puntos, cadena, url, response, polyline, error_3;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 3, , 4]);
                _a = req.body, latitud_inicio = _a.latitud_inicio, longitud_inicio = _a.longitud_inicio, latitud_fin = _a.latitud_fin, longitud_fin = _a.longitud_fin, _b = _a.zonas, zonas = _b === void 0 ? [] : _b, _c = _a.puntos, puntos = _c === void 0 ? [] : _c;
                return [4 /*yield*/, (0, concatenaciones_1.concatenateZonasAndPuntos)(zonas, puntos)];
            case 1:
                cadena = _f.sent();
                url = "https://router.hereapi.com/v8/routes?transportMode=truck&origin=".concat(latitud_inicio, ",").concat(longitud_inicio, "&destination=").concat(latitud_fin, ",").concat(longitud_fin, "&return=polyline,summary&trailerType=trailer&height=4500&width=2500&length=12&weight=20000").concat(cadena, "&apiKey=").concat(apiKey);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 2:
                response = _f.sent();
                polyline = (0, flexpolyline_1.decode)((_e = (_d = response.data.routes[0]) === null || _d === void 0 ? void 0 : _d.sections[0]) === null || _e === void 0 ? void 0 : _e.polyline);
                res.status(200).json({
                    success: true,
                    result: { polyline: polyline },
                    error: null,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _f.sent();
                (0, generarArchivoLog_1.escribirErrorEnLog)(error_3.message);
                res.status(500).json({
                    success: false,
                    result: null,
                    error: error_3.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.obtenerPolilinea = obtenerPolilinea;
