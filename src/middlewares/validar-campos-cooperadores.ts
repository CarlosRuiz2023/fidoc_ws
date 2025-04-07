import { Request, Response, NextFunction } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { dbAccess } from "../db/connection";

const validarCoop_clv = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { coo_clv } = req.params;

    if (coo_clv === undefined) {
      coo_clv = req.body.coo_clv;
    }

    if (coo_clv === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la coo_clv",
      });
      return;
    }

    if (coo_clv.length < 10) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_clv debe de tener al menos 10 digitos",
      });
      return;
    }

    if (coo_clv.length > 13) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_clv debe de tener por mucho 13 digitos",
      });
      return;
    }

    if (coo_clv.length != 10) {
      if (coo_clv.length != 13) {
        res.status(400).json({
          success: false,
          result: null,
          error: "La coo_clv debe tener 10 o 13 digitos dependiendo del tipo de busqueda",
        });
        return;
      }
    }

    if (coo_clv.length == 10) {
      const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
      if (cooperador.length == 0) {
        res.status(400).json({
          success: false,
          result: null,
          error: "La coo_clv proporcionada no existe en la bd",
        });
        return;
      }
    }else{
      const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
      if (cooperador.length == 0) {
        res.status(400).json({
          success: false,
          result: null,
          error: "La coo_clv proporcionada no existe en la bd",
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

const validarCoop_clvNoExistente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    let { coo_clv } = req.params;

    if (coo_clv === undefined) {
      coo_clv = req.body.coo_clv;
    }

    if (coo_clv === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la coo_clv",
      });
      return;
    }

    if (coo_clv.length != 13) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_clv debe de tener 13 digitos",
      });
      return;
    }

    const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (cooperador.length != 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_clv proporcionado ya existe dentro de la base de datos",
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

const validarCoop_pat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_pat } = req.body;

    if (coo_pat === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_pat",
      });
      return;
    }

    if (typeof coo_pat != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_pat proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_pat.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_pat debe de ser menor a 51 caracteres",
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

const validarCoop_mat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_mat } = req.body;

    if (coo_mat === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_mat",
      });
      return;
    }

    if (typeof coo_mat != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_mat proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_mat.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_mat debe de ser menor a 4 caracteres",
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

const validarCoop_nom = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_nom } = req.body;

    if (coo_nom === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_nom",
      });
      return;
    }

    if (typeof coo_nom != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_nom proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_nom.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_nom debe de ser menor a 4 caracteres",
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

const validarCoop_num = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_num } = req.body;

    if (coo_num === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_num",
      });
      return;
    }

    if (typeof coo_num != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_num proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_num.length > 10) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_num debe de ser menor a 11 caracteres",
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

const validarCoop_call = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_call } = req.body;

    if (coo_call === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la coo_call",
      });
      return;
    }

    if (typeof coo_call != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_call proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_call.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_call debe de ser menor a 51 caracteres",
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

const validarCoop_col = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_col } = req.body;

    if (coo_col === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar la coo_col",
      });
      return;
    }

    if (typeof coo_col != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_col proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_col.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La coo_col debe de ser menor a 51 caracteres",
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

const validarCoop_cp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_cp } = req.body;

    if (coo_cp === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_cp",
      });
      return;
    }

    if (typeof coo_cp != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_cp proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_cp.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_cp debe de ser menor a 51 caracteres",
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

const validarCoop_tel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_tel } = req.body;

    if (coo_tel === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_tel",
      });
      return;
    }

    if (typeof coo_tel != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_tel proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_tel.length > 50) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_tel debe de ser menor a 51 caracteres",
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

const validarCoop_npag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_npag } = req.body;

    if (coo_npag === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_npag",
      });
      return;
    }

    if (typeof coo_npag != "number") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_npag proporcionado debe ser de tipo numerico",
      });
      return;
    }

    if (coo_npag <= 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_npag debe de ser un numero positivo mayor a 0",
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

const validarCoop_venc1 = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { coo_venc1 } = req.body;

    // Expresión regular para validar el formato DD/MM/YYYY
    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!coo_venc1 || !fechaRegex.test(coo_venc1)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El formato del coo_venc1 debe ser DD/MM/YYYY",
      });
      return;
    }

    // Validar si la fecha es real
    const [diaStr, mesStr, anioStr] = coo_venc1.split("/");
    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10) - 1; // En JS: enero = 0
    const anio = parseInt(anioStr, 10);

    const fecha = new Date(anio, mes, dia);

    if (
      fecha.getFullYear() !== anio ||
      fecha.getMonth() !== mes ||
      fecha.getDate() !== dia
    ) {
      res.status(400).json({
        success: false,
        result: null,
        error: "La fecha coo_venc1 no es una fecha válida.",
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

const validarCoop_mts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_mts } = req.body;

    if (coo_mts === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar los coo_mts",
      });
      return;
    }

    // Verifica que sea tipo número y no NaN
    if (typeof coo_mts !== "number" || isNaN(coo_mts)) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Los coo_mts proporcionado debe ser de tipo numérico",
      });
      return;
    }

    if (coo_mts <= 0) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Los coo_mts deben de ser un numero positivo mayor a 0",
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

const validarCoop_pred = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { coo_pred } = req.body;

    if (coo_pred === undefined) {
      res.status(400).json({
        success: false,
        result: null,
        error: "Falto proporcionar el coo_pred",
      });
      return;
    }

    if (typeof coo_pred != "string") {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_pred proporcionado debe ser de tipo string",
      });
      return;
    }

    if (coo_pred.length > 12) {
      res.status(400).json({
        success: false,
        result: null,
        error: "El coo_pred debe de ser menor a 13 caracteres",
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
  validarCoop_clv,
  validarCoop_clvNoExistente,
  validarCoop_pat,
  validarCoop_mat,
  validarCoop_nom,
  validarCoop_num,
  validarCoop_call,
  validarCoop_col,
  validarCoop_cp,
  validarCoop_tel,
  validarCoop_npag,
  validarCoop_venc1,
  validarCoop_mts,
  validarCoop_pred
};
