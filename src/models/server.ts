const express = require("express");
const cors = require("cors");
const cronApp =require("../cron/cron");
import { Application } from "express";
import { conectarBDSQLServer, dbAccess, dbPostgres } from "../db/connection";
import obraRoutes from "../routes/obras.route";
import cooperadorRoutes from "../routes/cooperadores.route";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    pathObra: "/api/obra",
    pathCooperador: "/api/cooperador"
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    //Metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await dbPostgres.authenticate();
      console.log("Database Postgresql online");
    } catch (error) {
      throw new Error("" + error);
    }
    try {
      await dbAccess.query('SELECT 1+1 AS result')
        .then((data: any) => {
          console.log("Database Access online");
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      throw new Error("" + error);
    }
    conectarBDSQLServer();
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
    this.app.use(this.apiPaths.pathObra, obraRoutes);
    this.app.use(this.apiPaths.pathCooperador, cooperadorRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}
cronApp.iniciarCron();
export default Server;
