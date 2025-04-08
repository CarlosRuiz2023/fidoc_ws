import * as cron from 'node-cron';
import { actualizarCarteraVencida, actualizarPagos } from '../helpers/cron';

/**
 * La función iniciarCron inicia la tarea taskReset.
 */
const iniciarCron = (): void => {
  taskUpdate_carteraVencida.start();
};

/**
 * La función `pausarCron` detiene una tarea llamada `taskReset`.
 */
const pausarCron = (): void => {
  taskUpdate_carteraVencida.stop();
};

// Crear un cron que se ejecute diario a la 1 am todos los dias
// 0 1 * * *
let taskUpdate_carteraVencida = cron.schedule('38 9 * * *', async () => {
  //await actualizarPagos();
  await actualizarCarteraVencida();
});

export { iniciarCron, pausarCron };