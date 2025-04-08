import { Op } from 'sequelize';
import { escribirErrorEnLog } from './generarArchivoLog';
import { configSQLServer, dbPostgres, sql } from '../db/connection';
import axios from 'axios';

/**
 * La función `actualizarPagos` actualiza pagos de Tesoreria
 */
const actualizarPagos = async (): Promise<void> => {
  try {
    const date = new Date();

    // Configuración de la petición
    const url = `${process.env.IP_PAGOS}/WebServices/WebServicePagos.asmx/GetActPagosAS400`;
    const headers = {
      'Content-Type': 'application/json',
    };
    let fecha_de_ayer = '' + date.getFullYear();
    if (date.getMonth() + 1 < 10) fecha_de_ayer += '0' + (date.getMonth() + 1);
    else fecha_de_ayer += (date.getMonth() + 1);
    if (date.getDate() - 1 < 10) fecha_de_ayer += '0' + (date.getDate() - 1);
    else fecha_de_ayer += date.getDate();
    const datos = {
      fec_inicial: fecha_de_ayer,
      fec_final: fecha_de_ayer
    };

    // Realizar la petición POST con Axios
    const respuesta = await axios.post(url, datos, { headers });
    if (respuesta.data.d != 'PAGOS ACTUALIZADOS CORRECTAMENTE') escribirErrorEnLog('Error al actualizar los pagos :' + respuesta.data.d);
  } catch (error: any) {
    escribirErrorEnLog(error.message);
  }
};

/**
 * La función `actualizarCarteraVencida` actualiza la cartera vencida
 */
const actualizarCarteraVencida = async (): Promise<void> => {
  try {
    const date = new Date();

    // Configuración de la petición
    const url = `${process.env.IP_PAGOS}/WebServices/WebServicePagos.asmx/GetPagosAS400`;
    const headers = {
      'Content-Type': 'application/json',
    };
    let fecha_de_ayer = '' + date.getFullYear();
    if (date.getMonth() + 1 < 10) fecha_de_ayer += '0' + (date.getMonth() + 1);
    else fecha_de_ayer += (date.getMonth() + 1);
    if (date.getDate() - 1 < 10) fecha_de_ayer += '0' + (date.getDate() - 1);
    else fecha_de_ayer += date.getDate();
    const datos = {
      fec_inicial: fecha_de_ayer,
      fec_final: fecha_de_ayer
    };

    const respuesta = await axios.post(url, datos, { headers });

    // 1. Extraer la parte del array de Pagos
    const pagosArrayString = respuesta.data.d.split('"Pagos":')[1];

    // 2. Limpiar la cadena para que parezca un array JSON
    const cleanedPagosArrayString = pagosArrayString.substring(1, pagosArrayString.indexOf(']'));

    // 3. Dividir los objetos de pago individuales
    const pagosIndividuales = cleanedPagosArrayString.split('},{');

    const pagosUnicos: any = {};

    pagosIndividuales.forEach((pagoString: string) => {
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
    await sql.connect(configSQLServer);
    for (let index = 0; index < resultadosUnicos.length; index++) {
      const pago:any = resultadosUnicos[index];
      // Crear request con parámetros
      const request = new sql.Request();
      request.input('IMPORTE', sql.Float, pago.importe);
      request.input('COOPERADOR', sql.VarChar, pago.cooperador);

      // Ejecutar consulta con parámetros
      const resp = await request.query(`
        UPDATE [dbo].[CARTERA_VENCIDA]
        SET [SALDOSIN] = [SALDOSIN] - @IMPORTE,
            [SALDOCON] = [SALDOCON] - @IMPORTE
        WHERE [COOPERADOR] = @COOPERADOR
      `);
      if (resp.rowsAffected[0] == 0) {
        escribirErrorEnLog("No se encontro el cooperador " + pago.cooperador + " en la cartera vencida de pFidoc, el cual dio un importe de " + pago.importe + " el dia de ayer.");
      }
    }
    await sql.close();
  } catch (error: any) {
    escribirErrorEnLog(error.message);
  }
};

export { actualizarPagos, actualizarCarteraVencida };