
const convertirFechasATimestamp = async (fecha_inicio: string, fecha_fin:string) => {
  try {
    // Convertir las fechas recibidas a objetos Date y formatearlas
    const fechaInicio = new Date(`${fecha_inicio}T00:00:00Z`);
    const fechaFin = new Date(`${fecha_fin}T23:59:59Z`);

    // Formatear las fechas al formato ISO 8601
    const fechaInicioISO = fechaInicio.toISOString();
    const fechaFinISO = fechaFin.toISOString();

    // Retornamos ambas Fechas estandarizadas a fromato ISO 8601
    return { fechaInicioISO, fechaFinISO };
  } catch (error:any) {
    console.error("Error al convertir la fecha a timestamp:", error.message);
    throw error;
  }
};

export default convertirFechasATimestamp;
