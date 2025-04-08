import { Request, Response } from "express";
import { escribirErrorEnLog } from "../helpers/generarArchivoLog";
import { configSQLServer, sql } from "../db/connection";

/**
 * La función `actualizarCarteraVencida` actualiza los saldos de una cuenta predial.
 */
const actualizarCarteraVencida = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { saldosin, saldocon, incremento, cta_predial } = req.body;

    // Conectar a la base de datos
    await sql.connect(configSQLServer);

    // Crear request con parámetros
    const request = new sql.Request();
    request.input('SALDOSIN', sql.Float, parseFloat(saldosin));
    request.input('SALDOCON', sql.Float, parseFloat(saldocon));
    request.input('INCREMENTO_OBRA', sql.Float, parseFloat(incremento));
    request.input('CTA_PREDIAL', sql.VarChar, cta_predial);

    // Ejecutar consulta con parámetros
    const result = await request.query(`
      UPDATE [dbo].[CARTERA_VENCIDA]
        SET [SALDOSIN] = @SALDOSIN + @INCREMENTO_OBRA,
            [SALDOCON] = @SALDOCON + @INCREMENTO_OBRA,
            [INCREMENTO_OBRA] = @INCREMENTO_OBRA
        WHERE [CTA_PREDIAL] = @CTA_PREDIAL
    `);

    if (result.rowsAffected[0] > 0) {
      // Ejecutar consulta con parámetros
      const cartera_vencida = await request.query(`SELECT * FROM [pFidoc].[dbo].[CARTERA_VENCIDA] WHERE [CTA_PREDIAL] = @CTA_PREDIAL`);
      res.status(200).json({
        success: true,
        result: { cartera_vencida: cartera_vencida.recordset[0] },
        error: null,
      });
    } else {
      res.status(400).json({
        success: false,
        result: "No se actualizo la cartera vencida correctamente.",
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
  actualizarCarteraVencida
};