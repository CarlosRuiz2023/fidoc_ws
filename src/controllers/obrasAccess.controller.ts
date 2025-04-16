import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { configSQLServer, dbAccess, sql } from "../db/connection";

/**
 * La función `obtenerObrasAccess` recupera las obras de la bd de Access
 */
const obtenerObrasAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const obras = await dbAccess.query('SELECT * FROM obra ORDER BY obr_fecha DESC');
    res.status(200).json({
      success: true,
      result: { obras },
      error: null,
    });
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `obtenerObraAccess` recupera una obra de la bd de Access mediante su clave
 */
const obtenerObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const obr_clv = req.params.obr_clv;
    const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    res.status(200).json({
      success: true,
      result: { obra },
      error: null,
    });
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `agregarObraAccess` registra una obra en la bd de Access
 */
const agregarObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
    const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${obr_call}','${obr_col}',${obr_cost},'${obr_stat}','${obr_tramo}','${obr_fecha}','${obr_sis}','${col_nom}','${obr_programa}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
    let obra = null;
    try {
      await dbAccess.query(query);
      obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

    if (obra!=null) {
      res.status(200).json({
        success: true,
        result: { obra },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se agrego la obra correctamente en Access",
        error: null,
      });
    }
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `actualizarObraAccess` actualiza una obra en la bd de Access
 */
const actualizarObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
    try {
      await dbAccess.query(`UPDATE obra set obr_call='${obr_call}',obr_col='${obr_col}',obr_cost=${obr_cost},obr_stat='${obr_stat}',obr_tramo='${obr_tramo}',obr_fecha='${obr_fecha}',obr_sis='${obr_sis}',col_nom ='${col_nom}',obr_programa='${obr_programa}',obr_fecinip='${obr_fecinip}',obr_fecvenp='${obr_fecvenp}',obr_npago=${obr_npago},obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }
    let obra = null;
    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`); 

    if (obra!=null) {
      res.status(200).json({
        success: true,
        result: { obra },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo la obra correctamente.",
        error: null,
      });
    }
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `actualizarEstatusObraAccess` actualiza el estatus de una obra dentro de la bd de Access
 */
const actualizarEstatusObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_stat, obr_opergob } = req.body;
    try {
      await dbAccess.query(`UPDATE obra set obr_stat='${obr_stat}',obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }
    let obra = null;

    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    if (obra!=null) {
      res.status(200).json({
        success: true,
        result: { obra },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo el estatus de la obra correctamente.",
        error: null,
      });
    }
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `actualizarCostoObraAccess` actualiza el incremento de una obra dentro de la bd de
 */
const actualizarCostoObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_inc } = req.body;
    try {
      await dbAccess.query(`UPDATE obra set obr_inc=${obr_inc} WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {}
    try {
      await dbAccess.query(`UPDATE cooperador set coo_inc=${obr_inc} WHERE coo_obr = '${obr_clv}'`)
    } catch (error) {}
    let obra = null;

    obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    if (obra!=null) {
      res.status(200).json({
        success: true,
        result: { obra },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo el costo de la obra correctamente.",
        error: null,
      });
    }
  } catch (error: any) {
    escribirErrorEnLog(error.message);
    res.status(500).json({
      success: false,
      result: null,
      error: error.message,
    });
  }
};

/**
 * La función `eliminarObraAccess` elimina una obra en la bd de Access
 */
const eliminarObraAccess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv } = req.params;
    let obra = null;
    try {
      await dbAccess.query(`DELETE FROM obra WHERE obr_clv = '${obr_clv}'`);
      obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

    if (obra == null) {
      res.status(200).json({
        success: true,
        result: "Obra eliminada con exito.",
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se elimino la obra correctamente.",
        error: null,
      });
    }
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
  obtenerObrasAccess,
  obtenerObraAccess,
  agregarObraAccess,
  actualizarObraAccess,
  actualizarEstatusObraAccess,
  actualizarCostoObraAccess,
  eliminarObraAccess
};