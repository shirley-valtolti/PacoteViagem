import express from "express";
import rotaCliente from "./Routes/rotaCliente.js";

const host = '0.0.0.0';
const porta = 4000;

const app = express();

app.use("/clientes", rotaCliente);

app.listen(porta, host, () => {
   console.log("Servidor backend em execução: http://"+host+":"+porta); 
});