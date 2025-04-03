import { writeFileSync,appendFile  } from 'fs';
import { agregarCeroAlInicio } from './formato';

/**
 * La función `escribirErrorEnLog` agrega un mensaje de error con una marca de tiempo a un archivo de registro.
 * @param mensajeError - El parámetro `mensajeError` es una cadena que representa el mensaje de error
 * que debe escribirse en el archivo de registro.
 */
const escribirErrorEnLog = (mensajeError: string): void => {
    const fechaHoraActual = obtenerFechaHoraActual();
    const mensajeLog = `[${fechaHoraActual}] ERROR: ${mensajeError}\n`;

    appendFile('logfile.txt', mensajeLog, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });
}

/**
 * La función `obtenerFechaHoraActual` devuelve la fecha y hora actual en el formato "dd-mm-aaaa hh:mm:ss".
 * @returns La función `obtenerFechaHoraActual` devuelve una cadena en el formato "dd-mm-aaaa hh:mm:ss",
 * que representa la fecha y hora actuales.
 */
const obtenerFechaHoraActual = (): string => {
    const fechaHora = new Date();
    const dia = agregarCeroAlInicio(fechaHora.getDate());
    const mes = agregarCeroAlInicio(fechaHora.getMonth() + 1);
    const anio = fechaHora.getFullYear();
    const horas = agregarCeroAlInicio(fechaHora.getHours());
    const minutos = agregarCeroAlInicio(fechaHora.getMinutes());
    const segundos = agregarCeroAlInicio(fechaHora.getSeconds());

    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
}

export { escribirErrorEnLog };
