import { Sequelize } from 'sequelize';
const ADODB = require('node-adodb');
const path = require('path');
import dotenv from 'dotenv';
dotenv.config();

const pathAccess = process.env.PATH_ACCESS || '../../../../../../../Fidoc/obrasdb992007.accdb';
// Ruta al archivo de la base de datos
const dbPath = path.join(__dirname, pathAccess);

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

/* const dbSQLServer = new Sequelize('pfidoc', 'usr_fidoc_qa', '&8stl52u*hLp', {
  host: '192.1.1.24',
  dialect: 'mssql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    },
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
}); */

// Conexión con el proveedor de 64 bits
const dbAccess = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${process.env.PASSWORD_ACCESSS || 'LEONFIDOC'};Data Source=${dbPath};Persist Security Info=False;`, true);

export {
  dbPostgres, dbAccess, //dbSQLServer
};