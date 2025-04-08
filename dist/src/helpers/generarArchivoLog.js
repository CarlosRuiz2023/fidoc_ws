"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escribirErrorEnLog = void 0;
const fs_1 = require("fs");
const formato_1 = require("./formato");
/**
 * La función `escribirErrorEnLog` agrega un mensaje de error con una marca de tiempo a un archivo de registro.
 * @param mensajeError - El parámetro `mensajeError` es una cadena que representa el mensaje de error
 * que debe escribirse en el archivo de registro.
 */
const escribirErrorEnLog = (mensajeError) => {
    const fechaHoraActual = obtenerFechaHoraActual();
    const mensajeLog = `[${fechaHoraActual}] ERROR: ${mensajeError}\n`;
    (0, fs_1.appendFile)('logfile.txt', mensajeLog, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });
};
exports.escribirErrorEnLog = escribirErrorEnLog;
/**
 * La función `obtenerFechaHoraActual` devuelve la fecha y hora actual en el formato "dd-mm-aaaa hh:mm:ss".
 * @returns La función `obtenerFechaHoraActual` devuelve una cadena en el formato "dd-mm-aaaa hh:mm:ss",
 * que representa la fecha y hora actuales.
 */
const obtenerFechaHoraActual = () => {
    const fechaHora = new Date();
    const dia = (0, formato_1.agregarCeroAlInicio)(fechaHora.getDate());
    const mes = (0, formato_1.agregarCeroAlInicio)(fechaHora.getMonth() + 1);
    const anio = fechaHora.getFullYear();
    const horas = (0, formato_1.agregarCeroAlInicio)(fechaHora.getHours());
    const minutos = (0, formato_1.agregarCeroAlInicio)(fechaHora.getMinutes());
    const segundos = (0, formato_1.agregarCeroAlInicio)(fechaHora.getSeconds());
    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
};
//# sourceMappingURL=generarArchivoLog.js.map