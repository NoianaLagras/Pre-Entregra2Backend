import express  from "express";
import __dirname from './utils.js';
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./ProductManager.js";
import productsRouter from "./Routes/products.routes.js";
import cartsRouter from "./Routes/cart.routes.js";
import viewsRouter from "./Routes/views.routes.js";


const app = express();
const PORT = 8080 ;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+'/public'))

//handlebars
app.engine('handlebars', engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

//routes de products , carts
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Iniciar el servidor
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

app.on('error', (error) => {
    console.log(`Error: ${error}`);
});
const productManager = new ProductManager(`${__dirname}../../Products.JSON`)
const socketServer = new Server(httpServer);
socketServer.on('connection', (socket) => {
    console.log(`Cliente Conectado: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Cliente Desconectado: ${socket.id}`);
    });

    socket.on('addProduct', async (product) => {
        try {
            await productManager.addProduct(
                product.title,
                product.description,
                product.price,
                product.category,
                product.code,
                product.stock,
                product.status,
                product.thumbnails
            );
      const productosActualizados = await productManager.getProducts();
            socketServer.emit('actualizarProductos', productosActualizados);
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    });
    socket.on('deleteProduct', async (id) => {
        try {
            // Elimina
            await productManager.deleteProduct(id);
            
            // Actualiza
            const productosActualizados = await productManager.getProducts();
            socketServer.emit('actualizarProductos', productosActualizados);
            
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
        }
    });
});



