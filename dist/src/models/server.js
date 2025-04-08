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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const cronApp = require("../cron/cron");
const connection_1 = require("../db/connection");
const obras_route_1 = __importDefault(require("../routes/obras.route"));
const cooperadores_route_1 = __importDefault(require("../routes/cooperadores.route"));
const carteraVencida_route_1 = __importDefault(require("../routes/carteraVencida.route"));
class Server {
    constructor() {
        this.apiPaths = {
            pathObra: "/api/obra",
            pathCooperador: "/api/cooperador",
            pathCarteraVencida: "/api/carteraVencida"
        };
        this.app = express();
        this.port = process.env.PORT || "3000";
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.dbPostgres.authenticate();
                console.log("Database Postgresql online");
            }
            catch (error) {
                throw new Error("" + error);
            }
            try {
                yield connection_1.dbAccess.query('SELECT 1+1 AS result')
                    .then((data) => {
                    console.log("Database Access online");
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
            catch (error) {
                throw new Error("" + error);
            }
            (0, connection_1.conectarBDSQLServer)();
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.pathObra, obras_route_1.default);
        this.app.use(this.apiPaths.pathCooperador, cooperadores_route_1.default);
        this.app.use(this.apiPaths.pathCarteraVencida, carteraVencida_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
cronApp.iniciarCron();
exports.default = Server;
//# sourceMappingURL=server.js.map