"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var server_1 = require("./models/server");
//Configurar dot.env
(0, dotenv_1.config)();
var server = new server_1.default();
server.listen();
