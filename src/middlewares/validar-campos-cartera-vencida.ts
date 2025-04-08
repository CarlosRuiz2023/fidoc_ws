import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { configSQLServer, sql } from "../db/connection";

const validarCV_saldosin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { saldosin } = req.body;

    if (saldosin === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el saldosin",
      });
      return;
    }

    if (typeof saldosin != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El saldosin proporcionado debe ser de tipo numerico",
      });
      return;
    }

    if (saldosin < 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El saldosin debe de ser un numero positivo mayor o igual a 0",
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

const validarCV_saldocon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { saldocon } = req.body;

    if (saldocon === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el saldocon",
      });
      return;
    }

    if (typeof saldocon != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El saldocon proporcionado debe ser de tipo numerico",
      });
      return;
    }

    if (saldocon < 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El saldocon debe de ser un numero positivo mayor o igual a 0",
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

const validarCV_incremento = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { incremento } = req.body;

    if (incremento === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el incremento de la obra",
      });
      return;
    }

    if (typeof incremento != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El incremento de la obra proporcionado debe ser de tipo numerico",
      });
      return;
    }

    if (incremento < 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El incremento de la obra debe de ser un numero positivo mayor o igual a 0",
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

const validarCV_pred = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { cta_predial } = req.body;

    if (cta_predial === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la cta_predial",
      });
      return;
    }

    if (typeof cta_predial != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La cta_predial proporcionada debe ser de tipo string",
      });
      return;
    }

    if (cta_predial.length > 12) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La cta_predial debe de ser menor a 13 caracteres",
      });
      return;
    }

    // Conectar a la base de datos
    await sql.connect(configSQLServer);
    // Crear request con parámetros
    const request = new sql.Request();
    request.input('CTA_PREDIAL', sql.VarChar, cta_predial);
    // Ejecutar consulta con parámetros
    const predial = await request.query(`SELECT * FROM [dbo].[CARTERA_VENCIDA] WHERE [CTA_PREDIAL] = @CTA_PREDIAL`)
    if(predial.recordset.length == 0){
      res.status(400).json({
        success: false,
        result: null,
        error: "La cta_predial no se encuentra registrada en pFidoc",
      });
      return;
    }
    await sql.close();

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
  validarCV_saldosin,
  validarCV_saldocon,
  validarCV_incremento,
  validarCV_pred
};
