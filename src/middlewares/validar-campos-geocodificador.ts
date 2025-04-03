import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import Zona from "../models/zona.model";
import PuntoDeControl from "../models/puntoDeControl.model";

const validarDireccion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { direccion } = req.body;

    if (direccion === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la direccion en el cuerpo de la peticion",
      });
      return;
    }

    if (typeof direccion != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La direcccion proporcionado debe ser de tipo string",
      });
      return;
    }

    next();
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

const validarCoordenadas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { latitud, longitud } = req.body;

    if (latitud === undefined && longitud === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud y la longitud en el cuerpo de la peticion",
      });
      return;
    }

    if (latitud === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la latitud en el cuerpo de la peticion",
      });
      return;
    }

    if (longitud === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la longitud en el cuerpo de la peticion",
      });
      return;
    }

    if (typeof latitud != "number" || !latitud.toString().includes(".")) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La latitud proporcionado debe ser de tipo decimal",
      });
      return;
    }

    if (typeof longitud != "number" || !longitud.toString().includes(".")) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La longitud proporcionado debe ser de tipo decimal",
      });
      return;
    }

    next();
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

const validarCoordenadasInicioFin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { latitud_inicio, longitud_inicio, latitud_fin, longitud_fin } =
      req.body;

    if (latitud_inicio === undefined && longitud_inicio === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud_inicio y la longitud_inicio en el cuerpo de la peticion",
      });
      return;
    }

    if (latitud_inicio === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud_inicio en el cuerpo de la peticion",
      });
      return;
    }

    if (longitud_inicio === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la longitud_inicio en el cuerpo de la peticion",
      });
      return;
    }

    if (
      typeof latitud_inicio != "number" ||
      !latitud_inicio.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La latitud_inicio proporcionada debe ser de tipo decimal",
      });
      return;
    }

    if (
      typeof longitud_inicio != "number" ||
      !longitud_inicio.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La longitud_inicio proporcionado debe ser de tipo decimal",
      });
      return;
    }

    if (latitud_fin === undefined && longitud_fin === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud_fin y la longitud_fin en el cuerpo de la peticion",
      });
      return;
    }

    if (latitud_fin === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la latitud_fin en el cuerpo de la peticion",
      });
      return;
    }

    if (longitud_fin === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la longitud_fin en el cuerpo de la peticion",
      });
      return;
    }

    if (
      typeof latitud_fin != "number" ||
      !latitud_fin.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La latitud_fin proporcionada debe ser de tipo decimal",
      });
      return;
    }

    if (
      typeof longitud_fin != "number" ||
      !longitud_fin.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La longitud_fin proporcionado debe ser de tipo decimal",
      });
      return;
    }

    next();
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

const validarZonasPuntos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { zonas = [], puntos = [] } = req.body;

    if (!Array.isArray(zonas)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Las zonas deben ser un arreglo",
      });
      return;
    }

    for (let index = 0; index < zonas.length; index++) {
      const zona = await Zona.findByPk(zonas[index]);

      if (!zona) {
        res.status(400).json({
          success: false,
          result: null,
          error: `El id_zona ${zonas[index]} proporcionado dentro del arreglo no existe dentro de la base de datos`,
        });
        return;
      }
    }

    if (!Array.isArray(puntos)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Los puntos deben ser un arreglo",
      });
      return;
    }

    for (let index = 0; index < puntos.length; index++) {
      const punto = await PuntoDeControl.findByPk(puntos[index]);

      if (!punto) {
        res.status(400).json({
          success: false,
          result: null,
          error: `El id_punto_de_control ${puntos[index]} proporcionado dentro del arreglo no existe dentro de la base de datos`,
        });
        return;
      }
    }

    next();
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

export {
  validarDireccion,
  validarCoordenadas,
  validarCoordenadasInicioFin,
  validarZonasPuntos
};
