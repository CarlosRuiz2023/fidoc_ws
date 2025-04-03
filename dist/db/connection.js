"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database = process.env.DATABASE || 'SmartRouteTruck';
var username = process.env.USER || 'postgres';
var password = process.env.PASSWORD || 'sqldevserver';
var host = process.env.PG_CONNECTION_STRING || 'itsmarts.fortiddns.com';
var db = new sequelize_1.Sequelize({
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
exports.default = db;
