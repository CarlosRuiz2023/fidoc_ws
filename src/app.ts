import { config } from 'dotenv';
import Server from './models/server';
//Configurar dot.env
config();

const server = new Server();
server.listen();