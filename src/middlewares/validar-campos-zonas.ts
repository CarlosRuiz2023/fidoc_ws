import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import Zona from "../models/zona.model";

const validarIdZona = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_zona } = req.params;

    if (id_zona === undefined) {
      id_zona = req.body.id_zona;
    }

    if (id_zona === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_zona",
      });
      return;
    }

    const zona = await Zona.findByPk(id_zona);

    if (!zona) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_zona proporcionado no existe dentro de la base de datos",
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
const validarCoordenadasCentro = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { latitud_centro, longitud_centro } = req.body;

    if (latitud_centro === undefined && longitud_centro === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud_centro y la longitud_centro en el cuerpo de la peticion",
      });
      return;
    }

    if (latitud_centro === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la latitud_centro en el cuerpo de la peticion",
      });
      return;
    }

    if (longitud_centro === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la longitud_centro en el cuerpo de la peticion",
      });
      return;
    }

    if (
      typeof latitud_centro != "number" ||
      !latitud_centro.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La latitud_centro proporcionado debe ser de tipo decimal",
      });
      return;
    }

    if (
      typeof longitud_centro != "number" ||
      !longitud_centro.toString().includes(".")
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La longitud_centro proporcionado debe ser de tipo decimal",
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

const validarVertices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vertices } = req.body;

    if (vertices === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar los vertices de la zona dentro del cuerpo de la peticion",
      });
      return;
    }
    if (!Array.isArray(vertices)) {
      res.status(400).json({
        success: false,
        error: "Los vértices deben ser un arreglo",
      });
      return;
    }

    for (const vertice of vertices) {
      if (
        !Array.isArray(vertice) ||
        vertice.length !== 2 ||
        (typeof vertice[0] !== "number" || !vertice[0].toString().includes(".")) || 
        (typeof vertice[1] !== "number" || !vertice[1].toString().includes("."))
      ) {
        res.status(400).json({
          success: false,
          error:
            "Formato de vértice inválido. Cada vértice debe ser un arreglo de dos números decimales (latitud, longitud)",
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

export { validarIdZona, validarCoordenadasCentro, validarVertices };
