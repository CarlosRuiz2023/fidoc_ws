import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import TipoVehiculo from "../models/tipoVehiculo.model";

const validarIdTipo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { id_tipo_vehiculo } = req.params;

    if (id_tipo_vehiculo === undefined) {
      id_tipo_vehiculo = req.body.id_tipo_vehiculo;
    }

    if (id_tipo_vehiculo === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el id_tipo_de_vehiculo",
      });
      return;
    }

    const tipo = await TipoVehiculo.findByPk(id_tipo_vehiculo);

    if (!tipo) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El id_tipo_de_vehiculo proporcionado no existe dentro de la base de datos",
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

const validarTipo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { tipo } = req.body;

    if (tipo === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el tipo dentro del cuerpo de la peticion",
      });
      return;
    }

    if (typeof tipo != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El tipo proporcionado debe ser de tipo string",
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

const validarTonelada = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { tonelada } = req.body;

    if (tonelada === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la tonelada dentro del cuerpo de la peticion",
      });
      return;
    }

    if (typeof tonelada != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La tonelada proporcionada debe ser de tipo number",
      });
      return;
    }

    if (tonelada<0 || tonelada >4250) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La tonelada proporcionada debe estar entre el rango de 0-4250 kg.",
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

const validarAltura = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { altura } = req.body;

    if (altura === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la altura dentro del cuerpo de la peticion",
      });
      return;
    }

    if (typeof altura != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La altura proporcionada debe ser de tipo number",
      });
      return;
    }

    if (altura<0 || altura >5000) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La altura proporcionada debe estar entre el rango de 0-5000 cm.",
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

const validarAncho = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { ancho } = req.body;

    if (ancho === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el ancho dentro del cuerpo de la peticion",
      });
      return;
    }

    if (typeof ancho != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El ancho proporcionado debe ser de tipo number",
      });
      return;
    }

    if (ancho<0 || ancho >5000) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El ancho proporcionado debe estar entre el rango de 0-5000 cm.",
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

const validarLargo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { largo } = req.body;

    if (largo === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el largo dentro del cuerpo de la peticion",
      });
      return;
    }

    if (typeof largo != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El largo proporcionado debe ser de tipo number",
      });
      return;
    }

    if (largo<0 || largo >30000) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El largo proporcionado debe estar entre el rango de 0-30000 cm.",
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

const validarPeligrosa = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { peligrosa } = req.body;

    if (peligrosa === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el atributo de peligrosa dentro del cuerpo de la peticion",
      });
      return;
    }

    if (peligrosa !== true && peligrosa !== false) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La peligrosa debe ser true o false",
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
  validarIdTipo,
  validarTipo,
  validarTonelada,
  validarAltura,
  validarAncho,
  validarLargo,
  validarPeligrosa
};
