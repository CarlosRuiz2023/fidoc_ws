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
exports.configSQLServer = exports.sql = exports.dbAccess = exports.dbPostgres = void 0;
exports.conectarBDSQLServer = conectarBDSQLServer;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const ADODB = require('node-adodb');
const path = require('path');
const sql = require('mssql');
exports.sql = sql;
dotenv_1.default.config();
const pathAccess = process.env.PATH_ACCESS || 'C:/Fidoc/obrasdb992007.accdb';
// Ruta al archivo de la base de datos
const dbPath = path.join(pathAccess);
const dbPostgres = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: process.env.POSTGRESQL_HOST || '172.17.15.21',
    port: Number(process.env.POSTGRESQL_PORT) || 5432,
    database: process.env.POSTGRESQL_DB || 'gisfidoc',
    username: process.env.POSTGRESQL_USER || 'usrfidoc',
    password: process.env.POSTGRESQL_PASSWORD || 'Z8XacQ@eb-nA',
    /* dialectOptions: {
      ssl: true
    } */
});
exports.dbPostgres = dbPostgres;
// Configuración de la conexión
const configSQLServer = {
    user: process.env.SQLSERVER_USER || 'usr_fidoc_qa',
    password: process.env.SQLSERVER_PASSWORD || '&8stl52u*hLp',
    server: process.env.SQLSERVER_HOST || '192.1.1.24', // Puede ser localhost o una dirección IP
    database: process.env.SQLSERVER_DB || 'pfidoc',
    options: {
        encrypt: false, // Para conexiones Azure
        trustServerCertificate: true // Cambiar a false en producción
    }
};
exports.configSQLServer = configSQLServer;
function conectarBDSQLServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Establecer la conexión
            yield sql.connect(configSQLServer);
            console.log("Database SQL Server online");
            // Cerrar la conexión
            yield sql.close();
        }
        catch (err) {
            console.error('Error de conexión:', err);
            // Asegúrate de cerrar la conexión en caso de error
            yield sql.close();
        }
    });
}
// Conexión con el proveedor de 64 bits
const dbAccess = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${process.env.PASSWORD_ACCESSS || 'LEONFIDOC'};Data Source=${dbPath};Persist Security Info=False;`, true);
exports.dbAccess = dbAccess;
//# sourceMappingURL=connection.js.map