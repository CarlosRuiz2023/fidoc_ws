import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { configSQLServer, dbAccess, sql } from "../db/connection";
import convertirFechaParaSQLServer from "../helpers/fechas";

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
    let obra = null;
    try {
      //await dbAccess.query(query);
      //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    } catch (error) {

    }

    const fechaObraSQL = convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_call', sql.VarChar, obr_call);
    request.input('obr_col', sql.VarChar, obr_col);
    request.input('obr_cost', sql.Float, parseFloat(obr_cost));
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_tramo', sql.VarChar, obr_tramo);
    request.input('obr_fecha', sql.DateTime, fechaObraSQL);
    request.input('obr_sis', sql.VarChar, obr_sis);
    request.input('col_nom', sql.VarChar, col_nom);
    request.input('obr_fecinip', sql.DateTime, fechaInicioSQL);
    request.input('obr_fecvenp', sql.DateTime, fechaVencimientoSQL);
    request.input('obr_npago', sql.VarChar, "" + obr_npago);
    request.input('obr_opergob', sql.VarChar, obr_opergob);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      INSERT INTO [dbo].[obra]
      ([obr_clv],[obr_call],[obr_col],[obr_mts],[obr_cost],[obr_stat],
      [obr_int],[obr_tramo],[obr_fecha],[obr_cost_total],[obr_inc],
      [obr_contab],[obr_sis],[col_nom],[obr_digito],[obr_programa],
      [obr_cuentac],[obr_digagr],[obr_fecinip],
      [obr_fecvenp],[obr_npago],[obr_numera],[obr_opergob])
      VALUES
      (@obr_clv, @obr_call, @obr_col, 0.0, @obr_cost, @obr_stat,
      '00:00:00.0000000', @obr_tramo, @obr_fecha, 0.0, 0.0,
      0, @obr_sis, @col_nom, 0, 0, '', 0, @obr_fecinip,
      @obr_fecvenp, @obr_npago, '', @obr_opergob)
    `);

    if (result.rowsAffected[0] > 0) {
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
      res.status(200).json({
        success: true,
        result: { obra: obra.recordset[0] },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se agrego la obra correctamente.",
        error: null,
      });
    }
    await sql.close();
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
    let obra = null;
    //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    const fechaObraSQL = convertirFechaParaSQLServer(obr_fecha); // '2025-04-03'
    const fechaInicioSQL = convertirFechaParaSQLServer(obr_fecinip); // '2025-04-03'
    const fechaVencimientoSQL = convertirFechaParaSQLServer(obr_fecvenp); // '2025-06-12'

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_call', sql.VarChar, obr_call);
    request.input('obr_col', sql.VarChar, obr_col);
    request.input('obr_cost', sql.Float, parseFloat(obr_cost));
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_tramo', sql.VarChar, obr_tramo);
    request.input('obr_fecha', sql.DateTime, fechaObraSQL);
    request.input('obr_sis', sql.VarChar, obr_sis);
    request.input('col_nom', sql.VarChar, col_nom);
    request.input('obr_fecinip', sql.DateTime, fechaInicioSQL);
    request.input('obr_fecvenp', sql.DateTime, fechaVencimientoSQL);
    request.input('obr_npago', sql.VarChar, "" + obr_npago);
    request.input('obr_opergob', sql.VarChar, obr_opergob);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_call] = @obr_call,
          [obr_col] = @obr_col,
          [obr_cost] = @obr_cost,
          [obr_stat] = @obr_stat,
          [obr_tramo] = @obr_tramo,
          [obr_fecha] = @obr_fecha,
          [obr_sis] = @obr_sis,
          [col_nom] = @col_nom,
          [obr_fecinip] = @obr_fecinip,
          [obr_fecvenp] = @obr_fecvenp,
          [obr_npago] = @obr_npago,
          [obr_opergob] = @obr_opergob
      WHERE [obr_clv] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
      res.status(200).json({
        success: true,
        result: { obra: obra.recordset[0] },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo la obra correctamente.",
        error: null,
      });
    }
    await sql.close();
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
    let obra = null;

    //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_stat', sql.VarChar, obr_stat);
    request.input('obr_opergob', sql.VarChar, obr_opergob);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_stat] = @obr_stat,
          [obr_opergob] = @obr_opergob
      WHERE [obr_clv] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {
      if (obr_stat == '8') {
        // Crear request con parámetros
        const request = new sql.Request();
        request.input('OBRA', sql.VarChar, obr_clv);
        // Ejecutar consulta con parámetros
        await request.query(`
          UPDATE [dbo].[CARPETA_VENCIDA]
          SET [SALDOSIN] = 0.0,
              [SALDOCON] = 0.0
          WHERE [OBRA] = @OBRA
        `);
      }
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('obr_clv', sql.VarChar, obr_clv);

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
      res.status(200).json({
        success: true,
        result: { obra: obra.recordset[0] },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo el estatus de la obra correctamente.",
        error: null,
      });
    }
    await sql.close();
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
 * La función `actualizarCostoObra` actualiza el incremento de una obra dentro de la bd de
 */
const actualizarCostoObra = async (
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

    //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);
    request.input('obr_inc', sql.Float, obr_inc);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[obra]
      SET [obr_inc] = @obr_inc
      WHERE [obr_clv] = @obr_clv
    `);

    const result2 = await request.query(`
    UPDATE [dbo].[cooperador]
      SET [coo_inc] = @obr_inc
    WHERE [coo_obr] = @obr_clv
    `);

    const result3 = await request.query(`
    UPDATE [dbo].[CARTERA_VENCIDA]
      SET [INCREMENTO_OBRA] = @obr_inc,
          [COO_INC] = @obr_inc,
          [SALDOSIN] = [SALDOSIN] - [INCREMENTO_OBRA] + @obr_inc,
          [SALDOCON] = [SALDOCON] - [INCREMENTO_OBRA] + @obr_inc
    WHERE [OBRA] = @obr_clv
    `);

    if (result.rowsAffected[0] > 0) {

      // Ejecutar consulta con parámetros
      obra = await request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
      res.status(200).json({
        success: true,
        result: { obra: obra.recordset[0] },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo el costo de la obra correctamente.",
        error: null,
      });
    }
    await sql.close();
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
    let obra = null;
    //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('obr_clv', sql.VarChar, obr_clv);

    // Ejecutar consulta con parámetros
    const result = await request.query(`DELETE FROM [dbo].[obra] WHERE [obr_clv] = @obr_clv`);

    if (result.rowsAffected[0] > 0) {
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
    await sql.close();
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
  actualizarCostoObra,
  eliminarObra
};