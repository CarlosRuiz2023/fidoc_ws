/**
 * La función "obtenerFormatoFecha" devuelve una cadena de fecha formateada en el formato "AAAA-MM-DD"
 * @param {Date} fecha El parámetro `fecha` es un objeto Date que representa una fecha específica. Si no se proporciona valor para `fecha`, por defecto es la fecha actual.
 * @returns una cadena de fecha formateada en el formato "AAAA-MM-DD"
 */
const obtenerFormatoFecha = (fecha: Date = new Date()): string => {
    const dia = agregarCeroAlInicio(fecha.getDate());
    const mes = agregarCeroAlInicio(fecha.getMonth() + 1);
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
}

/**
 * La función "agregarCeroAlInicio" añade un cero a la izquierda de un número si es menor que 10.
 * @param numero - El parámetro "numero" es un número al que queremos agregarle un cero a la izquierda si es
 * menos de 10.
 * @returns La función `agregarCeroAlInicio` devuelve una cadena.
 */
const agregarCeroAlInicio = (numero: number): string => {
    return numero < 10 ? `0${numero}` : numero.toString();
}

/**
 * La función "obtenerFormatoHora" devuelve una cadena de hora formateada en el formato "hh:mm:ss"
 * @param {Date} fecha El parámetro `fecha` es un objeto Date que representa una fecha específica. Si no se proporciona valor para `fecha`, por defecto es la fecha actual.
 * @returns una cadena de fecha formateada en el formato "hh:mm:ss" representando la hora actual
 */
const obtenerFormatoHora = (fecha: Date = new Date()): string => {
    const horas = agregarCeroAlInicio(fecha.getHours());
    const minutos = agregarCeroAlInicio(fecha.getMinutes());
    const segundos = agregarCeroAlInicio(fecha.getSeconds());
    return `${horas}:${minutos}:${segundos}`;
}

export { obtenerFormatoFecha, obtenerFormatoHora, agregarCeroAlInicio };
