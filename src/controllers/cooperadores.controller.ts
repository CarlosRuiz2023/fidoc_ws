import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { dbAccess } from "../db/connection";

/**
 * La función `obtenerCooperadores` recupera los cooperadores de la bd de Access
 */
const obtenerCooperadores = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cooperadores = await dbAccess.query('SELECT * FROM coops c1 INNER JOIN cooperador c2 on c1.coo_clv=c2.coo_clv ORDER BY c2.coo_venc1 DESC');

    res.status(200).json({
      success: true,
      result: { cooperadores },
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
 * La función `obtenerCooperador` recupera un cooperador de la bd de Access mediante su clave
 */
const obtenerCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coo_clv = req.params.coo_clv;
    const cooperador = await dbAccess.query(`SELECT * FROM coops c1 INNER JOIN cooperador c2 ON c1.coo_clv=c2.coo_clv WHERE c1.coo_clv = '${coo_clv}'`);

    res.status(200).json({
      success: true,
      result: { cooperador },
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
 * La función `agregarCooperador` registra una obra en la bd de Access
 */
const agregarCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num:coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = req.body;
    const query = `INSERT INTO coops (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_cp,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
      VALUES('${coo_clv}','${coo_pat}','${coo_mat}','${coo_nom}','${coo_nof}','${coo_call}','','${coo_col}','LEON DE LOS ALDAMA','GUANAJUATO','${coo_cp}','${coo_tel}','1','0','${coo_npag}','${coo_venc1}','${coo_clv.substring(0,coo_clv.length-3)}','${coo_mts}','0','${coo_clv.substring(coo_clv.length - 3)}','${coo_pred}','${coo_pat+" "+coo_mat+" "+coo_nom}','0','0','0','0','01/01/1900','01/01/1900','01/01/1900','01/01/1900','0','0','0','0','0','01/01/1900','0','0')`;
    console.log(query);
    try {
      await dbAccess.query(query);
    } catch (error) {
      
    }
    const cooperador = await dbAccess.query(`SELECT * FROM coops WHERE coo_clv = '${coo_clv}'`);

    if (cooperador == null) {
      res.status(400).json({
        success: false,
        result: "No se agrego el cooperador correctamente.",
        error: null,
      });
    }

    res.status(200).json({
      success: true,
      result: { cooperador },
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
  obtenerCooperadores,
  obtenerCooperador,
  agregarCooperador
};