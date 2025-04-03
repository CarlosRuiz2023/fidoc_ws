import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import PuntoDeControl from "../models/puntoDeControl.model";
import Estado from "../models/estado.model";
import Municipio from "../models/municipio.model";

const validarIdPunto = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_punto_de_control } = req.params;

    if (id_punto_de_control === undefined) {
      id_punto_de_control = req.body.id_punto_de_control;
    }

    if (id_punto_de_control === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_punto_de_control",
      });
      return;
    }

    const punto = await PuntoDeControl.findByPk(id_punto_de_control);

    if (!punto) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_punto_de_control proporcionado no existe dentro de la base de datos",
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

const validarNombre = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { nombre } = req.body;

    if (nombre === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el nombre",
      });
      return;
    }

    if (typeof nombre != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El nombre proporcionado debe ser de tipo string",
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

const validarDiasActivo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { dias_activo } = req.body;

    if (dias_activo === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar los dias_activo en el cuerpo de la peticion",
      });
      return;
    }

    if (!Array.isArray(dias_activo)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Los dias_activo deben ser un arreglo",
      });
      return;
    }

    for (let index = 0; index < dias_activo.length; index++) {
      if (dias_activo[index] < 0 || dias_activo[index] > 6) {
        res.status(400).json({
          success: false,
          result: null,
          error: `El dias_activo ${dias_activo[index]} proporcionado dentro del arreglo no se encuentre entre el rango permitido 0-6`,
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

const validarHoras = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { hora_activacion, hora_desactivacion } = req.body;

    if (hora_activacion === undefined && hora_desactivacion === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la hora_activacion y la hora_desactivacion en el cuerpo de la peticion",
      });
      return;
    }

    if (hora_activacion === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la hora_activacion en el cuerpo de la peticion",
      });
      return;
    }

    if (hora_desactivacion === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "Falto proporcionar la hora_desactivacion en el cuerpo de la peticion",
      });
      return;
    }

    // Expresión regular para validar el formato HH:mm
    const horaRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

    if (!horaRegex.test(hora_activacion)) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "La hora_activacion no cumple el formato correcto debe ser HH:mm (24 horas)",
      });
      return;
    }

    if (!horaRegex.test(hora_desactivacion)) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "La hora_desactivacions no cumple el formato correcto debe ser HH:mm (24 horas)",
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

const validarIdEstado = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_estado } = req.params;

    if (id_estado === undefined) {
      id_estado = req.body.id_estado;
    }

    if (id_estado === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_estado",
      });
      return;
    }

    if (typeof Number(id_estado) != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_estado proporcionado debe ser de tipo number",
      });
      return;
    }

    const estado = await Estado.findByPk(id_estado);

    if (!estado) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_estado proporcionado no existe dentro de la base de datos",
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

const validarIdMunicipio = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_municipio } = req.params;

    if (id_municipio === undefined) {
      id_municipio = req.body.id_municipio;
    }

    if (id_municipio === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_municipio",
      });
      return;
    }

    if (typeof Number(id_municipio) != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_municipio proporcionado debe ser de tipo number",
      });
      return;
    }

    const municipio = await Municipio.findByPk(id_municipio);

    if (!municipio) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_municipio proporcionado no existe dentro de la base de datos",
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

export { validarIdPunto, validarNombre, validarDiasActivo, validarHoras, validarIdEstado, validarIdMunicipio };
