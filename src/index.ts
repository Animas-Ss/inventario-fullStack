import 'dotenv/config';
import express from "express";
//import http from 'http';
import cors from "cors";
import morgan from 'morgan';
import {router} from './routes/index.routes'
import connectDB from './config/mongo'
import cookieParser from 'cookie-parser';

//TODO: declaracion del puerto en la variales de entorno
const PORT = process.env.PORT || 3001;
//TODO: inicializamos express
const app = express();
//TODO: inicializamos morgan que nos permite ver las peticiones que llegan
app.use(morgan("dev"));
//TODO: para que el cuerpo de las peticiones sean en formato json y mi API lo comprenda
app.use(express.json())
//TODO: para poder ver las cabeceras y las cookie en ella
app.use(cookieParser())
//TODO: usamos cors() que nos permite decidir quienes interactuan con nuestra api , aca irian los servidores del fronten y backend que queremos que consuman nuestra API
app.use(cors({
    "credentials": true
}));
//TODO: usamos las rutas
app.use(router);
//TODO: creamos un servidor 
//const server = http.createServer(app);
//TODO: coneccion con la base de datos desde la carpeta config
connectDB();
//TODO: aca levantamos nuestro servidor
app.listen(PORT, () => {console.log(`Server activo en la direccion: http://localhost:${PORT}`)})
