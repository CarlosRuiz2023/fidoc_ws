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
var express = require("express");
var cors = require("cors");
var connection_1 = require("../db/connection");
var geocodificador_router_1 = require("../routes/geocodificador.router");
var tipos_de_vehiculos_router_1 = require("../routes/tipos-de-vehiculos.router");
var puntos_de_control_router_1 = require("../routes/puntos-de-control.router");
var zonas_router_1 = require("../routes/zonas.router");
var rutas_router_1 = require("../routes/rutas.router");
var asignaciones_router_1 = require("../routes/asignaciones.router");
var Server = /** @class */ (function () {
    function Server() {
        this.apiPaths = {
            pathGeocodificador: "/api/geocodificar",
            pathTipoVehiculo: "/api/tipos-de-vehiculos",
            pathPuntosDeControl: "/api/puntos-de-control",
            pathZonas: "/api/zonas",
            pathRutas: "/api/rutas",
            pathAsignaciones: "/api/asignaciones",
        };
        this.app = express();
        this.port = process.env.PORT || "3000";
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    Server.prototype.dbConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.authenticate()];
                    case 1:
                        _a.sent();
                        console.log("Database online");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("" + error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.middlewares = function () {
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static("public"));
    };
    Server.prototype.routes = function () {
        this.app.use(this.apiPaths.pathGeocodificador, geocodificador_router_1.default);
        this.app.use(this.apiPaths.pathTipoVehiculo, tipos_de_vehiculos_router_1.default);
        this.app.use(this.apiPaths.pathPuntosDeControl, puntos_de_control_router_1.default);
        this.app.use(this.apiPaths.pathZonas, zonas_router_1.default);
        this.app.use(this.apiPaths.pathRutas, rutas_router_1.default);
        this.app.use(this.apiPaths.pathAsignaciones, asignaciones_router_1.default);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Servidor corriendo en puerto " + _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
