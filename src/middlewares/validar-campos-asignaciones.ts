import { Request, Response, NextFunction } from "express";
import Ruta from "../models/ruta.model";
import Usuario from "../models/usuario.model";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import Asignacion from "../models/asignacion.model";

const validarIdRuta = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_ruta } = req.params;

    if (id_ruta === undefined) {
      id_ruta = req.body.id_ruta;
    }

    if (id_ruta === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_ruta",
      });
      return;
    }

    const ruta = await Ruta.findByPk(id_ruta);

    if (!ruta) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_ruta proporcionado no existe dentro de la base de datos",
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

const validarIdUsuario = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_usuario } = req.params;

    if (id_usuario === undefined) {
      id_usuario = req.body.id_usuario;
    }

    if (id_usuario === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_usuario",
      });
      return;
    }

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_usuario proporcionado no existe dentro de la base de datos",
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

const validarIdAsignacion = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_asignacion } = req.params;

    if (id_asignacion === undefined) {
      id_asignacion = req.body.id_asignacion;
    }

    if (id_asignacion === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_asignacion",
      });
      return;
    }

    const asignacion = await Asignacion.findByPk(id_asignacion);

    if (!asignacion) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El id_asignacion proporcionado no existe dentro de la base de datos",
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

const validarEstatusAsignacion = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { estatus } = req.body;

    if (estatus === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el estatus en el cuerpo de la peticion",
      });
      return;
    }

    if (estatus < 0 || estatus > 3) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El estatus proporcionado para una Asignacion solo puede estar en el rango de 0-3",
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

const validarEstatusNullAsignacion = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let { estatus = 1 } = req.body;

    if (estatus < 0 || estatus > 3) {
      res.status(400).json({
        success: false,
        result: null,
        error:
          "El estatus proporcionado para una Asignacion solo puede estar en el rango de 0-3",
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

const validarRangoFechas = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { fecha_inicio = "2024-01-01", fecha_fin = new Date() } = req.body;

    // Expresión regular para validar el formato YYYY-MM-DD
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!fechaRegex.test(fecha_inicio) || !fechaRegex.test(fecha_fin)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El formato de las fechas debe ser YYYY-MM-DD",
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

const validarDisponibilidad = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { disponibilidad } = req.params;

    if (disponibilidad !== "true" && disponibilidad !== "false") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La disponibilidad debe ser true o false",
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
  validarIdRuta,
  validarIdUsuario,
  validarEstatusAsignacion,
  validarIdAsignacion,
  validarEstatusNullAsignacion,
  validarRangoFechas,
  validarDisponibilidad,
};
