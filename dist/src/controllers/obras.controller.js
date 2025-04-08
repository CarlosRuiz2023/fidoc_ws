"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarObra = exports.actualizarCostoObra = exports.actualizarEstatusObra = exports.actualizarObra = exports.agregarObra = exports.obtenerObra = exports.obtenerObras = void 0;
const generarArchivoLog_1 = require("../helpers/generarArchivoLog");
const connection_1 = require("../db/connection");
const fechas_1 = __importDefault(require("../helpers/fechas"));
/**
 * La función `obtenerObras` recupera las obras de la bd de Access
 */
const obtenerObras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obras = yield connection_1.dbAccess.query('SELECT * FROM obra ORDER BY obr_fecha DESC');
        res.status(200).json({
            success: true,
            result: { obras },
            error: null,
        });
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.obtenerObras = obtenerObras;
/**
 * La función `obtenerObra` recupera una obra de la bd de Access mediante su clave
 */
const obtenerObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obr_clv = req.params.obr_clv;
        const obra = yield connection_1.dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        res.status(200).json({
            success: true,
            result: { obra },
            error: null,
        });
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.obtenerObra = obtenerObra;
/**
 * La función `agregarObra` registra una obra en la bd de Access
 */
const agregarObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
        const query = `INSERT INTO obra (obr_clv,obr_call,obr_col,obr_cost,obr_stat,obr_tramo,obr_fecha,obr_sis,col_nom,obr_programa,obr_fecinip,obr_fecvenp,obr_npago,obr_opergob,obr_cuentac,obr_digagr) VALUES('${obr_clv}','${obr_call}','${obr_col}',${obr_cost},'${obr_stat}','${obr_tramo}','${obr_fecha}','${obr_sis}','${col_nom}','${obr_programa}','${obr_fecinip}','${obr_fecvenp}',${obr_npago},'${obr_opergob}','','')`;
        let obra = null;
        try {
            //await dbAccess.query(query);
            //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        }
        catch (error) {
        }
        const fechaObraSQL = (0, fechas_1.default)(obr_fecha); // '2025-04-03'
        const fechaInicioSQL = (0, fechas_1.default)(obr_fecinip); // '2025-04-03'
        const fechaVencimientoSQL = (0, fechas_1.default)(obr_fecvenp); // '2025-06-12'
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
        request.input('obr_call', connection_1.sql.VarChar, obr_call);
        request.input('obr_col', connection_1.sql.VarChar, obr_col);
        request.input('obr_cost', connection_1.sql.Float, parseFloat(obr_cost));
        request.input('obr_stat', connection_1.sql.VarChar, obr_stat);
        request.input('obr_tramo', connection_1.sql.VarChar, obr_tramo);
        request.input('obr_fecha', connection_1.sql.DateTime, fechaObraSQL);
        request.input('obr_sis', connection_1.sql.VarChar, obr_sis);
        request.input('col_nom', connection_1.sql.VarChar, col_nom);
        request.input('obr_fecinip', connection_1.sql.DateTime, fechaInicioSQL);
        request.input('obr_fecvenp', connection_1.sql.DateTime, fechaVencimientoSQL);
        request.input('obr_npago', connection_1.sql.VarChar, "" + obr_npago);
        request.input('obr_opergob', connection_1.sql.VarChar, obr_opergob);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
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
            const request = new connection_1.sql.Request();
            request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
            // Ejecutar consulta con parámetros
            obra = yield request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
            res.status(200).json({
                success: true,
                result: { obra: obra.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se agrego la obra correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.agregarObra = agregarObra;
/**
 * La función `actualizarObra` actualiza una obra en la bd de Access
 */
const actualizarObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obr_clv, obr_call, obr_col, obr_cost, obr_stat, obr_tramo, obr_fecha, obr_sis, col_nom, obr_programa, obr_fecinip, obr_fecvenp, obr_npago, obr_opergob } = req.body;
        try {
            yield connection_1.dbAccess.query(`UPDATE obra set obr_call='${obr_call}',obr_col='${obr_col}',obr_cost=${obr_cost},obr_stat='${obr_stat}',obr_tramo='${obr_tramo}',obr_fecha='${obr_fecha}',obr_sis='${obr_sis}',col_nom ='${col_nom}',obr_programa='${obr_programa}',obr_fecinip='${obr_fecinip}',obr_fecvenp='${obr_fecvenp}',obr_npago=${obr_npago},obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
        }
        catch (error) {
        }
        let obra = null;
        //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        const fechaObraSQL = (0, fechas_1.default)(obr_fecha); // '2025-04-03'
        const fechaInicioSQL = (0, fechas_1.default)(obr_fecinip); // '2025-04-03'
        const fechaVencimientoSQL = (0, fechas_1.default)(obr_fecvenp); // '2025-06-12'
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
        request.input('obr_call', connection_1.sql.VarChar, obr_call);
        request.input('obr_col', connection_1.sql.VarChar, obr_col);
        request.input('obr_cost', connection_1.sql.Float, parseFloat(obr_cost));
        request.input('obr_stat', connection_1.sql.VarChar, obr_stat);
        request.input('obr_tramo', connection_1.sql.VarChar, obr_tramo);
        request.input('obr_fecha', connection_1.sql.DateTime, fechaObraSQL);
        request.input('obr_sis', connection_1.sql.VarChar, obr_sis);
        request.input('col_nom', connection_1.sql.VarChar, col_nom);
        request.input('obr_fecinip', connection_1.sql.DateTime, fechaInicioSQL);
        request.input('obr_fecvenp', connection_1.sql.DateTime, fechaVencimientoSQL);
        request.input('obr_npago', connection_1.sql.VarChar, "" + obr_npago);
        request.input('obr_opergob', connection_1.sql.VarChar, obr_opergob);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
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
            const request = new connection_1.sql.Request();
            request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
            // Ejecutar consulta con parámetros
            obra = yield request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
            res.status(200).json({
                success: true,
                result: { obra: obra.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se actualizo la obra correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.actualizarObra = actualizarObra;
/**
 * La función `actualizarEstatusObra` actualiza el estatus de una obra dentro de la bd de Access
 */
const actualizarEstatusObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obr_clv, obr_stat, obr_opergob } = req.body;
        try {
            yield connection_1.dbAccess.query(`UPDATE obra set obr_stat='${obr_stat}',obr_opergob='${obr_opergob}' WHERE obr_clv = '${obr_clv}'`);
        }
        catch (error) {
        }
        let obra = null;
        //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
        request.input('obr_stat', connection_1.sql.VarChar, obr_stat);
        request.input('obr_opergob', connection_1.sql.VarChar, obr_opergob);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
      UPDATE [dbo].[obra]
      SET [obr_stat] = @obr_stat,
          [obr_opergob] = @obr_opergob
      WHERE [obr_clv] = @obr_clv
    `);
        if (result.rowsAffected[0] > 0) {
            if (obr_stat == '8') {
                // Crear request con parámetros
                const request = new connection_1.sql.Request();
                request.input('OBRA', connection_1.sql.VarChar, obr_clv);
                // Ejecutar consulta con parámetros
                yield request.query(`
          UPDATE [dbo].[CARPETA_VENCIDA]
          SET [SALDOSIN] = 0.0,
              [SALDOCON] = 0.0
          WHERE [OBRA] = @OBRA
        `);
            }
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
            // Ejecutar consulta con parámetros
            obra = yield request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
            res.status(200).json({
                success: true,
                result: { obra: obra.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se actualizo el estatus de la obra correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.actualizarEstatusObra = actualizarEstatusObra;
/**
 * La función `actualizarCostoObra` actualiza el incremento de una obra dentro de la bd de
 */
const actualizarCostoObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obr_clv, obr_inc } = req.body;
        try {
            yield connection_1.dbAccess.query(`UPDATE obra set obr_inc=${obr_inc} WHERE obr_clv = '${obr_clv}'`);
        }
        catch (error) { }
        try {
            yield connection_1.dbAccess.query(`UPDATE cooperador set coo_inc=${obr_inc} WHERE coo_obr = '${obr_clv}'`);
        }
        catch (error) { }
        let obra = null;
        //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
        request.input('obr_inc', connection_1.sql.Float, obr_inc);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
      UPDATE [dbo].[obra]
      SET [obr_inc] = @obr_inc
      WHERE [obr_clv] = @obr_clv
    `);
        const result2 = yield request.query(`
    UPDATE [dbo].[cooperador]
      SET [coo_inc] = @obr_inc
    WHERE [coo_obr] = @obr_clv
    `);
        const result3 = yield request.query(`
    UPDATE [dbo].[CARTERA_VENCIDA]
      SET [INCREMENTO_OBRA] = @obr_inc,
          [COO_INC] = @obr_inc,
          [SALDOSIN] = [SALDOSIN] - [INCREMENTO_OBRA] + @obr_inc,
          [SALDOCON] = [SALDOCON] - [INCREMENTO_OBRA] + @obr_inc
    WHERE [OBRA] = @obr_clv
    `);
        if (result.rowsAffected[0] > 0) {
            // Ejecutar consulta con parámetros
            obra = yield request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
            res.status(200).json({
                success: true,
                result: { obra: obra.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se actualizo el costo de la obra correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.actualizarCostoObra = actualizarCostoObra;
/**
 * La función `eliminarObra` elimina una obra en la bd de Access
 */
const eliminarObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { obr_clv } = req.params;
        try {
            yield connection_1.dbAccess.query(`DELETE FROM obra WHERE obr_clv = '${obr_clv}'`);
        }
        catch (error) {
        }
        let obra = null;
        //obra = await dbAccess.query(`SELECT * FROM obra WHERE obr_clv = '${obr_clv}'`);
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('obr_clv', connection_1.sql.VarChar, obr_clv);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`DELETE FROM [dbo].[obra] WHERE [obr_clv] = @obr_clv`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({
                success: true,
                result: "Obra eliminada con exito.",
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se elimino la obra correctamente.",
                error: null,
            });
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
        res.status(500).json({
            success: false,
            result: null,
            error: error.message,
        });
    }
});
exports.eliminarObra = eliminarObra;
//# sourceMappingURL=obras.controller.js.map