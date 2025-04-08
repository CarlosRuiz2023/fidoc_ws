import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const ADODB = require('node-adodb');
const path = require('path');
const sql = require('mssql');

dotenv.config();

const pathAccess = process.env.PATH_ACCESS || 'C:/Fidoc/obrasdb992007.accdb';
// Ruta al archivo de la base de datos
const dbPath = path.join(pathAccess);

const dbPostgres = new Sequelize({
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

async function conectarBDSQLServer() {
  try {
    // Establecer la conexión
    await sql.connect(configSQLServer);
    console.log("Database SQL Server online");
    // Cerrar la conexión
    await sql.close();
  } catch (err) {
    console.error('Error de conexión:', err);
    // Asegúrate de cerrar la conexión en caso de error
    await sql.close();
  }
}


// Conexión con el proveedor de 64 bits
const dbAccess = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${process.env.PASSWORD_ACCESSS || 'LEONFIDOC'};Data Source=${dbPath};Persist Security Info=False;`, true);

export {
  dbPostgres, dbAccess, sql, conectarBDSQLServer, configSQLServer
};