
// Función para convertir DD/MM/YYYY a formato SQL Server (YYYY-MM-DD)
function convertirFechaHoraParaSQLServer(fechaString:string) {
  // Separar día, mes y año
  const partes = fechaString.split('/');
  const dia = partes[0];
  const mes = partes[1];
  const anio = partes[2];
  
  // Reformatear como YYYY-MM-DD HH:MM:SS
  return `${anio}-${mes}-${dia} 00:00:00.0000000`;
}

// Función para convertir DD/MM/YYYY a formato SQL Server (YYYY-MM-DD)
function convertirFechaParaSQLServer(fechaString:string) {
  // Separar día, mes y año
  const partes = fechaString.split('/');
  const dia = partes[0];
  const mes = partes[1];
  const anio = partes[2];
  
  // Reformatear como YYYY-MM-DD HH:MM:SS
  return `${anio}-${mes}-${dia} 00:00:00.0000000`;
}


export default convertirFechaParaSQLServer;
