const express = require("express");
const cors = require ("cors");
import { Application } from "express";
import {dbAccess, dbPostgres} from "../db/connection";
//import geocodificadorRoutes from "../routes/geocodificador.router";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    //pathGeocodificador: "/api/geocodificar",
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
      .then((data :any)=> {
        console.log("Database Access online");
      })
      .catch((error:any) => {
        console.error(error);
      });      
    } catch (error) {
      throw new Error("" + error);
    }
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
    //this.app.use(this.apiPaths.pathGeocodificador, geocodificadorRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}
export default Server;
