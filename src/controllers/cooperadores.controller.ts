import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { dbAccess } from "../db/connection";

/**
 * La función `obtenerCooperador` recupera un cooperador de la bd de Access mediante su clave
 */
const obtenerCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const coo_clv = req.params.coo_clv;
    let cooperador = null
    if(coo_clv.length==13){
      cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    }else{
      cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
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
 * La función `agregarCooperador` registra una obra en la bd de Access
 */
const agregarCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num:coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = req.body;
    const query = `INSERT INTO cooperador (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_cp,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
      VALUES('${coo_clv}','${coo_pat}','${coo_mat}','${coo_nom}','${coo_nof}','${coo_call}','','${coo_col}','LEON DE LOS ALDAMA','GUA','${coo_cp}','${coo_tel}','1',0.0,${coo_npag},'${coo_venc1}','${coo_clv.substring(0,coo_clv.length-3)}',${coo_mts},0.0,'${coo_clv.substring(coo_clv.length - 3)}','${coo_pred}','${coo_pat+" "+coo_mat+" "+coo_nom}',0.0,0.0,0.0,0.0,'01/01/1900','01/01/1900','01/01/1900','01/01/1900',False,'0','0','0','0','01/01/1900',0,False)`;
    try {
      await dbAccess.query(query);
    } catch (error) {
      
    }
    const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);

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
 * La función `actualizarCooperador` actualiza un cooperador en la bd de Access
 */
const actualizarCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = req.body;
    try {
      await dbAccess.query(`UPDATE cooperador SET coo_pat='${coo_pat}',coo_mat='${coo_mat}',coo_nom='${coo_nom}',coo_nof='${coo_nof}',coo_call='${coo_call}',coo_num='${coo_num}',coo_col='${coo_col}',coo_cp ='${coo_cp}',coo_tel='${coo_tel}',coo_npag=${coo_npag},coo_venc1='${coo_venc1}',coo_mts=${coo_mts},coo_pred='${coo_pred}' WHERE coo_clv = '${coo_clv}'`);
    } catch (error) {

    }

    const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);

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
 * La función `eliminarCooperador` elimina un cooperador en la bd de Access
 */
const eliminarCooperador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { coo_clv } = req.params;
    try {
      await dbAccess.query(`DELETE FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    } catch (error) {

    }
    const cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
    if (cooperador.length === 0) {
      res.status(200).json({
        success: true,
        result: "Cooperador eliminado con exito.",
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se elimino el cooperador correctamente.",
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
  obtenerCooperador,
  agregarCooperador,
  actualizarCooperador,
  eliminarCooperador
};