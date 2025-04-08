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
exports.eliminarCooperador = exports.actualizarCooperador = exports.agregarCooperador = exports.obtenerCooperador = void 0;
const generarArchivoLog_1 = require("../helpers/generarArchivoLog");
const connection_1 = require("../db/connection");
const fechas_1 = __importDefault(require("../helpers/fechas"));
/**
 * La función `obtenerCooperador` recupera un cooperador de la bd de Access mediante su clave
 */
const obtenerCooperador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coo_clv = req.params.coo_clv;
        let cooperador = null;
        if (coo_clv.length == 13) {
            cooperador = yield connection_1.dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        }
        else {
            cooperador = yield connection_1.dbAccess.query(`SELECT * FROM cooperador WHERE coo_obr = '${coo_clv}'`);
        }
        res.status(200).json({
            success: true,
            result: { cooperador },
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
exports.obtenerCooperador = obtenerCooperador;
/**
 * La función `agregarCooperador` registra una obra en la bd de Access
 */
const agregarCooperador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_clv, coo_pat, coo_mat, coo_nom, coo_num: coo_nof, coo_call, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = req.body;
        const query = `INSERT INTO cooperador (coo_clv,coo_pat,coo_mat,coo_nom,coo_nof,coo_call,coo_num,coo_col,coo_ciu,coo_est,coo_cp,coo_tel,coo_lote,coo_ant,coo_npag,coo_venc1,coo_obr,coo_mts,coo_inc,coo_clv1,coo_pred,coo_nombre,coo_pagos,coo_cargos,coo__gto_req,coo_gto_ejec,coo_notificado,coo_requerido,coo_ejecutado,coo_ultimoaviso,coo_propx,coo_rfc,coo_fiscal,coo_razonsoc,coo_grupo,coo_fecgrupo,coo_dec,coo_transferida) 
      VALUES('${coo_clv}','${coo_pat}','${coo_mat}','${coo_nom}','${coo_nof}','${coo_call}','','${coo_col}','LEON DE LOS ALDAMA','GUA','${coo_cp}','${coo_tel}','1',0.0,${coo_npag},'${coo_venc1}','${coo_clv.substring(0, coo_clv.length - 3)}',${coo_mts},0.0,'${coo_clv.substring(coo_clv.length - 3)}','${coo_pred}','${coo_pat + " " + coo_mat + " " + coo_nom}',0.0,0.0,0.0,0.0,'01/01/1900','01/01/1900','01/01/1900','01/01/1900',False,'0','0','0','0','01/01/1900',0,False)`;
        try {
            yield connection_1.dbAccess.query(query);
        }
        catch (error) {
        }
        let cooperador = null;
        //cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        const fechaVencimientoSQL = (0, fechas_1.default)(coo_venc1); // '2025-06-12'
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
        request.input('coo_pat', connection_1.sql.VarChar, coo_pat);
        request.input('coo_mat', connection_1.sql.VarChar, coo_mat);
        request.input('coo_nom', connection_1.sql.VarChar, coo_nom);
        request.input('coo_nof', connection_1.sql.VarChar, coo_nof);
        request.input('coo_call', connection_1.sql.VarChar, coo_call);
        request.input('coo_col', connection_1.sql.VarChar, coo_col);
        request.input('coo_cp', connection_1.sql.VarChar, coo_cp);
        request.input('coo_tel', connection_1.sql.VarChar, coo_tel);
        request.input('coo_npag', connection_1.sql.VarChar, "" + coo_npag);
        request.input('coo_venc1', connection_1.sql.DateTime, fechaVencimientoSQL);
        request.input('coo_obr', connection_1.sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
        request.input('coo_mts', connection_1.sql.Float, parseFloat(coo_mts));
        request.input('coo_clv1', connection_1.sql.VarChar, coo_clv.substring(coo_clv.length - 3));
        request.input('coo_pred', connection_1.sql.VarChar, coo_pred);
        // Ejecutar consulta con parámetros 
        const result = yield request.query(`
      INSERT INTO [dbo].[cooperador]
      ([coo_clv],[coo_pat],[coo_mat],[coo_nom],[coo_nof],[coo_call],
      [coo_col],[coo_ciu],[coo_est],[coo_cp],
      [coo_tel],[coo_npag],[coo_venc1],[coo_obr],[coo_mts],
      [coo_clv1],[coo_pred],[coo_nombre],[coo_cargos],
      [coo_propx],[coo_dec],[coo_transferida])
      VALUES
      (@coo_clv, @coo_pat, @coo_mat, @coo_nom, @coo_nof, @coo_call,
      @coo_col, 'LEON DE LOS ALDAMA', 'GUA', @coo_cp,
      @coo_tel, @coo_npag, @coo_venc1, @coo_obr, @coo_mts,
      @coo_clv1, @coo_pred, @coo_pat + ' ' + @coo_mat + ' ' + @coo_nom, 0.0,
      0, 0.0, 0)
    `);
        request.input('obr_clv', connection_1.sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
        // Ejecutar consulta con parámetros 
        const obra = yield request.query(`SELECT * FROM [pFidoc].[dbo].[obra] WHERE [obr_clv] = @obr_clv`);
        // Ejecutar consulta con parámetros 
        const cooperadores = yield request.query(`SELECT COUNT(*) AS total FROM [pFidoc].[dbo].[cooperador] WHERE [coo_obr] = @obr_clv`);
        if (obra.recordset[0].obr_programa < 100) {
            if (obra.recordset[0].obr_programa < 10) {
                request.input('pro_clv', connection_1.sql.VarChar, '00' + obra.recordset[0].obr_programa);
                ;
            }
            else {
                request.input('pro_clv', connection_1.sql.VarChar, '0' + obra.recordset[0].obr_programa);
                ;
            }
        }
        else {
            request.input('pro_clv', connection_1.sql.VarChar, '' + obra.recordset[0].obr_programa);
            ;
        }
        // Ejecutar consulta con parámetros
        const programa = yield request.query(`SELECT * FROM [pFidoc].[dbo].[programa] WHERE [pro_clv] = @pro_clv`);
        if (obra.recordset[0] != null) {
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            const date = new Date();
            request.input('OBRA', connection_1.sql.VarChar, coo_clv.substring(0, coo_clv.length - 3));
            request.input('COOPERADOR', connection_1.sql.VarChar, coo_clv);
            request.input('SALDOSIN', connection_1.sql.Float, (Number(coo_mts) * Number(obra.recordset[0].obr_cost)));
            request.input('SALDOCON', connection_1.sql.Float, (Number(coo_mts) * Number(obra.recordset[0].obr_cost)));
            request.input('METROS_FRENTE', connection_1.sql.Float, Number(coo_mts));
            request.input('COSTO_METRO_LINEAL', connection_1.sql.Float, Number(obra.recordset[0].obr_cost));
            request.input('CTA_PREDIAL', connection_1.sql.VarChar, coo_pred);
            request.input('NOMBRE_COOPERADOR', connection_1.sql.VarChar, coo_pat + " " + coo_mat + " " + coo_nom);
            request.input('NUM_COOPS', connection_1.sql.Int, Number(cooperadores.recordset[0].total));
            request.input('TRAMO', connection_1.sql.VarChar, obra.recordset[0].obr_tramo);
            request.input('CALLE', connection_1.sql.VarChar, coo_call);
            request.input('NO_OFICIAL', connection_1.sql.VarChar, coo_nof);
            request.input('COLONIA', connection_1.sql.VarChar, coo_col);
            request.input('SISTEMA', connection_1.sql.VarChar, obra.recordset[0].obr_sis);
            request.input('PROGRAMA', connection_1.sql.VarChar, programa.recordset[0].pro_nom);
            request.input('ULTIMA_FECHA_PAGO', connection_1.sql.DateTime, (0, fechas_1.default)(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`));
            request.input('OBR_FECHA', connection_1.sql.DateTime, obra.recordset[0].obr_fecha);
            // Ejecutar consulta con parámetros
            cooperador = yield request.query(`
        INSERT INTO [dbo].[CARTERA_VENCIDA]
        ([OBRA],[COOPERADOR],[SALDOSIN],[SALDOCON],[METROS_FRENTE],
        [COSTO_METRO_LINEAL],[CTA_PREDIAL],[NOMBRE_COOPERADOR],[TIPO_LOTE],[COO_INC],[NUM_COOPS],[TRAMO],
        [CALLE],[NO_OFICIAL],[COLONIA],[SISTEMA],[PROGRAMA],[TOTAL_PAGOS],
        [ULTIMA_FECHA_PAGO],[OBR_FECHA])
        VALUES 
        (@OBRA, @COOPERADOR, @SALDOSIN, @SALDOCON, @METROS_FRENTE,
        @COSTO_METRO_LINEAL, @CTA_PREDIAL, @NOMBRE_COOPERADOR,'CASA HABITACION', 0.0, @NUM_COOPS, @TRAMO,
        @CALLE, @NO_OFICIAL, @COLONIA, @SISTEMA, @PROGRAMA, 0.0,
        @ULTIMA_FECHA_PAGO, @OBR_FECHA)
      `);
            cooperador = yield request.query(`SELECT * FROM [pFidoc].[dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
            res.status(200).json({
                success: true,
                result: { cooperador: cooperador.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se agrego el cooperador correctamente.",
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
exports.agregarCooperador = agregarCooperador;
/**
 * La función `actualizarCooperador` actualiza un cooperador en la bd de Access
 */
const actualizarCooperador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_clv, coo_pat, coo_mat, coo_nom, coo_nof, coo_call, coo_num, coo_col, coo_cp, coo_tel, coo_npag, coo_venc1, coo_mts, coo_pred } = req.body;
        try {
            //await dbAccess.query(`UPDATE cooperador SET coo_pat='${coo_pat}',coo_mat='${coo_mat}',coo_nom='${coo_nom}',coo_nof='${coo_nof}',coo_call='${coo_call}',coo_num='${coo_num}',coo_col='${coo_col}',coo_cp ='${coo_cp}',coo_tel='${coo_tel}',coo_npag=${coo_npag},coo_venc1='${coo_venc1}',coo_mts=${coo_mts},coo_pred='${coo_pred}' WHERE coo_clv = '${coo_clv}'`);
        }
        catch (error) {
        }
        let cooperador = null;
        //cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        const fechaVencimientoSQL = (0, fechas_1.default)(coo_venc1); // '2025-06-12'
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
        request.input('coo_pat', connection_1.sql.VarChar, coo_pat);
        request.input('coo_mat', connection_1.sql.VarChar, coo_mat);
        request.input('coo_nom', connection_1.sql.VarChar, coo_nom);
        request.input('coo_nof', connection_1.sql.VarChar, coo_nof);
        request.input('coo_call', connection_1.sql.VarChar, coo_call);
        request.input('coo_col', connection_1.sql.VarChar, coo_col);
        request.input('coo_cp', connection_1.sql.VarChar, coo_cp);
        request.input('coo_tel', connection_1.sql.VarChar, coo_tel);
        request.input('coo_npag', connection_1.sql.VarChar, "" + coo_npag);
        request.input('coo_venc1', connection_1.sql.DateTime, fechaVencimientoSQL);
        request.input('coo_mts', connection_1.sql.Float, parseFloat(coo_mts));
        request.input('coo_pred', connection_1.sql.VarChar, coo_pred);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`
      UPDATE [dbo].[cooperador]
      SET [coo_pat] = @coo_pat,
          [coo_mat] = @coo_mat,
          [coo_nom] = @coo_nom,
          [coo_nof] = @coo_nof,
          [coo_call] = @coo_call,
          [coo_col] = @coo_col,
          [coo_cp] = @coo_cp,
          [coo_tel] = @coo_tel,
          [coo_npag] = @coo_npag,
          [coo_venc1] = @coo_venc1,
          [coo_mts] = @coo_mts,
          [coo_pred] = @coo_pred
      WHERE [coo_clv] = @coo_clv
    `);
        const result2 = yield request.query(`
      UPDATE [dbo].[CARTERA_VENCIDA]
      SET [NOMBRE_COOPERADOR] = @coo_pat+ ' ' + @coo_mat+ ' ' + @coo_nom,
          [CALLE] = @coo_call,
          [NO_OFICIAL] = @coo_nof,
          [COLONIA] = @coo_col,
          [METROS_FRENTE] = @coo_mts,
          [CTA_PREDIAL] = @coo_pred
      WHERE [COOPERADOR] = @coo_clv
      `);
        if (result.rowsAffected[0] > 0 && result2.rowsAffected[0] > 0) {
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
            // Ejecutar consulta con parámetros
            cooperador = yield request.query(`SELECT * FROM [pFidoc].[dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
            res.status(200).json({
                success: true,
                result: { cooperador: cooperador.recordset[0] },
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se actualizo el cooperador correctamente.",
                error: null,
            });
        }
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
exports.actualizarCooperador = actualizarCooperador;
/**
 * La función `eliminarCooperador` elimina un cooperador en la bd de Access
 */
const eliminarCooperador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coo_clv } = req.params;
        try {
            yield connection_1.dbAccess.query(`DELETE FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        }
        catch (error) {
        }
        //cooperador = await dbAccess.query(`SELECT * FROM cooperador WHERE coo_clv = '${coo_clv}'`);
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        // Crear request con parámetros
        const request = new connection_1.sql.Request();
        request.input('coo_clv', connection_1.sql.VarChar, coo_clv);
        // Ejecutar consulta con parámetros
        const result = yield request.query(`DELETE FROM [dbo].[cooperador] WHERE [coo_clv] = @coo_clv`);
        // Ejecutar consulta con parámetros
        const result2 = yield request.query(`DELETE FROM [dbo].[CARTERA_VENCIDA] WHERE [COOPERADOR] = @coo_clv`);
        if (result.rowsAffected[0] > 0 && result2.rowsAffected[0] > 0) {
            res.status(200).json({
                success: true,
                result: "Cooperador eliminado con exito.",
                error: null,
            });
        }
        else {
            res.status(400).json({
                success: false,
                result: "No se elimino el cooperador correctamente.",
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
exports.eliminarCooperador = eliminarCooperador;
//# sourceMappingURL=cooperadores.controller.js.map