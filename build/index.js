"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
//import http from 'http';
const cors_1 = __importDefault(require("cors"));
//TODO: declaracion del puerto en la variales de entorno
const PORT = process.env.PORT || 3001;
//TODO: inicializamos express
const app = (0, express_1.default)();
//TODO: usamos cors() que nos permite decidir quienes interactuan con nuestra api , aca irian los servidores del fronten y backend que queremos que consuman nuestra API
app.use((0, cors_1.default)({
    "credentials": true
}));
//TODO: creamos un servidor 
//const server = http.createServer(app);
//TODO: aca levantamos nuestro servidor
app.listen(PORT, () => { console.log(`Server activo en la direccion: http://localhost:${PORT}`); });
