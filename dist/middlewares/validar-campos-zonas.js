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
exports.validarVertices = exports.validarCoordenadasCentro = exports.validarIdZona = void 0;
var generarArchivoLog_1 = require("../helpers/generarArchivoLog");
var zona_model_1 = require("../models/zona.model");
var validarIdZona = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_zona, zona, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_zona = req.params.id_zona;
                if (id_zona === undefined) {
                    id_zona = req.body.id_zona;
                }
                if (id_zona === undefined) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "Falto proporcionar el id_zona",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, zona_model_1.default.findByPk(id_zona)];
            case 1:
                zona = _a.sent();
                if (!zona) {
                    res.status(400).json({
                        success: false,
                        result: null,
                        error: "El id_zona proporcionado no existe dentro de la base de datos",
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
exports.validarIdZona = validarIdZona;
var validarCoordenadasCentro = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitud_centro, longitud_centro;
    return __generator(this, function (_b) {
        try {
            _a = req.body, latitud_centro = _a.latitud_centro, longitud_centro = _a.longitud_centro;
            if (latitud_centro === undefined && longitud_centro === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_centro y la longitud_centro en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (latitud_centro === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la latitud_centro en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (longitud_centro === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar la longitud_centro en el cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (typeof latitud_centro != "number" ||
                !latitud_centro.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La latitud_centro proporcionado debe ser de tipo decimal",
                });
                return [2 /*return*/];
            }
            if (typeof longitud_centro != "number" ||
                !longitud_centro.toString().includes(".")) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "La longitud_centro proporcionado debe ser de tipo decimal",
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
exports.validarCoordenadasCentro = validarCoordenadasCentro;
var validarVertices = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vertices, _i, vertices_1, vertice;
    return __generator(this, function (_a) {
        try {
            vertices = req.body.vertices;
            if (vertices === undefined) {
                res.status(400).json({
                    success: false,
                    result: null,
                    error: "Falto proporcionar los vertices de la zona dentro del cuerpo de la peticion",
                });
                return [2 /*return*/];
            }
            if (!Array.isArray(vertices)) {
                res.status(400).json({
                    success: false,
                    error: "Los vértices deben ser un arreglo",
                });
                return [2 /*return*/];
            }
            for (_i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
                vertice = vertices_1[_i];
                if (!Array.isArray(vertice) ||
                    vertice.length !== 2 ||
                    (typeof vertice[0] !== "number" || !vertice[0].toString().includes(".")) ||
                    (typeof vertice[1] !== "number" || !vertice[1].toString().includes("."))) {
                    res.status(400).json({
                        success: false,
                        error: "Formato de vértice inválido. Cada vértice debe ser un arreglo de dos números decimales (latitud, longitud)",
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
exports.validarVertices = validarVertices;
