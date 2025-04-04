import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { dbAccess } from "../db/connection";

/**
 * La función `obtenerObras` recupera las obras de la bd de Access
 */
const obtenerObras = async (
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
 * La función `obtenerObra` recupera una obra de la bd de Access mediante su clave
 */
const obtenerObra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const obr_clv = req.params.obr_clv;
    const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    console.log(obra);

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
 * La función `agregarObra` registra una obra en la bd de Access
 */
const agregarObra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
    const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${obr_call}','${obr_col}',${obr_cost},'${obr_stat}','${obr_tramo}','${obr_fecha}','${obr_sis}','${col_nom}','${obr_programa}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
    console.log(query);
    try {
      await dbAccess.query(query);
    } catch (error) {

    }
    const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    if (obra == null) {
      res.status(400).json({
        success: false,
        result: "No se agrego la obra correctamente.",
        error: null,
      });
    }

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
 * La función `actualizarObra` actualiza una obra en la bd de Access
 */
const actualizarObra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
    try {
      await dbAccess.query(`UPDATE obra set obr_call='${obr_call}',obr_col='${obr_col}',obr_cost=${obr_cost},obr_stat='${obr_stat}',obr_tramo='${obr_tramo}',obr_fecha='${obr_fecha}',obr_sis='${obr_sis}',col_nom ='${col_nom}',obr_programa='${obr_programa}',obr_fecinip='${obr_fecinip}',obr_fecvenp='${obr_fecvenp}',obr_npago=${obr_npago},obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

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
 * La función `actualizarEstatusObra` actualiza el estatus de una obra dentro de la bd de Access
 */
const actualizarEstatusObra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv, obr_stat, obr_opergob } = req.body;
    try {
      await dbAccess.query(`UPDATE obra set obr_stat='${obr_stat}',obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

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
 * La función `eliminarObra` elimina una obra en la bd de Access
 */
const eliminarObra = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { obr_clv } = req.params;
    try {
      await dbAccess.query(`DELETE FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }
    const obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    if (obra.length === 0) {
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
  obtenerObras,
  obtenerObra,
  agregarObra,
  actualizarObra,
  actualizarEstatusObra,
  eliminarObra
};