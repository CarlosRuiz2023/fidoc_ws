import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { dbAccess } from "../db/connection";
const tedious = require('tedious');

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
    let obra = null;
    try {
      await dbAccess.query(query);
      obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

    /* const sql = `
  INSERT INTO obra (obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_int, obr_tramo, obr_fecha, obr_sis, col_nom,obr_digito, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob, obr_cuentac, obr_digagr)
  VALUES (@obr_clv, @obr_call, @obr_col, @obr_cost, @obr_stat,'00:00:00.0000000', @obr_tramo, @obr_fecha, @obr_sis, @col_nom, 0,@obr_programa, @obr_fecinip, @obr_fecvenp, @obr_npago, @obr_opergob, '',0)
`;

    const request = new tedious.Request(sql, (err:any, rowCount:any) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ success: false, result: null, error: err.message });
      } else {
        console.log(`${rowCount} row(s) inserted`);
        res.status(200).json({ success: true, result: { rowCount }, error: null });
      }
    });

    request.addParameter('obr_clv', tedious.TYPES.VarChar, obr_clv);
    request.addParameter('obr_call', tedious.TYPES.VarChar, obr_call);
    request.addParameter('obr_col', tedious.TYPES.VarChar, obr_col);
    request.addParameter('obr_cost', tedious.TYPES.Decimal, obr_cost);
    request.addParameter('obr_stat', tedious.TYPES.VarChar, obr_stat);
    request.addParameter('obr_tramo', tedious.TYPES.VarChar, obr_tramo);
    request.addParameter('obr_fecha', tedious.TYPES.Date, obr_fecha);
    request.addParameter('obr_sis', tedious.TYPES.VarChar, obr_sis);
    request.addParameter('col_nom', tedious.TYPES.VarChar, col_nom);
    request.addParameter('obr_programa', tedious.TYPES.VarChar, obr_programa);
    request.addParameter('obr_fecinip', tedious.TYPES.Date, obr_fecinip);
    request.addParameter('obr_fecvenp', tedious.TYPES.Date, obr_fecvenp);
    request.addParameter('obr_npago', tedious.TYPES.Int, obr_npago);
    request.addParameter('obr_opergob', tedious.TYPES.VarChar, obr_opergob);
    console.log(request);

    dbSqlServer.execSql(request); */
    //const obra = await dbSqlServer.execSql("select * from obra where obr_clv = '"+obr_clv+"'");
    //obra = 1;

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