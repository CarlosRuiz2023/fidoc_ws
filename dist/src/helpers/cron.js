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
exports.actualizarCarteraVencida = exports.actualizarPagos = void 0;
const generarArchivoLog_1 = require("./generarArchivoLog");
const connection_1 = require("../db/connection");
const axios_1 = __importDefault(require("axios"));
/**
 * La función `actualizarPagos` actualiza pagos de Tesoreria
 */
const actualizarPagos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        // Configuración de la petición
        const url = `${process.env.IP_PAGOS}/WebServices/WebServicePagos.asmx/GetActPagosAS400`;
        const headers = {
            'Content-Type': 'application/json',
        };
        let fecha_de_ayer = '' + date.getFullYear();
        if (date.getMonth() + 1 < 10)
            fecha_de_ayer += '0' + (date.getMonth() + 1);
        else
            fecha_de_ayer += (date.getMonth() + 1);
        if (date.getDate() - 1 < 10)
            fecha_de_ayer += '0' + (date.getDate() - 1);
        else
            fecha_de_ayer += date.getDate();
        const datos = {
            fec_inicial: fecha_de_ayer,
            fec_final: fecha_de_ayer
        };
        // Realizar la petición POST con Axios
        const respuesta = yield axios_1.default.post(url, datos, { headers });
        if (respuesta.data.d != 'PAGOS ACTUALIZADOS CORRECTAMENTE')
            (0, generarArchivoLog_1.escribirErrorEnLog)('Error al actualizar los pagos :' + respuesta.data.d);
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
    }
});
exports.actualizarPagos = actualizarPagos;
/**
 * La función `actualizarCarteraVencida` actualiza la cartera vencida
 */
const actualizarCarteraVencida = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        // Configuración de la petición
        const url = `${process.env.IP_PAGOS}/WebServices/WebServicePagos.asmx/GetPagosAS400`;
        const headers = {
            'Content-Type': 'application/json',
        };
        let fecha_de_ayer = '' + date.getFullYear();
        if (date.getMonth() + 1 < 10)
            fecha_de_ayer += '0' + (date.getMonth() + 1);
        else
            fecha_de_ayer += (date.getMonth() + 1);
        if (date.getDate() - 1 < 10)
            fecha_de_ayer += '0' + (date.getDate() - 1);
        else
            fecha_de_ayer += date.getDate();
        const datos = {
            fec_inicial: fecha_de_ayer,
            fec_final: fecha_de_ayer
        };
        const respuesta = yield axios_1.default.post(url, datos, { headers });
        // 1. Extraer la parte del array de Pagos
        const pagosArrayString = respuesta.data.d.split('"Pagos":')[1];
        // 2. Limpiar la cadena para que parezca un array JSON
        const cleanedPagosArrayString = pagosArrayString.substring(1, pagosArrayString.indexOf(']'));
        // 3. Dividir los objetos de pago individuales
        const pagosIndividuales = cleanedPagosArrayString.split('},{');
        const pagosUnicos = {};
        pagosIndividuales.forEach((pagoString) => {
            const cooperadorMatch = pagoString.match(/"Cooperador":"([^"]*)"/);
            const importeMatch = pagoString.match(/"Importe":([\d.]+)/);
            const letraReciboMatch = pagoString.match(/"LetraRecibo":"([^"]*)"/);
            const reciboMatch = pagoString.match(/"Recibo":(\d+)/);
            if (cooperadorMatch && importeMatch && letraReciboMatch && reciboMatch) {
                const cooperador = cooperadorMatch[1].trim();
                const importe = parseFloat(importeMatch[1]);
                const letraRecibo = letraReciboMatch[1];
                const recibo = reciboMatch[1];
                const reciboCompleto = `${letraRecibo}0${recibo}`;
                // Usamos el cooperador como clave para almacenar el pago único
                pagosUnicos[cooperador] = { cooperador, importe, reciboCompleto };
            }
        });
        const resultadosUnicos = Object.values(pagosUnicos);
        // Conectar a la base de datos
        yield connection_1.sql.connect(connection_1.configSQLServer);
        for (let index = 0; index < resultadosUnicos.length; index++) {
            const pago = resultadosUnicos[index];
            // Crear request con parámetros
            const request = new connection_1.sql.Request();
            request.input('IMPORTE', connection_1.sql.Float, pago.importe);
            request.input('COOPERADOR', connection_1.sql.VarChar, pago.cooperador);
            // Ejecutar consulta con parámetros
            const resp = yield request.query(`
        UPDATE [dbo].[CARTERA_VENCIDA]
        SET [SALDOSIN] = [SALDOSIN] - @IMPORTE,
            [SALDOCON] = [SALDOCON] - @IMPORTE
        WHERE [COOPERADOR] = @COOPERADOR
      `);
            if (resp.rowsAffected[0] == 0) {
                (0, generarArchivoLog_1.escribirErrorEnLog)("No se encontro el cooperador " + pago.cooperador + " en la cartera vencida de pFidoc, el cual dio un importe de " + pago.importe + " el dia de ayer.");
            }
        }
        yield connection_1.sql.close();
    }
    catch (error) {
        (0, generarArchivoLog_1.escribirErrorEnLog)(error.message);
    }
});
exports.actualizarCarteraVencida = actualizarCarteraVencida;
//# sourceMappingURL=cron.js.map