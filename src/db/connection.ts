import { Sequelize } from 'sequelize';
const ADODB = require('node-adodb');
const path = require('path');

const database = process.env.DATABASE || 'SmartRouteTruck';
const username = process.env.USER || 'postgres';
const password = process.env.PASSWORD || 'sqldevserver';
const host = process.env.PG_CONNECTION_STRING || 'itsmarts.fortiddns.com';
const pathAccess = process.env.PATH_ACCESS || '../../../../../../../Fidoc/obrasdb992007.accdb';
const passwordAccesss = process.env.PASSWORD_ACCESSS || 'LEONFIDOC';
// Ruta al archivo de la base de datos
const dbPath = path.join(__dirname, pathAccess);

const dbPostgres = new Sequelize({
  dialect: "postgres",
  host: host,
  port: 5432,
  database: database,
  username: username,
  password: password,
  /* dialectOptions: {
    ssl: true
  } */
});

// Conexión con el proveedor de 64 bits
const dbAccess = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Jet OLEDB:Database Password=${passwordAccesss};Data Source=${dbPath};Persist Security Info=False;`, true);

export {
  dbPostgres, dbAccess
};