"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escribirErrorEnLog = void 0;
var fs_1 = require("fs");
var formato_1 = require("./formato");
/**
 * La función `escribirErrorEnLog` agrega un mensaje de error con una marca de tiempo a un archivo de registro.
 * @param mensajeError - El parámetro `mensajeError` es una cadena que representa el mensaje de error
 * que debe escribirse en el archivo de registro.
 */
var escribirErrorEnLog = function (mensajeError) {
    var fechaHoraActual = obtenerFechaHoraActual();
    var mensajeLog = "[".concat(fechaHoraActual, "] ERROR: ").concat(mensajeError, "\n");
    (0, fs_1.appendFile)('logfile.txt', mensajeLog, function (err) {
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
var obtenerFechaHoraActual = function () {
    var fechaHora = new Date();
    var dia = (0, formato_1.agregarCeroAlInicio)(fechaHora.getDate());
    var mes = (0, formato_1.agregarCeroAlInicio)(fechaHora.getMonth() + 1);
    var anio = fechaHora.getFullYear();
    var horas = (0, formato_1.agregarCeroAlInicio)(fechaHora.getHours());
    var minutos = (0, formato_1.agregarCeroAlInicio)(fechaHora.getMinutes());
    var segundos = (0, formato_1.agregarCeroAlInicio)(fechaHora.getSeconds());
    return "".concat(dia, "-").concat(mes, "-").concat(anio, " ").concat(horas, ":").concat(minutos, ":").concat(segundos);
};
