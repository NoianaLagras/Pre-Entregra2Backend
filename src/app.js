import express  from "express";
import __dirname from './utils.js';

import productsRouter from "./Routes/products.routes.js";
import cartsRouter from "./Routes/cart.routes.js";

const app = express();
const PORT = 8080 ;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

app.on('error', (error) => {
    console.log(`Error: ${error}`);
});


