import { Request, Response, NextFunction } from "express";
import Usuario from "../models/usuario.model";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import Ruta from "../models/ruta.model";

const validarIdUsuarioCreador = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_usuario_creador } = req.body;

    if (id_usuario_creador === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_usuario_creador",
      });
      return;
    }

    if (typeof id_usuario_creador != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_usuario_creador proporcionado debe ser de tipo number",
      });
      return;
    }

    const usuario = await Usuario.findByPk(id_usuario_creador);

    if (!usuario) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_usuario_creador proporcionado no existe dentro de la base de datos",
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

const validarIdUsuarioEditor = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_usuario_editor } = req.body;

    if (id_usuario_editor === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_usuario_editor",
      });
      return;
    }

    if (typeof id_usuario_editor != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_usuario_editor proporcionado debe ser de tipo number",
      });
      return;
    }

    const usuario = await Usuario.findByPk(id_usuario_editor);

    if (!usuario) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_usuario_editor proporcionado no existe dentro de la base de datos",
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

const validarIdRutaPrevia = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_ruta_previa=1 } = req.body;

    if (typeof id_ruta_previa != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_ruta_previa proporcionado debe ser de tipo number",
      });
      return;
    }

    const ruta = await Ruta.findByPk(id_ruta_previa);

    if (!ruta) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_ruta_previa proporcionada no existe dentro de la base de datos",
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

export {
  validarIdUsuarioCreador,
  validarIdUsuarioEditor,
  validarIdRutaPrevia
};
