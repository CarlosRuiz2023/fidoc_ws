"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarCeroAlInicio = exports.obtenerFormatoHora = exports.obtenerFormatoFecha = void 0;
/**
 * La función "obtenerFormatoFecha" devuelve una cadena de fecha formateada en el formato "AAAA-MM-DD"
 * @param {Date} fecha El parámetro `fecha` es un objeto Date que representa una fecha específica. Si no se proporciona valor para `fecha`, por defecto es la fecha actual.
 * @returns una cadena de fecha formateada en el formato "AAAA-MM-DD"
 */
var obtenerFormatoFecha = function (fecha) {
    if (fecha === void 0) { fecha = new Date(); }
    var dia = agregarCeroAlInicio(fecha.getDate());
    var mes = agregarCeroAlInicio(fecha.getMonth() + 1);
    var anio = fecha.getFullYear();
    return "".concat(anio, "-").concat(mes, "-").concat(dia);
};
exports.obtenerFormatoFecha = obtenerFormatoFecha;
/**
 * La función "agregarCeroAlInicio" añade un cero a la izquierda de un número si es menor que 10.
 * @param numero - El parámetro "numero" es un número al que queremos agregarle un cero a la izquierda si es
 * menos de 10.
 * @returns La función `agregarCeroAlInicio` devuelve una cadena.
 */
var agregarCeroAlInicio = function (numero) {
    return numero < 10 ? "0".concat(numero) : numero.toString();
};
exports.agregarCeroAlInicio = agregarCeroAlInicio;
/**
 * La función "obtenerFormatoHora" devuelve una cadena de hora formateada en el formato "hh:mm:ss"
 * @param {Date} fecha El parámetro `fecha` es un objeto Date que representa una fecha específica. Si no se proporciona valor para `fecha`, por defecto es la fecha actual.
 * @returns una cadena de fecha formateada en el formato "hh:mm:ss" representando la hora actual
 */
var obtenerFormatoHora = function (fecha) {
    if (fecha === void 0) { fecha = new Date(); }
    var horas = agregarCeroAlInicio(fecha.getHours());
    var minutos = agregarCeroAlInicio(fecha.getMinutes());
    var segundos = agregarCeroAlInicio(fecha.getSeconds());
    return "".concat(horas, ":").concat(minutos, ":").concat(segundos);
};
exports.obtenerFormatoHora = obtenerFormatoHora;
