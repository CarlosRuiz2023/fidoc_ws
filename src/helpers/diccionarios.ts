import Estado from "../models/estado.model"; // Modelo de Estado
import Municipio from "../models/municipio.model"; // Modelo de Municipio

const obtenerIds = async (estado: string, municipio: string) => {
  try {
    // 1. Obtener id del estado
    const estadoEncontrado:any = await Estado.findOne({
      where: { estado: estado },
    });

    if (!estadoEncontrado) {
      throw new Error(`Estado no encontrado: ${estado}`);
    }

    const id_estado = estadoEncontrado.getDataValue("id_estado");

    // 2. Obtener id del municipio con el id_estado
    const municipioEncontrado:any = await Municipio.findOne({
      where: {
        municipio: municipio,
        id_estado: id_estado, // Se asegura que el municipio pertenece al estado
      },
    });

    if (!municipioEncontrado) {
      throw new Error(
        `Municipio no encontrado: ${municipio} en el estado ${estado}`
      );
    }

    const id_municipio = municipioEncontrado.getDataValue("id_municipio");

    // Retornamos ambos ids
    return { id_estado, id_municipio };
  } catch (error:any) {
    console.error("Error al obtener IDs de estado y municipio:", error.message);
    throw error;
  }
};

export default obtenerIds;
